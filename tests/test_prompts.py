from backend.rag.prompts import build_system_prompt


def test_build_system_prompt_includes_chunks():
    chunks = [
        {"content": "片段1内容", "title": "作品1", "source": "works/x", "similarity": 0.9},
        {"content": "片段2内容", "title": "Demo1", "source": "vibecoding/y", "similarity": 0.8},
    ]
    prompt = build_system_prompt(chunks)
    assert "片段1内容" in prompt
    assert "作品1" in prompt
    assert "片段2内容" in prompt
    assert "林越" in prompt or "AI 替身" in prompt


def test_build_system_prompt_handles_empty_chunks():
    prompt = build_system_prompt([])
    assert "林越" in prompt or "AI 替身" in prompt


def test_build_system_prompt_includes_behavior_rules():
    chunks = [{"content": "x", "title": "t", "source": "s", "similarity": 0.9}]
    prompt = build_system_prompt(chunks)
    # 行为规则应该出现在 prompt 里
    assert "不知道" in prompt or "杜撰" in prompt
