# 超星学习通 AI 学习助手

> 基于 AI 大语言模型的[超星学习通](https://www.chaoxing.com)自动学习与答题油猴脚本。
> 纯 AI 作答，不依赖第三方题库；覆盖视频、文档、章节测验、作业、考试的全流程。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.4.0-blue.svg)](CHANGELOG.md)
[![Platform](https://img.shields.io/badge/platform-Tampermonkey-FF8000.svg)](https://www.tampermonkey.net/)
[![Upstream](https://img.shields.io/badge/upstream-March--OwO-lightgrey.svg)](https://github.com/March-OwO/Xuexitong-LLM-Assistant)
[![Powered by DeepSeek](https://img.shields.io/badge/AI%20powered%20by-DeepSeek-4D6BFE.svg)](https://www.deepseek.com)

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
| 视频 | 静音播放至完成；**倍速可调可关**（1~16）、**后台/小窗不暂停**；播放器夹倍速到上限时日志会打印实际生效值 |
| 音频 | 静音播放至结束 |
| PPT / 文档 | 自动滚动到底 |
| 章节测验 | AI 答题 + 自动提交（含「未做完」弹层处理） |
| 作业 / 考试 | AI 答题 + 覆盖率安全检查 |

### 后台 / 小窗不暂停

学习通的播放器监听 `visibilitychange` 与 `blur`，页面一失焦就 `pause()`。所以「切标签页、
最小化、开画中画」都会中断 —— 这跟窗口尺寸无关，是失焦事件触发的。

脚本从三层抵消：

| 层 | 做法 | 作用 |
|---|---|---|
| ① | `Object.defineProperty` 伪装 `document.hidden` / `visibilityState` / `hasFocus()` | **主防线**：监听器就算触发，读到的也是「可见」，不会执行暂停 |
| ② | 捕获阶段 `stopImmediatePropagation` 拦截 `visibilitychange` / `blur` / `pagehide` | 补充：拦住脚本注入之后注册的监听器 |
| ③ | 用 `video` 的 `timeupdate` 事件驱动恢复播放 | 兜底：真被暂停了也立刻拉回来 |

第 ③ 层是关键。纯靠 `setInterval` 轮询的话，后台标签页的定时器会被 Chrome 节流到
**1 次/分钟**，真被暂停了要等一分钟才恢复；而 `timeupdate` 由媒体解码驱动，后台仍按
约 4Hz 触发，不受定时器节流影响。

配置项 `后台保持播放` 可随时关闭（默认开启）。

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

**全部功能收在一个自绘面板里**，不再依赖 Element Plus 的 `el-dialog`。

原脚本把「运行框」和「配置」做成两个独立弹窗，由 Vue 组件的 `dialogVisible` / `dialogV` 控制，
位置和层级都不受控，而且 `dialogVisible` 初始就是 `true` —— 一进页面就弹窗。2.3.0 起改为：

- **一个可拖面板，五个 tab**：

  | tab | 内容 |
  |---|---|
  | 运行 | 任务名、状态、题目数、当前题目 |
  | 日志 | 运行日志，实时跟随滚动 |
  | 配置 | 全部配置项（接口 / 章节 / 考试 / 其他），直接读写 GM 存储 |
  | 工具 | 诊断 / 抓现场 / 导出日志 / 清空缓存 |
  | 声明 | 免责声明、构建号、仓库链接 |

- **入口只有一个 FAB**：点一下开合面板，不用再从菜单里挑
- **原 `el-dialog` 全部隐藏**：按标题识别后对整个 overlay 设 `display:none`，
  只保留它们的数据层（`askStore`、`getConfig` 仍在用）
- **配置直接写 `GM_setValue("config", …)`**，绕开 Vue 的 `forminput`，
  字段清单在前端硬编码，不依赖原组件的渲染逻辑

视觉按 **Material Design 3**：tonal 色板（`#0061A4` 主色）、16/28px 圆角、
三级 elevation 阴影、标准缓动 `cubic-bezier(.2,0,0,1)`，跟随系统深色模式。

几个刻意做对的地方：

- **诊断不清日志**：只插一行分隔符，保留已有记录；跑完自动切到「日志」tab
- **清缓存要确认**：第一次点击变成「再点一次确认」，2 秒内再点才执行
- **面板位置记忆**：拖动后写入 `GM_setValue("uiPanelPos")`，下次打开回到原处
- **状态异常时 FAB 亮红点**：状态里出现「失败 / 错误 / 异常」才提示

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
| 后台保持播放 | ❌ | 默认开。切标签页 / 最小化 / 画中画时不暂停 |
| 考试自动切换 | ❌ | 考试页逐题自动翻页 |

> 未出现在面板上的（如 `keepLog` 日志条数上限）可用 Tampermonkey 的 `GM_setValue` 手工改。

---

## 排查

### 先点「诊断」

结果写进「运行日志」标签页，能看到：

```
构建: 2.0.0-20261102e
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

**以上都试过仍有问题？** 提 [Issue](https://github.com/Phiedeir/Xuexitong-LLM-Assistant/issues) 时附上两样东西，能省掉好几个来回：

1. 点「诊断」后的完整输出
2. 点「抓现场」导出的 DOM 快照（题干文字可以抹掉，我只需要结构）

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
git add -A && git commit -m "chore(release): v2.0.1" && git tag v2.0.1

# 4. 推送
git push origin main --tags
```

### 版本号体系

**本分支从 `2.0.0` 起使用独立版本序列**，不再跟随上游 March-OwO 的 `1.x`。

理由：上游停在 `1.2.9`，而本分支在其上做了大量重构（推理模型适配、诊断面板、结构化输出）。
继续沿用 `1.2.x` 会让人误以为只是上游的小补丁，也无法判断「我的版本是上游的还是 forks 的」。
`@version` 跳到 `2.x` 后，一眼就能区分：

| `@version` 范围 | 含义 |
|---|---|
| `1.2.9` 及以下 | 上游 March-OwO 原版 |
| `2.x` | Phiedeir 自维护分支（本仓库） |

版本号分级：

| 位 | 什么时候动 | 例子 |
|---|---|---|
| **主版本** | 配置格式变了、答题流程重写、版本体系调整 | `2.0.0 → 3.0.0` |
| **次版本** | 新增功能 | `2.0.0 → 2.1.0` |
| **修订号** | 修 bug、调参、改选择器、改提示词 | `2.0.0 → 2.0.1` |

Tampermonkey 靠 `@version` 判断更新，必须严格递增。`bump.mjs` 会拒绝降级。
`CX_BUILD`（形如 `2.0.0-20261102e`）写在日志首行与「声明」面板，用于区分同版本号的不同构建。

---

## 隐私

- **API Key 只存在你浏览器本地**（`GM_setValue`），不上传任何第三方
- 不收集、不上传学习账号信息
- 所有网络请求只指向你配置的 AI 端点，全程 HTTPS
- 代码完全开源，可自行审计，无广告无追踪

---

## 致谢

| 角色 | 对象 |
|---|---|
| **原始脚本** | [March-OwO/Xuexitong-LLM-Assistant](https://github.com/March-OwO/Xuexitong-LLM-Assistant)，本仓库基于其 `1.2.9` 继续维护 |
| **AI 能力** | [DeepSeek](https://www.deepseek.com) —— 默认接入 `deepseek-chat`；同时兼容任何 OpenAI 协议端点，可自行替换 |
| **前端依赖** | [Vue 3](https://vuejs.org/)、[Element Plus](https://element-plus.org/)、[Pinia](https://pinia.vuejs.org/)、[jQuery](https://jquery.com/)、[Typr](https://github.com/photopea/Typr.js)（字体解析）、[blueimp-md5](https://github.com/blueimp/JavaScript-MD5) |
| **字体映射表** | [forestpolice.org](https://www.forestpolice.org/ttf/2.0/table.json)，用于还原学习通 `font-cxsecret` 混淆字体 |

> 本项目代码由 [Phiedeir](https://github.com/Phiedeir) 维护。GitHub 的 `Contributors` 面板只统计**个人账号**，
> DeepSeek 是组织账号（`deepseek`，type=Organization），无法列在那里，故以本节与顶部徽章标注。

---

## 免责声明

1. 本脚本仅供**个人学习辅助与技术研究**使用，请遵守所在学校 / 机构的相关规定。
2. 使用本脚本产生的任何学习记录、成绩或后果，由使用者自行承担。
3. 作者不对因使用本脚本导致的账号风险、成绩问题或纠纷负责。
4. 请合理使用，勿用于违背学术诚信的场合。
