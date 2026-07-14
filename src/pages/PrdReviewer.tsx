import { Link } from 'react-router-dom'
import { SidebarNav } from '../components/SidebarNav'

const prototypes = [
  { src: '/images/prototypes/01-home.png', label: '首页', desc: '产品介绍 + 快速入口，根据用户角色动态展示功能卡片' },
  { src: '/images/prototypes/02-upload.png', label: '上传页', desc: '拖拽上传 / 点击选择 / 拍照上传，支持 PDF、Word、JPG、PNG' },
  { src: '/images/prototypes/03-progress.png', label: '审查进度页', desc: '5 步实时进度展示：文档解析 → 条款拆分 → 类型识别 → 风险审查 → 报告生成' },
  { src: '/images/prototypes/04-report-risk.png', label: '审查报告（有风险）', desc: '风险总览 + 逐条审查结果，风险条目高亮标注，点击展开详情面板' },
  { src: '/images/prototypes/05-report-safe.png', label: '审查报告（无风险）', desc: '低风险合同的清爽报告视图，绿色通过标识' },
  { src: '/images/prototypes/06-history.png', label: '历史记录', desc: '按时间倒序展示审查列表，支持按合同类型、风险等级筛选' },
  { src: '/images/prototypes/07-model-config.png', label: '模型配置', desc: '支持多供应商模型管理：DeepSeek / OpenAI / 通义千问 / 自定义' },
  { src: '/images/prototypes/08-enterprise-templates.png', label: '企业标准模板管理', desc: '上传标准合同模板，自动拆分为条款库' },
  { src: '/images/prototypes/09-enterprise-members.png', label: '成员管理', desc: '企业团队成员权限管理' },
  { src: '/images/prototypes/10-oa-integration.png', label: 'OA 集成', desc: '嵌入企业审批流程的审查结果展示' },
]

const riskDimensions = [
  { title: '条款缺失检查', desc: '该类合同必备条款是否齐全（如租房合同缺少维修责任约定）' },
  { title: '不合理条款识别', desc: '单方面免责、模糊表述（"合理期限""适当补偿"）、违约金过高或过低' },
  { title: '权利义务失衡', desc: '双方权利义务是否对等，是否存在显失公平的条款' },
  { title: '金额与数字校验', desc: '大小写是否一致、计算是否正确、利率是否超过法定上限' },
  { title: '法律合规性', desc: '是否违反强制性法律规定，引用具体法规条文作为依据' },
  { title: '签章与时效验证', desc: '签章主体一致性、合同期限完整性、续约条件合理性' },
]

const challenges = [
  {
    problem: '法律领域 AI 幻觉风险',
    detail: '法律审查对准确性要求极高，AI 可能"一本正经地胡说八道"——编造不存在的法条，或错误解读法规含义。直接用 AI 做判断，一旦出错后果严重。',
    solution: '设计"规则引擎 + AI"双引擎架构。确定性检查（必备条款、数字校验、利率上限）用规则引擎硬编码；语义理解、风险推理交给大模型。两套引擎结论交叉验证，不一致时提升风险等级。',
  },
  {
    problem: 'OCR 识别准确率不够',
    detail: '手机拍照的合同图片质量参差不齐——光线不均、角度倾斜、字迹模糊。直接 OCR 出来的文本错误率高，后续条款拆分和风险审查全部受影响。',
    solution: 'OCR 前增加图像预处理（去噪、倾斜校正、对比度增强）。识别结果置信度低于 70% 时，展示原文对比让用户确认修正。对低置信度区域在报告中标注"建议核对原文"。',
  },
  {
    problem: '合同类型识别错误导致审查偏差',
    detail: '不同合同类型的审查规则完全不同——租房合同看押金条款，劳动合同看竞业限制。如果类型识别错了，整份报告的审查方向就偏了。',
    solution: '多模型投票机制 + 置信度阈值。识别置信度 ≥ 0.85 时自动匹配；0.5-0.85 时展示候选类型让用户确认；< 0.5 时请求用户手动选择。类型不确定时，同时应用多套规则取并集。',
  },
  {
    problem: '审查报告的"可读性"问题',
    detail: '初版报告满屏法条引用和专业术语，个人用户完全看不懂。"根据《民法典》第 585 条"这种表述对法务有用，对普通人就是天书。',
    solution: '设计双层报告结构：第一层用通俗语言说明"这个条款对你有什么影响"，第二层展开法规依据和专业分析。个人用户默认看第一层，专业用户可以展开第二层。',
  },
  {
    problem: '企业标准比对的语义匹配难题',
    detail: '企业标准条款和待审合同的措辞往往不同但语义相近，简单的文本匹配完全失效。"甲方应于 30 日内付款"和"付款期限为一个月"意思一样但字面完全不同。',
    solution: '引入向量数据库做语义匹配。将标准条款和待审条款分别向量化，计算余弦相似度。设置多级阈值：> 0.9 判定一致，0.7-0.9 判定部分偏离，< 0.7 判定严重不符。',
  },
  {
    problem: '合同数据的安全与隐私保护',
    detail: '合同包含企业核心商业机密和个人隐私信息（身份证号、银行卡号等）。用户担心上传合同后数据泄露，企业客户更是直接问"数据存哪？谁能看？"。',
    solution: '四层安全策略：① 传输全程 HTTPS + 存储 AES-256 加密；② 报告中敏感信息自动脱敏；③ 用户可主动删除数据（含文档原件和报告）；④ 支持私有化部署，数据不出企业内网。API Key 也加密存储，界面仅显示脱敏值。',
  },
]

