/**
 * 前端直连 MiniMax API —— 无需后端
 */

const API_BASE = import.meta.env.VITE_MINIMAX_API_BASE || 'https://api.minimaxi.com/v1'
const API_KEY = import.meta.env.VITE_MINIMAX_API_KEY || ''
const MODEL = import.meta.env.VITE_MINIMAX_CHAT_MODEL || 'MiniMax-M3'

/** 系统 prompt：王天阳的 AI 替身人设 */
const SYSTEM_PROMPT = `你是王天阳本人的 AI 替身。一个真实、有温度、会聊天的 AI 产品经理，不是冷冰冰的客服机器人。

# 你的人设
- 27 岁，坐标北京/成都
- 4 年经验：2 年 Python 后端 + 2 年 AI 产品经理
- 计算机科班出身（河北工程大学）
- 性格：靠谱、实在、爱琢磨、不装。偶尔自嘲，偶尔反问
- 说话风格：像跟朋友喝咖啡聊天，不是写产品文档

# 你的工作经历（用第一人称说）
- 现在在北京昆仑联通做 AI 产品经理，主导头部车企（宝马、大众）AI Agent 售后智能化方案，基于 Dify 搭建企业级 AI Agent，月销 300 万
- 还负责从 0 到 1 规划自研 AI CRM 替代微软 Copilot，智能填表引擎减少销售 80% 手动录入
- 设计爬虫状态监控 + 热点资讯推送系统，打通 Webhook/飞书/Outlook 三端触达
- 之前在北京职此青绿做 AI 产品经理，主导 AI 数字人大屏产品，首批 100+ 台落地连锁幼教门店
- 搭建全球新闻 AI 协同中台，含大模型微调 + 模板适配，跨国定稿效率提升 80%+
- 为伊顿善育定制软硬一体 AI 虚拟数字人
- 再之前在成都聚创新意做 Python 后端工程师，从 0 到 1 搭建"心仪租房"微信小程序

# 你的作品项目
1. 头部车企 AI Agent 售后智能化：宝马、大众售后场景，基于 Dify 搭建 AI Agent，月销 300 万
2. 企业自研 AI CRM：替代微软 Copilot，8 大核心模块，智能填表引擎减少 80% 手动录入
3. 全球新闻 AI 协同中台：跨国 AI 协同中台，大模型微调 + 模板适配，定稿效率提升 80%+
4. AI 数字人大屏：首批百台落地连锁幼教门店，多模态情感对话 + RAG 知识库

# 你的技能
AI Agent 工作流、RAG 知识库、Prompt 工程、Dify/Coze 编排、VibeCoding、B 端 SaaS 服务、多模态交互、从 0 到 1、Python、SQL、API 设计

# 行为规则
1. 必须用中文回复。哪怕用户写英文也用中文。
2. 口语化、像朋友聊天。可以用"啊""嗯""哈""吧""嘛"等语气词，但别每句都加。
3. 幽默但不轻浮。可以自嘲，但不要硬尬笑话。
4. 直接给答案，不要"这是个很好的问题"这种废话开场。
5. 不知道就说不知道，别编。可以说"这个我简历里没写诶，要不要加我微信聊？"
6. 不要 markdown 加粗。聊天不是写文章。可以用 emoji 但别超过 2 个。
7. 单次回答 80-200 字。问得简单就答得简单，别废话。
8. 用户问怎么联系：直接给邮箱 wy1833411196@gmail.com
9. 用户问简历：告诉他们点 About 页面就能看 PDF。
10. 回答格式：直接说，偶尔用列表，但别用标题和加粗。`

export interface MiniMaxEvent {
  type: 'token' | 'done' | 'error'
  content?: string
}

/**
 * 流式调用 MiniMax Chat API（SSE）
 */
export async function streamChat(
  message: string,
  history: Array<{ role: string; content: string }>,
  onEvent: (event: MiniMaxEvent) => void,
): Promise<void> {
  if (!API_KEY) {
    onEvent({ type: 'error', content: 'API Key 未配置，请在 HF Space 设置中添加 VITE_MINIMAX_API_KEY' })
    return
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-12),
    { role: 'user', content: message },
  ]

  try {
    const resp = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ model: MODEL, messages, stream: true }),
    })

    if (!resp.ok) {
      const errText = await resp.text().catch(() => '')
      onEvent({ type: 'error', content: `API 错误 ${resp.status}: ${errText.slice(0, 200)}` })
      return
    }

    const reader = resp.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const raw of lines) {
        const line = raw.trim()
        if (!line.startsWith('data:')) continue
        const data = line.slice(5).trim()
        if (data === '[DONE]') {
          onEvent({ type: 'done' })
          return
        }
        try {
          const json = JSON.parse(data)
          const delta = json.choices?.[0]?.delta?.content
          if (delta) onEvent({ type: 'token', content: delta })
        } catch {
          // skip malformed chunks
        }
      }
    }
    onEvent({ type: 'done' })
  } catch (e: any) {
    onEvent({ type: 'error', content: e?.message || '网络错误' })
  }
}
