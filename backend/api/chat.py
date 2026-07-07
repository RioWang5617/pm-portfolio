import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from backend.models import ChatRequest
from backend.rag.retriever import search_relevant_chunks
from backend.rag.prompts import build_system_prompt
from backend.lib.minimax import chat_stream

router = APIRouter()


@router.post("/chat")
async def chat(req: ChatRequest):
    """RAG chat endpoint - returns SSE stream"""
    # 1. 检索
    chunks = await search_relevant_chunks(req.message, top_k=5, threshold=0.3)

    # 2. 拼 system prompt
    system_prompt = build_system_prompt(chunks)

    # 3. 拼 messages (system + 最近 12 条历史 + 当前)
    messages = [{"role": "system", "content": system_prompt}]
    for h in req.history[-12:]:
        messages.append({"role": h.role, "content": h.content})
    messages.append({"role": "user", "content": req.message})

    # 4. SSE 生成
    async def event_generator():
        # 先发 sources
        yield f"data: {json.dumps({'type': 'sources', 'sources': chunks}, ensure_ascii=False)}\n\n"
        # 再流式发 token
        async for event in chat_stream(messages):
            yield f"data: {json.dumps(event, ensure_ascii=False)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