const techStack = [
  { layer: '文档解析', tech: 'PyMuPDF + python-docx + PaddleOCR', reason: 'Python 生态原生支持，中文 OCR 识别率高' },
  { layer: 'AI 引擎', tech: 'DeepSeek / Qwen + 自建 RAG', reason: '国产模型合规友好，成本可控' },
  { layer: '工作流编排', tech: 'Dify Agent 工作流', reason: '可视化编排复杂审查流程，快速迭代' },
  { layer: '向量检索', tech: 'Milvus 向量数据库', reason: '国产、社区活跃、性能好，支撑法律知识库 RAG' },
  { layer: '前端', tech: 'React 18 + TypeScript + Ant Design', reason: '生态成熟，企业级组件完善' },
  { layer: '后端', tech: 'Python FastAPI', reason: 'AI/ML 生态优势，异步性能好' },
  { layer: '部署', tech: 'Docker Compose（支持 SaaS + 私有化）', reason: '满足不同企业的数据安全要求' },
]

const businessGoals = [
  { title: '降低人工审查成本', desc: '将合同审查从 2-3 小时压缩到 2 分钟级别，减少法务重复劳动。' },
  { title: '提升审查标准化', desc: '通过企业标准模板和规则引擎，把主观看法转化为可复现的审核标准。' },
  { title: '确保合规与可追溯', desc: '生成结构化报告、免责声明和审计链路，降低企业法律风险。' },
]

const metrics = [
  { label: '审查时长', value: '≤ 2 分钟', desc: '从合同上传到报告生成的全流程时长。' },
  { label: '标准覆盖率', value: '92%', desc: '合同条款与企业标准模板匹配的自动识别准确率。' },
  { label: '误报率', value: '< 8%', desc: '规则引擎与 AI 交叉校验后，报告中错误警告的比例。' },
  { label: '用户满意度', value: '89%', desc: '法务和商务用户对审查结果可读性与实用性的综合评价。' },
]

const sidebarSections = [
  { id: 'overview', label: '概述' },
  { id: 'motivation', label: '为什么做' },
  { id: 'architecture', label: '架构设计' },
  { id: 'business-goals', label: '商业目标' },
  { id: 'flow', label: '核心流程' },
  { id: 'risk-engine', label: '风险审查引擎' },
  { id: 'prototypes', label: '原型设计' },
  { id: 'challenges', label: '踩坑与解决' },
  { id: 'tech', label: '技术选型' },
  { id: 'metrics', label: '运营指标' },
  { id: 'learned', label: '复盘总结' },
]

