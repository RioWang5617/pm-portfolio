from backend.rag.chunker import chunk_text, build_metadata

def test_chunk_short_text_returns_single_chunk():
    text = "短文本"
    chunks = chunk_text(text, max_chars=400, overlap=50)
    assert len(chunks) == 1
    assert chunks[0] == "短文本"

def test_chunk_long_text_splits_by_paragraph():
    text = "段落1。\n\n段落2。\n\n段落3。" * 50
    chunks = chunk_text(text, max_chars=400, overlap=50)
    assert len(chunks) > 1
    for c in chunks:
        assert len(c) <= 600

def test_build_metadata():
    m = build_metadata("case_study", "测试作品", "works/test")
    assert m["source"] == "works/test"
    assert m["type"] == "case_study"
    assert m["title"] == "测试作品"

def test_chunk_empty_text_returns_empty():
    assert chunk_text("") == []
    assert chunk_text("   \n\n   ") == []
