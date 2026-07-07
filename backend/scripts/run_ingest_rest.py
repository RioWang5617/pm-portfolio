import asyncio
import json
import sys
import time
from pathlib import Path
sys.path.insert(0, "/Users/wty/Documents/个人/pm-portfolio")

import httpx
import certifi

from backend.lib.minimax import embed_texts
from backend.rag.sources import load_all_sources
from backend.rag.chunker import chunk_text
from backend.lib.pdf import extract_text

URL = "https://ivlrszbwekymbydhnlre.supabase.co/rest/v1/documents"
KEY = "sb_publishable_F9pB31N8oaKs-um1TeA86g_MlBROxUa"

def H():
    return {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}


def post_with_retry(client, rows, max_retries=5):
    """分批 POST，每批 5 个"""
    BATCH = 5
    inserted = 0
    for i in range(0, len(rows), BATCH):
        batch = rows[i:i+BATCH]
        for attempt in range(max_retries):
            try:
                r = client.post(
                    URL,
                    headers={**H(), "Prefer": "return=representation"},
                    json=batch,
                )
                if r.status_code < 400:
                    inserted += len(r.json())
                    print(f"  batch {i//BATCH+1}/{(len(rows)+BATCH-1)//BATCH}: {len(batch)} rows OK")
                    break
                elif r.status_code == 503 or r.status_code == 429:
                    wait = 2 ** attempt
                    print(f"  batch {i//BATCH+1}: {r.status_code}, retry in {wait}s...")
                    time.sleep(wait)
                else:
                    print(f"  batch {i//BATCH+1}: HTTP {r.status_code}, body={r.text[:200]}")
                    return inserted
            except Exception as e:
                wait = 2 ** attempt
                print(f"  batch {i//BATCH+1}: {type(e).__name__}, retry in {wait}s...")
                time.sleep(wait)
        else:
            print(f"  batch {i//BATCH+1}: gave up after {max_retries} retries")
    return inserted


async def main():
    data = json.loads(Path("/Users/wty/Documents/个人/pm-portfolio/src/data.json").read_text("utf-8"))
    resume_text = ""
    pdf = Path("/Users/wty/Documents/个人/pm-portfolio/public/resume.pdf")
    if pdf.exists():
        resume_text = extract_text(str(pdf))
        print(f"PDF: {len(resume_text)} chars")

    docs = load_all_sources(
        profile=data["profile"],
        works=data["works"],
        vibecoding=data["demos"],
        resume_text=resume_text,
    )
    print(f"Loaded {len(docs)} docs")

    all_chunks = []
    for d in docs:
        for c in chunk_text(d["content"], max_chars=400, overlap=50):
            all_chunks.append({"content": c, "metadata": d["metadata"]})
    print(f"Chunked {len(all_chunks)}")

    print("Embedding...")
    vecs = await embed_texts([c["content"] for c in all_chunks])
    print(f"  {len(vecs)} vectors, dim={len(vecs[0])}")

    print("\n=== DELETE clear ===")
    with httpx.Client(verify=certifi.where(), timeout=30) as c:
        r = c.delete(f"{URL}?id=neq.0", headers=H())
        print(f"  status={r.status_code}")

    print("\n=== POST insert (batched, 5 per batch) ===")
    rows = [{"content": c["content"], "embedding": v, "metadata": c["metadata"]}
            for c, v in zip(all_chunks, vecs)]
    with httpx.Client(verify=certifi.where(), timeout=60) as c:
        inserted = post_with_retry(c, rows)

    print(f"\n✅ inserted {inserted}/{len(rows)}")

    print("\n=== GET verify ===")
    with httpx.Client(verify=certifi.where(), timeout=10) as c:
        r = c.get(f"{URL}?select=id,metadata", headers={**H(), "Prefer": "count=exact"})
        rows_back = r.json()
        print(f"  count: {r.headers.get('content-range', '?')}")
        from collections import Counter
        sources = Counter((row.get("metadata") or {}).get("source", "?") for row in rows_back)
        for s, c in sources.most_common():
            print(f"    {s}: {c}")

asyncio.run(main())