export default function PrdReviewer() {
  return (
    <article>
      <SidebarNav sections={sidebarSections} />

      {/* HERO */}
      <header id="overview" className="mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-28 pb-16 md:pb-20">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-2">
            <Link to="/vibecoding" className="text-[0.78rem] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors">
              返回 Vibecoding
            </Link>
          </div>
          <div className="md:col-span-10">
            <p className="text-[0.78rem] uppercase tracking-[0.18em] text-muted mb-6 num">
              Case Study · 2025
            </p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] leading-[0.98] tracking-tightest text-balance">
              AI 合同审查助手
            </h1>
            <p className="mt-8 text-[1.18rem] md:text-[1.32rem] text-muted leading-[1.5] max-w-prose text-pretty">
              上传一份合同，AI 自动识别合同类型、拆分条款、逐条审查风险，与企业标准规范进行合规比对，生成可视化的风险审查报告。v1 聚焦中文合同，多语言为 v2 规划。
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {['Dify', 'Claude', 'Python', 'PaddleOCR', 'Milvus', 'FastAPI', 'React'].map((s) => (
                <span key={s} className="text-[0.78rem] px-2.5 py-1 border border-line rounded-full text-muted font-mono">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* COVER */}
      <div className="mx-auto max-w-wide px-6 md:px-10 mb-20 md:mb-28 reveal">
        <div className="aspect-[21/9] w-full rounded-sm relative overflow-hidden border border-line bg-ink/5">
          <img
            src={prototypes[0].src}
            alt="AI 合同审查助手首页"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* WHY */}
      <Section id="motivation" title="为什么做" eyebrow="01">
        <div className="space-y-6">
          <p>
            在 AI CRM 项目中，合同审查是销售流程中最高频也最痛苦的环节。一份供应商合同，法务要逐条看 2-3 小时；业务人员签协议前想自查一下，根本不知道哪些条款有坑。
          </p>
          <p>
            更现实的问题是：企业有标准合同模板，但每次审查都要人工对比——"这条跟标准差了多少？""这个违约金比例合不合理？"——完全靠经验和记忆。
          </p>
          <p>
            所以我决定做一个<strong>通用的 AI 合同审查工具</strong>：用户上传合同，AI 自动完成从解析到出报告的全流程。不是替代法务，而是帮他们<strong>省掉 80% 的重复劳动</strong>，把精力放在真正需要判断的地方。
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <HighlightCard
              title="效率提升"
              desc="人工审查 2-3 小时 → AI 审查 ≤ 2 分钟"
            />
            <HighlightCard
              title="标准化合规"
              desc="企业标准自动比对，不靠人记忆"
            />
            <HighlightCard
              title="普惠法律"
              desc="个人用户也能获得专业级审查"
            />
          </div>
        </div>
      </Section>

      {/* ARCHITECTURE */}
      <Section id="architecture" title="架构设计" eyebrow="02">
        <div className="space-y-8">
          <p>
            产品采用五层架构设计，从展示层到数据层逐层解耦。核心思路是<strong>模块化</strong>——每个引擎（文档解析、类型识别、条款拆分、风险审查、合规比对）都是独立服务，可以单独迭代和替换。
          </p>

          {/* Architecture diagram as styled cards */}
          <div className="space-y-4">
            <ArchLayer
              title="展示层"
              color="from-[#141414] to-[#0F0F0E]"
              borderColor="border-line/60"
              items={['Web 应用（独立部署入口）', 'OA 集成模块（嵌入企业审批）', '移动端 H5（v2 规划）', '模型配置页（管理自定义 AI 模型）']}
            />
            <ArchArrow />
            <ArchLayer
              title="接入层"
              color="from-[#141414] to-[#0F0F0E]"
              borderColor="border-line/60"
              items={['API 网关（鉴权 / 限流 / 路由）', '文件上传服务（分片上传 / 格式校验）']}
            />
            <ArchArrow />
            <ArchLayer
              title="核心服务层"
              color="from-[#141414] to-[#0F0F0E]"
              borderColor="border-line/60"
              items={['文档解析引擎（PDF / Word / OCR）', '合同类型识别（自动分类模型）', '条款拆分引擎（结构化提取）', '风险审查引擎（逐条分析 + 评分）', '合规比对引擎（企业标准差异检测）', '签章与时效验证', '模型配置管理']}
            />
            <ArchArrow />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArchLayer
                title="AI 能力层"
                color="from-[#141414] to-[#0F0F0E]"
                borderColor="border-line/60"
                items={['大语言模型（语义理解 / 条款解读）', '法律知识库（法规条文 / RAG 检索）', 'OCR 识别模型（图片文字提取）', '合同模板库（标准条款 / 行业模板）']}
              />
              <ArchLayer
                title="数据层"
                color="from-[#141414] to-[#0F0F0E]"
                borderColor="border-line/60"
                items={['文档存储（OSS / MinIO）', '结构化数据库（PostgreSQL）', '向量数据库（Milvus）', '缓存层（Redis）']}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* BUSINESS GOALS */}
      <Section id="business-goals" title="商业目标" eyebrow="03">
        <div className="space-y-6">
          <p>
            本项目的商业目标清晰：让企业法务和业务人员都能更快、更标准、更可追溯地完成合同审查。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessGoals.map((goal) => (
              <div key={goal.title} className="p-6 border border-line rounded-lg bg-ink/5">
                <h4 className="font-display text-[1.05rem] tracking-tight mb-2">{goal.title}</h4>
                <p className="text-[0.92rem] text-muted leading-[1.75]">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CORE FLOW */}
      <Section id="flow" title="核心流程" eyebrow="04">
        <div className="space-y-12">
          <div>
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tight mb-6">合同审查主流程</h3>
            <p className="text-muted leading-[1.7] mb-8">
              用户上传合同后，系统自动执行五步审查：文档解析 → 条款拆分 → 类型识别 → 并行审查（风险扫描 + 合规比对 + 签章验证）→ 生成报告。整个过程≤ 2 分钟，用户只需等待结果。
            </p>
            <FlowDiagram steps={[
              { label: '用户上传合同', accent: true },
              { label: '文件格式判断', sub: 'PDF / Word / 图片' },
              { label: '文档内容标准化', sub: '文本提取 + OCR 识别' },
              { label: '合同类型自动识别', sub: '招投标 / 租房 / 劳动 / 借贷' },
              { label: '条款拆分与结构化', sub: '按条款编号和语义切分' },
              { label: '并行审查', sub: '风险扫描 + 合规比对 + 签章验证' },
              { label: '风险评分与等级划分', sub: '高 / 中 / 低 三级' },
              { label: '生成审查报告', sub: '风险高亮 + 修改建议 + 法规依据', accent: true },
            ]} />
          </div>

          <div>
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tight mb-6">企业标准合规比对流程</h3>
            <p className="text-muted leading-[1.7] mb-8">
              企业上传标准合同模板后，系统自动拆分为条款库。后续审查时，待审合同逐条与标准库进行语义匹配，输出四种结果：完全一致、部分偏离、严重不符、标准未覆盖。
            </p>
            <FlowDiagram steps={[
              { label: '企业上传标准模板', accent: true },
              { label: '条款拆分与结构化', sub: '自动拆分为标准条款库' },
              { label: '待审合同条款拆分' },
              { label: '逐条语义匹配', sub: '向量化 + 余弦相似度' },
              { label: '输出比对结果', sub: '一致 / 偏离 / 不符 / 未覆盖', accent: true },
            ]} />
          </div>

          <div>
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tight mb-6">OA 集成流程</h3>
            <p className="text-muted leading-[1.7] mb-8">
              提供 RESTful API + Webhook 回调，企业 OA 系统可以直接在审批流程中嵌入合同审查节点。提交合同 → 异步审查 → 回调通知 → 拉取报告，全程无需人工干预。
            </p>
            <FlowDiagram steps={[
              { label: 'OA 系统提交合同', accent: true },
              { label: 'API 网关鉴权', sub: 'OAuth2.0 / API Key' },
              { label: '触发异步审查任务' },
              { label: 'AI 引擎审查', sub: '解析 → 拆分 → 审查' },
              { label: 'Webhook 回调通知' },
              { label: '返回结构化报告', sub: 'JSON + PDF', accent: true },
            ]} />
          </div>
        </div>
      </Section>

      {/* RISK ENGINE */}
      <Section id="risk-engine" title="风险审查引擎" eyebrow="05">
        <div className="space-y-8">
          <p>
            风险审查是产品的核心价值。采用<strong>"规则引擎 + AI 模型"双引擎</strong>架构：确定性检查用规则硬编码，语义理解交给大模型，两套引擎交叉验证。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {riskDimensions.map((r) => (
              <div key={r.title} className="p-5 border border-line rounded-lg hover:border-ink/30 transition-colors">
                <h4 className="font-display text-[1.05rem] tracking-tight mb-2">{r.title}</h4>
                <p className="text-[0.9rem] text-muted leading-[1.6]">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tight mb-6">风险等级划分</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RiskLevelCard level="高风险" desc="可能导致合同无效、重大经济损失或法律纠纷" action="必须修改" />
              <RiskLevelCard level="中风险" desc="存在不合理条款但不致命，建议优化" action="建议修改" />
              <RiskLevelCard level="低风险" desc="表述可改进，不影响合同效力" action="可选优化" />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tight mb-6">AI 效果保障：三层防线</h3>
            <div className="space-y-4">
              <DefenseLayer
                layer="第一层"
                title="规则引擎（确定性）"
                items={['法定必备条款检查清单', '数字 / 金额校验规则', '利率上限等硬性法规阈值', '企业标准条款精确匹配']}
              />
              <DefenseLayer
                layer="第二层"
                title="AI 模型（概率性）"
                items={['大模型语义理解', '条款意图解读', '风险推理与建议生成', '模糊表述识别']}
              />
              <DefenseLayer
                layer="第三层"
                title="校验与反馈（持续优化）"
                items={['结果一致性校验：规则引擎 vs AI 结论交叉验证', '置信度评分：低于阈值标记为需关注', '用户反馈收集：标记误报 / 漏报', '模型迭代优化：基于反馈数据微调']}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* PROTOTYPES */}
      <Section id="prototypes" title="原型设计" eyebrow="06">
        <div className="space-y-6">
          <p>
            共设计 10 个核心页面，覆盖完整审查流程、企业管理后台和 OA 集成场景。以下为 v1 高保真原型（1440px 宽度）：
          </p>

          {/* Legal Disclaimer */}
          <div className="mt-6 p-6 border border-line rounded-lg bg-ink/5">
            <h3 className="font-display text-[1.1rem] tracking-tight mb-3">
              法律免责声明设计
            </h3>
            <p className="text-[0.92rem] text-muted leading-[1.7] mb-3">
              法律 AI 产品的合规底线。免责声明在三个场景展示：审查报告页底部固定展示、PDF 导出首页/页脚、首次使用弹窗确认。内容明确 AI 审查仅供参考，不构成法律意见，不能替代专业律师。
            </p>
            <div className="p-4 bg-ink/5 rounded-md text-[0.88rem] leading-[1.7] text-ink/70 italic">
              本系统提供的审查结果由 AI 模型自动生成，仅供参考，不构成法律意见。审查结果可能存在遗漏或偏差，不能替代专业律师的人工审查。使用者应自行判断审查结果的准确性，并在签署重要合同前咨询专业法律人士。
            </div>
          </div>

          <div className="space-y-12 mt-10">
            {prototypes.map((p, i) => (
              <PrototypeCard key={p.src} {...p} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* CHALLENGES */}
      <Section id="challenges" title="踩坑与解决" eyebrow="07">
        <div className="space-y-8">
          <p>
            做这个项目踩了不少坑，尤其是在法律这种对准确性要求极高的领域，AI 的"幻觉"问题被放大了好几倍。以下是最关键的 6 个问题和对应的解法：
          </p>
          <div className="space-y-8 mt-8">
            {challenges.map((c, i) => (
              <ChallengeCard key={c.problem} {...c} index={i} />
            ))}
          </div>
        </div>
      </Section>


      {/* METRICS */}
      <Section id="metrics" title="运营指标" eyebrow="09">
        <div className="space-y-6">
          <p>以下是本项目的核心运营指标和设计目标：</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {metrics.map((metric) => (
              <div key={metric.label} className="p-5 border border-line rounded-lg text-center bg-ink/5">
                <p className="font-display text-[1.6rem] md:text-[2rem] tracking-tight text-ink mb-2">{metric.value}</p>
                <p className="font-display text-[0.95rem] tracking-tight">{metric.label}</p>
                <p className="text-[0.78rem] text-muted mt-2 leading-[1.5]">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* LEARNED */}
      <Section id="learned" title="复盘总结" eyebrow="10">
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tight">最大教训</h3>
            <p className="text-[1.1rem] leading-[1.8]">
              法律领域对准确率要求极高——<strong>AI 只能"建议"不能"判断"</strong>。最初想做全自动审查，后来发现 AI 的幻觉问题在法律场景下会被无限放大。最终设计为"AI 标记风险 + 人工确认"流程，而不是全自动审查。
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tight">关键认知</h3>
            <div className="space-y-4">
              <Insight
                title="双引擎架构是法律 AI 的最优解"
                desc="纯 AI 不可靠，纯规则太死板。规则引擎处理确定性检查（条款缺失、数字校验），AI 处理语义理解（模糊表述、风险推理），两者交叉验证才是最稳的方案。"
              />
              <Insight
                title="置信度机制比准确率更重要"
                desc={"与其追求 100% 准确率（不可能），不如让每个结论都带上置信度分数。低置信度的结果标注\u201C建议重点关注\u201D，把判断权交给用户。"}
              />
              <Insight
                title="通俗化是产品化的关键"
                desc={"初版报告满屏法条引用，个人用户完全看不懂。改成\u201C这个条款对你有什么影响\u201D的通俗表达后，用户理解度和满意度大幅提升。"}
              />
              <Insight
                title="企业标准比对是差异化竞争力"
                desc={"通用审查工具市场上已有不少，但\u201C跟企业自己的标准比\u201D这个需求几乎没有产品做好。向量语义匹配 + 多级阈值判定，让这个功能成为核心卖点。"}
              />
              <Insight
                title="数据安全是 B 端产品的生死线"
                desc="合同是企业最敏感的数据之一。AES-256 加密存储、API Key 脱敏展示、用户可主动删除数据、审计日志 180 天留存——这些不是锦上添花，是企业客户愿意用你的前提。"
              />
              <Insight
                title="法律免责声明不是走形式"
                desc="AI 法律产品必须在报告页、PDF、首次使用三个场景展示免责声明。这不是法务的执念，是产品的合规底线——用户需要明确知道 AI 只是辅助工具，不能替代专业判断。"
              />
            </div>
          </div>

          <div className="mt-10 p-8 border-l-2 border-ink/30 pl-6">
            <p className="font-display italic text-[1.2rem] md:text-[1.4rem] tracking-tight leading-[1.5] text-ink/80">
              「做合同审查最大的收获是理解了"AI 的边界"——它能帮你发现问题，但不能替你做决定。产品设计的核心不是让 AI 更聪明，而是让用户在 AI 的辅助下做出更好的判断。」
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-wide px-6 md:px-10 py-20 border-t border-line/60">
        <Link to="/vibecoding" className="font-display text-[1.4rem] md:text-[1.8rem] tracking-tightest hover:italic transition-all">
          返回所有 demo
        </Link>
      </section>
    </article>
  )
}

/* ─── Helper Components ─── */

function Section({ id, title, eyebrow, children }: { id?: string; title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-wide px-6 md:px-10 py-14 md:py-20 border-t border-line/60">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-2">
          <p className="font-mono text-[0.78rem] text-muted num">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[1.8rem] md:text-[2.2rem] tracking-tightest leading-none">
            <em>{title}</em>
          </h2>
        </div>
        <div className="md:col-span-10 max-w-[52rem] text-[1.05rem] md:text-[1.1rem] leading-[1.75] text-ink/90">
          {children}
        </div>
      </div>
    </section>
  )
}

function HighlightCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 border border-line rounded-lg hover:border-ink/30 transition-colors">
      <h4 className="font-display text-[1.1rem] tracking-tight mb-2">{title}</h4>
      <p className="text-[0.92rem] text-muted leading-[1.6]">{desc}</p>
    </div>
  )
}

function ArchLayer({ title, items, color, borderColor }: { title: string; items: string[]; color: string; borderColor: string }) {
  return (
    <div className={`p-5 rounded-lg border ${borderColor} bg-gradient-to-br ${color}`}>
      <h4 className="font-display text-[1rem] tracking-tight mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="text-[0.82rem] px-3 py-1.5 bg-ink/5 rounded-md text-ink/80">{item}</span>
        ))}
      </div>
    </div>
  )
}

function ArchArrow() {
  return (
    <div className="flex justify-center py-1">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted/50">
        <path d="M12 5v14M12 19l-5-5M12 19l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function FlowDiagram({ steps }: { steps: { label: string; sub?: string; accent?: boolean }[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[0.8rem] font-mono ${step.accent ? 'bg-ink/20 border border-ink/30 text-ink' : 'bg-ink/10 border border-line text-ink/70'}`}>
              {String(i + 1).padStart(2, '0')}
            </div>
            {i < steps.length - 1 && <div className="w-px h-8 bg-line/60 my-1" />}
          </div>
          <div className="pt-2 pb-4">
            <p className="font-display text-[1rem] text-ink">{step.label}</p>
            {step.sub && <p className="text-[0.85rem] text-muted mt-0.5">{step.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function RiskLevelCard({ level, desc, action }: { level: string; desc: string; action: string }) {
  return (
    <div className="p-5 rounded-lg border border-line bg-ink/5">
      <h4 className="font-display text-[1.1rem] tracking-tight mb-2">{level}</h4>
      <p className="text-[0.92rem] text-muted leading-[1.6] mb-3">{desc}</p>
      <span className="text-[0.82rem] font-mono px-2.5 py-1 rounded-full border border-line">{action}</span>
    </div>
  )
}

function DefenseLayer({ layer, title, items }: { layer: string; title: string; items: string[] }) {
  return (
    <div className="p-6 rounded-lg border border-line/60 bg-ink/5">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[0.78rem] text-muted">{layer}</span>
        <h4 className="font-display text-[1.1rem] tracking-tight">{title}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item} className="pl-4 border-l border-line/50 text-[0.92rem] text-ink/80">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function PrototypeCard({ src, label, desc, index }: { src: string; label: string; desc: string; index: number }) {
  return (
    <div className="reveal">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-mono text-[0.78rem] text-muted num">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="font-display text-[1.3rem] md:text-[1.5rem] tracking-tightest">{label}</h3>
      </div>
      <p className="text-muted leading-[1.7] mb-6 pl-10">{desc}</p>
      <div className="rounded-lg overflow-hidden border border-line hover:border-ink/30 transition-colors">
        <img src={src} alt={label} className="w-full" loading="lazy" />
      </div>
    </div>
  )
}

function ChallengeCard({ problem, detail, solution, index }: { problem: string; detail: string; solution: string; index: number }) {
  return (
    <div className="p-6 md:p-8 border border-line rounded-lg hover:border-ink/20 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        <span className="font-mono text-[0.78rem] text-muted num mt-1">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="font-display text-[1.2rem] md:text-[1.4rem] tracking-tight">{problem}</h3>
      </div>
      <div className="pl-10 space-y-4">
        <div>
          <p className="text-[0.78rem] uppercase tracking-[0.15em] text-muted mb-2 font-mono">问题</p>
          <p className="text-[0.98rem] text-ink/80 leading-[1.7]">{detail}</p>
        </div>
        <div>
          <p className="text-[0.78rem] uppercase tracking-[0.15em] text-muted mb-2 font-mono">解法</p>
          <p className="text-[0.98rem] text-ink/80 leading-[1.7]">{solution}</p>
        </div>
      </div>
    </div>
  )
}

function Insight({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-5 border border-line rounded-lg hover:border-ink/20 transition-colors">
      <h4 className="font-display text-[1.05rem] tracking-tight mb-2">{title}</h4>
      <p className="text-[0.92rem] text-muted leading-[1.7]">{desc}</p>
    </div>
  )
}
