from backend.lib.minimax import embed_texts
from backend.lib.supabase import get_client


async def search_relevant_chunks(
    query: str,
    top_k: int = 5,
    threshold: float = 0.3,
) -> list[dict]:
    """对 query 做 embedding (type=query)，在 Supabase pgvector 中检索 top-k 相似 chunks"""
    # ⚠️ 必须用 type=query（跟 stored 的 type=db 配对）
    [query_embedding] = await embed_texts([query], input_type="query")

    client = get_client()
    response = client.rpc(
        "match_documents",
        {
            "query_embedding": query_embedding,
            "match_threshold": threshold,
            "match_count": top_k,
        },
    ).execute()

    return response.data or []
