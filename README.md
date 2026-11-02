# 超星学习通 AI 学习助手

> 基于 AI 大语言模型的[超星学习通](https://www.chaoxing.com)自动学习与答题油猴脚本。
> 纯 AI 作答，不依赖第三方题库；覆盖视频、文档、章节测验、作业、考试的全流程。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.2.13-blue.svg)](CHANGELOG.md)
[![Platform](https://img.shields.io/badge/platform-Tampermonkey-FF8000.svg)](https://www.tampermonkey.net/)
[![Upstream](https://img.shields.io/badge/upstream-March--OwO-lightgrey.svg)](https://github.com/March-OwO/Xuexitong-LLM-Assistant)

> **本仓库是 [March-OwO/Xuexitong-LLM-Assistant](https://github.com/March-OwO/Xuexitong-LLM-Assistant) 的自维护分支**，
> 基于上游 `1.2.9` 继续迭代。重点解决两件事：
> ① **推理模型接入**（gpt-5/6 系、o 系、DeepSeek-R 等会先写思维链的模型）；
> ② **可诊断性**（平台禁用 F12 后，如何看清「为什么没答出来」）。
> 完整改动见 [CHANGELOG.md](CHANGELOG.md)。

---

## 安装

### 一键安装

**→ [点击安装脚本](https://raw.githubusercontent.com/Phiedeir/Xuexitong-LLM-Assistant/main/chaoxing-ai-llm.user.js) ←**

Tampermonkey 会直接弹出安装页，点「安装」即可。

### 前置：Tampermonkey

| 浏览器 | 安装方式 |
|---|---|
| Chrome / Edge / 360 极速 / 百分 | [Chrome 应用商店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Firefox | [Firefox Add-ons](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/) |
| 应用商店不可用 | [Tampermonkey 官网](https://www.tampermonkey.net/) 下载对应版本 |

装完记得在浏览器「扩展 → 篡改猴 → 详细信息」里打开 **允许用户脚本** 和 **网站访问权限：在所有网站上**。这两项没开，脚本装了也不会执行。

### 手动安装

下载 [`chaoxing-ai-llm.user.js`](chaoxing-ai-llm.user.js)，拖进 Tampermonkey 管理面板，确认安装。

### 首次配置

1. 进入任意**章节学习页**（URL 含 `/studentstudy`），右下角出现蓝色毛玻璃 **AI** 按钮
2. 点它 → 「打开配置」→ 填入 **API Key**
3. 保存后刷新页面

只填 Key 就能用（默认走 DeepSeek 官方接口 + `deepseek-chat`）。换模型见[支持的模型](#支持的模型)。

---

## 更新

脚本内已声明 `@updateURL` / `@downloadURL`：

```
https://raw.githubusercontent.com/Phiedeir/Xuexitong-LLM-Assistant/main/chaoxing-ai-llm.user.js
```

装过一次之后，Tampermonkey 会自己检测新版本并提示更新，不用再手动拖文件。

> 国内 `raw.githubusercontent.com` 偶尔不稳定。手动更新可用镜像：
> `https://cdn.jsdelivr.net/gh/Phiedeir/Xuexitong-LLM-Assistant@main/chaoxing-ai-llm.user.js`
> 但镜像有 CDN 缓存延迟，自动更新仍以 raw 为准。

---

## 功能

### AI 答题

支持单选题、多选题、判断题、填空题、简答题、名词解释、论述题、计算题。

- 每题独立调用，带重试（`429` / `5xx` 指数退避，`401` / `403` 直接报错不重试）
- 答案本地缓存：同题库不同章节重复出现时不重复计费
- 按题型分配输出预算：单选/判断 24 token、多选 48、填空 240、简答 480

### 全自动任务点

| 任务类型 | 行为 |
|---|---|
| 视频 | 静音播放至完成；**倍速可调可关**（1~16），播放器夹到上限时日志会打印实际生效值 |
| 音频 | 静音播放至结束 |
| PPT / 文档 | 自动滚动到底 |
| 章节测验 | AI 答题 + 自动提交（含「未做完」弹层处理） |
| 作业 / 考试 | AI 答题 + 覆盖率安全检查 |

### 推理模型适配

`gpt-5.x / 6.x`、`o1-o9` 等推理模型默认先写一大段分析再给答案，`content` 常被 `max_completion_tokens`
从中间截断，表现为「答案明明有却填不进去」。脚本按命中率依次探测六种关闭参数，被拒的记入黑名单不再重试：

| 参数 | 适用的后端 |
|---|---|
| `reasoning_effort: "none"` | OpenAI gpt-5.1 / 6 系 |
| `chat_template_kwargs: { enable_thinking: false }` | vLLM / Qwen 系自建（返回 `reasoning_content` 的基本都认这条） |
| `enable_thinking: false` | 部分中转站的顶层简写 |
| `thinking: { type: "disabled" }` | Anthropic 兼容层 |
| `reasoning_effort: "minimal"` / `"low"` | 兜底压缩思考长度 |

同时自动处理两类模型差异：

- `max_tokens` 与 `max_completion_tokens` 互换
- `temperature` 在推理模型上只接受默认值，非 1 时自动剥离

### 结构化输出

选题类题目要求模型只输出一行 `答案：B. 3月14日`，脚本同时拿到**字母**和**选项原文**：

- 原文用于核对 —— 防止选项顺序错位导致填错
- 字母用于兜底 —— 原文有全角/标点/空格差异时

分析文字一律不参与选项匹配。

### 页面内诊断（不用 F12）

学习通有反调试（`keydown` 拦截 + devtools 检测后循环 `debugger`），F12 一开页面就卡住。
脚本在 AI 按钮上方注入一排悬浮按钮：

| 按钮 | 作用 |
|---|---|
| **诊断** | 端点、模型名、`/v1/models` 可用模型列表、参数阶梯逐级结果、被拒变体 |
| **复制日志** | 导出运行日志（最多 300 条），剪贴板不可用时弹文本框 |
| **抓现场** | 导出当前题目的 DOM 结构（`li` 结构、`#answer<qid>`、`qid`、`.choice<qid>`） |
| **清缓存** | 清空本地答案缓存 |
| **日志面板** | 打开 / 收起主面板 |

控制台可用时也保留同名全局函数：`__cxDiag()`、`__cxSnap()`、`__cxCacheStat()`、`__cxClearCache()`。

### 界面

- 右下角毛玻璃圆形 **AI** 按钮，点击显隐悬浮窗
- 运行框实时显示当前题目、AI 原话、填入的选项
- 接口返回区显示每题输入 / 输出 Token（服务商不返回 usage 时按字符估算并标注）

---

## 支持的模型

默认 **DeepSeek**，任何兼容 `/v1/chat/completions` 的服务都能用。

| 服务 | API 地址 | 模型名示例 |
|---|---|---|
| DeepSeek | 留空即可 | `deepseek-chat` |
| 智谱 GLM | `https://open.bigmodel.cn/api/paas/v4` | `glm-4-flash` |
| 硅基流动 | `https://api.siliconflow.cn/v1` | `deepseek-ai/DeepSeek-V3` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| 豆包 | `https://ark.cn-beijing.volces.com/api/v3` | 你的 Endpoint ID |
| 自建 / 中转站 | 你的地址 | 服务商文档里的准确 ID |

> **API 地址可以偷懒**：只填域名或只到 `/v1`，脚本会自动补全 `/v1/chat/completions`。
> **模型名必须准确**：这是 400 错误最常见的来源。不确定就先点「诊断」，它会列出该服务商的可用模型。

---

## 配置项

| 配置项 | 必填 | 说明 |
|---|---|---|
| API Key | ✅ | 服务商提供的访问密钥 |
| API 地址 | ❌ | 留空 = DeepSeek；支持只填域名，自动补全路径 |
| 模型名称 | ❌ | 留空 = `deepseek-chat` |
| 自动答题 / 自动视频 / 自动切换 / 自动提交 | ❌ | 任务开关，默认全开 |
| 答题间隔(秒) | ❌ | 每题等待，支持小数（下限 0.1）。`1~2` 稳，`0.3~0.5` 快 |
| 任务间隔(秒) | ❌ | 任务点之间等待 |
| 视频倍速开关 / 视频倍速 | ❌ | 关掉按 1.0 原速；倍速 1~16 |
| 视频静音 | ❌ | 默认开，避免自动播放被浏览器拦截 |
| 考试自动切换 | ❌ | 考试页逐题自动翻页 |

> 未出现在面板上的（如 `keepLog` 日志条数上限）可用 Tampermonkey 的 `GM_setValue` 手工改。

---

## 排查

### 先点「诊断」

结果写进「运行日志」标签页，能看到：

```
构建: 1.2.12-20261102c
API地址: https://xxx.com/v1/chat/completions
模型: gpt-6.1-sol | 推理模型判定: true
Key: 已填 51 位，前缀 sk-xxxx…
→ GET …/models 列可用模型…
该服务商可用模型（7 个）：…
✓ 模型名在列表中
→ 逐级试探参数阶梯…
✓ chat2 [model,stream,messages,max_completion_tokens,chat_template_kwargs] 通过
```

### 常见症状对照

| 现象 | 日志关键词 | 原因 | 处理 |
|---|---|---|---|
| 一直「暂无答案」，Token 为 0 | `HTTP 400` / `Model Not Exist` | 模型名不对 | 诊断里比对模型列表 |
| 一直「暂无答案」，Token 不为 0 | `CONTENT_EMPTY` | 只写了思维链，`content` 被截断 | 换能生效的关思维链参数，或换非推理模型 |
| 同上 | `CONTENT_ANALYSIS` | 中转站把分析写进了 `content` | 同上；脚本会先尝试从分析里抠答案 |
| 答完显示「暂无答案」 | `三种匹配都没命中任何选项` | 选项没抓到，或 AI 文本对不上 | 「抓现场」看 `li .after` 计数 |
| 提交后 `❌ 0.0 分` | 该题 `_fillError` | **空白卷**，答案没写进页面 | 「抓现场」看 `#answer<qid>` 是否为空 |
| `status=0` | `XHR_BLOCKED` | `@connect` 没放行 | 篡改猴 → 本脚本 → 设置 → 用户域白名单 加 `*` |
| `401` / `403` | `AUTH_401` | Key 错 / 含空格 / 无权限 | 重新粘贴 Key |

### 其他

**脚本装了不执行？** 浏览器「扩展 → 篡改猴 → 详细信息」，打开「允许用户脚本」和「在所有网站上」。

**看不到 AI 按钮？** 只在这三个页面出现：章节学习页（`/studentstudy`）、作业页（`/dowork`）、考试页。

**依赖库加载失败？** 脚本依赖 `cdn.staticfile.org` 上的 Vue / ElementPlus / jQuery，该 CDN 不通会导致脚本整体不运行。

---

## 开发与发版

```
├─ chaoxing-ai-llm.user.js   # 唯一产物
├─ scripts/bump.mjs          # 版本号 + CHANGELOG 自动递增
├─ CHANGELOG.md
└─ .gitattributes            # 统一 LF
```

```bash
# 1. 改完代码，跑一次 bump（同时改 @version、CX_BUILD、CHANGELOG.md）
node scripts/bump.mjs patch "这次修了什么"

# 2. 语法自检（必须 EXIT=0）
node --check chaoxing-ai-llm.user.js

# 3. 提交并打 tag
git add -A && git commit -m "chore(release): v1.2.13" && git tag v1.2.13

# 4. 推送
git push origin main --tags
```

版本号规则：

| 位 | 什么时候动 | 例子 |
|---|---|---|
| **主版本** | 配置格式变了、答题流程重写 | `1.2.x → 2.0.0` |
| **次版本** | 新增功能 | `1.2.x → 1.3.0` |
| **修订号** | 修 bug、调参、改选择器、改提示词 | `1.2.12 → 1.2.13` |

Tampermonkey 靠 `@version` 判断更新，必须严格递增。`bump.mjs` 会拒绝降级。
`CX_BUILD`（形如 `1.2.12-20261102c`）写在日志首行，用于区分同版本号的不同构建。

---

## 隐私

- **API Key 只存在你浏览器本地**（`GM_setValue`），不上传任何第三方
- 不收集、不上传学习账号信息
- 所有网络请求只指向你配置的 AI 端点，全程 HTTPS
- 代码完全开源，可自行审计，无广告无追踪

---

## 免责声明

1. 本脚本仅供**个人学习辅助与技术研究**使用，请遵守所在学校 / 机构的相关规定。
2. 使用本脚本产生的任何学习记录、成绩或后果，由使用者自行承担。
3. 作者不对因使用本脚本导致的账号风险、成绩问题或纠纷负责。
4. 请合理使用，勿用于违背学术诚信的场合。
