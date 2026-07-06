from backend.lib.minimax import embed_texts
from backend.lib.supabase import get_client


async def search_relevant_chunks(
    query: str,
    top_k: int = 5,
    threshold: float = 0.65,
) -> list[dict]:
    """对 query 做 embedding，在 Supabase pgvector 中检索 top-k 相似 chunks"""
    [query_embedding] = await embed_texts([query])

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
