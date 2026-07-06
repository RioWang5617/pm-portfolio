from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    supabase_url: str = "https://placeholder.supabase.co"
    supabase_key: str = "placeholder-key"

    minimax_api_key: str = "placeholder-key"
    minimax_api_base: str = "https://api.minimaxi.com"
    minimax_chat_model: str = "MiniMax-M3"
    minimax_embed_model: str = "emb-01"

    admin_token: str = "change-me"

    host: str = "0.0.0.0"
    port: int = 8000


settings = Settings()
