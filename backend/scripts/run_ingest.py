#!/usr/bin/env python3
"""ingest CLI - 从 src/data.json + public/resume.pdf 加载，调用 ingest pipeline"""
import asyncio
import json
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent.parent
sys.path.insert(0, str(ROOT))

from backend.rag.ingest import ingest_documents
from backend.rag.sources import load_all_sources
from backend.lib.pdf import extract_text


def load_ts_data():
    data_path = ROOT / "src" / "data.json"
    if not data_path.exists():
        print(f"ERROR: {data_path} 不存在", file=sys.stderr)
        print("请先跑: pnpm export-data", file=sys.stderr)
        sys.exit(1)
    return json.loads(data_path.read_text("utf-8"))


def load_resume_text():
    resume_pdf = ROOT / "public" / "resume.pdf"
    if not resume_pdf.exists():
        print(f"WARN: {resume_pdf} 不存在，跳过简历")
        return ""
    return extract_text(str(resume_pdf))


async def main():
    data = load_ts_data()
    resume_text = load_resume_text()

    docs = load_all_sources(
        profile=data["profile"],
        works=data["works"],
        vibecoding=data["demos"],
        resume_text=resume_text,
    )

    print(f"加载 {len(docs)} 个文档，开始切块 + embedding + 写 Supabase...")
    count = await ingest_documents(docs)
    print(f"✅ 完成，写入 {count} 个 chunks")


if __name__ == "__main__":
    asyncio.run(main())
