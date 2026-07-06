from backend.lib.pdf import extract_text


def test_extract_text_from_sample_pdf():
    text = extract_text("tests/fixtures/sample.pdf")
    assert "Lin Yue" in text
    assert "AI Product" in text or "AI  Product" in text  # PDF 文本可能有空格
    assert "Shanghai" in text
    assert "2024" in text
