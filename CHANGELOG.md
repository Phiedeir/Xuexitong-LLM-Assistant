# Changelog

本项目所有值得记录的改动。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 `主.次.修订`。

版本号规则（Tampermonkey 靠它判断更新，必须严格递增）：

| 位 | 什么时候动 | 例子 |
|---|---|---|
| **主版本** | 配置格式变了、答题流程重写、不兼容旧设置 | `1.2.x → 2.0.0` |
| **次版本** | 新增功能：新按钮、新配置项、新的模型适配 | `1.2.x → 1.3.0` |
| **修订号** | 修 bug、调参数、改提示词、改选择器 | `1.2.10 → 1.2.11` |

每次发版用 `node scripts/bump.mjs <patch|minor|major> "摘要"` 自动完成，
它会同时改 `@version`、`CX_BUILD` 和本文件。

---

## [1.2.13] - 2026-11-02

- 重写 README，补齐 @homepageURL/@supportURL，声明面板显示构建号
- build: `1.2.13-20261102c`

## [1.2.12] - 2026-11-02

- add @updateURL/@downloadURL for Tampermonkey auto-update
- build: `1.2.12-20261102b`

## [1.2.11] - 2026-11-02

### 新增

- **页面内诊断面板**（免 F12）：右侧悬浮「诊断 / 复制日志 / 抓现场 / 清缓存 / 日志面板」五个按钮
- **抓现场快照**：一键导出当前题目的 DOM 结构（`.TiMu` 计数、`li` 结构、`#answer<qid>` 值、`qid`、`.choice<qid>`、`answertype`、HTML 片段）
- **关闭思维链**：六种参数变体按命中率排序探测 —— `reasoning_effort:none`、`chat_template_kwargs.enable_thinking:false`、`enable_thinking:false`、`thinking:{type:disabled}`、`effort:minimal`、`effort:low`；被拒的记入 `BAD_VARIANT`，后续跳过
- **结构化输出协议**：约定模型只输出一行 `答案：B. 3月14日`，脚本同时拿到字母与选项原文，原文核对 + 字母兜底
- **视频倍速可调可关**：新增 `videoRate`（1~16）、`videoRateOn`、`videoMute` 三项配置；实时回读播放器实际生效倍速，并在巡检中持续校正
- **答题间隔可调**：配置页新增「答题间隔(秒)」「任务间隔(秒)」，支持小数（下限 0.1），保存后当章立即生效
- **日志上限提升**：20 → 300 条（`keepLog` 可配 20~2000）
- **答案本地缓存**：以「题型+题干+选项」为键，命中即返回，0 token；上限 3000 条，按时间淘汰
- **按题型分配 token 预算**：单选/判断 24、多选 48、填空 240、简答 480

### 修复

- **`pickContent` 把思维链当答案**：旧实现 `if (!s && m.reasoning_content) s = ...` 直接返回 `reasoning_content`，导致 `matchAnswer` 拿一段分析去和选项比对；现在标记为 `reasoning-only`，绝不返回
- **`content` 装的是分析文本**：部分中转站把 reasoning 塞进 `content`，新增 `CONTENT_ANALYSIS` 识别（开头 `我们/让我/首先/题目/分析/需要/思考…` 且长度 >40），抠不到答案就降级重试
- **`matchAnswer` 要求逐字相等**：改为三层匹配 —— 逐字 → 归一化（去空白/标点、全角转半角）→ 包含（唯一命中才采信）
- **字母抽取误判**：旧 `/[A-Da-d]/` 会把 `Archimedes` 的 A 当成答案；改为「显式标记 → 整段即字母 → 独立成词单字母」三级
- **推理模型参数 400**：`max_tokens` 改 `max_completion_tokens`，`temperature:0.1` 在推理模型上自动剥离
- **失败无原因**：`fillAnswer` 失败时写入 `_fillError`（区分「选项没抓到」「选项对不上」「写入页面失败」）
- **`homework()` 正常路径不 resolve**：外层 `await` 永久挂住
- **`exam()` 解析失败空指针**、**`pdf()` 无 `#panView` 时抛错打断任务点循环**
- **`clearCurrent` 在 `UE` 缺失时抛异常**
- **选项提取只认 `li .after`**：改为 `.after → .num_option → 裸 li`（并去掉 `A.` 前缀）
- **Token 显示全 0**：中转站不返回 `usage` 时按字符数估算并标注「估算」
- **`getConfig()` 缺键**：改为逐键合并默认值，旧配置不再掉回死默认值
- **`GM_setValue` 吃 Vue proxy**：改为先 `JSON.parse(JSON.stringify())`
- **字体解码性能**：从固定遍历 20902 个码位改为只算页面实际出现的字符（通常几十个），并改字符级替换

### 变更

- `@connect` 精简为 `api.deepseek.com` + `*`
- 版本标识：`CX_BUILD = "1.2.11-20261102a"`，日志首行可核对当前实际运行的构建

### 已知限制

- 页面源码里写死的 `debugger` 断点无法从 JS 层移除（devtools 需手动 Deactivate breakpoints）；由 `Function` 构造注入的断点已被过滤
- 中转站若把 `reasoning_content` 原样塞进 `content` 且截断，脚本只能尽量抽取，抽取失败时如实报错

---

## [1.2.10] - 2026-11-01

### 新增

- 推理模型参数阶梯（`max_tokens` ↔ `max_completion_tokens`、`temperature` 自动剥离）
- `/v1/responses` 端点兜底
- `__cxDiag()` 自检：列 `/v1/models` 可用模型名、逐级试探参数、报告被拒变体
- 失败原因上屏（题目下方 + 运行日志）

### 修复

- 400 被静默吞成空答案，面板只显示「暂无答案」
- `apiModel` 默认值指向不存在的模型名

---

## [1.2.9] - 基线

上游 March-OwO 的初始版本，仅支持 DeepSeek 系接口。
