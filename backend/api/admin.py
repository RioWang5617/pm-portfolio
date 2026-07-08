import json
import sys
from pathlib import Path
import httpx
from fastapi import APIRouter, HTTPException, Header
from backend.config import settings

# 让 admin.py 能 import run_ingest
ROOT = Path(__file__).parent.parent.parent
sys.path.insert(0, str(ROOT))

router = APIRouter()

# Supabase Storage 公开 URL（PDF 简历源）
RESUME_URL = "https://ivlrszbwekymbydhnlre.supabase.co/storage/v1/object/public/resume/wang-tianyang-resume.pdf"


def _fetch_resume_text() -> str:
    """优先从 Supabase Storage URL 拉 PDF；本地 public/resume.pdf 兜底"""
    try:
        with httpx.Client(timeout=20.0) as c:
            r = c.get(RESUME_URL)
            if r.status_code == 200 and r.content[:4] == b"%PDF":
                # 写入临时文件再用 pypdf 解析
                tmp = ROOT / ".cache_resume.pdf"
                tmp.write_bytes(r.content)
                from backend.lib.pdf import extract_text
                text = extract_text(str(tmp))
                tmp.unlink(missing_ok=True)
                if text and text.strip():
                    return text
    except Exception as e:
        print(f"[admin] remote resume fetch failed: {e}")

    local = ROOT / "public" / "resume.pdf"
    if local.exists():
        from backend.lib.pdf import extract_text
        return extract_text(str(local))
    return ""


async def run_reindex() -> int:
    """从 src/data.json + 远程 PDF 加载，跑 ingest pipeline"""
    from backend.rag.ingest import ingest_documents
    from backend.rag.sources import load_all_sources

    data_path = ROOT / "src" / "data.json"
    if not data_path.exists():
        raise FileNotFoundError(f"{data_path} 不存在，请先跑 pnpm export-data")

    data = json.loads(data_path.read_text("utf-8"))
    resume_text = _fetch_resume_text()

    docs = load_all_sources(
        profile=data["profile"],
        works=data["works"],
        vibecoding=data["demos"],
        resume_text=resume_text,
    )
    return await ingest_documents(docs)


@router.post("/admin/reindex")
async def reindex(x_admin_token: str = Header(default="")):
    if x_admin_token != settings.admin_token:
        raise HTTPException(status_code=401, detail="unauthorized")
    try:
        count = await run_reindex()
    except FileNotFoundError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"status": "ok", "chunks_written": count}
