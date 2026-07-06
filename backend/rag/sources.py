from backend.rag.chunker import build_metadata


def _profile_to_text(profile: dict) -> tuple[str, str]:
    """profile dict → 拼接好的文本 + 标题"""
    title = f"{profile.get('name', '?')} — {profile.get('title', '?')}"
    parts = [
        f"姓名: {profile.get('name', '')} / {profile.get('nameZh', '')}",
        f"职位: {profile.get('title', '')}",
        f"定位: {profile.get('tagline', '')}",
        f"简介: {profile.get('subtitle', '')}",
        f"自述: {profile.get('pitch', '')}",
        f"位置: {profile.get('location', '')}",
        f"邮箱: {profile.get('email', '')}",
        f"能力: {', '.join(profile.get('capabilities', []))}",
    ]
    return "\n".join(parts), title


def _work_to_text(work: dict) -> tuple[str, str]:
    title = work["title"]
    parts = [
        f"标题: {work['title']}",
        f"副标题: {work['subtitle']}",
        f"年份: {work['year']} | 角色: {work['role']} | 团队: {work['team']}",
        f"\n## Intro\n{work['intro']}",
        f"\n## Context\n{work['context']}",
        f"\n## Problem\n{work['problem']}",
        f"\n## Approach",
    ]
    for step in work.get("approach", []):
        parts.append(f"### {step['title']}\n{step['body']}")
    parts.append("\n## Outcome")
    for o in work.get("outcome", []):
        parts.append(f"- {o['metric']} — {o['label']}")
    parts.append(f"\n## Reflection\n{work.get('reflection', '')}")
    return "\n".join(parts), title


def _demo_to_text(demo: dict) -> tuple[str, str]:
    title = demo["title"]
    parts = [
        f"标题: {demo['title']}",
        f"副标题: {demo['subtitle']}",
        f"年份: {demo['year']} | 用时: {demo['effort']}",
        f"Stack: {', '.join(demo.get('stack', []))}",
        f"\n## Motivation\n{demo['motivation']}",
        f"\n## Build\n{demo['build']}",
        f"\n## What I Learned\n{demo['whatILearned']}",
    ]
    return "\n".join(parts), title


def load_all_sources(
    profile: dict,
    works: list[dict],
    vibecoding: list[dict],
    resume_text: str,
) -> list[dict]:
    """返回 [{content, metadata}, ...] 列表"""
    docs = []

    text, title = _profile_to_text(profile)
    docs.append({
        "content": text,
        "metadata": build_metadata("profile", title, "profile"),
    })

    if resume_text and resume_text.strip():
        docs.append({
            "content": resume_text,
            "metadata": build_metadata("resume", "简历", "resume.pdf"),
        })

    for w in works:
        text, title = _work_to_text(w)
        docs.append({
            "content": text,
            "metadata": build_metadata("case_study", title, f"works/{w['slug']}"),
        })

    for d in vibecoding:
        text, title = _demo_to_text(d)
        docs.append({
            "content": text,
            "metadata": build_metadata("demo", title, f"vibecoding/{d['slug']}"),
        })

    return docs
