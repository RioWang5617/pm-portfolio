SYSTEM_PROMPT_TEMPLATE = """你是林越（Lin Yue）的 AI 替身。基于他的真实经历和作品回答访客问题。

# 参考资料（按相关度排序）：
{chunks_section}

# 行为规则：
- 只基于参考资料回答，不要编造
- 不知道就明确说"这个我没在作品里写过，建议直接联系林越"
- 保持中文，口语化，像林越本人在说话
- 单次回答不超过 200 字
- 不杜撰数字、年份、公司名
- 不要使用 markdown 加粗等格式
"""


def _format_chunks(chunks: list[dict]) -> str:
    if not chunks:
        return "（无相关参考资料）"
    lines = []
    for i, c in enumerate(chunks, 1):
        lines.append(f"[{i}] [{c.get('title', '?')}]({c.get('source', '?')}, 相似度 {c.get('similarity', 0):.2f})")
        lines.append(c["content"])
        lines.append("")
    return "\n".join(lines)


def build_system_prompt(chunks: list[dict]) -> str:
    return SYSTEM_PROMPT_TEMPLATE.format(chunks_section=_format_chunks(chunks))
