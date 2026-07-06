from backend.rag.sources import load_all_sources


def test_load_all_sources_returns_list():
    docs = load_all_sources(
        profile={"name": "test", "title": "PM"},
        works=[],
        vibecoding=[],
        resume_text="测试简历内容",
    )
    assert isinstance(docs, list)
    assert len(docs) >= 2  # profile + resume


def test_load_all_sources_contains_profile():
    docs = load_all_sources(
        profile={"name": "林越", "title": "AI PM", "tagline": "测试"},
        works=[],
        vibecoding=[],
        resume_text="",
    )
    profile_doc = next(d for d in docs if d["metadata"]["type"] == "profile")
    assert "林越" in profile_doc["content"]
    assert "AI PM" in profile_doc["content"]


def test_load_all_sources_includes_works():
    docs = load_all_sources(
        profile={"name": "x", "title": "y"},
        works=[{
            "slug": "test-work",
            "title": "测试作品",
            "subtitle": "副标题",
            "year": "2024",
            "role": "AI PM",
            "team": "某团队",
            "intro": "intro 内容",
            "context": "context 内容",
            "problem": "problem 内容",
            "approach": [{"title": "步骤", "body": "做法"}],
            "outcome": [{"metric": "67%", "label": "解决率"}],
            "reflection": "反思",
        }],
        vibecoding=[],
        resume_text="",
    )
    work_doc = next(d for d in docs if d["metadata"]["type"] == "case_study")
    assert work_doc["metadata"]["source"] == "works/test-work"
    assert "测试作品" in work_doc["content"]
    assert "67%" in work_doc["content"]


def test_load_all_sources_includes_demos():
    docs = load_all_sources(
        profile={"name": "x", "title": "y"},
        works=[],
        vibecoding=[{
            "slug": "prd-reviewer",
            "title": "PRD 评审助手",
            "subtitle": "测试副标题",
            "year": "2025",
            "effort": "2 天",
            "stack": ["Cursor"],
            "motivation": "动机",
            "build": "做法",
            "whatILearned": "收获",
        }],
        resume_text="",
    )
    demo_doc = next(d for d in docs if d["metadata"]["type"] == "demo")
    assert demo_doc["metadata"]["source"] == "vibecoding/prd-reviewer"
    assert "PRD 评审助手" in demo_doc["content"]
    assert "Cursor" in demo_doc["content"]


def test_load_all_sources_skips_empty_resume():
    docs = load_all_sources(
        profile={"name": "x", "title": "y"},
        works=[],
        vibecoding=[],
        resume_text="",
    )
    types = [d["metadata"]["type"] for d in docs]
    assert "resume" not in types
