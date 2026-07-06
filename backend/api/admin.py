import json
import sys
from pathlib import Path
from fastapi import APIRouter, HTTPException, Header
from backend.config import settings

# 让 admin.py 能 import run_ingest
ROOT = Path(__file__).parent.parent.parent
sys.path.insert(0, str(ROOT))

router = APIRouter()


async def run_reindex() -> int:
    """从 src/data.json + public/resume.pdf 加载，跑 ingest pipeline"""
    from backend.rag.ingest import ingest_documents
    from backend.rag.sources import load_all_sources
    from backend.lib.pdf import extract_text

    data_path = ROOT / "src" / "data.json"
    if not data_path.exists():
        raise FileNotFoundError(f"{data_path} 不存在，请先 python3 backend/scripts/convert_ts_to_json.py")

    data = json.loads(data_path.read_text("utf-8"))
    resume_pdf = ROOT / "public" / "resume.pdf"
    resume_text = extract_text(str(resume_pdf)) if resume_pdf.exists() else ""

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
