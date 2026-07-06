#!/usr/bin/env python3
"""读取 src/data/*.ts → src/data.json

用 demjson3 解析（支持 JS 对象字面量语法）
"""
import json
import re
from pathlib import Path
import demjson3

ROOT = Path(__file__).parent.parent.parent


def extract_object(src: str, name: str):
    m = re.search(rf'\b{name}\b\s*(?::\s*\w+(?:\[\])?)?\s*=\s*', src)
    if not m:
        raise ValueError(f"找不到 {name}")
    start = m.end()
    # 括号匹配找结束
    depth = 0
    in_s = False
    s_char = None
    for j in range(start, len(src)):
        c = src[j]
        if in_s:
            if c == '\\':
                continue
            if c == s_char:
                in_s = False
            continue
        if c in ("'", '"', '`'):
            in_s = True
            s_char = c
            continue
        if c in '{[':
            depth += 1
        elif c in '}]':
            depth -= 1
            if depth == 0:
                return demjson3.decode(src[start:j + 1])
    raise ValueError(f"{name} 未闭合")


def main():
    src = ROOT / "src" / "data"

    profile = extract_object((src / "profile.ts").read_text("utf-8"), "profile")
    works = extract_object((src / "works.ts").read_text("utf-8"), "works")
    demos = extract_object((src / "vibecoding.ts").read_text("utf-8"), "demos")

    out = {"profile": profile, "works": works, "demos": demos}
    out_path = ROOT / "src" / "data.json"
    out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), "utf-8")
    print(f"✅ Exported {out_path} (1 profile + {len(works)} works + {len(demos)} demos)")


if __name__ == "__main__":
    main()
