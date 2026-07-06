from pypdf import PdfReader


def extract_text(pdf_path: str) -> str:
    """从 PDF 提取所有页的纯文本"""
    reader = PdfReader(pdf_path)
    pages = []
    for page in reader.pages:
        pages.append(page.extract_text() or "")
    return "\n\n".join(pages)
