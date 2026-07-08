from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


# backend/.env 永远是真实的配置文件位置（不管 cwd 在哪）
_BACKEND_DIR = Path(__file__).resolve().parent
_ENV_FILE = _BACKEND_DIR / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(_ENV_FILE),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    supabase_url: str = "https://placeholder.supabase.co"
    supabase_key: str = "placeholder-key"

    minimax_api_key: str = "placeholder-key"
    minimax_api_base: str = "https://api.minimaxi.com"
    minimax_chat_model: str = "MiniMax-M3"
    minimax_embed_model: str = "emb-01"

    # Fallback 模型配置（当 MiniMax 不可用时自动切换）
    fallback_api_key: str = ""
    fallback_api_base: str = "https://api.mimo.ai"
    fallback_chat_model: str = "mimo-v2.5-pro"

    admin_token: str = "change-me"

    host: str = "0.0.0.0"
    port: int = 8000


settings = Settings()
