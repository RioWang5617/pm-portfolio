from typing import Literal


def chunk_text(text: str, max_chars: int = 400, overlap: int = 50) -> list[str]:
    """按段落边界切块，每块不超过 max_chars，重叠 overlap 字符"""
    if not text or not text.strip():
        return []
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks: list[str] = []
    current = ""

    for para in paragraphs:
        if current and len(current) + len(para) + 2 > max_chars:
            chunks.append(current)
            tail = current[-overlap:] if len(current) > overlap else current
            current = tail + "\n\n" + para
        else:
            current = current + "\n\n" + para if current else para

    if current:
        chunks.append(current)

    return chunks


ChunkSource = Literal["profile", "resume", "case_study", "demo"]


def build_metadata(source: ChunkSource, title: str, source_path: str) -> dict:
    return {
        "source": source_path,
        "type": source,
        "title": title,
    }
