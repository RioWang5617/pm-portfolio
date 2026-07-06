from backend.lib.minimax import embed_texts
from backend.lib.supabase import get_client
from backend.rag.chunker import chunk_text


async def ingest_documents(docs: list[dict]) -> int:
    """接收已加载的 docs（未切块），切块 + embedding + 写 Supabase
    返回写入的 chunk 总数
    """
    all_chunks: list[dict] = []
    for doc in docs:
        chunks = chunk_text(doc["content"], max_chars=400, overlap=50)
        for c in chunks:
            all_chunks.append({"content": c, "metadata": doc["metadata"]})

    if not all_chunks:
        return 0

    texts = [c["content"] for c in all_chunks]
    embeddings = await embed_texts(texts)

    rows = [
        {
            "content": c["content"],
            "embedding": emb,
            "metadata": c["metadata"],
        }
        for c, emb in zip(all_chunks, embeddings)
    ]

    client = get_client()
    table = client.table("documents")
    # delete all (id != 0 catches all rows)
    table.delete().neq("id", 0).execute()
    table.insert(rows).execute()

    return len(rows)
