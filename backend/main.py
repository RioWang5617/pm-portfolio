from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import chat, admin
from backend.config import settings

app = FastAPI(title="PM Portfolio API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "chat_model": settings.minimax_chat_model,
        "embed_model": settings.minimax_embed_model,
    }
