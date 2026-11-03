// ==UserScript==
// @name         学习通AI学习助手
// @namespace    https://github.com/Phiedeir/Xuexitong-LLM-Assistant
// @version      2.4.0
// @author       Phiedeir（基于 March-OwO 的 1.2.9 维护）
// @description  学习通AI答题助手：全题型 AI 作答、任务点自动跳转、视频文档全自动。支持任意 OpenAI 兼容端点，自动适配推理模型（gpt-5/6 系、o 系），内置免 F12 诊断面板。
// @homepageURL  https://github.com/Phiedeir/Xuexitong-LLM-Assistant
// @supportURL   https://github.com/Phiedeir/Xuexitong-LLM-Assistant
// @updateURL    https://raw.githubusercontent.com/Phiedeir/Xuexitong-LLM-Assistant/main/chaoxing-ai-llm.user.js
// @downloadURL  https://raw.githubusercontent.com/Phiedeir/Xuexitong-LLM-Assistant/main/chaoxing-ai-llm.user.js
// @match        *://*.chaoxing.com/*
// @match        *://*.edu.cn/*
// @match        *://*.nbdlib.cn/*
// @match        *://*.hnsyu.net/*
// @match        *://*.gdhkmooc.com/*
// @require      https://cdn.staticfile.org/vue/3.3.4/vue.global.prod.js
// @require      https://cdn.staticfile.org/vue-demi/0.14.0/index.iife.min.js
// @require      https://cdn.staticfile.org/element-plus-icons-vue/2.1.0/global.iife.min.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://cdn.staticfile.org/pinia/2.1.6/pinia.iife.prod.js
// @require      https://cdn.staticfile.org/element-plus/2.3.12/index.full.min.js
// @require      https://cdn.staticfile.org/blueimp-md5/2.19.0/js/md5.min.js
// @require      https://cdn.staticfile.org/jquery/3.7.1/jquery.min.js
// @resource     element-plus  https://cdn.staticfile.org/element-plus/2.3.12/index.css
// @resource     ttf           https://www.forestpolice.org/ttf/2.0/table.json
// @connect      api.deepseek.com
// @connect      *
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const i=document.createElement("style");i.textContent=t,document.head.append(i)})(" .dialog-footer button[data-v-6ed29f7f]:first-child{margin-right:10px}#csbutton[data-v-6ed29f7f]{position:fixed;bottom:20px;right:20px;z-index:99999;width:44px;height:44px;background:rgba(64,158,255,0.25)!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(64,158,255,0.4)!important;border-radius:50%!important;color:#fff!important;box-shadow:0 4px 16px rgba(64,158,255,0.2);transition:all .3s;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;overflow:hidden}#csbutton[data-v-6ed29f7f]:hover{background:rgba(64,158,255,0.4)!important;box-shadow:0 6px 22px rgba(64,158,255,0.35);transform:scale(1.06)}#csbutton[data-v-6ed29f7f] svg,#csbutton[data-v-6ed29f7f] i,#csbutton[data-v-6ed29f7f] span{display:none!important}#csbutton[data-v-6ed29f7f]::after{content:'AI';font-weight:700;font-size:16px;font-family:-apple-system,sans-serif;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}#zeokdjg[data-v-c3c6b09f]{position:fixed;left:10px;bottom:50vh;z-index:9999}.question_btn[data-v-c3c6b09f]{width:40px;height:40px;border-radius:5px;margin:5px}.question_div[data-v-c3c6b09f]{height:200px}.question_ti[data-v-c3c6b09f]{margin:10px 0 20px}.cx_log[data-v-c3c6b09f]{margin:2px 0}.status_log[data-v-c3c6b09f]{margin-top:10px}.dialog-footer button[data-v-c3c6b09f]:first-child{margin-right:10px}#csbutton[data-v-c3c6b09f]{position:fixed;bottom:20px;right:20px;z-index:99999;width:44px;height:44px;background:rgba(64,158,255,0.25)!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(64,158,255,0.4)!important;border-radius:50%!important;color:#fff!important;box-shadow:0 4px 16px rgba(64,158,255,0.2);transition:all .3s;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;overflow:hidden}#csbutton[data-v-c3c6b09f]:hover{background:rgba(64,158,255,0.4)!important;box-shadow:0 6px 22px rgba(64,158,255,0.35);transform:scale(1.06)}#csbutton[data-v-c3c6b09f] svg,#csbutton[data-v-c3c6b09f] i,#csbutton[data-v-c3c6b09f] span{display:none!important}#csbutton[data-v-c3c6b09f]::after{content:'AI';font-weight:700;font-size:16px;font-family:-apple-system,sans-serif;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.el-empty__image{display:none}.el-empty::before{content:'';display:block;width:32px;height:32px;margin:0 auto 8px;border:2px solid rgba(64,158,255,0.3);border-top-color:rgba(64,158,255,0.6);border-radius:50%;animation:cx-spin 1.5s linear infinite}@keyframes cx-spin{to{transform:rotate(360deg)}}.demo-tabs .el-tabs__nav-wrap::after{display:none}.demo-tabs .el-tabs__nav{display:flex!important;justify-content:space-evenly}.demo-tabs .el-tabs__item{flex:1;text-align:center;padding:0 8px!important}.el-button--primary{--el-button-hover-bg-color:var(--el-color-primary)!important;--el-button-hover-border-color:var(--el-color-primary)!important;--el-button-hover-text-color:#fff!important}.el-button.el-button--primary:hover,.el-button.el-button--primary:focus,.el-button.el-button--primary:active{background-color:var(--el-color-primary)!important;border-color:var(--el-color-primary)!important;color:#fff!important;box-shadow:none!important;transition:none!important}.el-dialog,#zeokdjg{user-select:none;-webkit-user-select:none} ");

(async function (vue, pinia$1, ElementPlus, md5, $$1) {
  'use strict';

  // ══════════════════════════════════════════════════════════════════════
  // v1.2.x：平台把 F12 禁掉了（keydown 拦截 + devtools 检测后 debugger 死循环，
  //   一开控制台整个页面就停住）。这里做三件事：
  //   ① 在 window 捕获阶段抢在页面的 keydown 监听之前放行开发者工具快捷键
  //   ② 包一层 Function 构造，把「注入型 debugger」抹掉（源码内写死的断点管不到）
  //   ③ 页面内诊断面板：日志和自检结果直接渲染成页面元素，全程不需要 F12
  // ══════════════════════════════════════════════════════════════════════
  (function unlockDevtools() {
    try {
      const W = _unsafeWindow;
      const isDevKey = (e) => {
        const k = String(e.key || "");
        if (k === "F12" || e.keyCode === 123) return true;
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && /^[IJCijc]$/.test(k)) return true;
        if ((e.ctrlKey || e.metaKey) && /^[uU]$/.test(k)) return true;
        return false;
      };
      const swallow = (e) => { try { if (isDevKey(e)) e.stopImmediatePropagation(); } catch (err) {} };
      ["keydown", "keyup", "keypress"].forEach((t) => {
        try { W.addEventListener(t, swallow, true); } catch (e) {}
        try { document.addEventListener(t, swallow, true); } catch (e) {}
      });
      try {
        const OrigFunction = W.Function;
        const sanitize = (code) => String(code).replace(/\bdebugger\b\s*;?/g, "void 0;");
        const Patched = function () {
          const args = Array.prototype.slice.call(arguments);
          if (args.length) args[args.length - 1] = sanitize(args[args.length - 1]);
          return OrigFunction.apply(this, args);
        };
        Patched.prototype = OrigFunction.prototype;
        try { Object.defineProperty(Patched, "name", { value: "Function", configurable: true }); } catch (e) {}
        try { W.Function = Patched; } catch (e) {}
        try { Object.defineProperty(OrigFunction.prototype, "constructor", { value: Patched, writable: true, configurable: true }); } catch (e) {}
      } catch (e) {}
      try { W.document.oncontextmenu = null; W.document.onselectstart = null; W.document.oncopy = null; } catch (e) {}
    } catch (e) {}
  })();

  const CX_BUILD = "2.4.0-20261103d";

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  ((e) => {
    const t = GM_getResourceText(e);
    GM_addStyle(t);
  })("element-plus");
  var _GM_getResourceText = (() => "undefined" != typeof GM_getResourceText ? GM_getResourceText : void 0)(), _GM_getValue = (() => "undefined" != typeof GM_getValue ? GM_getValue : void 0)(), _GM_info = (() => "undefined" != typeof GM_info ? GM_info : void 0)(), _GM_setValue = (() => "undefined" != typeof GM_setValue ? GM_setValue : void 0)(), _GM_xmlhttpRequest = (() => "undefined" != typeof GM_xmlhttpRequest ? GM_xmlhttpRequest : void 0)(), _unsafeWindow = (() => "undefined" != typeof unsafeWindow ? unsafeWindow : void 0)();

  // ══════════════════════════════════════════════════════════════════════
  // 配置层（v1.2.x 修复：键合并）
  //   旧实现 `_GM_getValue("config") || defaultConfig$1` 不做合并——
  //   只要存过一份早期版本配置，后来新增的键就永远是 undefined，
  //   aiModel 缺键 → 掉回默认值 → 必然 400。这里逐键合并默认值。
  // ══════════════════════════════════════════════════════════════════════
  const defaultConfig$1 = {
    debugger: false,
    autoAnswer: true,
    autoVideo: true,
    autoJump: true,
    autoSubmit: true,
    thtoken: "",
    aiApiUrl: "",
    aiModel: "",
    interval: 5,
    answerInterval: 5,
    autoExam: true,
    videoRate: 16,
    videoRateOn: true,
    videoMute: true,
    videoKeepAlive: true,
    keepLog: 300
  };

  const getConfig = () => {
    const saved = _GM_getValue("config");
    const cfg = {};
    for (const k in defaultConfig$1) cfg[k] = defaultConfig$1[k];
    if (saved && typeof saved === "object") {
      for (const k in saved) {
        if (!Object.prototype.hasOwnProperty.call(saved, k)) continue;
        const v = saved[k];
        // 空串视为「没填」→ 保留默认；false / 0 / 数组照常覆盖
        if (v !== undefined && v !== null && v !== "") cfg[k] = v;
      }
    }
    return cfg;
  };

  // 端点规范化：把「只填域名」「只填到 /v1」都收敛成完整 chat/completions
  const normalizeApiUrl = (u) => {
    let s = String(u || "").trim().replace(/\s+/g, "").replace(/\/+$/, "");
    if (!s) return "https://api.deepseek.com/v1/chat/completions";
    if (/\/chat\/completions$/i.test(s)) return s;
    if (/\/responses$/i.test(s)) return s;
    if (/\/v1$/i.test(s)) return s + "/chat/completions";
    if (/^https?:\/\/[^/]+$/i.test(s)) return s + "/v1/chat/completions";
    return s;
  };

  const userConfig = [{
    name: "base",
    label: "接口配置",
    config: [
      { name: "thtoken", label: "API Key", type: "input", value: defaultConfig$1.thtoken, desc: "保存在本地，不会泄露" },
      { name: "aiApiUrl", label: "API地址", type: "input", value: defaultConfig$1.aiApiUrl, desc: "留空=DeepSeek。只填域名或只到 /v1 会自动补 /v1/chat/completions。支持任意中转站——本脚本已声明 @connect *，首次请求新域名请在篡改猴弹框点『始终允许所有域』" },
      { name: "aiModel", label: "模型名称", type: "input", value: defaultConfig$1.aiModel, desc: "必须填服务商文档里的准确模型 ID。留空默认 deepseek-chat。gpt-5/6 系、o 系等推理模型会自动改用 max_completion_tokens 并去掉 temperature" }
    ]
  }, {
    name: "chapter",
    label: "章节配置",
    config: [
      { name: "autoAnswer", label: "自动答题", type: "switch", value: defaultConfig$1.autoAnswer, desc: "开启后，会自动答题" },
      { name: "autoVideo", label: "自动视频", type: "switch", value: defaultConfig$1.autoVideo, desc: "开启后，会自动观看视频" },
      { name: "autoJump", label: "自动切换", type: "switch", value: defaultConfig$1.autoJump, desc: "开启后，会自动切换章节" },
      { name: "autoSubmit", label: "自动提交", type: "switch", value: defaultConfig$1.autoSubmit, desc: "开启后，会自动提交答案" },
      { name: "answerInterval", label: "答题间隔(秒)", type: "number", value: defaultConfig$1.answerInterval, desc: "每道题之间的等待。越小越快：1~2 稳，0.3~0.5 很快，太快可能被判答题异常" },
      { name: "interval", label: "任务间隔(秒)", type: "number", value: defaultConfig$1.interval, desc: "任务点（视频/测验/文档）之间的等待" },
      { name: "videoRateOn", label: "视频倍速开关", type: "switch", value: defaultConfig$1.videoRateOn, desc: "关闭后按 1.0 倍原速播放。倍速过高有被判异常的风险" },
      { name: "videoRate", label: "视频倍速", type: "number", value: defaultConfig$1.videoRate, desc: "1 ~ 16。播放器若把倍速夹到上限（常见 2~4），日志会打印实际生效值" },
      { name: "videoMute", label: "视频静音", type: "switch", value: defaultConfig$1.videoMute, desc: "静音播放，避免自动播放被浏览器拦截" },
      { name: "videoKeepAlive", label: "后台保持播放", type: "switch", value: defaultConfig$1.videoKeepAlive, desc: "切标签页 / 最小化 / 小窗时不暂停。原理：伪装 document.hidden + 拦截 visibilitychange/blur + 用媒体时钟恢复播放" }
    ]
  }, {
    name: "exam",
    label: "考试配置",
    config: [
      { name: "autoExam", label: "考试自动切换", type: "switch", value: defaultConfig$1.autoExam, desc: "开启后，考试会自动切换" }
    ]
  }];

  const useformStore = pinia$1.defineStore({
    id: "formstore",
    state: () => ({ forminput: getConfig(), dialogV: false, activeName: "base" }),
    actions: {
      saveConfig(forminput) {
        // GM_setValue 直接吃 Vue reactive proxy 有丢键风险，先做一次纯对象化
        _GM_setValue("config", JSON.parse(JSON.stringify(forminput)));
      }
    }
  });

  var export_helper_default = (sfc, props) => {
    let target = sfc.__vccOpts || sfc;
    for (let [key, val] of props)
      target[key] = val;
    return target;
  }, aim_vue_vue_type_script_lang_default = { name: "Aim" }, _hoisted_12$1 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" }, _hoisted_42 = [vue.createElementVNode("path", { fill: "currentColor", d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z" }, null, -1), vue.createElementVNode("path", { fill: "currentColor", d: "M512 96a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V128a32 32 0 0 1 32-32zm0 576a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V704a32 32 0 0 1 32-32zM96 512a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64H128a32 32 0 0 1-32-32zm576 0a32 32 0 0 1 32-32h192a32 32 0 1 1 0 64H704a32 32 0 0 1-32-32z" }, null, -1)];
  var aim_default = export_helper_default(aim_vue_vue_type_script_lang_default, [["render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_12$1, _hoisted_42);
  }], ["__file", "aim.vue"]]), setting_vue_vue_type_script_lang_default = { name: "Setting" }, _hoisted_1231 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" }, _hoisted_3230 = [vue.createElementVNode("path", { fill: "currentColor", d: "M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z" }, null, -1)];
  var setting_default = export_helper_default(setting_vue_vue_type_script_lang_default, [["render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1231, _hoisted_3230);
  }], ["__file", "setting.vue"]]);
  const _sfc_main$1 = vue.defineComponent({ components: {}, setup() {
    const formstoreObj = useformStore(), { forminput, dialogV, activeName } = pinia$1.storeToRefs(formstoreObj),
      ruleFormRef = vue.ref(), rules = vue.reactive({
        interval: [{ required: true, message: "间隔时间不能为空" }, { type: "number", message: "间隔时间必须为数字" }, { validator: (rule, value) => value >= 0.1 ? Promise.resolve() : Promise.reject("间隔时间必须大于等于0.1") }],
        answerInterval: [{ required: true, message: "答题间隔不能为空" }, { type: "number", message: "答题间隔必须为数字" }, { validator: (rule, value) => value >= 0.1 ? Promise.resolve() : Promise.reject("答题间隔必须大于等于0.1") }],
        thtoken: [{ validator: (rule, value) => { if (value && /[\s\u4e00-\u9fa5]/.test(value)) return Promise.reject("API Key 里含空格/换行/中文，请重新粘贴"); return Promise.resolve(); } }]
      });
    return { dialogV, activeName, ruleFormRef, forminput, rules, submitForm: async (formEl) => {
      formEl && await formEl.validate((valid, fields) => {
        valid && (formstoreObj.saveConfig(forminput.value), ElementPlus.ElNotification({ title: "Success", message: "配置保存成功，请刷新页面（F12 输入 __cxDiag() 可自检）", type: "success", duration: 5000 }), dialogV.value = false);
      });
    }, userConfig, Setting: setting_default };
  } }), _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props)
      target[key] = val;
    return target;
  }, _hoisted_1$1 = { class: "dialog-footer" };
  const App = _export_sfc(_sfc_main$1, [["render", function(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_el_button = vue.resolveComponent("el-button"), _component_el_switch = vue.resolveComponent("el-switch"), _component_el_input = vue.resolveComponent("el-input"), _component_el_input_number = vue.resolveComponent("el-input-number"), _component_el_option = vue.resolveComponent("el-option"), _component_el_select = vue.resolveComponent("el-select"), _component_el_checkbox = vue.resolveComponent("el-checkbox"), _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group"), _component_el_tooltip = vue.resolveComponent("el-tooltip"), _component_el_form_item = vue.resolveComponent("el-form-item"), _component_el_tab_pane = vue.resolveComponent("el-tab-pane"), _component_el_tabs = vue.resolveComponent("el-tabs"), _component_el_form = vue.resolveComponent("el-form"), _component_el_dialog = vue.resolveComponent("el-dialog");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [vue.createVNode(_component_el_button, { type: "danger", id: "csbutton", icon: _ctx.Setting, circle: "", onClick: _cache[0] || (_cache[0] = ($event) => { const s = _unsafeWindow._askStore; if (s) s.dialogVisible = !s.dialogVisible; else _ctx.dialogV = !_ctx.dialogV; }) }, null, 8, ["icon"]), vue.createVNode(_component_el_dialog, { modelValue: _ctx.dialogV, "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.dialogV = $event), title: "学习通AI学习助手", width: "30%", modal: false, center: "", draggable: "" }, { footer: vue.withCtx(() => [vue.createElementVNode("span", _hoisted_1$1, [vue.createVNode(_component_el_button, { onClick: _cache[2] || (_cache[2] = ($event) => _ctx.dialogV = false) }, { default: vue.withCtx(() => [vue.createTextVNode("取消")]), _: 1 }), vue.createVNode(_component_el_button, { type: "primary", onClick: _cache[3] || (_cache[3] = ($event) => _ctx.submitForm(_ctx.ruleFormRef)) }, { default: vue.withCtx(() => [vue.createTextVNode("保存")]), _: 1 })])]), default: vue.withCtx(() => [vue.createVNode(_component_el_form, { ref: "ruleFormRef", rules: _ctx.rules, model: _ctx.forminput, class: "demo-ruleForm" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tabs, { class: "demo-tabs", modelValue: _ctx.activeName, "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.activeName = $event) }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.userConfig, (item) => (vue.openBlock(), vue.createBlock(_component_el_tab_pane, { key: item.name, label: item.label, name: item.name }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.config, (item1) => (vue.openBlock(), vue.createBlock(_component_el_form_item, { label: item1.label, prop: item1.name }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tooltip, { class: "box-item", effect: "dark", content: item1.desc || "", placement: "top" }, { default: vue.withCtx(() => ["switch" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_switch, { key: 0, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "input" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_input, { key: 1, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "number" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_input_number, { key: 2, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "select" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_select, { key: 3, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event, placeholder: "请选择" }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item1.options, (item2) => (vue.openBlock(), vue.createBlock(_component_el_option, { key: item2.value, label: item2.label, value: item2.value }, null, 8, ["label", "value"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue"])) : "checkbox" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_checkbox_group, { key: 4, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item1.options, (item2) => (vue.openBlock(), vue.createBlock(_component_el_checkbox, { key: item2.value, label: item2.value, name: item2.value }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(item2.label), 1)]), _: 2 }, 1032, ["label", "name"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue"])) : vue.createCommentVNode("", true)]), _: 2 }, 1032, ["content"])]), _: 2 }, 1032, ["label", "prop"]))), 256))]), _: 2 }, 1032, ["label", "name"]))), 128))]), _: 1 }, 8, ["modelValue"])]), _: 1 }, 8, ["rules", "model"])]), _: 1 }, 8, ["modelValue"])], 64);
  }], ["__scopeId", "data-v-6ed29f7f"]]);

  let defaultConfig = getConfig();

  // ══════════════════════════════════════════════════════════════════════
  // v1.2.x 核心：推理模型适配
  //   问题：gpt-5 / gpt-6 / o 系等推理模型（1）不再接受 max_tokens，
  //         必须用 max_completion_tokens；（2）只接受 temperature=1，
  //         传 0.1 直接 400。旧脚本两条硬编码同时踩中 → 每题都 400
  //         → 被静默吞成空答案 → 面板只剩「暂无答案」。
  //   方案：按模型家族排好参数阶梯，400 判定为「参数不认」就自动降一级重试；
  //         判定为「模型不存在 / 鉴权失败」则立刻停止并如实报错。
  // ══════════════════════════════════════════════════════════════════════
  const isReasoningModel = (m) => {
    const s = String(m || "").trim().toLowerCase();
    if (!s) return false;
    if (/^o[1-9](\b|[-_.])/.test(s)) return true;              // o1 o3 o4-mini …
    if (/^gpt-([5-9]|\d{2})/.test(s)) return true;             // gpt-5 gpt-5.6 gpt-6 …
    if (/(^|[-_./])(sol|reasoner|reasoning|thinking|r1|think)([-_./]|$)/.test(s)) return true;
    return false;
  };

  const PARAM_ERR_RE = /(max_tokens|max_completion_tokens|temperature|top_p|reasoning_effort|chat_template_kwargs|enable_thinking|thinking|unsupported[_\s]?(parameter|value|field)|not\s+supported|不支持|invalid[_\s]?(value|parameter)|unknown[_\s]?(parameter|field)|does\s+not\s+support)/i;
  const MODEL_ERR_RE = /(model[_.\s]?(not[_.\s]?found|not[_.\s]?exist|does\s+not\s+exist|unavailable)|invalid[_.\s]?model|no\s+such\s+model|model.*?(不存在|无效|不可用)|模型.*?(不存在|无效))/i;

  // v1.2.x 省 token：本地答案缓存。
  //   同一题库在不同章节 / 不同周次反复出现，旧实现每次都发请求。
  //   以「题型 + 题干 + 全部选项」做键，命中直接返回，零 token、零延迟。
  const ANS_CACHE_KEY = "anscache2", ANS_CACHE_MAX = 3000;
  const qKey = (q, type, options) => md5(String(type) + "|" + String(q).replace(/\s+/g, " ") + "|" + (options || []).join("\u0001")).slice(0, 20);
  const ansCacheLoad = () => { try { const o = _GM_getValue(ANS_CACHE_KEY); return (o && typeof o === "object" && !Array.isArray(o)) ? o : {}; } catch (e) { return {}; } };
  const ansCacheGet = (k) => { const o = ansCacheLoad(); const v = o[k]; return v && v.a != null ? v.a : null; };
  const ansCacheSet = (k, answer) => {
    try {
      if (answer == null) return;
      const empty = typeof answer === "string" ? "" === answer.trim() : (Array.isArray(answer) ? answer.length === 0 : false);
      if (empty) return;
      const o = ansCacheLoad();
      o[k] = { a: answer, t: Date.now() };
      const ks = Object.keys(o);
      if (ks.length > ANS_CACHE_MAX) {
        ks.sort((a, b) => (o[a].t || 0) - (o[b].t || 0)).slice(0, ks.length - ANS_CACHE_MAX).forEach((x) => { delete o[x]; });
      }
      _GM_setValue(ANS_CACHE_KEY, o);
    } catch (e) {}
  };

  // v1.2.x 省 token：按题型算输出预算。
  //   旧实现不分题型一律 max_tokens=1000 —— 单选题正确答案只有 1 个字母，
  //   那一千个 token 的额度纯属摆设（虽按实际用量计费，但推理模型会把额度拿去买思维链）。
  const tokenBudget = (type) => {
    const t = parseInt(type);
    if (t === 0 || t === 3) return 24;      // 单选 / 判断：只要 1 个字母或 2 个字
    if (t === 1) return 48;                 // 多选：最多 4 个字母
    if (t === 2) return 240;                // 填空：按空数留余量
    return 480;                             // 简答/名词解释/论述/计算
  };

  // 关掉思维链的四条路径，不同后端认不同的那一条。
  // 顺序按「命中率 × 彻底程度」排：none 是官方硬关闭；chat_template_kwargs 是 vLLM/Qwen 系
  // （会返回 reasoning_content 字段的后端基本都认这条）；thinking 是 Anthropic 兼容层的写法。
  const NO_THINK_VARIANTS = [
    { label: "effort:none",              patch: { reasoning_effort: "none" } },
    { label: "chat_template_kwargs",     patch: { chat_template_kwargs: { enable_thinking: false } } },
    { label: "enable_thinking:false",    patch: { enable_thinking: false } },
    { label: "thinking:disabled",        patch: { thinking: { type: "disabled" } } },
    { label: "effort:minimal",           patch: { reasoning_effort: "minimal" } },
    { label: "effort:low",               patch: { reasoning_effort: "low" } }
  ];
  // 某个变体被该服务商拒绝过 → 记住，后续题目不再浪费一次往返
  const BAD_VARIANT = new Set();
  const variantOk = (label) => !BAD_VARIANT.has(label);

  const buildAttempts = (apiUrl, model, sysPrompt, userPrompt, type) => {
    const msgs = [{ role: "system", content: sysPrompt }, { role: "user", content: userPrompt }];
    const reasoning = isReasoningModel(model);
    const budget = tokenBudget(type);
    // 推理模型的 max_completion_tokens 包含思维链 token，留 16 倍余量、下限 1200
    const rBudget = Math.max(budget * 16, 1200);
    const bodies = [];
    const push = (b, variant) => {
      const k = JSON.stringify(b);
      if (!bodies.some((x) => x.body && JSON.stringify(x.body) === k)) bodies.push({ body: b, variant: variant || "" });
    };
    if (reasoning) {
      // ① 优先「显式关闭思维链」
      NO_THINK_VARIANTS.forEach((v) => {
        if (variantOk(v.label)) push(Object.assign({ model, stream: false, messages: msgs, max_completion_tokens: rBudget }, v.patch), v.label);
      });
      // ② 退到「不传任何思考参数」
      push({ model, stream: false, messages: msgs, max_completion_tokens: rBudget });
      push({ model, stream: false, messages: msgs, temperature: 1, max_completion_tokens: rBudget });
      push({ model, stream: false, messages: msgs, temperature: 0.1, max_tokens: budget }); // 老中转站兜底
      // ③ 最后：思维链把额度吃满时，用大预算硬扛
      push({ model, stream: false, messages: msgs, max_completion_tokens: Math.max(8192, rBudget * 4) });
    } else {
      push({ model, stream: false, messages: msgs, temperature: 0.1, max_tokens: budget });
      push({ model, stream: false, messages: msgs, temperature: 0.1, max_completion_tokens: budget });
      push({ model, stream: false, messages: msgs, max_completion_tokens: budget });
    }
    push({ model, stream: false, messages: msgs });   // 最裸：只留 messages

    const attempts = [];
    bodies.forEach((x, i) => attempts.push({ url: apiUrl, body: x.body, tag: "chat" + (i + 1), variant: x.variant }));

    // Responses 端点兜底：部分中转站把新模型只挂在 /v1/responses
    let respUrl = null;
    if (/\/chat\/completions$/i.test(apiUrl)) respUrl = apiUrl.replace(/\/chat\/completions$/i, "/responses");
    else if (/\/v1$/i.test(apiUrl)) respUrl = apiUrl + "/responses";
    if (respUrl && respUrl !== apiUrl) {
      attempts.push({ url: respUrl, body: { model, input: sysPrompt + "\n\n" + userPrompt }, tag: "responses" });
    }
    return attempts;
  };

  // 从各种响应形态里捞正文。
  // ⚠️ v1.2.x 关键修复：reasoning_content 是思维链，不是答案。
  //   旧实现 `if (!s && m.reasoning_content) s = ...` 把思维链当答案返回，
  //   于是 matchAnswer 拿一段"我们需要回答中文题目…"去和选项精确比对，必然对不上，
  //   偏偏这条路径没有 error 字段 → 面板只显示「AI 返回空答案，且未记录原因」。
  const pickContent = (j) => {
    if (!j || typeof j !== "object") return { text: "", source: "none" };
    const m = (j.choices && j.choices[0] && j.choices[0].message) || {};
    const content = String(m.content == null ? "" : m.content).trim();
    if (content) return { text: content, source: "content" };
    if (j.output_text && String(j.output_text).trim()) return { text: String(j.output_text).trim(), source: "output_text" };
    if (Array.isArray(j.output)) {
      const s = j.output.map((o) => Array.isArray(o.content) ? o.content.map((c) => c && c.text ? c.text : "").join("") : "").join("").trim();
      if (s) return { text: s, source: "output" };
    }
    if (j.choices && j.choices[0] && j.choices[0].text && String(j.choices[0].text).trim()) {
      return { text: String(j.choices[0].text).trim(), source: "choices.text" };
    }
    if (j.data && j.data.content && String(j.data.content).trim()) return { text: String(j.data.content).trim(), source: "data.content" };
    const r = String(m.reasoning_content || m.reasoning || "").trim();
    if (r) return { text: "", source: "reasoning-only", reasoning: r };
    return { text: "", source: "none" };
  };

  const pickUsage = (j) => {
    const u = (j && j.usage) || {};
    const pt = u.prompt_tokens || u.input_tokens || 0;
    const ct = u.completion_tokens || u.output_tokens || 0;
    return { pt, ct, tt: u.total_tokens || (pt + ct), estimated: false };
  };

  // 从一段文本（可能是正文，也可能是思维链）里抽选项字母。
  // 旧实现 `ans.match(/[A-Da-d]/)[0]` 会踩到英文单词——本题思维链里出现 Archimedes，
  // 首字母 A 就被当成了答案。这里改成三级：显式标记 → 整段就是字母 → 独立成词的单字母。
  const extractLetters = (txt, optionCount) => {
    const t = String(txt || "");
    const n = Math.max(4, Math.min(optionCount || 4, 8));
    const pool = "ABCDEFGH".slice(0, n);
    const set = new Set();
    // ① 显式标记：答案：A / 应选 A / 正确选项为 A / 选A / 答：B
    const re1 = /(?:答案|应选|正确选项|选择|选|答)\s*[:：是为]?\s*([A-H](?:\s*[,，、\/]?\s*[A-H]){0,7})/g;
    let m;
    while ((m = re1.exec(t))) {
      for (const c of m[1].replace(/[^A-H]/g, "")) if (pool.includes(c)) set.add(c);
    }
    if (set.size) return Array.from(set).sort();
    // ② 整段就是一个/几个字母（模型严格听话的情况）
    const bare = t.trim().match(/^[\(\[]?\s*([A-H](?:\s*[,，、\/]?\s*[A-H])*)\s*[\)\]]?[.。]?$/);
    if (bare) {
      for (const c of bare[1].replace(/[^A-H]/g, "")) if (pool.includes(c)) set.add(c);
      if (set.size) return Array.from(set).sort();
    }
    // ③ 独立成词的单字母：前后不能紧邻英文字母（挡掉 Archimedes / Parabola 这类）
    const re3 = /(?:^|[^A-Za-z])([A-H])(?=\s*[.、．:：\)）]|\s|$)/g;
    while ((m = re3.exec(t))) if (pool.includes(m[1])) set.add(m[1]);
    return Array.from(set).sort();
  };

  // 从思维链里取答案。gpt-6.1-sol 这类模型经常 content 为空、结论只在 reasoning 里，
  // 所以这里做两层：① 找最后一次显式结论；② 用选项原文反查（要求唯一命中）。
  const extractFromReasoning = (txt, type, options) => {
    const t = String(txt || "");
    if (!t) return null;
    // ① 显式结论，取最后一次出现（思维链里会反复推翻结论）
    const re = /(?:最终答案|正确答案|答案是|答案|应选|正确选项|因此选|所以选|故选|选择|选)\s*[:：是为]?\s*([A-H](?:\s*[,，、\/]?\s*[A-H]){0,7})/g;
    let m, last = null;
    while ((m = re.exec(t))) {
      const letters = m[1].replace(/[^A-H]/g, "");
      if (letters) last = letters;
    }
    if (last) return last;
    // ② 选项原文反查（推理里直接把选项写出来时）
    if ((type === 0 || type === 1) && options && options.length) {
      const flat = t.replace(/\s+/g, "");
      const hits = [];
      options.forEach((o, i) => {
        const key = String(o).replace(/\s+/g, "");
        // 太短的选项（如 "1"、"A"）容易误命中，要求至少 4 个字符
        if (key.length >= 4 && flat.includes(key)) hits.push(i);
      });
      if (hits.length === 1) return String.fromCharCode(65 + hits[0]);
    }
    return null;
  };

  // 结构化输出协议：约定模型只输出一行「答案：B. 3月14日」。
  // 一次拿到字母 + 选项原文：原文用来核对（防止字母错位），字母用来兜底（原文对不上时）。
  const parseStructured = (txt) => {
    const t = String(txt || "");
    const re = /答案\s*[:：]?\s*([A-H](?:\s*[,，、\/]?\s*[A-H]){0,7})\s*(?:[.、．:：]\s*)?([^\n]{0,150})/g;
    let m, last = null;
    while ((m = re.exec(t))) {
      const letters = m[1].replace(/[^A-H]/g, "");
      if (letters) last = { letters: letters, text: String(m[2] || "").trim() };
    }
    return last;
  };

  // 把模型原始文本收敛成题目要的形式
  const convertAnswer = (raw, type, options) => {
    let ans = String(raw == null ? "" : raw)
      .replace(/[\s\S]*?<\/think>/gi, "")
      .replace(/<\/?(?:think|thinking|reasoning)>/gi, "")
      .trim();
    options = options || [];

    // ① 结构化协议优先：只认「答案：X」这一行，分析文字一律不看
    if (type === 0 || type === 1) {
      const st = parseStructured(ans);
      if (st) {
        const letters = st.letters.split("");
        if (type === 0) {
          let idx = -1;
          if (st.text) {
            const byText = matchAnswer([st.text], options);
            if (byText.length === 1) idx = byText[0];
          }
          if (idx < 0) {
            const i2 = letters[0].charCodeAt(0) - 65;
            if (i2 >= 0 && i2 < options.length) idx = i2;
          }
          if (idx >= 0) {
            console.log("[答案解析] 结构化「" + st.letters + (st.text ? ". " + st.text.slice(0, 30) : "") + "」→ 第 " + (idx + 1) + " 项");
            return options[idx];
          }
          return letters[0];
        }
        console.log("[答案解析] 结构化多选「" + st.letters + "」");
        return letters.map((c) => { const i2 = c.charCodeAt(0) - 65; return (i2 >= 0 && i2 < options.length) ? options[i2] : c; });
      }
    }

    if (type === 0) {
      const ls = extractLetters(ans, options.length);
      if (ls.length === 1) {
        const idx = ls[0].charCodeAt(0) - 65;
        ans = (idx >= 0 && idx < options.length) ? options[idx] : ls[0];
      } else if (ls.length > 1) {
        // 抽到多个 → 不猜，保留原文，交给上层如实报「解析歧义」
        console.log("[答案解析] 单选抽到多个字母 " + ls.join("") + "，保留原文交由上层判定");
      }
    } else if (type === 1) {
      const ls = extractLetters(ans, options.length);
      if (ls.length) {
        ans = ls.map((c) => { const i2 = c.charCodeAt(0) - 65; return (i2 >= 0 && i2 < options.length) ? options[i2] : c; });
      } else {
        const parts = ans.split(/[，,、;；\n]|\s{2,}/).map((s) => s.replace(/^[A-Da-d][\.、\)．]\s*/, "").trim()).filter(Boolean);
        ans = parts.length ? parts : [ans];
      }
    } else if (type === 3) {
      const t = ans.slice(0, 40);
      if (/正确|^对|^是|√|true|^T$/i.test(t)) ans = "正确";
      else if (/错误|^错|^否|×|false|^F$/i.test(t)) ans = "错误";
      // 都不匹配 → 保持原文，由上层报告
    }
    if (type === 2 && String(ans).includes("#")) ans = String(ans).split("#");
    return ans;
  };

  // fillAnswer 失败时的原因诊断（旧实现这条路没有任何 error 字段）
  const diagnoseFill = (q, ans) => {
    const t = String(q && q.type);
    const opts = (q && q.options) || [];
    const txt = ans instanceof Array ? ans.join(" | ") : String(ans == null ? "" : ans);
    if (t === "0" || t === "1") {
      if (!opts.length) return "页面没解析出选项文本（getOption 取到 0 个），题面可能是图片或结构不同";
      let hit = [];
      try { hit = matchAnswer(ans instanceof Array ? ans : [String(ans)], opts); } catch (e) {}
      if (!hit.length) return "三种匹配（逐字 / 归一化 / 包含）都没命中任何选项。AI 原话：" + txt.slice(0, 120);
      return "选项已匹配到第 " + hit.map((i) => i + 1).join(",") + " 项，但写进页面答案模型失败（#answer<qid> 为空）";
    }
    if (t === "3") {
      if (!txt.trim()) return "判断题答案为空";
      return "判断题选项匹配失败。AI 原话：" + txt.slice(0, 120);
    }
    if (t === "2" || t === "9" || t === "4" || t === "5" || t === "6" || t === "7") {
      return "页面没找到可填写的 textarea / UE 编辑器";
    }
    return "未知题型，未做处理";
  };

  class ServerApi {
    constructor(window2 = _unsafeWindow) {
      this.windowz = window2 || _unsafeWindow;
    }

    async getAnswer(questionData) { return this.getAIAnswer(questionData); }

    async getAIAnswer(questionData) {
      defaultConfig = getConfig();
      const apiKey = String(defaultConfig.thtoken || "").trim();
      const timeoutMs = 45000;
      const apiUrl = normalizeApiUrl(defaultConfig.aiApiUrl);
      const model = String(defaultConfig.aiModel || "deepseek-chat").trim();

      const q = (questionData.question || "").toString().trim();
      const type = parseInt(questionData.type);
      const options = questionData.options || [];
      const optionsText = options.length > 0 ? options.map((o, i) => String.fromCharCode(65 + i) + ". " + o).join("\n") : "";

      console.log("[AI答题] 第", (_unsafeWindow._aiQIdx || 0) + 1, "题 | 类型:", type, "| 端点:", apiUrl, "| 模型:", model, "| KeyLen:", apiKey.length, "| 推理模型:", isReasoningModel(model));

      let sysPrompt = "", userPrompt = q;
      switch (type) {
        case 0:
          sysPrompt = "答题助手。只输出一行，格式固定：答案：<字母>. <该选项完整原文>。禁止输出任何分析、解释、步骤或多余文字。";
          userPrompt = optionsText ? `题目：${q}\n${optionsText}\n\n只输出一行：答案：<字母>. <选项原文>` : q;
          break;
        case 1:
          sysPrompt = "答题助手。只输出一行，格式固定：答案：<字母组合>。禁止输出任何分析、解释或多余文字。";
          userPrompt = optionsText ? `题目：${q}\n${optionsText}\n\n只输出一行：答案：<字母组合，如 ABD>` : q;
          break;
        case 2:
          sysPrompt = "答题助手。填出空白处答案，多个空用 # 分隔，只输出答案。";
          userPrompt = q;
          break;
        case 3:
          sysPrompt = "答题助手。只输出「正确」或「错误」，禁止任何分析或解释。";
          userPrompt = q;
          break;
        case 4: case 5: case 6: case 7:
          sysPrompt = "学习通答题助手。简洁回答，200字内，纯文本，不用Markdown。";
          userPrompt = q;
          break;
        default:
          sysPrompt = "学习通答题助手。只输出答案，不要解释。";
      }

      if (!q) return { form: "AI", answer: "", num: "", usenum: "", errorCode: "EMPTY_Q", error: "题目文本为空，未发起请求" };

      // 本地缓存：命中即返回，本次不产生任何 token
      const ck = qKey(q, type, options);
      const cacheHit = ansCacheGet(ck);
      if (cacheHit) {
        console.log("[AI答题] ✓ 本地缓存命中（" + ck + "），跳过请求");
        return { form: "AI", answer: cacheHit, num: 0, usenum: 0, cached: true };
      }

      if (!apiKey) return { form: "AI", answer: "", num: "", usenum: "", errorCode: "NO_KEY", error: "API Key 为空（配置页「API Key」没保存成功，或存到了别的键名）" };
      if (/[\s\u4e00-\u9fa5]/.test(apiKey)) console.warn("[AI答题] ⚠ API Key 里含空格/换行/中文，很可能导致 401");

      const MAX_RETRIES = 3;
      let lastError = null;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const result = await this._callAI(apiUrl, apiKey, model, sysPrompt, userPrompt, type, options, { timeoutMs });
          if (result && result.retry === true) {
            if (result.isTimeout) {
              console.warn("[AI答题] 请求超时（" + (timeoutMs / 1000) + "s），不重试，本题按「无答案」处理");
              lastError = result;
              break;
            }
            const waitSec = result.is429 ? 10 + attempt * 3 : attempt * 2;
            console.warn("[AI答题] 第" + attempt + "次失败" + (result.is429 ? "(429限流)" : "") + "，" + waitSec + "秒后重试…", result.error);
            await new Promise((r) => setTimeout(r, waitSec * 1000));
            lastError = result;
            continue;
          }
          if (result && result.answer && String(result.answer).length) ansCacheSet(ck, result.answer);
          return result;
        } catch (e) {
          console.warn("[AI答题] 第" + attempt + "次异常:", e);
          lastError = { errorCode: "EXCEPTION", error: String(e && e.message ? e.message : e) };
          if (attempt < MAX_RETRIES) await new Promise((r) => setTimeout(r, attempt * 2000));
        }
      }
      const le = lastError || {};
      const msgText = le.error || le.detail || "未知原因";
      console.error("[AI答题] ✗ 全部尝试失败:", le);
      return { form: "AI", answer: "", num: "", usenum: "", errorCode: le.errorCode || "ALL_FAILED", error: msgText };
    }

    _callAI(apiUrl, apiKey, model, sysPrompt, userPrompt, type, options, opts) {
      return this._runLadder(apiUrl, apiKey, model, sysPrompt, userPrompt, type, options, opts);
    }

    async _runLadder(apiUrl, apiKey, model, sysPrompt, userPrompt, type, options, opts) {
      const timeoutMs = (opts && opts.timeoutMs) || 45000;
      const attempts = buildAttempts(apiUrl, model, sysPrompt, userPrompt, type);
      const trace = [];
      let lastEmpty = null;
      for (let i = 0; i < attempts.length; i++) {
        let a = attempts[i];
        // 上一次因「只吐思维链」失败 → 这次在 user 消息末尾追加硬约束，逼它直接出答案。
        // 只改 user、不动 system，前缀缓存仍能命中。
        if (lastEmpty) {
          try {
            const b = JSON.parse(JSON.stringify(a.body));
            if (Array.isArray(b.messages) && b.messages.length) {
              b.messages[b.messages.length - 1].content += "\n\n直接给出最终答案，只输出字母，不要写任何推理过程。";
              a = Object.assign({}, a, { body: b, tag: a.tag + "+direct" });
            }
          } catch (e) {}
        }
        const r = await this._postOnce(a, apiKey, timeoutMs, type, options);
        if (r.ok) {
          let u = pickUsage(r.json);
          if (!u.pt && !u.ct) {
            // 部分中转站不返回 usage，这里按字符数粗估，并标注「估算」，避免面板上一片 0
            u = { pt: Math.ceil((sysPrompt.length + userPrompt.length) / 1.6), ct: Math.ceil(String(r.text || "").length / 1.6), tt: 0, estimated: true };
            u.tt = u.pt + u.ct;
          }
          const converted = convertAnswer(r.text, type, options);
          const shown = Array.isArray(converted) ? converted.join(" | ") : String(converted);
          // 答错时最需要的两条信息：模型原话、最终落到哪个选项。一并写进面板
          const parseNote = "AI 原话「" + String(r.text).slice(0, 50) + "」→ 填入「" + shown.slice(0, 80) + "」";
          console.log("[AI答题] ✓ " + a.tag + " 通过 | 来源 " + (r.source || "?") + " | Token 输入 " + u.pt + " 输出 " + u.ct + (u.estimated ? "（估算）" : "") + "\n           " + parseNote);
          return { form: "AI", answer: converted, num: u.pt, usenum: u.ct,
            totalTokens: u.tt, estimated: !!u.estimated, source: r.source, parseNote,
            trace: trace.concat([a.tag + " → OK(" + (r.source || "?") + ")"]).join(" ; ") };
        }
        trace.push(a.tag + " → " + (r.code || r.kind) + " HTTP " + r.status + " " + String(r.detail || "").slice(0, 60).replace(/\s+/g, " "));
        console.warn("[AI答题] ✗ " + a.tag + " | " + r.kind + " | HTTP " + r.status + " | " + String(r.detail || "").slice(0, 220));
        // 该服务商不认这个「关思维链」变体 → 记住，后续题目不再浪费一次往返
        if (r.kind === "param" && a.variant && variantOk(a.variant)) {
          BAD_VARIANT.add(a.variant);
          console.warn("[AI答题] 该服务商拒绝参数变体 \"" + a.variant + "\"，后续跳过。服务端说：" + String(r.detail || "").slice(0, 120));
        }
        // 思维链吃满额度 / content 装的是分析：都不算致命，继续试下一级（末尾有加大预算那一级）
        if (r.code === "CONTENT_EMPTY" || r.code === "CONTENT_ANALYSIS") { lastEmpty = r; continue; }
        if (r.kind === "retry") {
          return { retry: true, is429: r.status === 429, isTimeout: false, errorCode: r.code, error: r.detail };
        }
        if (r.kind !== "param") {
          return { form: "AI", answer: "", num: "", usenum: "", retry: false, errorCode: r.code, httpStatus: r.status,
            error: r.code + "｜HTTP " + r.status + "｜" + r.detail + "\n【尝试链】" + trace.join(" ; ") };
        }
      }
      if (lastEmpty) {
        return { form: "AI", answer: "", num: "", usenum: "", retry: false, errorCode: "CONTENT_EMPTY",
          error: "模型只输出了思维链、没有给出答案（就连加大预算那一级也一样）。这题大概率被思维链绕住了，建议手动答。\n【尝试链】" + trace.join(" ; ") };
      }
      return { form: "AI", answer: "", num: "", usenum: "", retry: false, errorCode: "PARAM_ALL_FAILED",
        error: "服务端拒绝了每一种请求格式（参数组合 × 端点）。\n【尝试链】" + trace.join(" ; ") };
    }

    _postOnce(attempt, apiKey, timeoutMs, type, options) {
      return new Promise((resolve) => {
        const out = (o) => resolve(o);
        if (typeof _GM_xmlhttpRequest !== "function") {
          return out({ ok: false, kind: "fatal", status: null, code: "NO_GM_XHR", detail: "GM_xmlhttpRequest 缺失：@grant 未生效，或当前脚本管理器不支持跨域请求" });
        }
        let payload;
        try { payload = JSON.stringify(attempt.body); }
        catch (e) { return out({ ok: false, kind: "fatal", status: null, code: "BAD_PAYLOAD", detail: String(e && e.message) }); }

        _GM_xmlhttpRequest({
          method: "POST",
          url: attempt.url,
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
          data: payload,
          timeout: timeoutMs,
          onload: (res) => {
            const st = res.status, body = res.responseText || "";
            if (st === 0) return out({ ok: false, kind: "fatal", status: 0, code: "XHR_BLOCKED",
              detail: "status=0：请求被拦截。① 篡改猴→本脚本→设置→用户域白名单 加 * 或该域名；② 广告拦截插件；③ https 页面请求 http 接口" });
            if (st === 401 || st === 403) return out({ ok: false, kind: "auth", status: st, code: "AUTH_" + st,
              detail: "Key 无效 / 无该模型权限 / 含杂字符。服务端说：" + body.slice(0, 400) });
            if (st === 429) return out({ ok: false, kind: "retry", status: 429, code: "RATE_LIMIT", detail: "429 限流或余额不足：" + body.slice(0, 200) });
            if (st >= 500) return out({ ok: false, kind: "retry", status: st, code: "SERVER_" + st, detail: st + " 服务端错误：" + body.slice(0, 200) });
            if (st !== 200) {
              if (MODEL_ERR_RE.test(body)) return out({ ok: false, kind: "model", status: st, code: "MODEL_NOT_FOUND",
                detail: "模型名 " + attempt.body.model + " 不被该服务商接受（400/404）。去服务商控制台或 /v1/models 抄准确 ID。服务端说：" + body.slice(0, 400) });
              if (PARAM_ERR_RE.test(body)) return out({ ok: false, kind: "param", status: st, code: "PARAM_" + st, detail: body.slice(0, 400) });
              return out({ ok: false, kind: "param", status: st, code: "HTTP_" + st, detail: body.slice(0, 400) });
            }
            let j;
            try { j = JSON.parse(body); }
            catch (e) { return out({ ok: false, kind: "fatal", status: 200, code: "BAD_JSON", detail: "响应不是 JSON（可能返回了 HTML 错误页/登录页）：" + body.slice(0, 300) }); }
            if (j && j.error) {
              const msg = j.error.message || j.error.msg || JSON.stringify(j.error);
              if (MODEL_ERR_RE.test(msg)) return out({ ok: false, kind: "model", status: 200, code: "MODEL_NOT_FOUND", detail: msg });
              if (PARAM_ERR_RE.test(msg)) return out({ ok: false, kind: "param", status: 200, code: "PARAM_API", detail: msg });
              return out({ ok: false, kind: "fatal", status: 200, code: "API_ERROR", detail: msg });
            }
            const pc = pickContent(j);
            if (!pc.text) {
              if (pc.source === "reasoning-only") {
                // 先试着从思维链里把结论抠出来——gpt-6.1 这类模型常见「结论有了、content 被截成空」
                const got = extractFromReasoning(pc.reasoning, type, options);
                if (got) {
                  console.warn("[AI答题] content 为空，从思维链抠到答案：" + got);
                  return out({ ok: true, text: got, json: j, source: "reasoning-extracted" });
                }
                // 抠不到：绝不能把思维链当答案（旧实现就是这么错的）
                return out({ ok: false, kind: "retry", status: 200, code: "CONTENT_EMPTY",
                  detail: "content 为空，输出额度全花在思维链上（reasoning " + String(pc.reasoning || "").length + " 字符，尾部：" + String(pc.reasoning || "").slice(-80) + "）",
                  reasoning: pc.reasoning });
              }
              return out({ ok: false, kind: "fatal", status: 200, code: "EMPTY_CONTENT",
                detail: "HTTP 200 但正文与思维链都为空，或中转站剥离了 content。原始响应：" + body.slice(0, 500) });
            }
            // content 有值，但可能是「分析过程」——部分中转站把 reasoning 塞进了 content 字段。
            // 典型开头："我们需要回答选择题。需要了解常识：…" 且尾部被 max_completion_tokens 截断。
            if ((type === 0 || type === 1 || type === 3) && pc.text.length > 40) {
              const head = pc.text.trim();
              const looksAnalysis = /^(我们|让我|首先|题目|分析|需要|思考|这个|该题|这道|要回答|判断)/.test(head);
              if (looksAnalysis) {
                const got = extractFromReasoning(pc.text, type, options);
                if (got) {
                  console.warn("[AI答题] content 装的是分析文本，从中抠到答案：" + got);
                  return out({ ok: true, text: got, json: j, source: "content-extracted" });
                }
                return out({ ok: false, kind: "retry", status: 200, code: "CONTENT_ANALYSIS",
                  detail: "content 装的是分析过程而不是答案（长 " + pc.text.length + " 字符，尾部：" + pc.text.slice(-70) + "），多半被 max_completion_tokens 截断",
                  reasoning: pc.text });
              }
            }
            out({ ok: true, text: pc.text, json: j, source: pc.source });
          },
          onerror: () => out({ ok: false, kind: "retry", status: null, code: "NETWORK",
            detail: "网络层错误：域名不可达 / DNS / TLS / @connect 被拒 / 代理拦截" }),
          ontimeout: () => out({ ok: false, kind: "retry", status: null, code: "TIMEOUT",
            detail: timeoutMs + "ms 内无响应（模型慢或网络差）" })
        });
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // F12 自检：__cxDiag()
  // ══════════════════════════════════════════════════════════════════════
  const cxDiag = async (sink) => {
    const out = [];
    const emit = (level, msg) => {
      const text = typeof msg === "string" ? msg : (() => { try { return JSON.stringify(msg); } catch (e) { return String(msg); } })();
      out.push({ level, text });
      try { (level === "error" ? console.error : level === "warn" ? console.warn : console.log).call(console, text); } catch (e) {}
      if (typeof sink === "function") { try { sink(level, text); } catch (e) {} }
    };
    const cfg = getConfig();
    const url = normalizeApiUrl(cfg.aiApiUrl);
    const model = String(cfg.aiModel || "deepseek-chat").trim();
    const key = String(cfg.thtoken || "").trim();

    emit("info", "构建: " + CX_BUILD);
    emit("info", "API地址: " + url + (cfg.aiApiUrl ? "" : "（留空，用默认）"));
    emit("info", "模型: " + model + (cfg.aiModel ? "" : "（留空，用默认）") + " | 推理模型判定: " + isReasoningModel(model));
    if (BAD_VARIANT.size) emit("warn", "该服务商拒绝过的「关思维链」变体：" + Array.from(BAD_VARIANT).join(", ") + "（后续自动跳过）");
    else emit("info", "关思维链变体：全部待验证（首个请求会逐条探测）");
    emit("info", "Key: " + (key ? ("已填 " + key.length + " 位，前缀 " + key.slice(0, 7) + "…") : "【空】"));
    emit("info", "视频倍速: " + (cfg.videoRateOn !== false ? (cfg.videoRate || 16) + "x（已开启）" : "已关闭，按原速"));
    emit("info", "答题间隔: " + cfg.answerInterval + " 秒 | 任务间隔: " + cfg.interval + " 秒");
    emit("info", "答案缓存: " + Object.keys(ansCacheLoad()).length + " 条（上限 " + ANS_CACHE_MAX + "）");

    if (!key) { emit("error", "✗ API Key 为空 —— 这是「暂无答案」的第一号原因"); return out; }
    if (/[\s\u4e00-\u9fa5]/.test(key)) emit("warn", "⚠ Key 里含空格/换行/中文，请重新粘贴");
    if (typeof _GM_xmlhttpRequest !== "function") { emit("error", "✗ GM_xmlhttpRequest 缺失"); return out; }

    const base = url.replace(/\/chat\/completions$/i, "");
    emit("info", "→ GET " + base + "/models 列可用模型…");
    await new Promise((r) => _GM_xmlhttpRequest({
      method: "GET", url: base + "/models",
      headers: { Authorization: "Bearer " + key }, timeout: 15000,
      onload: (res) => {
        if (res.status === 200) {
          try {
            const j = JSON.parse(res.responseText);
            const ids = (j.data || j.models || []).map((m) => m.id || m.name).filter(Boolean);
            emit("info", "该服务商可用模型（" + ids.length + " 个）：" + (ids.length ? ids.join(", ") : "(空列表)"));
            if (ids.length && !ids.includes(model)) emit("error", "⚠ 你填的「" + model + "」不在上面列表里 —— 名字不准确，这就是 400 的原因");
            else if (ids.length) emit("success", "✓ 模型名在列表中");
          } catch (e) { emit("warn", "/models 返回非 JSON：" + (res.responseText || "").slice(0, 300)); }
        } else {
          emit("warn", "/models HTTP " + res.status + "（部分中转站不提供该接口，可忽略）：" + (res.responseText || "").slice(0, 200));
        }
        r();
      },
      onerror: () => { emit("warn", "/models 网络层错误（可忽略）"); r(); },
      ontimeout: () => { emit("warn", "/models 超时（可忽略）"); r(); }
    }));

    emit("info", "→ 逐级试探参数阶梯…");
    const attempts = buildAttempts(url, model, "学习通答题助手。只输出答案。", "1+1=?", 0);
    for (let i = 0; i < attempts.length; i++) {
      const a = attempts[i];
      const r = await new ServerApi()._postOnce(a, key, 20000, 0, []);
      const head = a.tag + " [" + Object.keys(a.body).join(",") + "]";
      if (r.ok) {
        emit("success", "✓ " + head + " 通过，正文：" + String(r.text).slice(0, 60));
        emit("success", "✓ 这一组参数可用。若答题仍失败，问题在选项文本匹配，不在 API。");
        break;
      }
      emit("warn", "✗ " + head + " → " + r.kind + " HTTP " + r.status + " " + String(r.detail || "").slice(0, 200));
      if (r.kind !== "param") {
        emit("error", "✗ 在 " + a.tag + " 阶段终止（" + r.kind + "），不再降级：" + String(r.detail || "").slice(0, 300));
        break;
      }
    }
    emit("info", "诊断结束。点右上角「复制日志」可整段导出。");
    return out;
  };
  try { _unsafeWindow.__cxDiag = cxDiag; } catch (e) {}

  // ── 现场快照：把当前题目的 DOM 结构导出来，用于定位「为什么填不进去」──
  let CX_LAST_FRAME = null;
  const cxSnapshot = () => {
    const out = [];
    out.push("构建: " + CX_BUILD + "  时间: " + new Date().toLocaleString());
    const f = CX_LAST_FRAME;
    if (!f) { out.push("当前没有活动答题窗口（请先让脚本跑到答题那一步）"); return out.join("\n"); }
    let doc;
    try { doc = f.document; } catch (e) { out.push("跨域，读不到文档"); return out.join("\n"); }
    if (!doc) { out.push("文档为空"); return out.join("\n"); }
    try { out.push("URL: " + f.location.href); } catch (e) {}
    const pick = (sel) => { try { return doc.querySelectorAll(sel); } catch (e) { return []; } };
    const cnt = (scope, sel) => { try { return scope.querySelectorAll(sel).length; } catch (e) { return -1; } };

    let nodes = pick(".TiMu"), kind = ".TiMu";
    if (!nodes.length) { nodes = pick(".questionLi"); kind = ".questionLi"; }
    if (!nodes.length) { nodes = pick(".mark_table"); kind = ".mark_table"; }
    out.push("题目容器 " + kind + " 数量: " + nodes.length);

    if (!nodes.length) {
      out.push("");
      out.push("[诊断] 一个题目容器都没匹配到，说明页面类名变了。候选计数：");
      ["div[class*=TiMu]", "div[class*=question]", "div[class*=mark]", "ul[class*=answer]", "div[class*=answerBg]"].forEach((s) => {
        out.push("  " + s + " → " + pick(s).length);
      });
      try { out.push("[body 前 800 字] " + String(doc.body && doc.body.innerHTML || "").replace(/\s+/g, " ").slice(0, 800)); } catch (e) {}
      return out.join("\n");
    }

    const N = Math.min(nodes.length, 2);
    for (let i = 0; i < N; i++) {
      const t = nodes[i];
      out.push("");
      out.push("===== 第 " + (i + 1) + " 题 =====");
      let inp = null;
      try { inp = t.querySelector('input[id^="answer"]'); } catch (e) {}
      const qid = inp ? String(inp.id).slice(6) : null;
      out.push("#answer 隐藏域: " + (inp ? "#" + inp.id + " = \"" + inp.value + "\"" : "未找到"));
      out.push("qid: " + (qid || "未取到"));
      let at = [];
      try { at = t.querySelectorAll("input[name^=answertype]"); } catch (e) {}
      out.push("answertype input: " + at.length + (at.length ? " value=" + at[0].value : ""));
      out.push("计数 → ul:" + cnt(t, "ul") + "  ul li:" + cnt(t, "ul li") +
        "  li .after:" + cnt(t, "ul li .after") +
        "  li .num_option:" + cnt(t, "li .num_option, li .num_option_dx") +
        "  .answerBg:" + cnt(t, ".answerBg") +
        "  radio/checkbox:" + cnt(t, "input[type=radio], input[type=checkbox]") +
        "  textarea:" + cnt(t, "textarea"));
      if (qid) {
        out.push(".choice" + qid + ": " + pick(".choice" + qid).length +
          "  li[qid='" + qid + "']: " + pick("li[qid='" + qid + "']").length);
      }
      let lis = [];
      try { lis = t.querySelectorAll("ul li"); } catch (e) {}
      for (let k = 0; k < Math.min(lis.length, 6); k++) {
        const li = lis[k];
        let after = null, no = null;
        try { after = li.querySelector(".after"); } catch (e) {}
        try { no = li.querySelector(".num_option, .num_option_dx"); } catch (e) {}
        out.push("  li[" + k + "] class=\"" + String(li.className || "").slice(0, 36) + "\"" +
          "  after=\"" + String(after ? after.textContent : "(无)").replace(/\s+/g, " ").slice(0, 46) + "\"" +
          "  num_option=" + (no ? "\"" + String(no.getAttribute("data") || no.textContent || "").slice(0, 8) + "\"" : "(无)") +
          "  文本=\"" + String(li.textContent || "").replace(/\s+/g, " ").slice(0, 46) + "\"");
      }
      try { out.push("[HTML 前 900 字] " + String(t.innerHTML || "").replace(/\s+/g, " ").slice(0, 900)); } catch (e) {}
    }
    return out.join("\n");
  };
  try { _unsafeWindow.__cxSnap = cxSnapshot; } catch (e) {}

  // ══ MD3 UI 层 ═══════════════════════════════════════════════════════════
  // 设计语言按 Material Design 3：tonal palette + 16/28px 圆角 + 三级 elevation
  // + 标准缓动 cubic-bezier(.2,0,0,1)。所有选择器带 !important 以覆盖 Element Plus。
  const CX_UI_CSS = [
    ":root{",
    "--md-primary:#0061A4;--md-on-primary:#FFFFFF;",
    "--md-primary-container:#D1E4FF;--md-on-primary-container:#001D36;",
    "--md-secondary:#535F70;--md-secondary-container:#D7E3F7;--md-on-secondary-container:#101C2B;",
    "--md-surface:#FAF9FD;--md-surface-2:#EFEEF4;--md-surface-3:#E9E7EF;",
    "--md-on-surface:#1A1C1E;--md-surface-variant:#DFE2EB;--md-on-surface-variant:#43474E;",
    "--md-outline:#73777F;--md-outline-variant:#C3C7CF;",
    "--md-error:#BA1A1A;--md-error-container:#FFDAD6;--md-on-error-container:#410002;",
    "--md-e1:0 1px 2px rgba(0,0,0,.30),0 1px 3px 1px rgba(0,0,0,.15);",
    "--md-e2:0 1px 2px rgba(0,0,0,.30),0 2px 6px 2px rgba(0,0,0,.15);",
    "--md-e3:0 4px 8px 3px rgba(0,0,0,.15),0 1px 3px rgba(0,0,0,.30);",
    "--md-ease:cubic-bezier(.2,0,0,1);",
    "--md-r-sm:8px;--md-r-md:12px;--md-r-lg:16px;--md-r-xl:28px;",
    "--md-font:-apple-system,BlinkMacSystemFont,'Segoe UI','Microsoft YaHei',Roboto,sans-serif;",
    "--md-mono:ui-monospace,'Cascadia Mono',Consolas,'Courier New',monospace",
    "}",

    /* 隐藏旧入口，统一由 FAB 接管 */
    "#cx-tools{display:none!important}",
    "#csbutton[data-v-6ed29f7f],#csbutton[data-v-c3c6b09f]{display:none!important}",
    "#zeokdjg{display:none!important}",

    /* ── FAB ── */
    "#cx-fab{position:fixed;right:20px;bottom:20px;z-index:100001;width:56px;height:56px;",
    "border-radius:16px;border:0;padding:0;cursor:pointer;",
    "background:var(--md-primary-container);color:var(--md-on-primary-container);",
    "box-shadow:var(--md-e2);display:flex;align-items:center;justify-content:center;",
    "font:600 15px/1 var(--md-font);letter-spacing:.5px;",
    "transition:border-radius .25s var(--md-ease),background .25s var(--md-ease),box-shadow .25s var(--md-ease),transform .25s var(--md-ease);",
    "-webkit-tap-highlight-color:transparent;user-select:none}",
    "#cx-fab:hover{box-shadow:var(--md-e3)}",
    "#cx-fab:active{transform:scale(.94)}",
    "#cx-fab.is-active{background:var(--md-primary);color:var(--md-on-primary);border-radius:16px}",
    "#cx-fab.has-alert::after{content:'';position:absolute;top:9px;right:9px;width:8px;height:8px;",
    "border-radius:50%;background:var(--md-error);box-shadow:0 0 0 2px var(--md-primary-container)}",

    /* ── 自绘面板（MD3，可缩放） ── */
    "#cx-panel{position:fixed;z-index:100002;width:560px;height:620px;",
    "display:none;flex-direction:column;background:var(--md-surface);",
    "border:1px solid var(--md-outline-variant);border-radius:var(--md-r-xl);",
    "box-shadow:var(--md-e3);overflow:hidden;font-family:var(--md-font);",
    "color:var(--md-on-surface);min-width:340px;min-height:260px;",
    "transition:box-shadow .2s var(--md-ease)}",
    "#cx-panel.is-shown{display:flex}",
    "#cx-panel.is-dragging,#cx-panel.is-resizing{transition:none!important}",

    ".cx-panel-bar{display:flex;align-items:center;gap:8px;padding:16px 12px 10px 22px;",
    "cursor:move;user-select:none;flex:0 0 auto}",
    ".cx-panel-title{flex:1;font:500 17px/1.4 var(--md-font);letter-spacing:.1px;",
    "white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".cx-panel-x{width:36px;height:36px;flex:0 0 36px;border:0;border-radius:50%;",
    "background:transparent;color:var(--md-on-surface-variant);cursor:pointer;",
    "font:400 19px/1 var(--md-font);display:flex;align-items:center;justify-content:center;",
    "transition:background .15s var(--md-ease),transform .1s var(--md-ease)}",
    ".cx-panel-x:hover{background:var(--md-surface-3)}",
    ".cx-panel-x:active{transform:scale(.92)}",

    ".cx-panel-tabs{display:flex;gap:0;padding:0 14px;flex:0 0 auto;",
    "border-bottom:1px solid var(--md-outline-variant);overflow-x:auto;scrollbar-width:none}",
    ".cx-panel-tabs::-webkit-scrollbar{display:none}",
    ".cx-tab{position:relative;padding:11px 15px 13px;border:0;background:transparent;",
    "cursor:pointer;font:500 13.5px/1 var(--md-font);color:var(--md-on-surface-variant);",
    "white-space:nowrap;border-radius:8px 8px 0 0;",
    "transition:color .15s var(--md-ease),background .15s var(--md-ease)}",
    ".cx-tab:hover{color:var(--md-on-surface);background:var(--md-surface-2)}",
    ".cx-tab.is-active{color:var(--md-primary)}",
    ".cx-tab.is-active::after{content:'';position:absolute;left:15px;right:15px;bottom:-1px;",
    "height:3px;border-radius:3px 3px 0 0;background:var(--md-primary)}",

    ".cx-panel-body{flex:1 1 auto;min-height:0;overflow-y:auto;padding:16px 22px 22px;",
    "scrollbar-width:thin}",
    ".cx-pane{display:none}",
    ".cx-pane.is-active{display:block}",

    ".cx-grip{position:absolute;right:0;bottom:0;width:28px;height:28px;cursor:nwse-resize;",
    "z-index:4;opacity:.5;transition:opacity .15s var(--md-ease);",
    "background:",
    "linear-gradient(135deg,transparent 0 40%,var(--md-outline) 40% 48%,transparent 48%),",
    "linear-gradient(135deg,transparent 0 58%,var(--md-outline) 58% 66%,transparent 66%),",
    "linear-gradient(135deg,transparent 0 76%,var(--md-outline) 76% 84%,transparent 84%)}",
    ".cx-grip:hover{opacity:1}",

    ".cx-kv{display:flex;gap:12px;padding:9px 0;border-bottom:1px solid var(--md-outline-variant);font-size:13px}",
    ".cx-kv:last-child{border-bottom:0}",
    ".cx-kv b{flex:0 0 76px;font-weight:500;color:var(--md-on-surface-variant)}",
    ".cx-kv span{flex:1;color:var(--md-on-surface);word-break:break-word}",

    ".cx-log-toolbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;",
    "padding-bottom:10px;border-bottom:1px solid var(--md-outline-variant)}",
    ".cx-log-line{display:flex;gap:8px;font:11.5px/1.7 var(--md-mono);padding:2px 5px;",
    "border-radius:4px;cursor:pointer;transition:background .12s var(--md-ease)}",
    ".cx-log-line:hover{background:var(--md-surface-2)}",
    ".cx-log-line .t{flex:0 0 auto;color:var(--md-outline)}",
    ".cx-log-line .m{flex:1;white-space:pre-wrap;word-break:break-word;color:var(--md-on-surface)}",
    ".cx-log-line.lv-success .m{color:#1F6E3C}",
    ".cx-log-line.lv-error .m{color:var(--md-error)}",

    ".cx-field{margin-bottom:15px}",
    ".cx-field-label{font:500 13px/1.4 var(--md-font);margin-bottom:5px}",
    ".cx-field-desc{font:400 11.5px/1.5 var(--md-font);color:var(--md-on-surface-variant);margin-top:5px}",
    /* MD3 filled text field：浅底 + 底边线，聚焦时底边加粗变主色 */
    ".cx-input{width:100%;height:44px;padding:0 14px;box-sizing:border-box;",
    "border:0;border-bottom:1px solid var(--md-outline);",
    "border-radius:var(--md-r-sm) var(--md-r-sm) 0 0;",
    "background:var(--md-surface-2);color:var(--md-on-surface);",
    "font:400 13px/1 var(--md-mono);outline:none;",
    "transition:border-color .15s var(--md-ease),background .15s var(--md-ease)}",
    ".cx-input:hover{background:var(--md-surface-3)}",
    ".cx-input:focus{border-bottom:2px solid var(--md-primary);background:var(--md-surface-3)}",

    ".cx-switch{display:inline-flex;align-items:center;gap:10px;cursor:pointer}",
    ".cx-switch input{position:absolute;opacity:0;width:0;height:0}",
    ".cx-switch .track{position:relative;width:48px;height:28px;flex:0 0 48px;border-radius:14px;",
    "background:var(--md-surface-variant);border:2px solid var(--md-outline);box-sizing:border-box;",
    "transition:background .2s var(--md-ease),border-color .2s var(--md-ease)}",
    ".cx-switch .thumb{position:absolute;top:50%;left:3px;width:16px;height:16px;border-radius:50%;",
    "background:var(--md-outline);transform:translateY(-50%);",
    "transition:left .2s var(--md-ease),width .2s var(--md-ease),height .2s var(--md-ease),background .2s var(--md-ease)}",
    ".cx-switch input:checked + .track{background:var(--md-primary);border-color:var(--md-primary)}",
    ".cx-switch input:checked + .track .thumb{left:22px;width:22px;height:22px;background:var(--md-on-primary)}",
    ".cx-switch:hover .track{border-color:var(--md-on-surface-variant)}",

    ".cx-group{margin-bottom:22px}",
    ".cx-group-title{font:600 11.5px/1 var(--md-font);color:var(--md-primary);",
    "letter-spacing:.7px;margin-bottom:12px}",

    ".cx-btn{height:40px;padding:0 22px;border-radius:20px;border:1px solid transparent;",
    "background:var(--md-primary);color:var(--md-on-primary);cursor:pointer;",
    "font:500 13.5px/1 var(--md-font);box-shadow:var(--md-e1);",
    "transition:background .15s var(--md-ease),transform .1s var(--md-ease),box-shadow .15s var(--md-ease),border-color .15s var(--md-ease)}",
    ".cx-btn:hover{box-shadow:var(--md-e2)}",
    ".cx-btn:active{transform:scale(.97)}",
    ".cx-btn.ghost{background:transparent;color:var(--md-primary);border-color:var(--md-outline);box-shadow:none}",
    ".cx-btn.ghost:hover{background:var(--md-primary-container);color:var(--md-on-primary-container);box-shadow:none}",
    ".cx-btn.danger{background:transparent;color:var(--md-error);border-color:var(--md-error);box-shadow:none}",
    ".cx-btn.danger:hover{background:var(--md-error-container)}",
    ".cx-btn.armed{background:var(--md-error-container);color:var(--md-on-error-container);",
    "border-color:var(--md-error);font-weight:600}",
    ".cx-btn.sm{height:32px;padding:0 14px;font-size:12.5px;border-radius:16px}",
    ".cx-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center}",
    ".cx-empty{padding:28px 0;text-align:center;color:var(--md-on-surface-variant);",
    "font:400 13px/1.6 var(--md-font)}",
    ".cx-hint{font:400 12px/1.6 var(--md-font);color:var(--md-on-surface-variant);margin-top:10px}",
    ".cx-sep{height:1px;background:var(--md-outline-variant);margin:16px 0}",

    /* MD3 Snackbar：操作反馈 */
    ".cx-snackbar{position:fixed;left:50%;bottom:28px;transform:translate(-50%,16px);",
    "z-index:100005;padding:12px 18px;border-radius:var(--md-r-sm);",
    "background:#2E3135;color:#F3F3F9;box-shadow:var(--md-e2);",
    "font:500 13px/1.45 var(--md-font);opacity:0;pointer-events:none;",
    "transition:opacity .2s var(--md-ease),transform .2s var(--md-ease);",
    "max-width:min(440px,88vw);word-break:break-word}",
    ".cx-snackbar.is-shown{opacity:1;transform:translate(-50%,0)}",
    ".cx-snackbar.is-error{background:#8C1D18;color:#FFDAD6}",

    /* ── 状态 chip：放在 FAB 正上方，避开工具条所在的那一行 ── */
    "#cx-status{position:fixed;right:20px;bottom:88px;z-index:99999;max-width:min(320px,42vw);",
    "padding:6px 12px;border-radius:var(--md-r-sm);background:var(--md-surface-variant);",
    "color:var(--md-on-surface-variant);font:500 12px/1.45 var(--md-font);box-shadow:var(--md-e1);",
    "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:none;pointer-events:none;",
    "text-align:right}",
    "#cx-status.is-shown{display:block}",

    /* ── Dialog（MD3 大圆角 + 无遮罩） ── */
    ".el-overlay{background:transparent!important}",
    ".el-dialog{border-radius:var(--md-r-xl)!important;box-shadow:var(--md-e3)!important;",
    "padding:0!important;overflow:hidden!important;background:var(--md-surface)!important;",
    "border:1px solid var(--md-outline-variant)!important;margin:0 auto!important}",
    ".el-dialog__header{padding:24px 24px 4px!important;margin:0!important}",
    ".el-dialog__title{font:500 19px/1.4 var(--md-font)!important;color:var(--md-on-surface)!important;letter-spacing:.1px}",
    ".el-dialog__headerbtn{top:18px!important;right:18px!important;border-radius:50%!important;width:32px!important;height:32px!important}",
    ".el-dialog__headerbtn:hover{background:var(--md-surface-2)!important}",
    ".el-dialog__body{padding:10px 24px 10px!important;color:var(--md-on-surface)!important}",
    ".el-dialog__footer{padding:6px 24px 20px!important}",
    ".dialog-footer button:first-child{margin-right:10px}",

    /* ── Tabs → MD3 secondary tabs ── */
    ".el-tabs__header{margin-bottom:12px!important}",
    ".el-tabs__nav-wrap::after{height:1px!important;background:var(--md-outline-variant)!important}",
    ".el-tabs__item{font:500 14px/1 var(--md-font)!important;color:var(--md-on-surface-variant)!important;height:44px!important}",
    ".el-tabs__item.is-active{color:var(--md-primary)!important}",
    ".el-tabs__active-bar{height:3px!important;border-radius:3px 3px 0 0!important;background:var(--md-primary)!important}",
    ".demo-tabs .el-tabs__nav-wrap::after{display:none!important}",
    ".demo-tabs .el-tabs__nav{display:flex!important;justify-content:space-evenly!important}",
    ".demo-tabs .el-tabs__item{flex:1;text-align:center;padding:0 8px!important}",

    /* ── Buttons → MD3 filled / tonal / text ── */
    ".el-button{border-radius:20px!important;height:40px!important;padding:0 20px!important;",
    "font:500 14px/1 var(--md-font)!important;transition:background .15s var(--md-ease),box-shadow .15s var(--md-ease)!important}",
    ".el-button--primary{background:var(--md-primary)!important;border-color:var(--md-primary)!important;",
    "color:var(--md-on-primary)!important;box-shadow:var(--md-e1)!important}",
    ".el-button--primary:hover,.el-button--primary:focus{background:#00497D!important;border-color:#00497D!important;",
    "color:var(--md-on-primary)!important;box-shadow:var(--md-e2)!important}",
    ".el-button--primary.is-plain{background:transparent!important;border-color:var(--md-outline)!important;",
    "color:var(--md-primary)!important;box-shadow:none!important}",
    ".el-button--primary.is-plain:hover{background:var(--md-primary-container)!important;color:var(--md-on-primary-container)!important}",

    /* ── 输入 / 开关 / 卡片 ── */
    ".el-input__wrapper{border-radius:var(--md-r-sm)!important;box-shadow:0 0 0 1px var(--md-outline)!important;",
    "background:var(--md-surface)!important;padding:2px 12px!important}",
    ".el-input__wrapper.is-focus{box-shadow:0 0 0 2px var(--md-primary)!important}",
    ".el-switch.is-checked .el-switch__core{background:var(--md-primary)!important;border-color:var(--md-primary)!important}",
    ".el-card{border-radius:var(--md-r-md)!important;box-shadow:var(--md-e1)!important;border:1px solid var(--md-outline-variant)!important}",
    ".el-tag{border-radius:var(--md-r-sm)!important;font-family:var(--md-font)!important}",
    ".el-divider--horizontal{margin:12px 0!important;border-color:var(--md-outline-variant)!important}",

    /* ── 日志区：等宽 + 舒适行高 ── */
    ".cx_log{margin:0 0 4px!important;display:flex;gap:8px;align-items:flex-start;",
    "font-family:var(--md-mono)!important;font-size:11.5px!important;line-height:1.6!important}",
    ".cx_log .el-text{font-family:inherit!important}",

    /* ── 题目 / 按钮网格 ── */
    ".question_btn{width:40px!important;height:40px!important;border-radius:var(--md-r-sm)!important;margin:4px!important}",
    ".question_div{height:200px}",
    ".question_ti{margin:10px 0 18px}",
    ".el-empty__image{display:none}",
    ".el-empty::before{content:'';display:block;width:32px;height:32px;margin:0 auto 8px;",
    "border:2px solid var(--md-primary-container);border-top-color:var(--md-primary);",
    "border-radius:50%;animation:cx-spin 1.5s linear infinite}",
    "@keyframes cx-spin{to{transform:rotate(360deg)}}",

    /* ── 文本框浮层（MD3） ── */
    "#cx-textbox{position:fixed;inset:0;z-index:100002;background:rgba(0,0,0,.32);",
    "display:flex;align-items:center;justify-content:center}",
    "#cx-textbox .cx-tb-panel{width:min(920px,88vw);height:min(72vh,660px);background:var(--md-surface);",
    "border-radius:var(--md-r-xl);box-shadow:var(--md-e3);display:flex;flex-direction:column;padding:20px;gap:12px}",
    "#cx-textbox textarea{flex:1;width:100%;font:12px/1.6 var(--md-mono);color:var(--md-on-surface);",
    "background:var(--md-surface-2);border:1px solid var(--md-outline-variant);",
    "border-radius:var(--md-r-md);padding:12px;resize:none;box-sizing:border-box;outline:none}",
    "#cx-textbox .cx-tb-bar{display:flex;gap:8px;justify-content:flex-end}",

    /* 暗色 */
    "@media (prefers-color-scheme:dark){",
    ":root{--md-primary:#9ECAFF;--md-on-primary:#003258;--md-primary-container:#00497D;--md-on-primary-container:#D1E4FF;",
    "--md-surface:#111318;--md-surface-2:#1B1E24;--md-surface-3:#23262D;--md-on-surface:#E2E2E9;",
    "--md-surface-variant:#3F444B;--md-on-surface-variant:#C3C7CF;",
    "--md-outline:#8D9199;--md-outline-variant:#3F444B;",
    "--md-error:#FFB4AB;--md-error-container:#93000A;--md-on-error-container:#FFDAD6;",
    "--md-secondary-container:#3B4858;--md-on-secondary-container:#D7E3F7}",
    "}"
  ].join("");

  let _uiCssDone = false;
  const ensureUiCss = () => {
    if (_uiCssDone) return;
    _uiCssDone = true;
    try { GM_addStyle(CX_UI_CSS); } catch (e) { console.log("[UI] 样式注入失败:", e); }
  };

  // 日志自动跟随：MutationObserver 触发（后台也走，不受定时器节流）。
  // 用户手动往上翻时暂停跟随，滚回底部自动恢复。
  const bindLogFollow = (doc) => {
    let userUp = false, queued = false;
    const tick = () => {
      queued = false;
      try {
        doc.querySelectorAll(".el-scrollbar__wrap").forEach((w) => {
          if (!w.querySelector(".cx_log")) return;
          if (!w.dataset.cxBound) {
            w.dataset.cxBound = "1";
            w.addEventListener("scroll", () => {
              userUp = (w.scrollHeight - w.scrollTop - w.clientHeight) > 48;
            }, { passive: true });
          }
          if (!userUp) w.scrollTop = w.scrollHeight;
        });
      } catch (e) {}
    };
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(tick);
    });
    try { mo.observe(doc.body, { childList: true, subtree: true }); } catch (e) {}
    return { stop: () => mo.disconnect(), tick };
  };

  // ── 页面内诊断面板：不依赖 F12 ────────────────────────────────────────
  const cxShowText = (doc, text) => {
    try {
      const old = doc.getElementById("cx-textbox");
      if (old) old.remove();
      const mask = doc.createElement("div");
      mask.id = "cx-textbox";
      const wrap = doc.createElement("div");
      wrap.className = "cx-tb-panel";
      const ta = doc.createElement("textarea");
      ta.value = text;
      ta.readOnly = true;
      const bar = doc.createElement("div");
      bar.className = "cx-tb-bar";
      const cp = doc.createElement("button");
      cp.type = "button";
      cp.className = "el-button el-button--primary";
      cp.textContent = "全选复制";
      cp.onclick = () => { ta.focus(); ta.select(); try { doc.execCommand("copy"); } catch (e) {} };
      const cl = doc.createElement("button");
      cl.type = "button";
      cl.className = "el-button";
      cl.textContent = "关闭";
      cl.style.background = "transparent";
      cl.style.border = "1px solid var(--md-outline)";
      cl.onclick = () => mask.remove();
      bar.appendChild(cp); bar.appendChild(cl);
      wrap.appendChild(ta); wrap.appendChild(bar); mask.appendChild(wrap);
      doc.body.appendChild(mask);
      ta.focus(); ta.select();
    } catch (e) { console.log("[UI] 浮层创建失败:", e); }
  };

  // ── 自绘 UI：一个面板装下全部功能 ────────────────────────────────────
  // 原脚本把「运行框」和「配置」做成两个独立 el-dialog，由 Vue 组件的
  // dialogVisible / dialogV 控制，位置和层级都不受控（draggable 累加 transform
  // 会越拖越偏），而且 dialogVisible 初始就是 true —— 一进页面就弹窗。
  // 这里改为完全自绘：一个可拖面板 + 五个 tab，配置直接读写 GM 存储，
  // 运行状态从 askStore 轮询。原 dialog 按标题识别后整体隐藏（display:none），
  // 只保留它们的数据层（askStore 与 getConfig 仍在用）。
  const injectDiagUI = (askStore) => {
    try {
      const W = _unsafeWindow;
      const doc = (W.top && W.top.document) ? W.top.document : document;
      ensureUiCss();
      if (doc.getElementById("cx-panel")) return;

      const push = (level, text) => { if (askStore) { try { askStore.log(text, level); } catch (e) {} } };
      const el = (tag, cls, txt) => {
        const n = doc.createElement(tag);
        if (cls) n.className = cls;
        if (txt != null) n.textContent = txt;
        return n;
      };

      // ══ 骨架 ══
      const panel = doc.createElement("div");
      panel.id = "cx-panel";

      const bar = el("div", "cx-panel-bar");
      const titleEl = el("div", "cx-panel-title", "学习通AI学习助手");
      const xBtn = el("button", "cx-panel-x", "\u00d7");
      xBtn.type = "button";
      bar.appendChild(titleEl);
      bar.appendChild(xBtn);

      const tabsEl = el("div", "cx-panel-tabs");
      const bodyEl = el("div", "cx-panel-body");

      const TABS = [
        { id: "run", label: "运行" },
        { id: "log", label: "日志" },
        { id: "cfg", label: "配置" },
        { id: "tool", label: "工具" },
        { id: "msg", label: "声明" }
      ];
      const panes = {};
      TABS.forEach((t) => {
        const b = el("button", "cx-tab", t.label);
        b.type = "button";
        b.dataset.tab = t.id;
        tabsEl.appendChild(b);
        const p = el("div", "cx-pane");
        p.dataset.pane = t.id;
        bodyEl.appendChild(p);
        panes[t.id] = p;
      });

      panel.appendChild(bar);
      panel.appendChild(tabsEl);
      panel.appendChild(bodyEl);

      // 右下角缩放把手
      const grip = el("div", "cx-grip");
      grip.title = "拖动调整窗口大小";
      panel.appendChild(grip);

      // MD3 Snackbar：操作反馈（复制成功 / 失败等）
      const snack = el("div", "cx-snackbar");
      let snackTimer = 0;
      const toast = (msg, isErr) => {
        try {
          snack.textContent = msg;
          snack.classList.toggle("is-error", !!isErr);
          snack.classList.add("is-shown");
          clearTimeout(snackTimer);
          snackTimer = setTimeout(() => snack.classList.remove("is-shown"), 2200);
        } catch (e) {}
      };

      // 统一的复制入口：优先剪贴板，失败弹文本框兜底
      const copyText = (text, okMsg) => {
        let ok = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
            ok = true;
          }
        } catch (e) {}
        try { W.__cxLogText = text; } catch (e) {}
        if (ok) {
          toast(okMsg || "已复制到剪贴板");
        } else {
          toast("剪贴板不可用，已弹出文本框供手动复制", true);
          cxShowText(doc, text);
        }
        return ok;
      };

      // ══ FAB 与状态 chip ══
      const fab = doc.createElement("button");
      fab.id = "cx-fab";
      fab.type = "button";
      fab.textContent = "AI";
      fab.title = "学习通 AI 助手";

      const chip = el("div", "cx-status");
      chip.id = "cx-status";

      // ══ 显隐 ══
      let curTab = "run";
      const isShown = () => panel.classList.contains("is-shown");
      const markActive = () => { fab.classList.toggle("is-active", isShown()); };
      const show = () => { panel.classList.add("is-shown"); markActive(); };
      const hide = () => { panel.classList.remove("is-shown"); markActive(); };
      const toggle = () => { if (isShown()) hide(); else show(); };
      xBtn.onclick = (e) => { e.stopPropagation(); hide(); };
      fab.onclick = (e) => { e.stopPropagation(); toggle(); };

      // ══ 运行 ══
      const renderRun = () => {
        const p = panes.run;
        p.textContent = "";
        const t = askStore ? askStore.task : null;
        [
          ["任务", t ? (t.name || "-") : "-"],
          ["状态", t ? (t.status || "(空闲)") : "-"],
          ["题目", askStore ? (String(askStore.count || 0) + " 题") : "-"],
          ["构建", CX_BUILD]
        ].forEach((r) => {
          const d = el("div", "cx-kv");
          d.appendChild(el("b", null, r[0]));
          d.appendChild(el("span", null, r[1]));
          p.appendChild(d);
        });
        const w = (t && t.work) ? t.work : null;
        if (w && w.questionList && w.questionList.length) {
          p.appendChild(el("div", "cx-sep"));
          const idx = Math.min(Math.max(w.inx || 0, 0), w.questionList.length - 1);
          const q = w.questionList[idx];
          const d = el("div", "cx-kv");
          d.appendChild(el("b", null, "当前题"));
          d.appendChild(el("span", null, "#" + (idx + 1) + " / " + w.questionList.length));
          p.appendChild(d);
          if (q) p.appendChild(el("div", "cx-hint", String(q.title || q.text || "").slice(0, 400)));
        }
      };

      // ══ 日志：增量渲染 + 复制/清屏工具条 + 自动跟随 ══
      // 旧实现每 400ms 全量重建 DOM，几百条时会闪烁卡顿，看起来像「日志没在动」。
      // 现在只 append 新增行，容器和已有节点都不动。
      let logBuilt = false, logCount = 0;

      const makeLogLine = (it) => {
        const line = el("div", "cx-log-line lv-" + (it.type || "info"));
        line.appendChild(el("span", "t", it.time || ""));
        line.appendChild(el("span", "m", it.msg || ""));
        line.title = "点击复制这条";
        line.onclick = () => copyText((it.time || "") + " " + (it.msg || ""), "已复制该行");
        return line;
      };

      const buildLogPane = () => {
        if (logBuilt) return;
        logBuilt = true;
        const p = panes.log;
        p.textContent = "";

        const tb = el("div", "cx-log-toolbar");
        const copyAll = el("button", "cx-btn sm ghost", "复制全部");
        copyAll.type = "button";
        copyAll.onclick = () => {
          const logs = (askStore && askStore.task && askStore.task.log) ? askStore.task.log : [];
          if (!logs.length) { toast("暂无日志", true); return; }
          copyText(logs.map((i) => i.time + " " + i.msg).join("\n"), "已复制 " + logs.length + " 行");
        };
        const cleanBtn = el("button", "cx-btn sm ghost", "清屏");
        cleanBtn.type = "button";
        cleanBtn.onclick = () => {
          const list = p.querySelector(".cx-log-list");
          if (list) list.textContent = "";
          logCount = 0;
          toast("已清屏（只清显示，不动数据）");
        };
        const meta = el("span", "cx-log-meta cx-hint");
        meta.style.marginLeft = "auto";
        tb.appendChild(copyAll);
        tb.appendChild(cleanBtn);
        tb.appendChild(meta);
        p.appendChild(tb);
        p.appendChild(el("div", "cx-log-list"));
      };

      const renderLog = (force) => {
        buildLogPane();
        const p = panes.log;
        const list = p.querySelector(".cx-log-list");
        if (!list) return;
        const logs = (askStore && askStore.task && askStore.task.log) ? askStore.task.log : [];

        // 条数变少（被 keepLog 截断）或强制刷新时重建
        if (force || logs.length < logCount) {
          list.textContent = "";
          logCount = 0;
        }

        const atBottom = bodyEl.scrollTop + bodyEl.clientHeight >= bodyEl.scrollHeight - 40;

        if (logs.length > logCount) {
          const frag = doc.createDocumentFragment();
          for (let i = logCount; i < logs.length; i++) frag.appendChild(makeLogLine(logs[i]));
          if (logCount === 0) list.appendChild(frag);
          else list.appendChild(frag);
          logCount = logs.length;
        }

        const meta = p.querySelector(".cx-log-meta");
        if (meta) meta.textContent = logs.length ? ("共 " + logs.length + " 条 · 点任意行复制") : "";

        if (curTab === "log" && (force || atBottom)) {
          requestAnimationFrame(() => { bodyEl.scrollTop = bodyEl.scrollHeight; });
        }
      };

      // ══ 配置 ══
      const CFG_GROUPS = [
        { title: "接口", items: [
          { k: "thtoken", label: "API Key", type: "input", desc: "保存在本地，不会上传" },
          { k: "aiApiUrl", label: "API 地址", type: "input", desc: "留空 = DeepSeek；只填域名或只到 /v1 会自动补全 /v1/chat/completions" },
          { k: "aiModel", label: "模型名称", type: "input", desc: "必须是服务商文档里的准确 ID，留空默认 deepseek-chat" }
        ] },
        { title: "章节", items: [
          { k: "autoAnswer", label: "自动答题", type: "switch" },
          { k: "autoVideo", label: "自动视频", type: "switch" },
          { k: "autoJump", label: "自动切换", type: "switch" },
          { k: "autoSubmit", label: "自动提交", type: "switch" },
          { k: "answerInterval", label: "答题间隔(秒)", type: "number", desc: "每题之间的等待，下限 0.1；1~2 稳，0.3~0.5 很快" },
          { k: "interval", label: "任务间隔(秒)", type: "number", desc: "任务点（视频/测验/文档）之间的等待" },
          { k: "videoRateOn", label: "视频倍速开关", type: "switch" },
          { k: "videoRate", label: "视频倍速", type: "number", desc: "1 ~ 16。播放器把倍速夹到上限时日志会打印实际值" },
          { k: "videoMute", label: "视频静音", type: "switch" },
          { k: "videoKeepAlive", label: "后台保持播放", type: "switch", desc: "切标签页 / 最小化 / 小窗时不暂停" }
        ] },
        { title: "考试", items: [
          { k: "autoExam", label: "考试自动切换", type: "switch" }
        ] },
        { title: "其他", items: [
          { k: "keepLog", label: "日志保留条数", type: "number", desc: "20 ~ 2000，默认 300" },
          { k: "debugger", label: "调试模式", type: "switch", desc: "打开平台原本被阻断的调试能力" }
        ] }
      ];

      let cfgBuilt = false;
      const renderCfg = () => {
        if (cfgBuilt) return;
        cfgBuilt = true;
        const p = panes.cfg;
        const cfg = getConfig();

        CFG_GROUPS.forEach((g) => {
          const box = el("div", "cx-group");
          box.appendChild(el("div", "cx-group-title", g.title));
          g.items.forEach((f) => {
            const fd = el("div", "cx-field");
            fd.appendChild(el("div", "cx-field-label", f.label));
            if (f.type === "switch") {
              const sw = el("label", "cx-switch");
              const cb = doc.createElement("input");
              cb.type = "checkbox";
              cb.dataset.k = f.k;
              cb.checked = cfg[f.k] !== false;
              const track = el("span", "track");
              track.appendChild(el("span", "thumb"));
              sw.appendChild(cb);
              sw.appendChild(track);
              fd.appendChild(sw);
            } else {
              const inp = doc.createElement("input");
              inp.className = "cx-input";
              inp.dataset.k = f.k;
              inp.type = (f.type === "number") ? "number" : "text";
              if (f.type === "number") inp.step = "0.1";
              inp.value = (cfg[f.k] == null) ? "" : String(cfg[f.k]);
              fd.appendChild(inp);
            }
            if (f.desc) fd.appendChild(el("div", "cx-field-desc", f.desc));
            box.appendChild(fd);
          });
          p.appendChild(box);
        });

        const row = el("div", "cx-actions");
        const saveBtn = el("button", "cx-btn", "保存");
        saveBtn.type = "button";
        const reloadBtn = el("button", "cx-btn ghost", "重新载入");
        reloadBtn.type = "button";

        saveBtn.onclick = () => {
          const base = getConfig();
          let bad = "";
          CFG_GROUPS.forEach((g) => {
            g.items.forEach((f) => {
              const inp = p.querySelector('[data-k="' + f.k + '"]');
              if (!inp) return;
              if (f.type === "switch") {
                base[f.k] = !!inp.checked;
              } else if (f.type === "number") {
                const v = parseFloat(inp.value);
                if (!isFinite(v)) { bad = f.label; return; }
                base[f.k] = v;
              } else {
                base[f.k] = String(inp.value).trim();
              }
            });
          });
          if (bad) { push("error", "「" + bad + "」不是有效数字，未保存"); return; }
          try {
            _GM_setValue("config", JSON.parse(JSON.stringify(base)));
            push("success", "配置已保存。答题间隔 / 任务间隔 / 倍速当章生效；API 地址、模型、Key 需刷新页面");
            renderRun();
          } catch (e) {
            push("error", "保存失败：" + (e && e.message ? e.message : e));
          }
        };
        reloadBtn.onclick = () => {
          cfgBuilt = false;
          panes.cfg.textContent = "";
          renderCfg();
        };
        row.appendChild(saveBtn);
        row.appendChild(reloadBtn);
        p.appendChild(row);
        p.appendChild(el("div", "cx-hint", "所有字段都在这里，原脚本的配置弹窗已隐藏。"));
      };

      // ══ 工具 ══
      let toolBuilt = false;
      const renderTool = () => {
        if (toolBuilt) return;
        toolBuilt = true;
        const p = panes.tool;

        const mk = (label, cls, fn) => {
          const b = el("button", "cx-btn " + (cls || ""), label);
          b.type = "button";
          b.onclick = () => { try { fn(b); } catch (e) { push("error", String(e)); } };
          return b;
        };

        const row1 = el("div", "cx-actions");
        row1.appendChild(mk("诊断", "ghost", async () => {
          push("info", "──────── 诊断开始 ────────");
          select("log");
          try { await cxDiag(push); } catch (e) { push("error", "诊断异常：" + (e && e.message ? e.message : e)); }
          push("success", "──────── 诊断结束 ────────");
          select("log");
        }));
        row1.appendChild(mk("抓现场", "ghost", () => {
          const text = cxSnapshot();
          try { console.warn("[现场快照]\n" + text); } catch (e) {}
          copyText(text, "现场快照已复制到剪贴板");
          push("info", "已抓取现场快照");
        }));
        row1.appendChild(mk("导出日志", "ghost", () => {
          let text = "";
          try { text = (askStore ? askStore.task.log : []).map((i) => i.time + " " + i.msg).join("\n"); } catch (e) {}
          if (!text) { toast("暂无日志可导出", true); return; }
          try { console.log("[日志导出] 共 " + text.split("\n").length + " 行\n" + text); } catch (e) {}
          copyText(text, "已复制 " + text.split("\n").length + " 行到剪贴板");
          push("success", "已导出 " + text.split("\n").length + " 行");
        }));
        p.appendChild(row1);

        p.appendChild(el("div", "cx-sep"));

        const row2 = el("div", "cx-actions");
        let armed = false, armTimer = 0;
        row2.appendChild(mk("清空答案缓存", "danger", (btn) => {
          if (!armed) {
            armed = true;
            btn.classList.add("armed");
            btn.textContent = "再点一次确认";
            clearTimeout(armTimer);
            armTimer = setTimeout(() => {
              armed = false;
              btn.classList.remove("armed");
              btn.textContent = "清空答案缓存";
            }, 2000);
            return;
          }
          clearTimeout(armTimer);
          armed = false;
          btn.classList.remove("armed");
          btn.textContent = "清空答案缓存";
          const n = Object.keys(ansCacheLoad()).length;
          try { _GM_setValue(ANS_CACHE_KEY, {}); } catch (e) {}
          push("success", "答案缓存已清空 " + n + " 条");
        }));
        p.appendChild(row2);
        p.appendChild(el("div", "cx-hint", "诊断会检查端点、可用模型列表与参数阶梯；抓现场导出当前题目的 DOM 结构。两者都不清空既有日志。"));
      };

      // ══ 声明 ══
      let msgBuilt = false;
      const renderMsg = () => {
        if (msgBuilt) return;
        msgBuilt = true;
        const p = panes.msg;
        const link = 'style="color:var(--md-primary);text-decoration:none" target="_blank" rel="noopener"';
        p.innerHTML =
          '<h3 style="margin:0 0 10px;font:500 15px/1.4 inherit">本脚本仅用于学习交流，请 24h 内删除</h3>' +
          '<p style="margin:0 0 10px;font-size:13px;color:var(--md-error)">禁止用于各种非法用途，否则后果自负</p>' +
          '<p style="margin:0 0 12px;font-size:13px;line-height:1.7">答案由 AI 大语言模型生成，准确率不保证 100%，请自行判断、评估是否使用。</p>' +
          '<div class="cx-sep"></div>' +
          '<p style="margin:0 0 6px;font:12px/1.6 var(--md-mono);color:var(--md-on-surface-variant)">构建：' + CX_BUILD + '</p>' +
          '<p style="margin:0 0 6px;font-size:12px;color:var(--md-on-surface-variant)">AI 能力由 <a href="https://www.deepseek.com" ' + link + '>DeepSeek</a> 等大模型提供 · 原脚本 by <a href="https://github.com/March-OwO/Xuexitong-LLM-Assistant" ' + link + '>March-OwO</a></p>' +
          '<p style="margin:0;font-size:12px;line-height:1.9"><a href="https://github.com/Phiedeir/Xuexitong-LLM-Assistant" ' + link + '>GitHub 仓库</a> · ' +
          '<a href="https://github.com/Phiedeir/Xuexitong-LLM-Assistant/blob/main/CHANGELOG.md" ' + link + '>更新日志</a> · ' +
          '<a href="https://github.com/Phiedeir/Xuexitong-LLM-Assistant/issues" ' + link + '>反馈</a></p>';
      };

      // ══ tab 切换 ══
      const select = (id) => {
        curTab = id;
        tabsEl.querySelectorAll(".cx-tab").forEach((b) => b.classList.toggle("is-active", b.dataset.tab === id));
        Object.keys(panes).forEach((k) => panes[k].classList.toggle("is-active", k === id));
        if (id === "run") renderRun();
        if (id === "log") renderLog(true);
        if (id === "cfg") renderCfg();
        if (id === "tool") renderTool();
        if (id === "msg") renderMsg();
        try { bodyEl.scrollTop = 0; } catch (e) {}
      };
      tabsEl.addEventListener("click", (e) => {
        const b = (e.target && e.target.closest) ? e.target.closest(".cx-tab") : null;
        if (b && b.dataset.tab) select(b.dataset.tab);
      });

      // ══ 拖动 + 缩放 + 位置/尺寸记忆 ══
      const POS_KEY = "uiPanelPos";
      const SIZE_KEY = "uiPanelSize";
      let pos = null, size = null;
      try { pos = _GM_getValue(POS_KEY); } catch (e) {}
      try { size = _GM_getValue(SIZE_KEY); } catch (e) {}

      let px = (pos && isFinite(pos.x)) ? pos.x : null;
      let py = (pos && isFinite(pos.y)) ? pos.y : null;
      let pw = (size && isFinite(size.w)) ? size.w : null;
      let ph = (size && isFinite(size.h)) ? size.h : null;
      let placed = false;
      const vw = () => (W.innerWidth || doc.documentElement.clientWidth || 1200);
      const vh = () => (W.innerHeight || doc.documentElement.clientHeight || 800);
      const MIN_W = 340, MIN_H = 260;

      // 宽高按视口比例给默认值，夹在合理区间内，再夹进视口
      const applyBox = () => {
        if (pw === null) pw = Math.round(Math.min(600, Math.max(MIN_W, vw() * 0.42)));
        if (ph === null) ph = Math.round(Math.min(660, Math.max(MIN_H, vh() * 0.74)));
        pw = Math.min(Math.max(pw, MIN_W), Math.max(MIN_W, vw() - 16));
        ph = Math.min(Math.max(ph, MIN_H), Math.max(MIN_H, vh() - 16));
        try {
          panel.style.setProperty("width", pw + "px", "important");
          panel.style.setProperty("height", ph + "px", "important");
        } catch (e) {}

        if (!placed) {
          placed = true;
          if (px === null) px = Math.round((vw() - pw) / 2);
          if (py === null) py = Math.round(Math.max(44, vh() * 0.08));
        }
        px = Math.min(Math.max(px, 8), Math.max(8, vw() - pw - 8));
        py = Math.min(Math.max(py, 8), Math.max(8, vh() - ph - 8));
        try {
          panel.style.setProperty("left", px + "px", "important");
          panel.style.setProperty("top", py + "px", "important");
        } catch (e) {}
      };

      // 拖动（标题栏）
      let drag = null;
      bar.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        if (e.target === xBtn || xBtn.contains(e.target)) return;
        e.preventDefault();
        panel.classList.add("is-dragging");
        drag = { sx: e.clientX, sy: e.clientY, ox: px, oy: py };
      });
      doc.addEventListener("mousemove", (e) => {
        if (!drag) return;
        px = drag.ox + (e.clientX - drag.sx);
        py = drag.oy + (e.clientY - drag.sy);
        applyBox();
      }, true);
      doc.addEventListener("mouseup", () => {
        if (!drag) return;
        drag = null;
        panel.classList.remove("is-dragging");
        try { _GM_setValue(POS_KEY, { x: px, y: py }); } catch (e) {}
      }, true);

      // 缩放（右下角把手）
      let sizing = null;
      grip.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        panel.classList.add("is-resizing");
        sizing = { sx: e.clientX, sy: e.clientY, ow: pw, oh: ph };
      });
      doc.addEventListener("mousemove", (e) => {
        if (!sizing) return;
        pw = sizing.ow + (e.clientX - sizing.sx);
        ph = sizing.oh + (e.clientY - sizing.sy);
        applyBox();
      }, true);
      doc.addEventListener("mouseup", () => {
        if (!sizing) return;
        sizing = null;
        panel.classList.remove("is-resizing");
        try { _GM_setValue(SIZE_KEY, { w: pw, h: ph }); } catch (e) {}
      }, true);

      try { W.addEventListener("resize", () => { try { applyBox(); } catch (e) {} }); } catch (e) {}

      // ══ 落盘 & 隐藏原 dialog ══
      doc.body.appendChild(chip);
      doc.body.appendChild(panel);
      doc.body.appendChild(fab);
      doc.body.appendChild(snack);

      // 原脚本 dialogVisible 初始为 true，两个 el-dialog 会直接弹出来。
      // 按标题识别并隐藏整个 overlay，只留数据层。
      const hideOwnDialogs = () => {
        try {
          doc.querySelectorAll(".el-dialog").forEach((d) => {
            const t = d.querySelector(".el-dialog__title");
            if (!t || !/学习通AI学习助手/.test(t.textContent || "")) return;
            const ov = (d.closest && d.closest(".el-overlay")) || null;
            if (ov) ov.style.setProperty("display", "none", "important");
            else d.style.setProperty("display", "none", "important");
          });
        } catch (e) {}
      };
      hideOwnDialogs();
      let hideQueued = false;
      new MutationObserver(() => {
        if (hideQueued) return;
        hideQueued = true;
        requestAnimationFrame(() => { hideQueued = false; hideOwnDialogs(); });
      }).observe(doc.body, { childList: true, subtree: true });

      // ══ 轮询：驱动运行页、日志页与状态 chip ══
      let lastRunKey = "", lastChip = "";
      setInterval(() => {
        try {
          if (isShown()) {
            if (curTab === "run") {
              const t = askStore ? askStore.task : null;
              const k = (t ? (t.name + "|" + t.status + "|" + ((t.work && t.work.inx != null) ? t.work.inx : "")) : "") +
                        "|" + (askStore ? askStore.count : "");
              if (k !== lastRunKey) { lastRunKey = k; renderRun(); }
            } else if (curTab === "log") {
              renderLog(false);
            }
          }
          const st = askStore ? String(askStore.task.status || askStore.task.name || "") : "";
          if (st !== lastChip) {
            lastChip = st;
            chip.textContent = st;
            chip.classList.toggle("is-shown", !!st && st !== "执行任务中");
            fab.classList.toggle("has-alert", /失败|错误|异常/.test(st));
          }
        } catch (e) {}
      }, 400);

      // ══ 初始化 ══
      select("run");
      applyBox();
      console.log("[UI] 自绘面板就绪：运行 / 日志 / 配置 / 工具 / 声明，可拖可缩放，原 el-dialog 已隐藏");
    } catch (e) { console.log("[UI] 注入失败:", e); }
  };

  // ── 后台 / 小窗保持播放 ──────────────────────────────────────────────
  // 学习通的播放器监听 visibilitychange 与 blur，页面一失焦就 pause()，所以
  // 「切标签页 / 最小化 / 开画中画」都会中断。三层抵消：
  //   ① 伪装 document.hidden / visibilityState —— 主防线，监听器即使触发也读到「可见」
  //   ② 捕获阶段掐断事件 —— 只能拦住脚本注入之后注册的监听器，作为补充
  //   ③ 用媒体时钟驱动恢复 —— timeupdate 在后台仍按 ~4Hz 触发（媒体解码不受
  //      定时器节流影响），比 setInterval 可靠：后台标签页的定时器会被 Chrome
  //      节流到 1 次/分钟，纯靠轮询要等很久才能恢复。
  const maskVisibility = (win) => {
    const report = { hiddenPatched: false, focusPatched: false, eventsKilled: [] };
    if (!win) return report;
    let d = null;
    try { d = win.document; } catch (e) { return report; }
    if (!d) return report;

    const asFalse = { get: () => false, configurable: true };
    const asVisible = { get: () => "visible", configurable: true };
    ["hidden", "webkitHidden", "msHidden"].forEach((p) => {
      try { Object.defineProperty(d, p, asFalse); report.hiddenPatched = true; } catch (e) {}
    });
    ["visibilityState", "webkitVisibilityState", "msVisibilityState"].forEach((p) => {
      try { Object.defineProperty(d, p, asVisible); } catch (e) {}
    });
    try { d.hasFocus = function () { return true; }; report.focusPatched = true; } catch (e) {}

    const kill = function (e) { try { e.stopImmediatePropagation(); } catch (err) {} };
    ["visibilitychange", "webkitvisibilitychange", "blur", "focusout", "pagehide", "freeze"].forEach(function (t) {
      try { win.addEventListener(t, kill, true); report.eventsKilled.push(t); } catch (e) {}
      try { d.addEventListener(t, kill, true); } catch (e) {}
    });
    return report;
  };

  // 缓存管理：__cxCacheStat() 看命中规模；__cxClearCache() 清空
  try {
    _unsafeWindow.__cxCacheStat = () => {
      const o = ansCacheLoad(), ks = Object.keys(o);
      console.log("[答案缓存] 共 " + ks.length + " 条（上限 " + ANS_CACHE_MAX + "）");
      return ks.length;
    };
    _unsafeWindow.__cxClearCache = () => {
      const n = Object.keys(ansCacheLoad()).length;
      try { _GM_setValue(ANS_CACHE_KEY, {}); } catch (e) {}
      console.log("[答案缓存] 已清空 " + n + " 条");
      return n;
    };
  } catch (e) {}

  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
  }

  // ══════════ Typr 字体解析（学习通 font-cxsecret 反混淆用，原样保留）══════════
  var Typr = { parse: function(buff) {
    var bin = Typr._bin, data = new Uint8Array(buff), offset = 0;
    bin.readFixed(data, offset), offset += 4;
    var numTables = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2;
    for (var tags = ["cmap", "head", "hhea", "maxp", "hmtx", "name", "OS/2", "post", "loca", "glyf", "kern", "CFF ", "GPOS", "GSUB", "SVG "], obj = { _data: data }, tabs = {}, i = 0; i < numTables; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4, bin.readUint(data, offset), offset += 4;
      var toffset = bin.readUint(data, offset);
      offset += 4;
      var length = bin.readUint(data, offset);
      offset += 4, tabs[tag] = { offset: toffset, length };
    }
    for (i = 0; i < tags.length; i++) {
      var t = tags[i];
      tabs[t] && (obj[t.trim()] = Typr[t.trim()].parse(data, tabs[t].offset, tabs[t].length, obj));
    }
    return obj;
  }, _tabOffset: function(data, tab) {
    for (var bin = Typr._bin, numTables = bin.readUshort(data, 4), offset = 12, i = 0; i < numTables; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4, bin.readUint(data, offset), offset += 4;
      var toffset = bin.readUint(data, offset);
      if (offset += 4, bin.readUint(data, offset), offset += 4, tag == tab)
        return toffset;
    }
    return 0;
  } };
  Typr._bin = { readFixed: function(data, o) {
    return (data[o] << 8 | data[o + 1]) + (data[o + 2] << 8 | data[o + 3]) / 65540;
  }, readF2dot14: function(data, o) {
    return Typr._bin.readShort(data, o) / 16384;
  }, readInt: function(buff, p) {
    var a = Typr._bin.t.uint8;
    return a[0] = buff[p + 3], a[1] = buff[p + 2], a[2] = buff[p + 1], a[3] = buff[p], Typr._bin.t.int32[0];
  }, readInt8: function(buff, p) {
    return Typr._bin.t.uint8[0] = buff[p], Typr._bin.t.int8[0];
  }, readShort: function(buff, p) {
    var a = Typr._bin.t.uint8;
    return a[1] = buff[p], a[0] = buff[p + 1], Typr._bin.t.int16[0];
  }, readUshort: function(buff, p) {
    return buff[p] << 8 | buff[p + 1];
  }, readUshorts: function(buff, p, len) {
    for (var arr = [], i = 0; i < len; i++)
      arr.push(Typr._bin.readUshort(buff, p + 2 * i));
    return arr;
  }, readUint: function(buff, p) {
    var a = Typr._bin.t.uint8;
    return a[3] = buff[p], a[2] = buff[p + 1], a[1] = buff[p + 2], a[0] = buff[p + 3], Typr._bin.t.uint32[0];
  }, readUint64: function(buff, p) {
    return 4294967296 * Typr._bin.readUint(buff, p) + Typr._bin.readUint(buff, p + 4);
  }, readASCII: function(buff, p, l) {
    for (var s = "", i = 0; i < l; i++)
      s += String.fromCharCode(buff[p + i]);
    return s;
  }, readUnicode: function(buff, p, l) {
    for (var s = "", i = 0; i < l; i++) {
      var c = buff[p++] << 8 | buff[p++];
      s += String.fromCharCode(c);
    }
    return s;
  }, _tdec: window.TextDecoder ? new window.TextDecoder() : null, readUTF8: function(buff, p, l) {
    var tdec = Typr._bin._tdec;
    return tdec && 0 == p && l == buff.length ? tdec.decode(buff) : Typr._bin.readASCII(buff, p, l);
  }, readBytes: function(buff, p, l) {
    for (var arr = [], i = 0; i < l; i++)
      arr.push(buff[p + i]);
    return arr;
  }, readASCIIArray: function(buff, p, l) {
    for (var s = [], i = 0; i < l; i++)
      s.push(String.fromCharCode(buff[p + i]));
    return s;
  } }, Typr._bin.t = { buff: new ArrayBuffer(8) }, Typr._bin.t.int8 = new Int8Array(Typr._bin.t.buff), Typr._bin.t.uint8 = new Uint8Array(Typr._bin.t.buff), Typr._bin.t.int16 = new Int16Array(Typr._bin.t.buff), Typr._bin.t.uint16 = new Uint16Array(Typr._bin.t.buff), Typr._bin.t.int32 = new Int32Array(Typr._bin.t.buff), Typr._bin.t.uint32 = new Uint32Array(Typr._bin.t.buff), Typr._lctf = {}, Typr._lctf.parse = function(data, offset, length, font, subt) {
    var bin = Typr._bin, obj = {}, offset0 = offset;
    bin.readFixed(data, offset), offset += 4;
    var offScriptList = bin.readUshort(data, offset);
    offset += 2;
    var offFeatureList = bin.readUshort(data, offset);
    offset += 2;
    var offLookupList = bin.readUshort(data, offset);
    return offset += 2, obj.scriptList = Typr._lctf.readScriptList(data, offset0 + offScriptList), obj.featureList = Typr._lctf.readFeatureList(data, offset0 + offFeatureList), obj.lookupList = Typr._lctf.readLookupList(data, offset0 + offLookupList, subt), obj;
  }, Typr._lctf.readLookupList = function(data, offset, subt) {
    var bin = Typr._bin, offset0 = offset, obj = [], count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var lut = Typr._lctf.readLookupTable(data, offset0 + noff, subt);
      obj.push(lut);
    }
    return obj;
  }, Typr._lctf.readLookupTable = function(data, offset, subt) {
    var bin = Typr._bin, offset0 = offset, obj = { tabs: [] };
    obj.ltype = bin.readUshort(data, offset), offset += 2, obj.flag = bin.readUshort(data, offset), offset += 2;
    var cnt = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var tab = subt(data, obj.ltype, offset0 + noff);
      obj.tabs.push(tab);
    }
    return obj;
  }, Typr._lctf.numOfOnes = function(n) {
    for (var num = 0, i = 0; i < 32; i++)
      0 != (n >>> i & 1) && num++;
    return num;
  }, Typr._lctf.readClassDef = function(data, offset) {
    var bin = Typr._bin, obj = [], format = bin.readUshort(data, offset);
    if (offset += 2, 1 == format) {
      var startGlyph = bin.readUshort(data, offset);
      offset += 2;
      var glyphCount = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < glyphCount; i++)
        obj.push(startGlyph + i), obj.push(startGlyph + i), obj.push(bin.readUshort(data, offset)), offset += 2;
    }
    if (2 == format) {
      var count = bin.readUshort(data, offset);
      offset += 2;
      for (i = 0; i < count; i++)
        obj.push(bin.readUshort(data, offset)), offset += 2, obj.push(bin.readUshort(data, offset)), offset += 2, obj.push(bin.readUshort(data, offset)), offset += 2;
    }
    return obj;
  }, Typr._lctf.getInterval = function(tab, val) {
    for (var i = 0; i < tab.length; i += 3) {
      var start = tab[i], end = tab[i + 1];
      if (tab[i + 2], start <= val && val <= end)
        return i;
    }
    return -1;
  }, Typr._lctf.readValueRecord = function(data, offset, valFmt) {
    var bin = Typr._bin, arr = [];
    return arr.push(1 & valFmt ? bin.readShort(data, offset) : 0), offset += 1 & valFmt ? 2 : 0, arr.push(2 & valFmt ? bin.readShort(data, offset) : 0), offset += 2 & valFmt ? 2 : 0, arr.push(4 & valFmt ? bin.readShort(data, offset) : 0), offset += 4 & valFmt ? 2 : 0, arr.push(8 & valFmt ? bin.readShort(data, offset) : 0), offset += 8 & valFmt ? 2 : 0, arr;
  }, Typr._lctf.readCoverage = function(data, offset) {
    var bin = Typr._bin, cvg = {};
    cvg.fmt = bin.readUshort(data, offset), offset += 2;
    var count = bin.readUshort(data, offset);
    return offset += 2, 1 == cvg.fmt && (cvg.tab = bin.readUshorts(data, offset, count)), 2 == cvg.fmt && (cvg.tab = bin.readUshorts(data, offset, 3 * count)), cvg;
  }, Typr._lctf.coverageIndex = function(cvg, val) {
    var tab = cvg.tab;
    if (1 == cvg.fmt)
      return tab.indexOf(val);
    if (2 == cvg.fmt) {
      var ind = Typr._lctf.getInterval(tab, val);
      if (-1 != ind)
        return tab[ind + 2] + (val - tab[ind]);
    }
    return -1;
  }, Typr._lctf.readFeatureList = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, obj = [], count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var noff = bin.readUshort(data, offset);
      offset += 2, obj.push({ tag: tag.trim(), tab: Typr._lctf.readFeatureTable(data, offset0 + noff) });
    }
    return obj;
  }, Typr._lctf.readFeatureTable = function(data, offset) {
    var bin = Typr._bin;
    bin.readUshort(data, offset), offset += 2;
    var lookupCount = bin.readUshort(data, offset);
    offset += 2;
    for (var indices = [], i = 0; i < lookupCount; i++)
      indices.push(bin.readUshort(data, offset + 2 * i));
    return indices;
  }, Typr._lctf.readScriptList = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, obj = {}, count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var noff = bin.readUshort(data, offset);
      offset += 2, obj[tag.trim()] = Typr._lctf.readScriptTable(data, offset0 + noff);
    }
    return obj;
  }, Typr._lctf.readScriptTable = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, obj = {}, defLangSysOff = bin.readUshort(data, offset);
    offset += 2, obj.default = Typr._lctf.readLangSysTable(data, offset0 + defLangSysOff);
    var langSysCount = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < langSysCount; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var langSysOff = bin.readUshort(data, offset);
      offset += 2, obj[tag.trim()] = Typr._lctf.readLangSysTable(data, offset0 + langSysOff);
    }
    return obj;
  }, Typr._lctf.readLangSysTable = function(data, offset) {
    var bin = Typr._bin, obj = {};
    bin.readUshort(data, offset), offset += 2, obj.reqFeature = bin.readUshort(data, offset), offset += 2;
    var featureCount = bin.readUshort(data, offset);
    return offset += 2, obj.features = bin.readUshorts(data, offset, featureCount), obj;
  }, Typr.CFF = {}, Typr.CFF.parse = function(data, offset, length) {
    var bin = Typr._bin;
    (data = new Uint8Array(data.buffer, offset, length))[offset = 0], data[++offset], data[++offset], data[++offset], offset++;
    var ninds = [];
    offset = Typr.CFF.readIndex(data, offset, ninds);
    for (var names = [], i = 0; i < ninds.length - 1; i++)
      names.push(bin.readASCII(data, offset + ninds[i], ninds[i + 1] - ninds[i]));
    offset += ninds[ninds.length - 1];
    var tdinds = [];
    offset = Typr.CFF.readIndex(data, offset, tdinds);
    var topDicts = [];
    for (i = 0; i < tdinds.length - 1; i++)
      topDicts.push(Typr.CFF.readDict(data, offset + tdinds[i], offset + tdinds[i + 1]));
    offset += tdinds[tdinds.length - 1];
    var topdict = topDicts[0], sinds = [];
    offset = Typr.CFF.readIndex(data, offset, sinds);
    var strings = [];
    for (i = 0; i < sinds.length - 1; i++)
      strings.push(bin.readASCII(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
    if (offset += sinds[sinds.length - 1], Typr.CFF.readSubrs(data, offset, topdict), topdict.CharStrings) {
      offset = topdict.CharStrings;
      sinds = [];
      offset = Typr.CFF.readIndex(data, offset, sinds);
      var cstr = [];
      for (i = 0; i < sinds.length - 1; i++)
        cstr.push(bin.readBytes(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
      topdict.CharStrings = cstr;
    }
    topdict.Encoding && (topdict.Encoding = Typr.CFF.readEncoding(data, topdict.Encoding, topdict.CharStrings.length)), topdict.charset && (topdict.charset = Typr.CFF.readCharset(data, topdict.charset, topdict.CharStrings.length)), topdict.Private && (offset = topdict.Private[1], topdict.Private = Typr.CFF.readDict(data, offset, offset + topdict.Private[0]), topdict.Private.Subrs && Typr.CFF.readSubrs(data, offset + topdict.Private.Subrs, topdict.Private));
    var obj = {};
    for (var p in topdict)
      -1 != ["FamilyName", "FullName", "Notice", "version", "Copyright"].indexOf(p) ? obj[p] = strings[topdict[p] - 426 + 35] : obj[p] = topdict[p];
    return obj;
  }, Typr.CFF.readSubrs = function(data, offset, obj) {
    var bin = Typr._bin, gsubinds = [];
    offset = Typr.CFF.readIndex(data, offset, gsubinds);
    var bias, nSubrs = gsubinds.length;
    bias = nSubrs < 1240 ? 107 : nSubrs < 33900 ? 1131 : 32768, obj.Bias = bias, obj.Subrs = [];
    for (var i = 0; i < gsubinds.length - 1; i++)
      obj.Subrs.push(bin.readBytes(data, offset + gsubinds[i], gsubinds[i + 1] - gsubinds[i]));
  }, Typr.CFF.tableSE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 0, 111, 112, 113, 114, 0, 115, 116, 117, 118, 119, 120, 121, 122, 0, 123, 0, 124, 125, 126, 127, 128, 129, 130, 131, 0, 132, 133, 0, 134, 135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144, 0, 0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0], Typr.CFF.glyphByUnicode = function(cff, code) {
    for (var i = 0; i < cff.charset.length; i++)
      if (cff.charset[i] == code)
        return i;
    return -1;
  }, Typr.CFF.glyphBySE = function(cff, charcode) {
    return charcode < 0 || charcode > 255 ? -1 : Typr.CFF.glyphByUnicode(cff, Typr.CFF.tableSE[charcode]);
  }, Typr.CFF.readEncoding = function(data, offset, num) {
    Typr._bin;
    var array = [".notdef"], format = data[offset];
    if (offset++, 0 != format)
      throw "error: unknown encoding format: " + format;
    var nCodes = data[offset];
    offset++;
    for (var i = 0; i < nCodes; i++)
      array.push(data[offset + i]);
    return array;
  }, Typr.CFF.readCharset = function(data, offset, num) {
    var bin = Typr._bin, charset = [".notdef"], format = data[offset];
    if (offset++, 0 == format)
      for (var i = 0; i < num; i++) {
        var first = bin.readUshort(data, offset);
        offset += 2, charset.push(first);
      }
    else {
      if (1 != format && 2 != format)
        throw "error: format: " + format;
      for (; charset.length < num; ) {
        first = bin.readUshort(data, offset);
        offset += 2;
        var nLeft = 0;
        1 == format ? (nLeft = data[offset], offset++) : (nLeft = bin.readUshort(data, offset), offset += 2);
        for (i = 0; i <= nLeft; i++)
          charset.push(first), first++;
      }
    }
    return charset;
  }, Typr.CFF.readIndex = function(data, offset, inds) {
    var bin = Typr._bin, count = bin.readUshort(data, offset), offsize = data[offset += 2];
    if (offset++, 1 == offsize)
      for (var i = 0; i < count + 1; i++)
        inds.push(data[offset + i]);
    else if (2 == offsize)
      for (i = 0; i < count + 1; i++)
        inds.push(bin.readUshort(data, offset + 2 * i));
    else if (3 == offsize)
      for (i = 0; i < count + 1; i++)
        inds.push(16777215 & bin.readUint(data, offset + 3 * i - 1));
    else if (0 != count)
      throw "unsupported offset size: " + offsize + ", count: " + count;
    return (offset += (count + 1) * offsize) - 1;
  }, Typr.CFF.getCharString = function(data, offset, o) {
    var bin = Typr._bin, b0 = data[offset], b1 = data[offset + 1];
    data[offset + 2], data[offset + 3], data[offset + 4];
    var vs = 1, op = null, val = null;
    b0 <= 20 && (op = b0, vs = 1), 12 == b0 && (op = 100 * b0 + b1, vs = 2), 21 <= b0 && b0 <= 27 && (op = b0, vs = 1), 28 == b0 && (val = bin.readShort(data, offset + 1), vs = 3), 29 <= b0 && b0 <= 31 && (op = b0, vs = 1), 32 <= b0 && b0 <= 246 && (val = b0 - 139, vs = 1), 247 <= b0 && b0 <= 250 && (val = 256 * (b0 - 247) + b1 + 108, vs = 2), 251 <= b0 && b0 <= 254 && (val = 256 * -(b0 - 251) - b1 - 108, vs = 2), 255 == b0 && (val = bin.readInt(data, offset + 1) / 65535, vs = 5), o.val = null != val ? val : "o" + op, o.size = vs;
  }, Typr.CFF.readCharString = function(data, offset, length) {
    for (var end = offset + length, bin = Typr._bin, arr = []; offset < end; ) {
      var b0 = data[offset], b1 = data[offset + 1];
      data[offset + 2], data[offset + 3], data[offset + 4];
      var vs = 1, op = null, val = null;
      b0 <= 20 && (op = b0, vs = 1), 12 == b0 && (op = 100 * b0 + b1, vs = 2), 19 != b0 && 20 != b0 || (op = b0, vs = 2), 21 <= b0 && b0 <= 27 && (op = b0, vs = 1), 28 == b0 && (val = bin.readShort(data, offset + 1), vs = 3), 29 <= b0 && b0 <= 31 && (op = b0, vs = 1), 32 <= b0 && b0 <= 246 && (val = b0 - 139, vs = 1), 247 <= b0 && b0 <= 250 && (val = 256 * (b0 - 247) + b1 + 108, vs = 2), 251 <= b0 && b0 <= 254 && (val = 256 * -(b0 - 251) - b1 - 108, vs = 2), 255 == b0 && (val = bin.readInt(data, offset + 1) / 65535, vs = 5), arr.push(null != val ? val : "o" + op), offset += vs;
    }
    return arr;
  }, Typr.CFF.readDict = function(data, offset, end) {
    for (var bin = Typr._bin, dict = {}, carr = []; offset < end; ) {
      var b0 = data[offset], b1 = data[offset + 1];
      data[offset + 2], data[offset + 3], data[offset + 4];
      var vs = 1, key = null, val = null;
      if (28 == b0 && (val = bin.readShort(data, offset + 1), vs = 3), 29 == b0 && (val = bin.readInt(data, offset + 1), vs = 5), 32 <= b0 && b0 <= 246 && (val = b0 - 139, vs = 1), 247 <= b0 && b0 <= 250 && (val = 256 * (b0 - 247) + b1 + 108, vs = 2), 251 <= b0 && b0 <= 254 && (val = 256 * -(b0 - 251) - b1 - 108, vs = 2), 255 == b0)
        throw val = bin.readInt(data, offset + 1) / 65535, vs = 5, "unknown number";
      if (30 == b0) {
        var nibs = [];
        for (vs = 1; ; ) {
          var b = data[offset + vs];
          vs++;
          var nib0 = b >> 4, nib1 = 15 & b;
          if (15 != nib0 && nibs.push(nib0), 15 != nib1 && nibs.push(nib1), 15 == nib1)
            break;
        }
        for (var s = "", chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"], i = 0; i < nibs.length; i++)
          s += chars[nibs[i]];
        val = parseFloat(s);
      }
      if (b0 <= 21) {
        if (key = ["version", "Notice", "FullName", "FamilyName", "Weight", "FontBBox", "BlueValues", "OtherBlues", "FamilyBlues", "FamilyOtherBlues", "StdHW", "StdVW", "escape", "UniqueID", "XUID", "charset", "Encoding", "CharStrings", "Private", "Subrs", "defaultWidthX", "nominalWidthX"][b0], vs = 1, 12 == b0)
          key = ["Copyright", "isFixedPitch", "ItalicAngle", "UnderlinePosition", "UnderlineThickness", "PaintType", "CharstringType", "FontMatrix", "StrokeWidth", "BlueScale", "BlueShift", "BlueFuzz", "StemSnapH", "StemSnapV", "ForceBold", 0, 0, "LanguageGroup", "ExpansionFactor", "initialRandomSeed", "SyntheticBase", "PostScript", "BaseFontName", "BaseFontBlend", 0, 0, 0, 0, 0, 0, "ROS", "CIDFontVersion", "CIDFontRevision", "CIDFontType", "CIDCount", "UIDBase", "FDArray", "FDSelect", "FontName"][b1], vs = 2;
      }
      null != key ? (dict[key] = 1 == carr.length ? carr[0] : carr, carr = []) : carr.push(val), offset += vs;
    }
    return dict;
  }, Typr.cmap = {}, Typr.cmap.parse = function(data, offset, length) {
    data = new Uint8Array(data.buffer, offset, length), offset = 0;
    var bin = Typr._bin, obj = {};
    bin.readUshort(data, offset), offset += 2;
    var numTables = bin.readUshort(data, offset);
    offset += 2;
    var offs = [];
    obj.tables = [];
    for (var i = 0; i < numTables; i++) {
      var platformID = bin.readUshort(data, offset);
      offset += 2;
      var encodingID = bin.readUshort(data, offset);
      offset += 2;
      var noffset = bin.readUint(data, offset);
      offset += 4;
      var id = "p" + platformID + "e" + encodingID, tind = offs.indexOf(noffset);
      if (-1 == tind) {
        var subt;
        tind = obj.tables.length, offs.push(noffset);
        var format = bin.readUshort(data, noffset);
        0 == format ? subt = Typr.cmap.parse0(data, noffset) : 4 == format ? subt = Typr.cmap.parse4(data, noffset) : 6 == format ? subt = Typr.cmap.parse6(data, noffset) : 12 == format ? subt = Typr.cmap.parse12(data, noffset) : console.log("unknown format: " + format, platformID, encodingID, noffset), obj.tables.push(subt);
      }
      if (null != obj[id])
        throw "multiple tables for one platform+encoding";
      obj[id] = tind;
    }
    return obj;
  }, Typr.cmap.parse0 = function(data, offset) {
    var bin = Typr._bin, obj = {};
    obj.format = bin.readUshort(data, offset), offset += 2;
    var len = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset), offset += 2, obj.map = [];
    for (var i = 0; i < len - 6; i++)
      obj.map.push(data[offset + i]);
    return obj;
  }, Typr.cmap.parse4 = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, obj = {};
    obj.format = bin.readUshort(data, offset), offset += 2;
    var length = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset), offset += 2;
    var segCountX2 = bin.readUshort(data, offset);
    offset += 2;
    var segCount = segCountX2 / 2;
    obj.searchRange = bin.readUshort(data, offset), offset += 2, obj.entrySelector = bin.readUshort(data, offset), offset += 2, obj.rangeShift = bin.readUshort(data, offset), offset += 2, obj.endCount = bin.readUshorts(data, offset, segCount), offset += 2 * segCount, offset += 2, obj.startCount = bin.readUshorts(data, offset, segCount), offset += 2 * segCount, obj.idDelta = [];
    for (var i = 0; i < segCount; i++)
      obj.idDelta.push(bin.readShort(data, offset)), offset += 2;
    for (obj.idRangeOffset = bin.readUshorts(data, offset, segCount), offset += 2 * segCount, obj.glyphIdArray = []; offset < offset0 + length; )
      obj.glyphIdArray.push(bin.readUshort(data, offset)), offset += 2;
    return obj;
  }, Typr.cmap.parse6 = function(data, offset) {
    var bin = Typr._bin, obj = {};
    obj.format = bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2, obj.firstCode = bin.readUshort(data, offset), offset += 2;
    var entryCount = bin.readUshort(data, offset);
    offset += 2, obj.glyphIdArray = [];
    for (var i = 0; i < entryCount; i++)
      obj.glyphIdArray.push(bin.readUshort(data, offset)), offset += 2;
    return obj;
  }, Typr.cmap.parse12 = function(data, offset) {
    var bin = Typr._bin, obj = {};
    obj.format = bin.readUshort(data, offset), offset += 2, offset += 2, bin.readUint(data, offset), offset += 4, bin.readUint(data, offset), offset += 4;
    var nGroups = bin.readUint(data, offset);
    offset += 4, obj.groups = [];
    for (var i = 0; i < nGroups; i++) {
      var off = offset + 12 * i, startCharCode = bin.readUint(data, off + 0), endCharCode = bin.readUint(data, off + 4), startGlyphID = bin.readUint(data, off + 8);
      obj.groups.push([startCharCode, endCharCode, startGlyphID]);
    }
    return obj;
  }, Typr.glyf = {}, Typr.glyf.parse = function(data, offset, length, font) {
    for (var obj = [], g = 0; g < font.maxp.numGlyphs; g++)
      obj.push(null);
    return obj;
  }, Typr.glyf._parseGlyf = function(font, g) {
    var bin = Typr._bin, data = font._data, offset = Typr._tabOffset(data, "glyf") + font.loca[g];
    if (font.loca[g] == font.loca[g + 1])
      return null;
    var gl = {};
    if (gl.noc = bin.readShort(data, offset), offset += 2, gl.xMin = bin.readShort(data, offset), offset += 2, gl.yMin = bin.readShort(data, offset), offset += 2, gl.xMax = bin.readShort(data, offset), offset += 2, gl.yMax = bin.readShort(data, offset), offset += 2, gl.xMin >= gl.xMax || gl.yMin >= gl.yMax)
      return null;
    if (gl.noc > 0) {
      gl.endPts = [];
      for (var i = 0; i < gl.noc; i++)
        gl.endPts.push(bin.readUshort(data, offset)), offset += 2;
      var instructionLength = bin.readUshort(data, offset);
      if (offset += 2, data.length - offset < instructionLength)
        return null;
      gl.instructions = bin.readBytes(data, offset, instructionLength), offset += instructionLength;
      var crdnum = gl.endPts[gl.noc - 1] + 1;
      gl.flags = [];
      for (i = 0; i < crdnum; i++) {
        var flag = data[offset];
        if (offset++, gl.flags.push(flag), 0 != (8 & flag)) {
          var rep = data[offset];
          offset++;
          for (var j = 0; j < rep; j++)
            gl.flags.push(flag), i++;
        }
      }
      gl.xs = [];
      for (i = 0; i < crdnum; i++) {
        var i8 = 0 != (2 & gl.flags[i]), same = 0 != (16 & gl.flags[i]);
        i8 ? (gl.xs.push(same ? data[offset] : -data[offset]), offset++) : same ? gl.xs.push(0) : (gl.xs.push(bin.readShort(data, offset)), offset += 2);
      }
      gl.ys = [];
      for (i = 0; i < crdnum; i++) {
        i8 = 0 != (4 & gl.flags[i]), same = 0 != (32 & gl.flags[i]);
        i8 ? (gl.ys.push(same ? data[offset] : -data[offset]), offset++) : same ? gl.ys.push(0) : (gl.ys.push(bin.readShort(data, offset)), offset += 2);
      }
      var x = 0, y = 0;
      for (i = 0; i < crdnum; i++)
        x += gl.xs[i], y += gl.ys[i], gl.xs[i] = x, gl.ys[i] = y;
    } else {
      var flags;
      gl.parts = [];
      do {
        flags = bin.readUshort(data, offset), offset += 2;
        var part = { m: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, p1: -1, p2: -1 };
        if (gl.parts.push(part), part.glyphIndex = bin.readUshort(data, offset), offset += 2, 1 & flags) {
          var arg1 = bin.readShort(data, offset);
          offset += 2;
          var arg2 = bin.readShort(data, offset);
          offset += 2;
        } else {
          arg1 = bin.readInt8(data, offset);
          offset++;
          arg2 = bin.readInt8(data, offset);
          offset++;
        }
        2 & flags ? (part.m.tx = arg1, part.m.ty = arg2) : (part.p1 = arg1, part.p2 = arg2), 8 & flags ? (part.m.a = part.m.d = bin.readF2dot14(data, offset), offset += 2) : 64 & flags ? (part.m.a = bin.readF2dot14(data, offset), offset += 2, part.m.d = bin.readF2dot14(data, offset), offset += 2) : 128 & flags && (part.m.a = bin.readF2dot14(data, offset), offset += 2, part.m.b = bin.readF2dot14(data, offset), offset += 2, part.m.c = bin.readF2dot14(data, offset), offset += 2, part.m.d = bin.readF2dot14(data, offset), offset += 2);
      } while (32 & flags);
      if (256 & flags) {
        var numInstr = bin.readUshort(data, offset);
        offset += 2, gl.instr = [];
        for (i = 0; i < numInstr; i++)
          gl.instr.push(data[offset]), offset++;
      }
    }
    return gl;
  }, Typr.GPOS = {}, Typr.GPOS.parse = function(data, offset, length, font) {
    return Typr._lctf.parse(data, offset, length, font, Typr.GPOS.subt);
  }, Typr.GPOS.subt = function(data, ltype, offset) {
    if (2 != ltype)
      return null;
    var bin = Typr._bin, offset0 = offset, tab = {};
    tab.format = bin.readUshort(data, offset), offset += 2;
    var covOff = bin.readUshort(data, offset);
    offset += 2, tab.coverage = Typr._lctf.readCoverage(data, covOff + offset0), tab.valFmt1 = bin.readUshort(data, offset), offset += 2, tab.valFmt2 = bin.readUshort(data, offset), offset += 2;
    var ones1 = Typr._lctf.numOfOnes(tab.valFmt1), ones2 = Typr._lctf.numOfOnes(tab.valFmt2);
    if (1 == tab.format) {
      tab.pairsets = [];
      var count = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < count; i++) {
        var psoff = bin.readUshort(data, offset);
        offset += 2, psoff += offset0;
        var pvcount = bin.readUshort(data, psoff);
        psoff += 2;
        for (var arr = [], j = 0; j < pvcount; j++) {
          var gid2 = bin.readUshort(data, psoff);
          psoff += 2, 0 != tab.valFmt1 && (value1 = Typr._lctf.readValueRecord(data, psoff, tab.valFmt1), psoff += 2 * ones1), 0 != tab.valFmt2 && (value2 = Typr._lctf.readValueRecord(data, psoff, tab.valFmt2), psoff += 2 * ones2), arr.push({ gid2, val1: value1, val2: value2 });
        }
        tab.pairsets.push(arr);
      }
    }
    if (2 == tab.format) {
      var classDef1 = bin.readUshort(data, offset);
      offset += 2;
      var classDef2 = bin.readUshort(data, offset);
      offset += 2;
      var class1Count = bin.readUshort(data, offset);
      offset += 2;
      var class2Count = bin.readUshort(data, offset);
      offset += 2, tab.classDef1 = Typr._lctf.readClassDef(data, offset0 + classDef1), tab.classDef2 = Typr._lctf.readClassDef(data, offset0 + classDef2), tab.matrix = [];
      for (i = 0; i < class1Count; i++) {
        var row = [];
        for (j = 0; j < class2Count; j++) {
          var value1 = null, value2 = null;
          0 != tab.valFmt1 && (value1 = Typr._lctf.readValueRecord(data, offset, tab.valFmt1), offset += 2 * ones1), 0 != tab.valFmt2 && (value2 = Typr._lctf.readValueRecord(data, offset, tab.valFmt2), offset += 2 * ones2), row.push({ val1: value1, val2: value2 });
        }
        tab.matrix.push(row);
      }
    }
    return tab;
  }, Typr.GSUB = {}, Typr.GSUB.parse = function(data, offset, length, font) {
    return Typr._lctf.parse(data, offset, length, font, Typr.GSUB.subt);
  }, Typr.GSUB.subt = function(data, ltype, offset) {
    var bin = Typr._bin, offset0 = offset, tab = {};
    if (1 != ltype && 4 != ltype && 5 != ltype)
      return null;
    tab.fmt = bin.readUshort(data, offset), offset += 2;
    var covOff = bin.readUshort(data, offset);
    if (offset += 2, tab.coverage = Typr._lctf.readCoverage(data, covOff + offset0), 1 == ltype) {
      if (1 == tab.fmt)
        tab.delta = bin.readShort(data, offset), offset += 2;
      else if (2 == tab.fmt) {
        var cnt = bin.readUshort(data, offset);
        offset += 2, tab.newg = bin.readUshorts(data, offset, cnt), offset += 2 * tab.newg.length;
      }
    } else if (4 == ltype) {
      tab.vals = [];
      cnt = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < cnt; i++) {
        var loff = bin.readUshort(data, offset);
        offset += 2, tab.vals.push(Typr.GSUB.readLigatureSet(data, offset0 + loff));
      }
    } else if (5 == ltype)
      if (2 == tab.fmt) {
        var cDefOffset = bin.readUshort(data, offset);
        offset += 2, tab.cDef = Typr._lctf.readClassDef(data, offset0 + cDefOffset), tab.scset = [];
        var subClassSetCount = bin.readUshort(data, offset);
        offset += 2;
        for (i = 0; i < subClassSetCount; i++) {
          var scsOff = bin.readUshort(data, offset);
          offset += 2, tab.scset.push(0 == scsOff ? null : Typr.GSUB.readSubClassSet(data, offset0 + scsOff));
        }
      } else
        console.log("unknown table format", tab.fmt);
    return tab;
  }, Typr.GSUB.readSubClassSet = function(data, offset) {
    var rUs = Typr._bin.readUshort, offset0 = offset, lset = [], cnt = rUs(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var loff = rUs(data, offset);
      offset += 2, lset.push(Typr.GSUB.readSubClassRule(data, offset0 + loff));
    }
    return lset;
  }, Typr.GSUB.readSubClassRule = function(data, offset) {
    var rUs = Typr._bin.readUshort, rule = {}, gcount = rUs(data, offset), scount = rUs(data, offset += 2);
    offset += 2, rule.input = [];
    for (var i = 0; i < gcount - 1; i++)
      rule.input.push(rUs(data, offset)), offset += 2;
    return rule.substLookupRecords = Typr.GSUB.readSubstLookupRecords(data, offset, scount), rule;
  }, Typr.GSUB.readSubstLookupRecords = function(data, offset, cnt) {
    for (var rUs = Typr._bin.readUshort, out = [], i = 0; i < cnt; i++)
      out.push(rUs(data, offset), rUs(data, offset + 2)), offset += 4;
    return out;
  }, Typr.GSUB.readChainSubClassSet = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, lset = [], cnt = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var loff = bin.readUshort(data, offset);
      offset += 2, lset.push(Typr.GSUB.readChainSubClassRule(data, offset0 + loff));
    }
    return lset;
  }, Typr.GSUB.readChainSubClassRule = function(data, offset) {
    for (var bin = Typr._bin, rule = {}, pps = ["backtrack", "input", "lookahead"], pi = 0; pi < pps.length; pi++) {
      var cnt = bin.readUshort(data, offset);
      offset += 2, 1 == pi && cnt--, rule[pps[pi]] = bin.readUshorts(data, offset, cnt), offset += 2 * rule[pps[pi]].length;
    }
    cnt = bin.readUshort(data, offset);
    return offset += 2, rule.subst = bin.readUshorts(data, offset, 2 * cnt), offset += 2 * rule.subst.length, rule;
  }, Typr.GSUB.readLigatureSet = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, lset = [], lcnt = bin.readUshort(data, offset);
    offset += 2;
    for (var j = 0; j < lcnt; j++) {
      var loff = bin.readUshort(data, offset);
      offset += 2, lset.push(Typr.GSUB.readLigature(data, offset0 + loff));
    }
    return lset;
  }, Typr.GSUB.readLigature = function(data, offset) {
    var bin = Typr._bin, lig = { chain: [] };
    lig.nglyph = bin.readUshort(data, offset), offset += 2;
    var ccnt = bin.readUshort(data, offset);
    offset += 2;
    for (var k = 0; k < ccnt - 1; k++)
      lig.chain.push(bin.readUshort(data, offset)), offset += 2;
    return lig;
  }, Typr.head = {}, Typr.head.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {};
    return bin.readFixed(data, offset), offset += 4, obj.fontRevision = bin.readFixed(data, offset), offset += 4, bin.readUint(data, offset), offset += 4, bin.readUint(data, offset), offset += 4, obj.flags = bin.readUshort(data, offset), offset += 2, obj.unitsPerEm = bin.readUshort(data, offset), offset += 2, obj.created = bin.readUint64(data, offset), offset += 8, obj.modified = bin.readUint64(data, offset), offset += 8, obj.xMin = bin.readShort(data, offset), offset += 2, obj.yMin = bin.readShort(data, offset), offset += 2, obj.xMax = bin.readShort(data, offset), offset += 2, obj.yMax = bin.readShort(data, offset), offset += 2, obj.macStyle = bin.readUshort(data, offset), offset += 2, obj.lowestRecPPEM = bin.readUshort(data, offset), offset += 2, obj.fontDirectionHint = bin.readShort(data, offset), offset += 2, obj.indexToLocFormat = bin.readShort(data, offset), offset += 2, obj.glyphDataFormat = bin.readShort(data, offset), offset += 2, obj;
  }, Typr.hhea = {}, Typr.hhea.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {};
    return bin.readFixed(data, offset), offset += 4, obj.ascender = bin.readShort(data, offset), offset += 2, obj.descender = bin.readShort(data, offset), offset += 2, obj.lineGap = bin.readShort(data, offset), offset += 2, obj.advanceWidthMax = bin.readUshort(data, offset), offset += 2, obj.minLeftSideBearing = bin.readShort(data, offset), offset += 2, obj.minRightSideBearing = bin.readShort(data, offset), offset += 2, obj.xMaxExtent = bin.readShort(data, offset), offset += 2, obj.caretSlopeRise = bin.readShort(data, offset), offset += 2, obj.caretSlopeRun = bin.readShort(data, offset), offset += 2, obj.caretOffset = bin.readShort(data, offset), offset += 2, offset += 8, obj.metricDataFormat = bin.readShort(data, offset), offset += 2, obj.numberOfHMetrics = bin.readUshort(data, offset), offset += 2, obj;
  }, Typr.hmtx = {}, Typr.hmtx.parse = function(data, offset, length, font) {
    for (var bin = Typr._bin, obj = { aWidth: [], lsBearing: [] }, aw = 0, lsb = 0, i = 0; i < font.maxp.numGlyphs; i++)
      i < font.hhea.numberOfHMetrics && (aw = bin.readUshort(data, offset), offset += 2, lsb = bin.readShort(data, offset), offset += 2), obj.aWidth.push(aw), obj.lsBearing.push(lsb);
    return obj;
  }, Typr.kern = {}, Typr.kern.parse = function(data, offset, length, font) {
    var bin = Typr._bin, version = bin.readUshort(data, offset);
    if (offset += 2, 1 == version)
      return Typr.kern.parseV1(data, offset - 2, length, font);
    var nTables = bin.readUshort(data, offset);
    offset += 2;
    for (var map = { glyph1: [], rval: [] }, i = 0; i < nTables; i++) {
      offset += 2;
      length = bin.readUshort(data, offset);
      offset += 2;
      var coverage = bin.readUshort(data, offset);
      offset += 2;
      var format = coverage >>> 8;
      if (0 != (format &= 15))
        throw "unknown kern table format: " + format;
      offset = Typr.kern.readFormat0(data, offset, map);
    }
    return map;
  }, Typr.kern.parseV1 = function(data, offset, length, font) {
    var bin = Typr._bin;
    bin.readFixed(data, offset), offset += 4;
    var nTables = bin.readUint(data, offset);
    offset += 4;
    for (var map = { glyph1: [], rval: [] }, i = 0; i < nTables; i++) {
      bin.readUint(data, offset), offset += 4;
      var coverage = bin.readUshort(data, offset);
      offset += 2, bin.readUshort(data, offset), offset += 2;
      var format = coverage >>> 8;
      if (0 != (format &= 15))
        throw "unknown kern table format: " + format;
      offset = Typr.kern.readFormat0(data, offset, map);
    }
    return map;
  }, Typr.kern.readFormat0 = function(data, offset, map) {
    var bin = Typr._bin, pleft = -1, nPairs = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2;
    for (var j = 0; j < nPairs; j++) {
      var left = bin.readUshort(data, offset);
      offset += 2;
      var right = bin.readUshort(data, offset);
      offset += 2;
      var value = bin.readShort(data, offset);
      offset += 2, left != pleft && (map.glyph1.push(left), map.rval.push({ glyph2: [], vals: [] }));
      var rval = map.rval[map.rval.length - 1];
      rval.glyph2.push(right), rval.vals.push(value), pleft = left;
    }
    return offset;
  }, Typr.loca = {}, Typr.loca.parse = function(data, offset, length, font) {
    var bin = Typr._bin, obj = [], ver = font.head.indexToLocFormat, len = font.maxp.numGlyphs + 1;
    if (0 == ver)
      for (var i = 0; i < len; i++)
        obj.push(bin.readUshort(data, offset + (i << 1)) << 1);
    if (1 == ver)
      for (i = 0; i < len; i++)
        obj.push(bin.readUint(data, offset + (i << 2)));
    return obj;
  }, Typr.maxp = {}, Typr.maxp.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {}, ver = bin.readUint(data, offset);
    return offset += 4, obj.numGlyphs = bin.readUshort(data, offset), offset += 2, 65536 == ver && (obj.maxPoints = bin.readUshort(data, offset), offset += 2, obj.maxContours = bin.readUshort(data, offset), offset += 2, obj.maxCompositePoints = bin.readUshort(data, offset), offset += 2, obj.maxCompositeContours = bin.readUshort(data, offset), offset += 2, obj.maxZones = bin.readUshort(data, offset), offset += 2, obj.maxTwilightPoints = bin.readUshort(data, offset), offset += 2, obj.maxStorage = bin.readUshort(data, offset), offset += 2, obj.maxFunctionDefs = bin.readUshort(data, offset), offset += 2, obj.maxInstructionDefs = bin.readUshort(data, offset), offset += 2, obj.maxStackElements = bin.readUshort(data, offset), offset += 2, obj.maxSizeOfInstructions = bin.readUshort(data, offset), offset += 2, obj.maxComponentElements = bin.readUshort(data, offset), offset += 2, obj.maxComponentDepth = bin.readUshort(data, offset), offset += 2), obj;
  }, Typr.name = {}, Typr.name.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {};
    bin.readUshort(data, offset), offset += 2;
    var count = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset);
    for (var tname, offset0 = offset += 2, i = 0; i < count; i++) {
      var platformID = bin.readUshort(data, offset);
      offset += 2;
      var encodingID = bin.readUshort(data, offset);
      offset += 2;
      var languageID = bin.readUshort(data, offset);
      offset += 2;
      var nameID = bin.readUshort(data, offset);
      offset += 2;
      length = bin.readUshort(data, offset);
      offset += 2;
      var noffset = bin.readUshort(data, offset);
      offset += 2;
      var plat = "p" + platformID;
      null == obj[plat] && (obj[plat] = {});
      var str, cname = ["copyright", "fontFamily", "fontSubfamily", "ID", "fullName", "version", "postScriptName", "trademark", "manufacturer", "designer", "description", "urlVendor", "urlDesigner", "licence", "licenceURL", "---", "typoFamilyName", "typoSubfamilyName", "compatibleFull", "sampleText", "postScriptCID", "wwsFamilyName", "wwsSubfamilyName", "lightPalette", "darkPalette"][nameID], soff = offset0 + 12 * count + noffset;
      if (0 == platformID)
        str = bin.readUnicode(data, soff, length / 2);
      else if (3 == platformID && 0 == encodingID)
        str = bin.readUnicode(data, soff, length / 2);
      else if (0 == encodingID)
        str = bin.readASCII(data, soff, length);
      else if (1 == encodingID)
        str = bin.readUnicode(data, soff, length / 2);
      else if (3 == encodingID)
        str = bin.readUnicode(data, soff, length / 2);
      else {
        if (1 != platformID)
          throw "unknown encoding " + encodingID + ", platformID: " + platformID;
        str = bin.readASCII(data, soff, length), console.log("reading unknown MAC encoding " + encodingID + " as ASCII");
      }
      obj[plat][cname] = str, obj[plat]._lang = languageID;
    }
    for (var p in obj)
      if (null != obj[p].postScriptName && 1033 == obj[p]._lang)
        return obj[p];
    for (var p in obj)
      if (null != obj[p].postScriptName && 3084 == obj[p]._lang)
        return obj[p];
    for (var p in obj)
      if (null != obj[p].postScriptName)
        return obj[p];
    for (var p in obj) {
      tname = p;
      break;
    }
    return console.log("returning name table with languageID " + obj[tname]._lang), obj[tname];
  }, Typr["OS/2"] = {}, Typr["OS/2"].parse = function(data, offset, length) {
    var ver = Typr._bin.readUshort(data, offset);
    offset += 2;
    var obj = {};
    if (0 == ver)
      Typr["OS/2"].version0(data, offset, obj);
    else if (1 == ver)
      Typr["OS/2"].version1(data, offset, obj);
    else if (2 == ver || 3 == ver || 4 == ver)
      Typr["OS/2"].version2(data, offset, obj);
    else {
      if (5 != ver)
        throw "unknown OS/2 table version: " + ver;
      Typr["OS/2"].version5(data, offset, obj);
    }
    return obj;
  }, Typr["OS/2"].version0 = function(data, offset, obj) {
    var bin = Typr._bin;
    return obj.xAvgCharWidth = bin.readShort(data, offset), offset += 2, obj.usWeightClass = bin.readUshort(data, offset), offset += 2, obj.usWidthClass = bin.readUshort(data, offset), offset += 2, obj.fsType = bin.readUshort(data, offset), offset += 2, obj.ySubscriptXSize = bin.readShort(data, offset), offset += 2, obj.ySubscriptYSize = bin.readShort(data, offset), offset += 2, obj.ySubscriptXOffset = bin.readShort(data, offset), offset += 2, obj.ySubscriptYOffset = bin.readShort(data, offset), offset += 2, obj.ySuperscriptXSize = bin.readShort(data, offset), offset += 2, obj.ySuperscriptYSize = bin.readShort(data, offset), offset += 2, obj.ySuperscriptXOffset = bin.readShort(data, offset), offset += 2, obj.ySuperscriptYOffset = bin.readShort(data, offset), offset += 2, obj.yStrikeoutSize = bin.readShort(data, offset), offset += 2, obj.yStrikeoutPosition = bin.readShort(data, offset), offset += 2, obj.sFamilyClass = bin.readShort(data, offset), offset += 2, obj.panose = bin.readBytes(data, offset, 10), offset += 10, obj.ulUnicodeRange1 = bin.readUint(data, offset), offset += 4, obj.ulUnicodeRange2 = bin.readUint(data, offset), offset += 4, obj.ulUnicodeRange3 = bin.readUint(data, offset), offset += 4, obj.ulUnicodeRange4 = bin.readUint(data, offset), offset += 4, obj.achVendID = [bin.readInt8(data, offset), bin.readInt8(data, offset + 1), bin.readInt8(data, offset + 2), bin.readInt8(data, offset + 3)], offset += 4, obj.fsSelection = bin.readUshort(data, offset), offset += 2, obj.usFirstCharIndex = bin.readUshort(data, offset), offset += 2, obj.usLastCharIndex = bin.readUshort(data, offset), offset += 2, obj.sTypoAscender = bin.readShort(data, offset), offset += 2, obj.sTypoDescender = bin.readShort(data, offset), offset += 2, obj.sTypoLineGap = bin.readShort(data, offset), offset += 2, obj.usWinAscent = bin.readUshort(data, offset), offset += 2, obj.usWinDescent = bin.readUshort(data, offset), offset += 2;
  }, Typr["OS/2"].version1 = function(data, offset, obj) {
    var bin = Typr._bin;
    return offset = Typr["OS/2"].version0(data, offset, obj), obj.ulCodePageRange1 = bin.readUint(data, offset), offset += 4, obj.ulCodePageRange2 = bin.readUint(data, offset), offset += 4;
  }, Typr["OS/2"].version2 = function(data, offset, obj) {
    var bin = Typr._bin;
    return offset = Typr["OS/2"].version1(data, offset, obj), obj.sxHeight = bin.readShort(data, offset), offset += 2, obj.sCapHeight = bin.readShort(data, offset), offset += 2, obj.usDefault = bin.readUshort(data, offset), offset += 2, obj.usBreak = bin.readUshort(data, offset), offset += 2, obj.usMaxContext = bin.readUshort(data, offset), offset += 2;
  }, Typr["OS/2"].version5 = function(data, offset, obj) {
    var bin = Typr._bin;
    return offset = Typr["OS/2"].version2(data, offset, obj), obj.usLowerOpticalPointSize = bin.readUshort(data, offset), offset += 2, obj.usUpperOpticalPointSize = bin.readUshort(data, offset), offset += 2;
  }, Typr.post = {}, Typr.post.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {};
    return obj.version = bin.readFixed(data, offset), offset += 4, obj.italicAngle = bin.readFixed(data, offset), offset += 4, obj.underlinePosition = bin.readShort(data, offset), offset += 2, obj.underlineThickness = bin.readShort(data, offset), offset += 2, obj;
  }, Typr.SVG = {}, Typr.SVG.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = { entries: [] }, offset0 = offset;
    bin.readUshort(data, offset), offset += 2;
    var svgDocIndexOffset = bin.readUint(data, offset);
    offset += 4, bin.readUint(data, offset), offset += 4, offset = svgDocIndexOffset + offset0;
    var numEntries = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < numEntries; i++) {
      var startGlyphID = bin.readUshort(data, offset);
      offset += 2;
      var endGlyphID = bin.readUshort(data, offset);
      offset += 2;
      var svgDocOffset = bin.readUint(data, offset);
      offset += 4;
      var svgDocLength = bin.readUint(data, offset);
      offset += 4;
      for (var sbuf = new Uint8Array(data.buffer, offset0 + svgDocOffset + svgDocIndexOffset, svgDocLength), svg = bin.readUTF8(sbuf, 0, sbuf.length), f = startGlyphID; f <= endGlyphID; f++)
        obj.entries[f] = svg;
    }
    return obj;
  }, Typr.SVG.toPath = function(str) {
    var pth = { cmds: [], crds: [] };
    if (null == str)
      return pth;
    for (var svg = new DOMParser().parseFromString(str, "image/svg+xml").firstChild; "svg" != svg.tagName; )
      svg = svg.nextSibling;
    var vb = svg.getAttribute("viewBox");
    vb = vb ? vb.trim().split(" ").map(parseFloat) : [0, 0, 1e3, 1e3], Typr.SVG._toPath(svg.children, pth);
    for (var i = 0; i < pth.crds.length; i += 2) {
      var x = pth.crds[i], y = pth.crds[i + 1];
      x -= vb[0], y = -(y -= vb[1]), pth.crds[i] = x, pth.crds[i + 1] = y;
    }
    return pth;
  }, Typr.SVG._toPath = function(nds, pth, fill) {
    for (var ni = 0; ni < nds.length; ni++) {
      var nd = nds[ni], tn = nd.tagName, cfl = nd.getAttribute("fill");
      if (null == cfl && (cfl = fill), "g" == tn)
        Typr.SVG._toPath(nd.children, pth, cfl);
      else if ("path" == tn) {
        pth.cmds.push(cfl || "#000000");
        var d = nd.getAttribute("d"), toks = Typr.SVG._tokens(d);
        Typr.SVG._toksToPath(toks, pth), pth.cmds.push("X");
      } else
        "defs" == tn || console.log(tn, nd);
    }
  }, Typr.SVG._tokens = function(d) {
    for (var ts = [], off = 0, rn = false, cn = ""; off < d.length; ) {
      var cc = d.charCodeAt(off), ch = d.charAt(off);
      off++;
      var isNum = 48 <= cc && cc <= 57 || "." == ch || "-" == ch;
      rn ? "-" == ch ? (ts.push(parseFloat(cn)), cn = ch) : isNum ? cn += ch : (ts.push(parseFloat(cn)), "," != ch && " " != ch && ts.push(ch), rn = false) : isNum ? (cn = ch, rn = true) : "," != ch && " " != ch && ts.push(ch);
    }
    return rn && ts.push(parseFloat(cn)), ts;
  }, Typr.SVG._toksToPath = function(ts, pth) {
    for (var i = 0, x = 0, y = 0, ox = 0, oy = 0, pc = { M: 2, L: 2, H: 1, V: 1, S: 4, C: 6 }, cmds = pth.cmds, crds = pth.crds; i < ts.length; ) {
      var cmd = ts[i];
      if (i++, "z" == cmd)
        cmds.push("Z"), x = ox, y = oy;
      else
        for (var cmu = cmd.toUpperCase(), ps = pc[cmu], reps = Typr.SVG._reps(ts, i, ps), j = 0; j < reps; j++) {
          var xi = 0, yi = 0;
          if (cmd != cmu && (xi = x, yi = y), "M" == cmu)
            x = xi + ts[i++], y = yi + ts[i++], cmds.push("M"), crds.push(x, y), ox = x, oy = y;
          else if ("L" == cmu)
            x = xi + ts[i++], y = yi + ts[i++], cmds.push("L"), crds.push(x, y);
          else if ("H" == cmu)
            x = xi + ts[i++], cmds.push("L"), crds.push(x, y);
          else if ("V" == cmu)
            y = yi + ts[i++], cmds.push("L"), crds.push(x, y);
          else if ("C" == cmu) {
            var x1 = xi + ts[i++], y1 = yi + ts[i++], x2 = xi + ts[i++], y2 = yi + ts[i++], x3 = xi + ts[i++], y3 = yi + ts[i++];
            cmds.push("C"), crds.push(x1, y1, x2, y2, x3, y3), x = x3, y = y3;
          } else if ("S" == cmu) {
            var co = Math.max(crds.length - 4, 0);
            x1 = x + x - crds[co], y1 = y + y - crds[co + 1], x2 = xi + ts[i++], y2 = yi + ts[i++], x3 = xi + ts[i++], y3 = yi + ts[i++];
            cmds.push("C"), crds.push(x1, y1, x2, y2, x3, y3), x = x3, y = y3;
          } else
            console.log("Unknown SVG command " + cmd);
        }
    }
  }, Typr.SVG._reps = function(ts, off, ps) {
    for (var i = off; i < ts.length && "string" != typeof ts[i]; )
      i += ps;
    return (i - off) / ps;
  }, null == Typr && (Typr = {}), null == Typr.U && (Typr.U = {}), Typr.U.codeToGlyph = function(font, code) {
    var cmap = font.cmap, tind = -1;
    if (null != cmap.p0e4 ? tind = cmap.p0e4 : null != cmap.p3e1 ? tind = cmap.p3e1 : null != cmap.p1e0 && (tind = cmap.p1e0), -1 == tind)
      throw "no familiar platform and encoding!";
    var tab = cmap.tables[tind];
    if (0 == tab.format)
      return code >= tab.map.length ? 0 : tab.map[code];
    if (4 == tab.format) {
      for (var sind = -1, i = 0; i < tab.endCount.length; i++)
        if (code <= tab.endCount[i]) {
          sind = i;
          break;
        }
      if (-1 == sind)
        return 0;
      if (tab.startCount[sind] > code)
        return 0;
      return 65535 & (0 != tab.idRangeOffset[sind] ? tab.glyphIdArray[code - tab.startCount[sind] + (tab.idRangeOffset[sind] >> 1) - (tab.idRangeOffset.length - sind)] : code + tab.idDelta[sind]);
    }
    if (12 == tab.format) {
      if (code > tab.groups[tab.groups.length - 1][1])
        return 0;
      for (i = 0; i < tab.groups.length; i++) {
        var grp = tab.groups[i];
        if (grp[0] <= code && code <= grp[1])
          return grp[2] + (code - grp[0]);
      }
      return 0;
    }
    throw "unknown cmap table format " + tab.format;
  }, Typr.U.glyphToPath = function(font, gid) {
    var path = { cmds: [], crds: [] };
    if (font.SVG && font.SVG.entries[gid]) {
      var p = font.SVG.entries[gid];
      return null == p ? path : ("string" == typeof p && (p = Typr.SVG.toPath(p), font.SVG.entries[gid] = p), p);
    }
    if (font.CFF) {
      var state = { x: 0, y: 0, stack: [], nStems: 0, haveWidth: false, width: font.CFF.Private ? font.CFF.Private.defaultWidthX : 0, open: false };
      Typr.U._drawCFF(font.CFF.CharStrings[gid], state, font.CFF, path);
    } else
      font.glyf && Typr.U._drawGlyf(gid, font, path);
    return path;
  }, Typr.U._drawGlyf = function(gid, font, path) {
    var gl = font.glyf[gid];
    null == gl && (gl = font.glyf[gid] = Typr.glyf._parseGlyf(font, gid)), null != gl && (gl.noc > -1 ? Typr.U._simpleGlyph(gl, path) : Typr.U._compoGlyph(gl, font, path));
  }, Typr.U._simpleGlyph = function(gl, p) {
    for (var c = 0; c < gl.noc; c++) {
      for (var i0 = 0 == c ? 0 : gl.endPts[c - 1] + 1, il = gl.endPts[c], i = i0; i <= il; i++) {
        var pr = i == i0 ? il : i - 1, nx = i == il ? i0 : i + 1, onCurve = 1 & gl.flags[i], prOnCurve = 1 & gl.flags[pr], nxOnCurve = 1 & gl.flags[nx], x = gl.xs[i], y = gl.ys[i];
        if (i == i0)
          if (onCurve) {
            if (!prOnCurve) {
              Typr.U.P.moveTo(p, x, y);
              continue;
            }
            Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]);
          } else
            prOnCurve ? Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]) : Typr.U.P.moveTo(p, (gl.xs[pr] + x) / 2, (gl.ys[pr] + y) / 2);
        onCurve ? prOnCurve && Typr.U.P.lineTo(p, x, y) : nxOnCurve ? Typr.U.P.qcurveTo(p, x, y, gl.xs[nx], gl.ys[nx]) : Typr.U.P.qcurveTo(p, x, y, (x + gl.xs[nx]) / 2, (y + gl.ys[nx]) / 2);
      }
      Typr.U.P.closePath(p);
    }
  }, Typr.U._compoGlyph = function(gl, font, p) {
    for (var j = 0; j < gl.parts.length; j++) {
      var path = { cmds: [], crds: [] }, prt = gl.parts[j];
      Typr.U._drawGlyf(prt.glyphIndex, font, path);
      for (var m = prt.m, i = 0; i < path.crds.length; i += 2) {
        var x = path.crds[i], y = path.crds[i + 1];
        p.crds.push(x * m.a + y * m.b + m.tx), p.crds.push(x * m.c + y * m.d + m.ty);
      }
      for (i = 0; i < path.cmds.length; i++)
        p.cmds.push(path.cmds[i]);
    }
  }, Typr.U._getGlyphClass = function(g, cd) {
    var intr = Typr._lctf.getInterval(cd, g);
    return -1 == intr ? 0 : cd[intr + 2];
  }, Typr.U.getPairAdjustment = function(font, g1, g2) {
    if (font.GPOS) {
      for (var ltab = null, i = 0; i < font.GPOS.featureList.length; i++) {
        var fl = font.GPOS.featureList[i];
        if ("kern" == fl.tag)
          for (var j = 0; j < fl.tab.length; j++)
            2 == font.GPOS.lookupList[fl.tab[j]].ltype && (ltab = font.GPOS.lookupList[fl.tab[j]]);
      }
      if (ltab)
        for (i = 0; i < ltab.tabs.length; i++) {
          var tab = ltab.tabs[i], ind = Typr._lctf.coverageIndex(tab.coverage, g1);
          if (-1 != ind) {
            if (1 == tab.format) {
              var right = tab.pairsets[ind];
              for (j = 0; j < right.length; j++)
                right[j].gid2 == g2 && (adj = right[j]);
              if (null == adj)
                continue;
            } else if (2 == tab.format)
              var c1 = Typr.U._getGlyphClass(g1, tab.classDef1), c2 = Typr.U._getGlyphClass(g2, tab.classDef2), adj = tab.matrix[c1][c2];
            return adj.val1[2];
          }
        }
    }
    if (font.kern) {
      var ind1 = font.kern.glyph1.indexOf(g1);
      if (-1 != ind1) {
        var ind2 = font.kern.rval[ind1].glyph2.indexOf(g2);
        if (-1 != ind2)
          return font.kern.rval[ind1].vals[ind2];
      }
    }
    return 0;
  }, Typr.U.stringToGlyphs = function(font, str) {
    for (var gls = [], i = 0; i < str.length; i++) {
      var cc = str.codePointAt(i);
      cc > 65535 && i++, gls.push(Typr.U.codeToGlyph(font, cc));
    }
    var gsub = font.GSUB;
    if (null == gsub)
      return gls;
    for (var llist = gsub.lookupList, flist = gsub.featureList, wsep = '\n\t" ,.:;!?()  ،', R = "آأؤإاةدذرزوٱٲٳٵٶٷڈډڊڋڌڍڎڏڐڑڒړڔڕږڗژڙۀۃۄۅۆۇۈۉۊۋۍۏےۓەۮۯܐܕܖܗܘܙܞܨܪܬܯݍݙݚݛݫݬݱݳݴݸݹࡀࡆࡇࡉࡔࡧࡩࡪࢪࢫࢬࢮࢱࢲࢹૅેૉ૊૎૏ૐ૑૒૝ૡ૤૯஁ஃ஄அஉ஌எஏ஑னப஫஬", ci = 0; ci < gls.length; ci++) {
      var gl = gls[ci], slft = 0 == ci || -1 != wsep.indexOf(str[ci - 1]), srgt = ci == gls.length - 1 || -1 != wsep.indexOf(str[ci + 1]);
      slft || -1 == R.indexOf(str[ci - 1]) || (slft = true), srgt || -1 == R.indexOf(str[ci]) || (srgt = true), srgt || -1 == "ꡲ્૗".indexOf(str[ci + 1]) || (srgt = true), slft || -1 == "ꡲ્૗".indexOf(str[ci]) || (slft = true);
      var feat = null;
      feat = slft ? srgt ? "isol" : "init" : srgt ? "fina" : "medi";
      for (var fi = 0; fi < flist.length; fi++)
        if (flist[fi].tag == feat)
          for (var ti = 0; ti < flist[fi].tab.length; ti++) {
            1 == (tab = llist[flist[fi].tab[ti]]).ltype && Typr.U._applyType1(gls, ci, tab);
          }
    }
    var cligs = ["rlig", "liga", "mset"];
    for (ci = 0; ci < gls.length; ci++) {
      gl = gls[ci];
      var rlim = Math.min(3, gls.length - ci - 1);
      for (fi = 0; fi < flist.length; fi++) {
        var fl = flist[fi];
        if (-1 != cligs.indexOf(fl.tag)) {
          for (ti = 0; ti < fl.tab.length; ti++)
            for (var tab = llist[fl.tab[ti]], j = 0; j < tab.tabs.length; j++)
              if (null != tab.tabs[j]) {
                var ind = Typr._lctf.coverageIndex(tab.tabs[j].coverage, gl);
                if (-1 != ind) {
                  if (4 == tab.ltype)
                    for (var vals = tab.tabs[j].vals[ind], k = 0; k < vals.length; k++) {
                      var lig = vals[k], rl = lig.chain.length;
                      if (!(rl > rlim)) {
                        for (var good = true, l = 0; l < rl; l++)
                          lig.chain[l] != gls[ci + (1 + l)] && (good = false);
                        if (good) {
                          gls[ci] = lig.nglyph;
                          for (l = 0; l < rl; l++)
                            gls[ci + l + 1] = -1;
                        }
                      }
                    }
                  else if (5 == tab.ltype) {
                    var ltab = tab.tabs[j];
                    if (2 != ltab.fmt)
                      continue;
                    var cind = Typr._lctf.getInterval(ltab.cDef, gl), cls = ltab.cDef[cind + 2], scs = ltab.scset[cls];
                    for (i = 0; i < scs.length; i++) {
                      var sc = scs[i], inp = sc.input;
                      if (!(inp.length > rlim)) {
                        for (good = true, l = 0; l < inp.length; l++) {
                          var cind2 = Typr._lctf.getInterval(ltab.cDef, gls[ci + 1 + l]);
                          if (-1 == cind && ltab.cDef[cind2 + 2] != inp[l]) {
                            good = false;
                            break;
                          }
                        }
                        if (good) {
                          var lrs = sc.substLookupRecords;
                          for (k = 0; k < lrs.length; k += 2)
                            lrs[k], lrs[k + 1];
                        }
                      }
                    }
                  }
                }
              }
        }
      }
    }
    return gls;
  }, Typr.U._applyType1 = function(gls, ci, tab) {
    for (var gl = gls[ci], j = 0; j < tab.tabs.length; j++) {
      var ttab = tab.tabs[j], ind = Typr._lctf.coverageIndex(ttab.coverage, gl);
      -1 != ind && (1 == ttab.fmt ? gls[ci] = gls[ci] + ttab.delta : gls[ci] = ttab.newg[ind]);
    }
  }, Typr.U.glyphsToPath = function(font, gls, clr) {
    for (var tpath = { cmds: [], crds: [] }, x = 0, i = 0; i < gls.length; i++) {
      var gid = gls[i];
      if (-1 != gid) {
        for (var gid2 = i < gls.length - 1 && -1 != gls[i + 1] ? gls[i + 1] : 0, path = Typr.U.glyphToPath(font, gid), j = 0; j < path.crds.length; j += 2)
          tpath.crds.push(path.crds[j] + x), tpath.crds.push(path.crds[j + 1]);
        clr && tpath.cmds.push(clr);
        for (j = 0; j < path.cmds.length; j++)
          tpath.cmds.push(path.cmds[j]);
        clr && tpath.cmds.push("X"), x += font.hmtx.aWidth[gid], i < gls.length - 1 && (x += Typr.U.getPairAdjustment(font, gid, gid2));
      }
    }
    return tpath;
  }, Typr.U.pathToSVG = function(path, prec) {
    null == prec && (prec = 5);
    for (var out = [], co = 0, lmap = { M: 2, L: 2, Q: 4, C: 6 }, i = 0; i < path.cmds.length; i++) {
      var cmd = path.cmds[i], cn = co + (lmap[cmd] ? lmap[cmd] : 0);
      for (out.push(cmd); co < cn; ) {
        var c = path.crds[co++];
        out.push(parseFloat(c.toFixed(prec)) + (co == cn ? "" : " "));
      }
    }
    return out.join("");
  }, Typr.U.pathToContext = function(path, ctx) {
    for (var c = 0, crds = path.crds, j = 0; j < path.cmds.length; j++) {
      var cmd = path.cmds[j];
      "M" == cmd ? (ctx.moveTo(crds[c], crds[c + 1]), c += 2) : "L" == cmd ? (ctx.lineTo(crds[c], crds[c + 1]), c += 2) : "C" == cmd ? (ctx.bezierCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3], crds[c + 4], crds[c + 5]), c += 6) : "Q" == cmd ? (ctx.quadraticCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3]), c += 4) : "#" == cmd.charAt(0) ? (ctx.beginPath(), ctx.fillStyle = cmd) : "Z" == cmd ? ctx.closePath() : "X" == cmd && ctx.fill();
    }
  }, Typr.U.P = {}, Typr.U.P.moveTo = function(p, x, y) {
    p.cmds.push("M"), p.crds.push(x, y);
  }, Typr.U.P.lineTo = function(p, x, y) {
    p.cmds.push("L"), p.crds.push(x, y);
  }, Typr.U.P.curveTo = function(p, a, b, c, d, e, f) {
    p.cmds.push("C"), p.crds.push(a, b, c, d, e, f);
  }, Typr.U.P.qcurveTo = function(p, a, b, c, d) {
    p.cmds.push("Q"), p.crds.push(a, b, c, d);
  }, Typr.U.P.closePath = function(p) {
    p.cmds.push("Z");
  }, Typr.U._drawCFF = function(cmds, state, font, p) {
    for (var stack = state.stack, nStems = state.nStems, haveWidth = state.haveWidth, width = state.width, open = state.open, i = 0, x = state.x, y = state.y, c1x = 0, c1y = 0, c2x = 0, c2y = 0, c3x = 0, c3y = 0, c4x = 0, c4y = 0, jpx = 0, jpy = 0, o = { val: 0, size: 0 }; i < cmds.length; ) {
      Typr.CFF.getCharString(cmds, i, o);
      var v = o.val;
      if (i += o.size, "o1" == v || "o18" == v)
        stack.length % 2 != 0 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX), nStems += stack.length >> 1, stack.length = 0, haveWidth = true;
      else if ("o3" == v || "o23" == v) {
        stack.length % 2 != 0 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX), nStems += stack.length >> 1, stack.length = 0, haveWidth = true;
      } else if ("o4" == v)
        stack.length > 1 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX, haveWidth = true), open && Typr.U.P.closePath(p), y += stack.pop(), Typr.U.P.moveTo(p, x, y), open = true;
      else if ("o5" == v)
        for (; stack.length > 0; )
          x += stack.shift(), y += stack.shift(), Typr.U.P.lineTo(p, x, y);
      else if ("o6" == v || "o7" == v)
        for (var count = stack.length, isX = "o6" == v, j = 0; j < count; j++) {
          var sval = stack.shift();
          isX ? x += sval : y += sval, isX = !isX, Typr.U.P.lineTo(p, x, y);
        }
      else if ("o8" == v || "o24" == v) {
        count = stack.length;
        for (var index = 0; index + 6 <= count; )
          c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), x = c2x + stack.shift(), y = c2y + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y), index += 6;
        "o24" == v && (x += stack.shift(), y += stack.shift(), Typr.U.P.lineTo(p, x, y));
      } else {
        if ("o11" == v)
          break;
        if ("o1234" == v || "o1235" == v || "o1236" == v || "o1237" == v)
          "o1234" == v && (c1y = y, c2x = (c1x = x + stack.shift()) + stack.shift(), jpy = c2y = c1y + stack.shift(), c3y = c2y, c4y = y, x = (c4x = (c3x = (jpx = c2x + stack.shift()) + stack.shift()) + stack.shift()) + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy), Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y)), "o1235" == v && (c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), jpx = c2x + stack.shift(), jpy = c2y + stack.shift(), c3x = jpx + stack.shift(), c3y = jpy + stack.shift(), c4x = c3x + stack.shift(), c4y = c3y + stack.shift(), x = c4x + stack.shift(), y = c4y + stack.shift(), stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy), Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y)), "o1236" == v && (c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), jpy = c2y = c1y + stack.shift(), c3y = c2y, c4x = (c3x = (jpx = c2x + stack.shift()) + stack.shift()) + stack.shift(), c4y = c3y + stack.shift(), x = c4x + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy), Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y)), "o1237" == v && (c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), jpx = c2x + stack.shift(), jpy = c2y + stack.shift(), c3x = jpx + stack.shift(), c3y = jpy + stack.shift(), c4x = c3x + stack.shift(), c4y = c3y + stack.shift(), Math.abs(c4x - x) > Math.abs(c4y - y) ? x = c4x + stack.shift() : y = c4y + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy), Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y));
        else if ("o14" == v) {
          if (stack.length > 0 && !haveWidth && (width = stack.shift() + font.nominalWidthX, haveWidth = true), 4 == stack.length) {
            var adx = stack.shift(), ady = stack.shift(), bchar = stack.shift(), achar = stack.shift(), bind = Typr.CFF.glyphBySE(font, bchar), aind = Typr.CFF.glyphBySE(font, achar);
            Typr.U._drawCFF(font.CharStrings[bind], state, font, p), state.x = adx, state.y = ady, Typr.U._drawCFF(font.CharStrings[aind], state, font, p);
          }
          open && (Typr.U.P.closePath(p), open = false);
        } else if ("o19" == v || "o20" == v) {
          stack.length % 2 != 0 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX), nStems += stack.length >> 1, stack.length = 0, haveWidth = true, i += nStems + 7 >> 3;
        } else if ("o21" == v)
          stack.length > 2 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX, haveWidth = true), y += stack.pop(), x += stack.pop(), open && Typr.U.P.closePath(p), Typr.U.P.moveTo(p, x, y), open = true;
        else if ("o22" == v)
          stack.length > 1 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX, haveWidth = true), x += stack.pop(), open && Typr.U.P.closePath(p), Typr.U.P.moveTo(p, x, y), open = true;
        else if ("o25" == v) {
          for (; stack.length > 6; )
            x += stack.shift(), y += stack.shift(), Typr.U.P.lineTo(p, x, y);
          c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), x = c2x + stack.shift(), y = c2y + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        } else if ("o26" == v)
          for (stack.length % 2 && (x += stack.shift()); stack.length > 0; )
            c1x = x, c1y = y + stack.shift(), x = c2x = c1x + stack.shift(), y = (c2y = c1y + stack.shift()) + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        else if ("o27" == v)
          for (stack.length % 2 && (y += stack.shift()); stack.length > 0; )
            c1y = y, c2x = (c1x = x + stack.shift()) + stack.shift(), c2y = c1y + stack.shift(), x = c2x + stack.shift(), y = c2y, Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        else if ("o10" == v || "o29" == v) {
          var obj = "o10" == v ? font.Private : font;
          if (0 == stack.length)
            console.log("error: empty stack");
          else {
            var ind = stack.pop(), subr = obj.Subrs[ind + obj.Bias];
            state.x = x, state.y = y, state.nStems = nStems, state.haveWidth = haveWidth, state.width = width, state.open = open, Typr.U._drawCFF(subr, state, font, p), x = state.x, y = state.y, nStems = state.nStems, haveWidth = state.haveWidth, width = state.width, open = state.open;
          }
        } else if ("o30" == v || "o31" == v) {
          var count1 = stack.length, alternate = (index = 0, "o31" == v);
          for (index += count1 - (count = -3 & count1); index < count; )
            alternate ? (c1y = y, c2x = (c1x = x + stack.shift()) + stack.shift(), y = (c2y = c1y + stack.shift()) + stack.shift(), count - index == 5 ? (x = c2x + stack.shift(), index++) : x = c2x, alternate = false) : (c1x = x, c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), x = c2x + stack.shift(), count - index == 5 ? (y = c2y + stack.shift(), index++) : y = c2y, alternate = true), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y), index += 4;
        } else {
          if ("o" == (v + "").charAt(0))
            throw console.log("Unknown operation: " + v, cmds), v;
          stack.push(v);
        }
      }
    }
    state.x = x, state.y = y, state.nStems = nStems, state.haveWidth = haveWidth, state.width = width, state.open = open;
  };

  const Typr$1 = getDefaultExportFromCjs(Typr), questionType = { "单选题": "0", "多选题": "1", "填空题": "2", "判断题": "3", "简答题": "4", "名词解释": "5", "论述题": "6", "计算题": "7" }, log = (data, type = "info") => {
    var _a;
    const style = `color: ${{ info: "orange", success: "green", error: "red" }[type]}; font-weight: bold;`;
    if (Array.isArray(data) || "object" == typeof data ? console.log(`%c${JSON.stringify(data, null, 2)}`, style) : console.log(`%c${data}`, style), getConfig().debugger) {
      const caller = (((_a = new Error().stack) == null ? void 0 : _a.split("\n")) || [])[2].trim();
      console.log(`${caller}`);
    }
  }, sleep = (time) => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1e3 * time);
  }),
  sleepMs = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
  }), waitIframeLoaded = (iframe) => new Promise((resolve) => {
    if (!iframe) return void resolve();
    let done = false;
    const finish = () => {
      if (!done) {
        done = true, clearInterval(timer), clearTimeout(timeoutId), resolve();
      }
    };
    const timer = setInterval(() => {
      try {
        var _a;
        iframe.contentDocument && "complete" === ((_a = iframe.contentDocument) == null ? void 0 : _a.readyState) ? finish() : iframe.addEventListener("load", finish, { once: true });
      } catch (e) {
        finish();
      }
    }, 100);
    const timeoutId = setTimeout(finish, 15e3);
  }), waitElementLoaded = (iframeWindow, selector) => new Promise((resolve) => {
    if (!iframeWindow) return void resolve();
    let done = false;
    const finish = () => {
      if (!done) {
        done = true, clearInterval(timer), clearTimeout(timeoutId), resolve();
      }
    };
    const timer = setInterval(() => {
      try {
        iframeWindow.document && iframeWindow.document.querySelector(selector) && finish();
      } catch (e) {
        finish();
      }
    }, 100);
    const timeoutId = setTimeout(finish, 15e3);
  }), removeHtml = (html) => null == html ? "" : html.replace(/<((?!img|sub|sup|br)[^>]+)>/g, "").replace(/&nbsp;/g, " ").replace(/[ \t]+/g, " ").replace(/<br\s*\/?>/g, "\n").replace(/<img[^>]*\balt="([^"]*)"[^>]*>/gi, " [图:$1] ").replace(/<img[^>]*>/gi, " [图片] ").replace(/[ \t]{2,}/g, " ").replace(/\n[ \t]+/g, "\n").replace(/[ \t]+\n/g, "\n").trim(), cl = (str) => str.replace(/^【.*?】\s*/, "").replace(/\s*（\d+\.\d+分）$/, ""), getQuestion = (type, html) => {
    let questionHtml, questionText, questionTypeId, optionHtml, tokenHtml, workType, optionText, index;
    try {
      switch (type) {
        case "1": {
          workType = "zj";
          questionHtml = Array.from(html.querySelectorAll(".clearfix .fontLabel"));
          questionText = cl(removeHtml(questionHtml[0].innerHTML));
          questionTypeId = html.querySelectorAll("input[name^=answertype]")[0].value;
          tokenHtml = html.innerHTML;
          // 选项文本提取：首选 li .after；新模板里没有 .after，退到 .num_option / 裸 li
          const ul0 = html.querySelectorAll("ul")[0];
          let optNodes = ul0 ? Array.from(ul0.querySelectorAll("li .after")) : [];
          let optMode = "after";
          if (!optNodes.length && ul0) { optNodes = Array.from(ul0.querySelectorAll("li .num_option, li .num_option_dx")); optMode = "num_option"; }
          if (!optNodes.length && ul0) { optNodes = Array.from(ul0.querySelectorAll("li")); optMode = "li"; }
          optionText = optNodes.map(function(item) {
            if (optMode === "li") {
              // 裸 li 会把选项序号（A. / A、）也算进去，去掉它
              const t = removeHtml(item.innerHTML).replace(/^\s*[A-Ha-h]\s*[\.、．\)）:：]?\s*/, "").trim();
              return t || removeHtml(item.innerHTML);
            }
            return removeHtml(item.innerHTML);
          });
          if (!optionText.length) console.warn("[取题] 未取到任何选项文本（ul 存在=" + !!ul0 + "），该题大概率会填不出来");
          return { question: questionText, options: optionText, type: questionTypeId, questionData: tokenHtml, workType };
        }
        case "2":
          workType = "zy", questionHtml = Array.from(html.querySelectorAll(".mark_name")), index = questionHtml[0].innerHTML.indexOf("</span>"), questionText = cl(removeHtml(questionHtml[0].innerHTML.substring(index + 7))), questionTypeId = html.querySelectorAll("input[name^=answertype]")[0].value, optionHtml = Array.from(html.querySelectorAll(".answer_p")), tokenHtml = html.innerHTML, optionText = [];
          for (let i = 0; i < optionHtml.length; i++)
            optionText.push(removeHtml(optionHtml[i].innerHTML));
          return { question: questionText, options: optionText, type: questionTypeId, questionData: tokenHtml, workType };
        case "3":
          workType = "ks", questionHtml = Array.from(document.getElementsByClassName("mark_name colorDeep")), index = questionHtml[0].innerHTML.indexOf("</span>"), questionText = cl(removeHtml(questionHtml[0].innerHTML.substring(index + 7))), questionTypeId = document.querySelectorAll("input[name^=type]")[1].value, optionHtml = Array.from(document.getElementsByClassName("answer_p")), tokenHtml = document.getElementsByClassName("mark_table")[0].innerHTML, optionText = [];
          for (let i = 0; i < optionHtml.length; i++)
            optionText.push(removeHtml(optionHtml[i].innerHTML));
          return { question: questionText, options: optionText, type: questionTypeId, questionData: tokenHtml, workType };
      }
    } catch (e) {
      console.error("[取题失败] type=" + type, e);
      return { question: "", options: [], type: "0", questionData: "", workType: "?", _parseError: String(e && e.message ? e.message : e) };
    }
  }, decode = (iframeWindow) => {
    var _a;
    const styleElements = iframeWindow.document.querySelectorAll("style");
    let tipElement = null;
    if (styleElements.forEach((styleElement) => {
      var _a2;
      -1 !== ((_a2 = styleElement.textContent) == null ? void 0 : _a2.indexOf("font-cxsecret")) && (tipElement = styleElement);
    }), !tipElement)
      return;
    const fontMatch = (_a = tipElement.textContent) == null ? void 0 : _a.match(/base64,([\w\W]+?)'/);
    if (!fontMatch)
      return;
    const fontData = ((base64) => {
      const decodedData = atob(base64), array = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++)
        array[i] = decodedData.charCodeAt(i);
      return array;
    })(fontMatch[1]), font = Typr$1.parse(fontData), table = JSON.parse(_GM_getResourceText("ttf"));
    // v1.2.x 性能修复（提速关键）：旧实现无条件遍历 19968..40870 共 20902 个码位，
    //   每个都跑 codeToGlyph + glyphToPath + JSON.stringify + md5 —— 纯同步 CPU，每章重算，
    //   实测单次数秒。而页面上真正出现的混淆字符通常只有几十个。
    //   改为：先把 .font-cxsecret 里实际出现的码位收齐，只对这些算映射；字符级替换也不再逐字建 RegExp。
    const els = Array.prototype.slice.call(iframeWindow.document.querySelectorAll(".font-cxsecret"));
    if (!els.length) return;
    const need = new Map();
    els.forEach((el) => {
      const s = el.textContent || "";
      for (const ch of s) need.set(ch.codePointAt(0), ch);
    });
    const text = {};
    let hit = 0;
    need.forEach((ch, cp) => {
      try {
        const g = Typr$1.U.codeToGlyph(font, cp);
        if (!g) return;
        const p = Typr$1.U.glyphToPath(font, g);
        const k = md5(JSON.stringify(p)).slice(24);
        const v = table[k];
        if (v != null) { text[cp] = v; hit++; }
      } catch (e) {}
    });
    console.log("[字体解码] 页面混淆字符 " + need.size + " 个，命中映射表 " + hit + " 个（旧实现要算 20902 个）");
    els.forEach((fontElement) => {
      const html = fontElement.innerHTML;
      const parts = [];
      for (const ch of html) {
        const cp = ch.codePointAt(0);
        parts.push(text[cp] != null ? String.fromCharCode(text[cp]) : ch);
      }
      fontElement.innerHTML = parts.join("");
      fontElement.classList.remove("font-cxsecret");
    });
  }, getAnswers = (questionData, windowz = _unsafeWindow) => {
    let server = new ServerApi(windowz);
    return Promise.all([server.getAnswer(questionData)]);
  }, fillAnswer = (answer, questionData, html, iframeWindow) => {
    const rawAll = answer || [];
    answer = rawAll.filter((item) => item && item.answer && item.answer.length > 0), console.log(answer);
    for (let i = 0; i < answer.length; i++) {
      if ("string" == typeof answer[i].answer) {
        if (-1 !== answer[i].answer.indexOf("付费题库") || -1 !== answer[i].answer.indexOf("暂无答案") || "略" == answer[i].answer) {
          questionData._fillError = "答案被标记为「付费题库 / 暂无答案 / 略」，已跳过";
          continue;
        }
        answer[i].answer = [answer[i].answer];
      }
      let tmp = setAnswer(answer[i].answer, questionData, html, iframeWindow);
      if (tmp)
        return tmp;
    }
    // 到这里说明没填上：把「为什么没填上」记在题目对象上，供 UI 如实显示
    if (!questionData._fillError) {
      const first = rawAll[0];
      questionData._fillError = diagnoseFill(questionData, first ? first.answer : "");
    }
    return false;
  }, setAnswer = (answer, questionData, html, iframeWindow) => {
    switch (questionData.type) {
      case "0":
      case "1": {
        const matchArr = matchAnswer(answer, questionData.options);
        if (matchArr.length === 0) return false;
        clearCurrent(html, iframeWindow);
        const $root = $$1(html);
        let $lis = $root.find("ul:eq(0) li").filter(function() {
          return $$1(this).find(".after, :radio, :checkbox, .answerBg").length > 0;
        });
        if ($lis.length === 0) $lis = $root.find("li").filter(function() {
          return $$1(this).find(".after, :radio, :checkbox, .answerBg").length > 0;
        });
        const $answerBg = $root.find(".answerBg");
        for (let i = 0; i < matchArr.length; i++) {
          const idx = matchArr[i];
          let $li = $lis.eq(idx);
          const wantText = removeHtml(questionData.options[idx] || "");
          if (wantText) {
            const $byText = $lis.filter(function() {
              const $a = $$1(this).find(".after");
              return removeHtml($a.length ? $a.first().html() : this.innerHTML) === wantText;
            });
            if ($byText.length) $li = $byText.first();
          }
          const $input = $li.find(":radio, :checkbox").first();
          if ($input.length) {
            if ($input.prop("checked")) continue;
            const $label = $li.find("label").first();
            if ($label.length) $label.click();
            if (!$input.prop("checked") && $li.length) $li.click();
            if (!$input.prop("checked")) $input.prop("checked", true).trigger("change");
          } else if ($answerBg.eq(idx).length) {
            if ($answerBg.eq(idx).find(".check_answer, .check_answer_dx").length) continue;
            $answerBg.eq(idx).click();
          } else if ($li.length) {
            if ($li.find(".check_answer, .check_answer_dx").length) continue;
            $li.click();
          }
        }
        let _wrote = null;
        try { _wrote = writeChoiceModel(html, matchArr, iframeWindow.document, "1" == questionData.type); } catch (e) { console.log("[答案模型] 直写失败:", e); }
        if (_wrote) return answer;
        let _newTpl = false, _inpNow = null;
        try {
          _inpNow = answerInputOf(html, iframeWindow.document);
          if (_inpNow) _newTpl = !!iframeWindow.document.querySelectorAll(".choice" + String(_inpNow.id).slice(6)).length;
        } catch (e) {}
        if (_newTpl) {
          try { if (_inpNow && String(_inpNow.value || "").replace(/\s+/g, "")) return answer; } catch (e) {}
          console.log("[答案模型] 新模板直写未成功，如实返回 false（等待提交前补写兜底）");
          return false;
        }
        const hasInputs = $root.find("ul:eq(0) :radio, :checkbox").length > 0;
        const anyChecked = $root.find("ul:eq(0) :radio, :checkbox").filter(":checked").length > 0
          || $root.find(".check_answer, .check_answer_dx").length > 0;
        return (hasInputs ? anyChecked : true) ? answer : false;
      }
      case "3": {
        clearCurrent(html, iframeWindow);
        const _ans3 = answer instanceof Array ? answer[0] : answer;
        const _idxs3 = targetIndices("3", _ans3, questionData.options);
        try {
          $$1(html).find("ul:eq(0) li :radio,:checkbox,textarea").each(function() {
            "true" == $$1(this).val() ? _ans3.match(/(^|,)(True|true|正确|是|对|√|T|ri)(,|$)/) && $$1(this).click() : _ans3.match(/(^|,)(False|false|错误|否|错|×|F|wr)(,|$)/) && $$1(this).click();
          }), $$1(html).find(".answerBg").each(function() {
            "true" == $$1(this).find(".num_option").attr("data") ? _ans3.match(/(^|,)(True|true|正确|是|对|√|T|ri)(,|$)/) && $$1(this).click() : _ans3.match(/(^|,)(False|false|错误|否|错|×|F|wr)(,|$)/) && $$1(this).click();
          });
        } catch (e) {}
        let _wrote3 = null;
        try { _wrote3 = writeChoiceModel(html, _idxs3, iframeWindow.document, false); } catch (e) { console.log("[答案模型] 判断题直写失败:", e); }
        if (_wrote3) return _ans3;
        let _newTpl3 = false, _inpNow3 = null;
        try {
          _inpNow3 = answerInputOf(html, iframeWindow.document);
          if (_inpNow3) _newTpl3 = !!iframeWindow.document.querySelectorAll(".choice" + String(_inpNow3.id).slice(6)).length;
        } catch (e) {}
        if (_newTpl3) {
          try { if (_inpNow3 && String(_inpNow3.value || "").replace(/\s+/g, "")) return _ans3; } catch (e) {}
          console.log("[答案模型] 判断题新模板直写未成功，如实返回 false");
          return false;
        }
        return !!($$1(html).find("ul:eq(0) li :radio,:checkbox,textarea").is(":checked") || $$1(html).find(".check_answer").length > 0 || $$1(html).find(".check_answer_dx").length > 0) && _ans3;
      }
      case "2":
      case "9":
      case "4":
      case "5":
      case "6":
      case "7":
        const tas = $$1(html).find("textarea");
        if (tas.length === 0) return false;
        clearCurrent(html, iframeWindow);
        tas.each(function(index) {
          if (index < answer.length) {
            iframeWindow.UE.getEditor($$1(this).attr("name")).ready(function() {
              this.setContent((answer[index] || "").replace(/第.空:/g, ""));
            });
          }
        });
        return answer;
      default:
        return false;
    }
  }, matchAnswer = (answer, options) => {
    // 三层匹配。旧实现只做「HTML 剥离后逐字相等」，
    // 一个全角逗号、一个多余空格、一个省略号差异就会判失败 —— 这是「答案明明有却填不进去」的主因。
    const normMatch = (s) => String(s == null ? "" : s)
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/gi, "")
      .replace(/[\s\u3000\u00a0]+/g, "")
      .replace(/[，,。、;；:：""''"'（）()【】\[\]《》!！?？~～·—]/g, "")
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
      .toLowerCase();

    const list = (answer instanceof Array ? answer : [answer])
      .filter((x) => x != null)
      .map((x) => removeHtml(x));
    const opts = options || [];
    const hit = [];
    const push = (j) => { if (hit.indexOf(j) < 0) hit.push(j); };

    // ① 逐字相等（最可靠）
    for (let i = 0; i < list.length; i++)
      for (let j = 0; j < opts.length; j++)
        if (String(list[i]) === String(opts[j])) push(j);
    if (hit.length) return hit.sort((a, b) => a - b);

    // ② 归一化后相等（全半角、标点、空白差异）
    const na = list.map(normMatch).filter((s) => s.length >= 2);
    const no = opts.map(normMatch);
    for (let i = 0; i < na.length; i++)
      for (let j = 0; j < no.length; j++)
        if (no[j] && na[i] === no[j]) push(j);
    if (hit.length) return hit.sort((a, b) => a - b);

    // ③ AI 那段话里包含了某个选项原文 → 唯一命中才采信（避免 "音调" 同时命中多个选项）
    for (let i = 0; i < na.length; i++) {
      const local = [];
      for (let j = 0; j < no.length; j++) {
        if (no[j] && no[j].length >= 4 && na[i].includes(no[j])) local.push(j);
      }
      if (local.length === 1) push(local[0]);
    }
    return hit.sort((a, b) => a - b);
  }, clearCurrent = (item, iframeWindow) => {
    $$1(item).find(".answerBg, .textDIV, .eidtDiv").each(function() {
      ($$1(this).find(".check_answer").length || $$1(this).find(".check_answer_dx").length) && $$1(this).click();
    }), $$1(item).find("textarea").each(function() {
      try {
        iframeWindow.UE.getEditor($$1(this).attr("name")).ready(function() {
          this.setContent("");
        });
      } catch (e) {}
    }),
    $$1(item).find(".num_option.check_answer, .num_option.check_answer_dx, .num_option_dx.check_answer, .num_option_dx.check_answer_dx").removeClass("check_answer check_answer_dx"),
    $$1(item).find('input[type="hidden"][id^="answer"]').each(function() {
      /^answer\d+$/.test(this.id || "") && (this.value = "", this.setAttribute("value", ""));
    }),
    $$1(item).find(":radio, :checkbox").prop("checked", false), $$1(item).find("textarea").each(function() {
      try {
        iframeWindow.UE.getEditor($$1(this).attr("name")).ready(function() {
          this.setContent("");
        });
      } catch (e) {}
    });
  },
  answerInputOf = (timu, doc) => {
    if (!timu) return null;
    const scan = (scope) => {
      let ns = [];
      try { ns = scope.querySelectorAll('input[id^="answer"]'); } catch (e) { return null; }
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < ns.length; i++) {
          const id = (ns[i] && ns[i].id) || "";
          if (/^answertype/i.test(id)) continue;
          if (pass === 0 ? /^answer\d+$/.test(id) : /^answer\w+$/.test(id)) return ns[i];
        }
      }
      return null;
    };
    const direct = scan(timu);
    if (direct) return direct;
    try {
      let n = timu;
      while (n && n !== doc) {
        if (n.classList && n.classList.contains("singleQuesId")) return scan(n);
        n = n.parentElement;
      }
    } catch (e) {}
    return null;
  },
  targetIndices = (type, answer, options) => {
    const arr = answer instanceof Array ? answer : [String(answer)];
    let idxs = [];
    try { idxs = matchAnswer(arr, options || []); } catch (e) {}
    if (!idxs.length && "3" === String(type) && (options || []).length === 2) {
      const isTrue = /(^|,)(True|true|正确|是|对|√|T|ri|A)(,|$)/.test(String(arr[0]));
      idxs = [isTrue ? 0 : 1];
    }
    return idxs;
  },
  writeChoiceModel = (timu, indices, doc, multi) => {
    const d = doc || (timu && timu.ownerDocument);
    const inp = answerInputOf(timu, d);
    if (!inp) { console.log("[答案模型] 直写放弃：题内未定位到 #answer<qid>"); return null; }
    const qid = String(inp.id).slice(6);
    let spans = [];
    const take = (fn) => { if (spans.length) return; try { const r = fn(); if (r && r.length) spans = r; } catch (e) {} };
    take(() => d.querySelectorAll(".choice" + qid));
    take(() => timu.querySelectorAll(".num_option, .num_option_dx"));
    take(() => timu.querySelectorAll("span[data]"));
    if (!spans.length) { console.log("[答案模型] 直写放弃：qid=" + qid + " 未找到任何选项元素"); return null; }
    const want = {};
    (indices || []).forEach(function (i) { want[i] = true; });
    const singleCls = "check_answer", multiCls = "check_answer_dx";
    let value = "";
    for (let s = 0; s < spans.length; s++) {
      const sp = spans[s];
      const on = !!want[s];
      try {
        sp.classList.remove(singleCls); sp.classList.remove(multiCls);
        if (on) sp.classList.add(multi ? multiCls : singleCls);
        const li = sp.closest ? sp.closest("li") : null;
        if (li) { li.setAttribute("aria-checked", on ? "true" : "false"); li.setAttribute("aria-pressed", on ? "true" : "false"); }
      } catch (e) {}
      if (on) value += (sp.getAttribute("data") || String.fromCharCode(65 + s));
    }
    if (!value) { console.log("[答案模型] 直写放弃：qid=" + qid + " 目标下标算不出值（indices=" + JSON.stringify(indices) + " spans=" + spans.length + "）"); return null; }
    try { inp.value = value; inp.setAttribute("value", value); } catch (e) { return null; }
    if (String(inp.value == null ? "" : inp.value) !== value) { console.log("[答案模型] 直写回读不一致：期望 " + value + " 实得 " + inp.value); return null; }
    return value;
  },
  flattenAnswers = (raw) => {
    const out = [];
    const walk = (v) => {
      if (v == null) return;
      if (Array.isArray(v)) { v.forEach(walk); return; }
      if (typeof v === "object") { if ("answer" in v) walk(v.answer); return; }
      const s = String(v).trim();
      if (s) out.push(s);
    };
    walk(raw);
    return out;
  },
  useAskStore = pinia$1.defineStore({ id: "ask", state: () => ({ dialogVisible: true, count: 0, submitFailed: false, questionList: [], task: { name: "执行任务中", work: { questionList: [], inx: 0 }, video: [], log: [], status: "" } }), actions: { reset() {
    this.task.name = "执行任务中", this.task.work = { questionList: [], inx: 0 }, this.task.video = [], this.task.status = "", this.count = 0, this.submitFailed = false;
  }, select(index) {
    this.task.work.questionList[index].selected = true, this.task.work.inx = index;
    try {
      this.task.work.questionList[index].dom.scrollIntoView({ block: "center" });
    } catch (e) {
      log(e, "error");
    }
  }, get(index) {
    return this.task.work.questionList[index];
  }, insert(question) {
    this.task.work.questionList.push(question);
  }, update(index, question) {
    this.task.work.questionList[index] = question;
  }, log(msg, level = "info") {
    // v1.2.x：上限从 20 提到可配置（默认 300）—— F12 被平台禁用时，这个面板就是唯一排查窗口
    let cap = 300;
    try { const v = parseInt(getConfig().keepLog); if (isFinite(v)) cap = Math.min(Math.max(v, 20), 2000); } catch (e) {}
    while (this.task.log.length >= cap) this.task.log.shift();
    this.task.log.push({ time: (/* @__PURE__ */ new Date()).toLocaleTimeString(), msg: String(msg == null ? "" : msg), type: level });
    try { console.log("[日志]" + ("error" === level ? "[错误]" : "success" === level ? "[成功]" : "warn" === level ? "[警告]" : "") + " " + msg); } catch (e) {}
  }, msg(msg) {
    this.task.status = msg;
  } } });

  const _sfc_main = vue.defineComponent({ setup() {
    const askstore = useAskStore(), { dialogVisible, count, questionList, task } = pinia$1.storeToRefs(askstore), askActiveName = vue.ref("first"), askActiveNames = vue.ref(["1"]), msg = vue.ref("<h3>本脚本仅用于学习交流，请 24h 内删除。</h3><br><p style='color:red;'>禁止用于各种非法用途，否则后果自负！</p><br><p>答案由 AI 大语言模型生成，准确率不保证 100%，请自行判断、评估是否使用。</p><br><p style='font-size:13px;color:#888;'>构建：" + CX_BUILD + "<br>AI 能力由 <a href='https://www.deepseek.com' target='_blank' style='color:#409eff;text-decoration:none;'>DeepSeek</a> 等大模型提供 · 原脚本 by <a href='https://github.com/March-OwO/Xuexitong-LLM-Assistant' target='_blank' style='color:#409eff;text-decoration:none;'>March-OwO</a><br><b>本平台禁用了 F12，排查请点页面右侧「诊断」按钮</b>，结果会写进「运行日志」标签页，再点「复制日志」导出。<br><a href='https://github.com/Phiedeir/Xuexitong-LLM-Assistant' target='_blank' style='color:#409eff;text-decoration:none;'>GitHub 仓库</a> · <a href='https://github.com/Phiedeir/Xuexitong-LLM-Assistant/blob/main/CHANGELOG.md' target='_blank' style='color:#409eff;text-decoration:none;'>更新日志</a> · <a href='https://github.com/Phiedeir/Xuexitong-LLM-Assistant/issues' target='_blank' style='color:#409eff;text-decoration:none;'>反馈</a></p>"), formstoreObj = useformStore(), { forminput, dialogV, activeName } = pinia$1.storeToRefs(formstoreObj), ruleFormRef = vue.ref(), rules = vue.reactive({
      interval: [{ required: true, message: "间隔时间不能为空" }, { type: "number", message: "间隔时间必须为数字" }, { validator: (rule, value) => value >= 0.1 ? Promise.resolve() : Promise.reject("间隔时间必须大于等于0.1") }],
      answerInterval: [{ required: true, message: "答题间隔不能为空" }, { type: "number", message: "答题间隔必须为数字" }, { validator: (rule, value) => value >= 0.1 ? Promise.resolve() : Promise.reject("答题间隔必须大于等于0.1") }],
      thtoken: [{ validator: (rule, value) => { if (value && /[\s\u4e00-\u9fa5]/.test(value)) return Promise.reject("API Key 里含空格/换行/中文，请重新粘贴"); return Promise.resolve(); } }]
    });
    return { count, dialogVisible, questionList, askActiveName, askActiveNames, task, msg, Aim: aim_default, handleClick: (e) => {
      askstore.select(e);
    }, dialogV, activeName, ruleFormRef, forminput, rules, submitForm: async (formEl) => {
      formEl && await formEl.validate((valid, fields) => {
        valid && (formstoreObj.saveConfig(forminput.value), ElementPlus.ElNotification({ title: "Success", message: "配置保存成功，请刷新页面（F12 输入 __cxDiag() 可自检）", type: "success", duration: 5000 }), dialogV.value = false);
      });
    }, userConfig, Setting: setting_default };
  } }), _hoisted_1 = { class: "dialog-footer" }, _hoisted_2 = { key: 0 }, _hoisted_3 = { class: "question_div" }, _hoisted_4 = { class: "question_ti" }, _hoisted_5 = { key: 0 }, _hoisted_6 = { key: 1 }, _hoisted_7 = { key: 2 }, _hoisted_8 = ["innerHTML"], _hoisted_9 = { key: 0, style: { "margin-top": "20px" } }, _hoisted_10 = { key: 1 }, _hoisted_11 = { key: 2 }, _hoisted_12 = { height: "100px" }, _hoisted_13 = ["innerHTML"];
  const Ask = _export_sfc(_sfc_main, [["render", function(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_el_button = vue.resolveComponent("el-button"), _component_el_switch = vue.resolveComponent("el-switch"), _component_el_input = vue.resolveComponent("el-input"), _component_el_input_number = vue.resolveComponent("el-input-number"), _component_el_option = vue.resolveComponent("el-option"), _component_el_select = vue.resolveComponent("el-select"), _component_el_checkbox = vue.resolveComponent("el-checkbox"), _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group"), _component_el_tooltip = vue.resolveComponent("el-tooltip"), _component_el_form_item = vue.resolveComponent("el-form-item"), _component_el_tab_pane = vue.resolveComponent("el-tab-pane"), _component_el_tabs = vue.resolveComponent("el-tabs"), _component_el_form = vue.resolveComponent("el-form"), _component_el_dialog = vue.resolveComponent("el-dialog"), _component_el_text = vue.resolveComponent("el-text"), _component_el_skeleton = vue.resolveComponent("el-skeleton"), _component_el_card = vue.resolveComponent("el-card"), _component_el_divider = vue.resolveComponent("el-divider"), _component_el_col = vue.resolveComponent("el-col"), _component_el_row = vue.resolveComponent("el-row"), _component_el_scrollbar = vue.resolveComponent("el-scrollbar"), _component_el_tag = vue.resolveComponent("el-tag"), _component_el_alert = vue.resolveComponent("el-alert"), _component_el_empty = vue.resolveComponent("el-empty");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [vue.createVNode(_component_el_button, { type: "danger", id: "csbutton", icon: _ctx.Setting, circle: "", onClick: _cache[0] || (_cache[0] = ($event) => { const s = _unsafeWindow._askStore; if (s) s.dialogVisible = !s.dialogVisible; else _ctx.dialogV = !_ctx.dialogV; }) }, null, 8, ["icon"]), vue.createVNode(_component_el_dialog, { modelValue: _ctx.dialogV, "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.dialogV = $event), title: "学习通AI学习助手", width: "30%", modal: false, center: "", draggable: "" }, { footer: vue.withCtx(() => [vue.createElementVNode("span", _hoisted_1, [vue.createVNode(_component_el_button, { onClick: _cache[2] || (_cache[2] = ($event) => _ctx.dialogV = false) }, { default: vue.withCtx(() => [vue.createTextVNode("取消")]), _: 1 }), vue.createVNode(_component_el_button, { type: "primary", onClick: _cache[3] || (_cache[3] = ($event) => _ctx.submitForm(_ctx.ruleFormRef)) }, { default: vue.withCtx(() => [vue.createTextVNode("保存")]), _: 1 })])]), default: vue.withCtx(() => [vue.createVNode(_component_el_form, { ref: "ruleFormRef", rules: _ctx.rules, model: _ctx.forminput, class: "demo-ruleForm" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tabs, { class: "demo-tabs", modelValue: _ctx.activeName, "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.activeName = $event) }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.userConfig, (item) => (vue.openBlock(), vue.createBlock(_component_el_tab_pane, { key: item.name, label: item.label, name: item.name }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.config, (item1) => (vue.openBlock(), vue.createBlock(_component_el_form_item, { label: item1.label, prop: item1.name }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tooltip, { class: "box-item", effect: "dark", content: item1.desc || "", placement: "top" }, { default: vue.withCtx(() => ["switch" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_switch, { key: 0, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "input" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_input, { key: 1, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "number" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_input_number, { key: 2, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "select" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_select, { key: 3, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event, placeholder: "请选择" }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item1.options, (item2) => (vue.openBlock(), vue.createBlock(_component_el_option, { key: item2.value, label: item2.label, value: item2.value }, null, 8, ["label", "value"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue"])) : "checkbox" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_checkbox_group, { key: 4, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item1.options, (item2) => (vue.openBlock(), vue.createBlock(_component_el_checkbox, { key: 2, label: item2.value, name: item2.value }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(item2.label), 1)]), _: 2 }, 1032, ["label", "name"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue"])) : vue.createCommentVNode("", true)]), _: 2 }, 1032, ["content"])]), _: 2 }, 1032, ["label", "prop"]))), 256))]), _: 2 }, 1032, ["label", "name"]))), 128))]), _: 1 }, 8, ["modelValue"])]), _: 1 }, 8, ["rules", "model"])]), _: 1 }, 8, ["modelValue"]), (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [vue.createVNode(_component_el_button, { id: "zeokdjg", type: "success", plain: "", round: "", icon: _ctx.Aim, onClick: _cache[5] || (_cache[5] = ($event) => _ctx.dialogVisible = !_ctx.dialogVisible) }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString("执行任务中" == _ctx.task.name ? "等待任务加载" : "正在完成:" + _ctx.task.name), 1)]), _: 1 }, 8, ["icon"]), vue.createVNode(_component_el_dialog, { modelValue: _ctx.dialogVisible, "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.dialogVisible = $event), width: "400px", title: "学习通AI学习助手", modal: false, "append-to-body": false, "lock-scroll": false, center: "", draggable: "" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_button, { style: { "margin-bottom": "20px" }, type: "primary", onClick: _cache[6] || (_cache[6] = ($event) => _ctx.dialogV = !_ctx.dialogV), plain: "" }, { default: vue.withCtx(() => [vue.createTextVNode("打开配置")]), _: 1 }), vue.createVNode(_component_el_text, { class: "mx-1", size: "large", type: "danger" }, { default: vue.withCtx(() => [vue.createTextVNode("")]), _: 1 }), vue.createVNode(_component_el_tabs, { modelValue: _ctx.askActiveName, "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.askActiveName = $event), class: "demo-tabs" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tab_pane, { label: "运行框", name: "first" }, { default: vue.withCtx(() => [_ctx.task.work.questionList.length > 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [vue.createElementVNode("div", _hoisted_3, [vue.createVNode(_component_el_card, { shadow: "hover" }, { default: vue.withCtx(() => [vue.createElementVNode("h1", _hoisted_4, [vue.createVNode(_component_el_text, { size: "large", truncated: "" }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(_ctx.task.work.inx + 1 + "." + _ctx.task.work.questionList[_ctx.task.work.inx].question), 1)]), _: 1 })]), _ctx.task.work.questionList[_ctx.task.work.inx].answer ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_6, [vue.createElementVNode("p", null, [vue.createElementVNode("pre", null, vue.toDisplayString(_ctx.task.work.questionList[_ctx.task.work.inx].answer), 1)])])) : (vue.openBlock(), vue.createElementBlock("p", _hoisted_5, [vue.createVNode(_component_el_skeleton, { rows: 3, animated: "" })]))]), _: 1 })]), "考试" != _ctx.task.name ? (vue.openBlock(), vue.createBlock(_component_el_divider, { key: 0 }, { default: vue.withCtx(() => [vue.createTextVNode(" 题号 ")]), _: 1 })) : vue.createCommentVNode("", true), "考试" != _ctx.task.name ? (vue.openBlock(), vue.createBlock(_component_el_scrollbar, { key: 1, height: "100px" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_row, null, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.task.work.questionList, (item, index) => (vue.openBlock(), vue.createBlock(_component_el_col, { span: 4, key: index }, { default: vue.withCtx(() => [vue.createVNode(_component_el_button, { type: item.status || "info", plain: "", class: "question_btn", onClick: ($event) => _ctx.handleClick(index) }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(index + 1), 1)]), _: 2 }, 1032, ["type", "onClick"])]), _: 2 }, 1024))), 128))]), _: 1 })]), _: 1 })) : vue.createCommentVNode("", true), _ctx.task.work.questionList[_ctx.task.work.inx].allAnswer ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [vue.createVNode(_component_el_divider, null, { default: vue.withCtx(() => [vue.createTextVNode(" 接口返回 ")]), _: 1 }), vue.createVNode(_component_el_tabs, { "tab-position": "left", class: "demo-tabs" }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.task.work.questionList[_ctx.task.work.inx].allAnswer, (item, index) => (vue.openBlock(), vue.createBlock(_component_el_tab_pane, { label: item.form }, { default: vue.withCtx(() => [vue.createElementVNode("div", null, [vue.createElementVNode("div", { innerHTML: (item.answer || "暂无答案") + "<br><p style = 'color:red;'>" + (item.error ? "【失败原因】" + item.error : "") + "</p>" }, null, 8, _hoisted_8), null != item.usenum ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [vue.createElementVNode("div", null, [vue.createVNode(_component_el_tag, { class: "ml-2", type: "success" }, { default: vue.withCtx(() => [vue.createTextVNode("输出Token:" + vue.toDisplayString(item.usenum), 1)]), _: 2 }, 1024)]), vue.createElementVNode("div", null, [vue.createVNode(_component_el_tag, { class: "ml-2", type: "info" }, { default: vue.withCtx(() => [vue.createTextVNode("输入Token:" + vue.toDisplayString(item.num), 1)]), _: 2 }, 1024)])])) : vue.createCommentVNode("", true)])]), _: 2 }, 1032, ["label"]))), 256))]), _: 1 })])) : vue.createCommentVNode("", true)])) : _ctx.task.video.status ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10, [vue.createVNode(_component_el_alert, { title: "倍速有风险，挂科两行泪", type: "error", center: "", "show-icon": "" }), vue.createVNode(_component_el_text, { class: "mx-1", size: "large", type: "danger" }, { default: vue.withCtx(() => [vue.createTextVNode(" 正在完成视频任务 ")]), _: 1 })])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_11, [vue.createElementVNode("div", _hoisted_12, [vue.createVNode(_component_el_empty, { description: _ctx.task.name }, null, 8, ["description"])])]))]), _: 1 }), vue.createVNode(_component_el_tab_pane, { label: "运行日志", name: "second" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_scrollbar, { height: "200px" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_row, null, { default: vue.withCtx(() => [vue.createVNode(_component_el_col, { span: 24 }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.task.log, (item, index) => (vue.openBlock(), vue.createElementBlock("p", { key: index, class: "cx_log" }, [vue.createVNode(_component_el_text, { size: "small", type: "info", class: "mx-1" }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(item.time), 1)]), _: 2 }, 1024), vue.createVNode(_component_el_text, { class: "mx-1", type: "info" == item.type ? "" : item.type }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(" " + item.msg), 1)]), _: 2 }, 1032, ["type"])]))), 128))]), _: 1 })]), _: 1 })]), _: 1 })]), _: 1 }), vue.createVNode(_component_el_tab_pane, { label: "声明", name: "msg" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_card, { shadow: "hover" }, { default: vue.withCtx(() => [vue.createElementVNode("div", { innerHTML: _ctx.msg }, null, 8, _hoisted_13)]), _: 1 })]), _: 1 })]), _: 1 }, 8, ["modelValue"]), vue.createElementVNode("p", null, [_ctx.task.status ? (vue.openBlock(), vue.createBlock(_component_el_tag, { key: 0 }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(_ctx.task.status), 1)]), _: 1 })) : vue.createCommentVNode("", true)])]), _: 1 }, 8, ["modelValue"])]))], 64);
  }], ["__scopeId", "data-v-c3c6b09f"]]);

  class Cx {
    constructor() {
      __publicField(this, "app");
      __publicField(this, "askStore");
      __publicField(this, "ServerApi");
      __publicField(this, "defaultConfig");
      this.app = vue.createApp(Ask).use(ElementPlus).use(pinia$1.createPinia()), this.askStore = useAskStore(), _unsafeWindow._askStore = this.askStore, this.ServerApi = new ServerApi(), this.defaultConfig = getConfig(), this.app.mount((() => {
        try { var td = _unsafeWindow.top.document; } catch (e) { td = document; }
        const div = td.createElement("div");
        return div.id = "xxxxzx", td.getElementById(div.id) || td.body.append(div), div;
      })());
      // 页面内诊断按钮组：诊断 / 复制日志 / 清缓存 / 日志面板（不依赖 F12）
      try { injectDiagUI(this.askStore); } catch (e) { console.log("[诊断UI] 挂载失败:", e); }
    }
    // v1.2.x：答题间隔实时读取配置（改完保存即生效，不用刷新页面重跑整章）
    get answerSpeed() {
      const v = parseFloat(getConfig().answerInterval);
      return isFinite(v) && v >= 0 ? v : 1;
    }
    async audio(iframeWindow, ctx) {
      const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
      this.askStore.reset(), this.askStore.task.name = "视频音频";
      const audio = iframeWindow.document.getElementById("audio_html5_api");
      return audio.muted = true, audio.autoplay = true, audio.volume = 0, audio.play().then(function() {
        console.log("播放成功");
      }).catch(function(error) {
        "NotAllowedError" === error.name ? ElementPlus.ElMessageBox.alert("由于自动播放需要用户点击过浏览器，请确认即可", "温馨提示", { confirmButtonText: "确认", callback: () => {
          audio.play();
        } }) : console.error("视频播放失败，原因：", error);
      }), new Promise((resolve) => {
        const intervalId = setInterval(() => {
          if (aborted()) return clearInterval(intervalId), console.log("[中断] 音频任务已中止"), resolve();
          audio.ended ? (clearInterval(intervalId), log("监听到音频已完成", "success"), resolve()) : audio.paused && audio.play();
        }, 1e3);
        audio.addEventListener("ended", function() {
          log("监听到音频已完成1", "success"), audio.pause(), clearInterval(intervalId), resolve();
        });
      });
    }
    async video(iframeWindow, ctx) {
      const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
      this.askStore.reset(), this.askStore.task.name = "视频", this.askStore.task.video.status = 1;
      await waitElementLoaded(iframeWindow, "#video_html5_api");
      if (aborted()) { this.askStore.log("视频任务已中止（章节已切换）", "info"); return; }

      const player = iframeWindow.videojs("video_html5_api");
      const playerButton = iframeWindow.document.querySelector(".vjs-big-play-button");
      if (!player) { this.askStore.log("未取得 videojs 实例，本视频跳过", "error"); return; }

      // ── 倍速：可开关、可调（v1.2.x 新增）──────────────────────────
      const cfg = getConfig();
      const rateOn = cfg.videoRateOn !== false;
      const raw = parseFloat(cfg.videoRate);
      const wantRate = rateOn ? (isFinite(raw) && raw > 0 ? Math.min(Math.max(raw, 0.5), 16) : 1) : 1;

      try { player.muted(cfg.videoMute !== false); } catch (e) {}
      try { player.playbackRate(wantRate); } catch (e) { this.askStore.log("设置倍速异常：" + (e && e.message ? e.message : e), "error"); }

      // 读回真实生效值：很多播放器把倍速夹到上限，配置写 16 实际只有 2~4
      let realRate = wantRate;
      try { const r = player.playbackRate(); if (isFinite(r) && r > 0) realRate = r; } catch (e) {}

      const dur = (() => { try { const d = player.duration(); return isFinite(d) ? d : 0; } catch (e) { return 0; } })();
      this.askStore.log(
        "视频开始：配置 " + wantRate.toFixed(2) + "x" + (rateOn ? "" : "（倍速开关已关，按原速）") +
        "，实际生效 " + realRate.toFixed(2) + "x" +
        (Math.abs(realRate - wantRate) > 0.05 ? "（播放器把倍速夹到了 " + realRate.toFixed(2) + "）" : "") +
        (dur ? "，时长 " + Math.round(dur) + " 秒" : ""),
        Math.abs(realRate - wantRate) > 0.05 ? "info" : "success"
      );

      try { player.play(); } catch (e) { this.askStore.log("play() 异常：" + (e && e.message ? e.message : e), "error"); }

      // ── 后台 / 小窗保持播放 ────────────────────────────────────────
      const keepAlive = cfg.videoKeepAlive !== false;
      if (keepAlive) {
        try {
          const rep = maskVisibility(iframeWindow);
          const vid = iframeWindow.document.getElementById("video_html5_api");
          let fixes = 0;
          if (vid && vid.addEventListener) {
            // 媒体时钟驱动：后台仍会触发，且不需要定时器
            vid.addEventListener("timeupdate", () => {
              try {
                if (vid.paused && !vid.ended && isFinite(vid.duration) && vid.currentTime < vid.duration - 0.5) {
                  fixes++;
                  const pr = player.play();
                  if (pr && pr.catch) pr.catch(() => {});
                  if (fixes === 1 || fixes % 20 === 0) {
                    this.askStore.log("检测到被外部暂停，已恢复播放（第 " + fixes + " 次）", "info");
                  }
                }
              } catch (e) {}
            });
            this.askStore.log(
              "后台保持播放已启用：可见性伪装=" + (rep.hiddenPatched ? "是" : "否") +
              " / hasFocus 伪装=" + (rep.focusPatched ? "是" : "否") +
              " / 拦截事件 " + rep.eventsKilled.length + " 个；切标签页、最小化、画中画都不再暂停",
              "success"
            );
          } else {
            this.askStore.log("可见性已伪装，但未找到 video 元素，恢复逻辑只剩主循环（后台会被节流）", "info");
          }
        } catch (e) {
          this.askStore.log("后台保持播放安装失败：" + (e && e.message ? e.message : e), "error");
        }
      }

      await new Promise((resolve) => {
        const t0 = Date.now();
        let lastTick = 0;
        const intervalId = setInterval(() => {
          if (aborted()) {
            clearInterval(intervalId);
            try { player.pause(); } catch (e) {}
            this.askStore.log("视频任务已中止（章节已切换）", "info");
            return void resolve();
          }
          // 倍速保持：播放器加载 metadata / seek 后常把倍速重置回 1，这里持续校正
          if (rateOn) {
            try { if (Math.abs(player.playbackRate() - wantRate) > 0.01) player.playbackRate(wantRate); } catch (e) {}
          }
          // 进度心跳：每 10 秒一条，方便在面板里看卡在哪
          const now = Date.now();
          if (now - lastTick > 10000) {
            lastTick = now;
            try {
              const cur = player.currentTime(), total = player.duration();
              if (isFinite(total) && total > 0) {
                this.askStore.log(
                  "视频进度 " + Math.round(cur) + "/" + Math.round(total) + " 秒（" +
                  Math.floor(cur / total * 100) + "%）" + (player.paused() ? " ⏸已暂停" : " ▶播放中") +
                  " " + player.playbackRate().toFixed(2) + "x", "info");
              }
            } catch (e) {}
          }
          const unFinish = ("isUnFinishJob" in iframeWindow) ? iframeWindow.isUnFinishJob() : true;
          if (!unFinish) { clearInterval(intervalId); this.askStore.log("任务点已标记完成", "success"); resolve(); return; }
          if (player.paused()) {
            try { if (playerButton) playerButton.click(); else player.play(); } catch (e) {}
          }
        }, 1000);

        const self = this;
        const pauseBase = player.pause;
        player.pause = function() {
          try {
            if (player.currentTime() >= player.duration() - 0.5) {
              player.pause = pauseBase;
              clearInterval(intervalId);
              resolve();
              try { self.askStore.log("视频播放完成", "success"); } catch (e) {}
            }
          } catch (e) {}
        };
        player.on("ended", () => {
          try { player.pause = pauseBase; } catch (e) {}
          clearInterval(intervalId);
          this.askStore.log("视频播放完成（ended 事件）", "success");
          resolve();
        });
        // 兜底：长时间无任何进展就在面板里报一句，避免「静默挂着」
        setTimeout(() => {
          if (!aborted() && ("isUnFinishJob" in iframeWindow) && iframeWindow.isUnFinishJob()) {
            this.askStore.log("视频已跑 " + Math.round((Date.now() - t0) / 1000) + " 秒仍未完成，继续等待…", "info");
          }
        }, 120000);
      });
    }
    work(iframeWindow, ctx) {
      return new Promise(async (resolve) => {
        CX_LAST_FRAME = iframeWindow;   // 供「抓现场」使用
        const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
        const stopIfAborted = (msg) => {
          if (!aborted()) return false;
          this.askStore.log(msg, "info");
          return true;
        };
        decode(iframeWindow);
        const Timu = iframeWindow.document.querySelectorAll(".TiMu");
        if (!Timu)
          return void resolve();
        let ques = [], succ = 0, aiAnswered = 0;
        for (let i = 0; i < Timu.length; i++) {
          let data = getQuestion("1", Timu[i]);
          console.log(data), ques.push(data);
        }
        this.askStore.reset(), this.askStore.count = ques.length, this.askStore.task.name = "章节测验";
        for (let i = 0; i < ques.length; i++) {
          if (stopIfAborted("检测到已手动切换章节，中止本章答题")) return void resolve();
          await sleep(this.answerSpeed), this.askStore.insert(ques[i]), this.askStore.task.work.inx = i;
          _unsafeWindow._aiQIdx = i;
          let data = await getAnswers(ques[i], iframeWindow);
          if (stopIfAborted("检测到已手动切换章节，中止本章答题")) return void resolve();
          this.askStore.get(i).allAnswer = data;
          if (data && data[0] && data[0].parseNote) this.askStore.log("第" + (i + 1) + "题 " + data[0].parseNote, "info");
          let aiHasAnswer = data.some(function(d) { var a = d && d.answer; return a && (typeof a === "string" ? a.length > 0 : a.length > 0); });
          aiHasAnswer && aiAnswered++;
          let tmp = fillAnswer(data, ques[i], Timu[i], iframeWindow);
          if (tmp) {
            this.askStore.get(i).status = "primary";
            this.askStore.get(i).answer = tmp;
            succ++;
          } else {
            const e = (data && data[0] && data[0].error) ||
              (ques[i] && (ques[i]._fillError || (ques[i]._parseError ? "题目解析失败：" + ques[i]._parseError : ""))) ||
              "AI 未返回可用的答案";
            this.askStore.get(i).status = "danger";
            this.askStore.get(i).answer = "暂无答案\n\n【失败原因】" + e;
            this.askStore.log("第" + (i + 1) + "题失败：" + e, "error");
          }
          this.askStore.get(i).dom = Timu[i];
        }
        if (stopIfAborted("检测到已手动切换章节，跳过提交")) return void resolve();
        const isChoiceType = (t) => { t = String(t); return t === "0" || t === "1" || t === "3"; };
        const qidOfTimu = (timu, doc) => {
          if (!timu) return null;
          try { const inp = answerInputOf(timu, doc || iframeWindow.document); if (inp) { const q = String(inp.id).slice(6); if (q) return q; } } catch (e) {}
          try { const el = timu.querySelector("[qid]"); if (el) { const q = el.getAttribute("qid"); if (q) return q; } } catch (e) {}
          try {
            let n = timu;
            while (n && n !== doc) { if (n.classList && n.classList.contains("singleQuesId")) return n.getAttribute("data"); n = n.parentElement; }
          } catch (e) {}
          return null;
        };
        const choiceState = () => {
          const doc = iframeWindow.document;
          let Ti = [];
          try { Ti = doc.querySelectorAll(".TiMu"); } catch (e) {}
          const missing = [];
          let total = 0, unknown = 0;
          for (let i = 0; i < ques.length; i++) {
            if (!isChoiceType(ques[i].type)) continue;
            const qid = qidOfTimu(Ti[i], doc);
            if (!qid) { unknown++; continue; }
            let inp = null;
            try { inp = doc.getElementById("answer" + qid); } catch (e) {}
            if (!inp) { unknown++; continue; }
            total++;
            if (!String(inp.value || "").replace(/\s+/g, "")) missing.push(i);
          }
          return { total: total, unknown: unknown, missing: missing };
        };
        const refillChoices = () => {
          const doc = iframeWindow.document;
          let Ti = [];
          try { Ti = doc.querySelectorAll(".TiMu"); } catch (e) {}
          const st = choiceState();
          for (let n = 0; n < st.missing.length; n++) {
            const idx = st.missing[n], timu = Ti[idx];
            if (!timu) continue;
            const rec = this.askStore.get(idx) || {};
            const raw = rec.allAnswer != null ? rec.allAnswer : rec.answer;
            const arr = flattenAnswers(raw);
            if (!arr.length) continue;
            const multi = "1" === String(ques[idx].type);
            const idxs = targetIndices(ques[idx].type, arr, ques[idx].options || []);
            if (!idxs.length) continue;
            let wrote = null;
            try { wrote = writeChoiceModel(timu, idxs, doc, multi); } catch (e) { console.log("[答案模型] 重填直写失败:", e); }
            if (wrote) { console.log("[答案模型] 补写第 " + (idx + 1) + " 题成功 → " + wrote); continue; }
            console.log("[答案模型] 补写第 " + (idx + 1) + " 题仍失败（idxs=" + JSON.stringify(idxs) + "），转点击兜底");
            const qid = qidOfTimu(timu, doc);
            if (!qid) continue;
            let lis = [];
            try { const ns = doc.querySelectorAll("li[qid='" + qid + "']"); for (let q = 0; q < ns.length; q++) lis.push(ns[q]); } catch (e) {}
            for (let q = 0; q < lis.length; q++) {
              const li = lis[q];
              if (li.querySelector(".check_answer, .check_answer_dx")) continue;
              const after = li.querySelector(".after");
              const liTxt = removeHtml((after ? after.innerHTML : li.innerHTML) || "").trim();
              let letter = null;
              try { const sp = li.querySelector(".num_option, .num_option_dx"); letter = sp ? sp.getAttribute("data") : null; } catch (e) {}
              const want = arr.some(function(a) {
                const s = removeHtml(String(a)).trim();
                return s && (s === liTxt || (letter && s === letter));
              });
              if (want) { try { li.click(); } catch (e) {} }
            }
          }
        };
        try {
          const st0 = choiceState();
          if (st0.missing.length) {
            this.askStore.log("页面答案模型校验：有 " + st0.missing.length + " 题未写入页面（第 " + st0.missing.map(function(o) { return o + 1; }).join("、") + " 题），正在补写…", "info");
            refillChoices();
            const st1 = choiceState();
            if (st1.missing.length) this.askStore.log("补写后仍有 " + st1.missing.length + " 题为空，提交环节会再次补写；仍补不上则改为「临时保存」暂存（绝不提交空白卷）", "error");
            else this.askStore.log("页面答案模型已全部写入，提交不会触发“未做完”", "success");
          } else if (st0.total) {
            console.log("[答案模型] 全部 " + st0.total + " 道选择题已写入页面答案模型" + (st0.unknown ? "（另有 " + st0.unknown + " 题无法定位，未参与校验）" : ""));
          }
        } catch (e) { console.log("[答案模型] 校验异常:", e); }
        if (this.defaultConfig.autoSubmit) {
          let tempsaved = false;
          const unfilled = [];
          for (let i = 0; i < ques.length; i++) "danger" === this.askStore.get(i).status && unfilled.push(i + 1);
          unfilled.length && this.askStore.log("第 " + unfilled.join("、") + " 题未能自动填入答案，提交时可能触发“未做完”确认框", "error");
          if (aiAnswered / ques.length < 0.5 && ques.length > 2) {
            const savedLow = await this._tempSaveWork(iframeWindow, ctx);
            if ("aborted" === savedLow) return void resolve();
            tempsaved = true;
            this.askStore.log(savedLow === true
              ? "AI答案覆盖率过低(" + aiAnswered + "/" + ques.length + ")，未提交；已调用页面「临时保存」暂存当前答案（请稍后手动补充并提交）"
              : savedLow === "unknown"
                ? "AI答案覆盖率过低(" + aiAnswered + "/" + ques.length + ")，未提交；已请求页面「临时保存」暂存（结果未确认，请稍后核对）"
                : "AI答案覆盖率过低(" + aiAnswered + "/" + ques.length + ")，未提交；本页没有暂存入口，答案仅保留在当前页面，请手动提交",
              "error");
          } else {
            const submitted = await this._submitWork(iframeWindow, Object.assign({}, ctx, { choiceState: choiceState, refillChoices: refillChoices }));
            if ("aborted" === submitted) return void resolve();
            if (true === submitted) {
              this.askStore.log("章节测验已完成", "success");
            } else if ("tempsaved" === submitted) {
              tempsaved = true;
              this.askStore.log("本章有题目未取得答案，未提交空白卷；已调用页面「临时保存」暂存当前答案，请稍后手动补充并提交", "error");
            } else if ("unconfirmed" === submitted) {
              this.askStore.submitFailed = true, this.askStore.log("未能确认提交结果，已停止自动跳章，请手动确认本章提交状态", "error");
            } else {
              this.askStore.submitFailed = true, this.askStore.log("章节测验提交失败，已停止自动跳章，请手动检查并提交", "error");
            }
          }
          if (this.askStore.submitFailed) {
            this.askStore.task.status = "提交失败，请手动提交";
          } else if (tempsaved) {
            this.askStore.task.status = "已暂存(未提交)，AI覆盖:" + aiAnswered + "/" + ques.length + (aiAnswered < ques.length ? " 填入:" + succ : "");
          } else {
            this.askStore.task.status = "章节测验已完成" + (aiAnswered < ques.length ? ",AI覆盖:" + aiAnswered + "/" + ques.length + " 填入:" + succ : "，全部答出");
          }
          resolve();
        } else {
          const saved = await this._tempSaveWork(iframeWindow, ctx);
          if ("aborted" === saved) return void resolve();
          this.askStore.task.status = "已暂存(未提交)，AI覆盖:" + aiAnswered + "/" + ques.length + (aiAnswered < ques.length ? " 填入:" + succ : "");
          this.askStore.log(saved === true
            ? "已完成答题；未开启自动提交，已调用页面「临时保存」暂存答案（请稍后手动提交）"
            : saved === "unknown"
              ? "已完成答题；未开启自动提交，已请求页面「临时保存」暂存（结果未确认，请稍后核对后再手动提交）"
              : "已完成答题；未开启自动提交，但本页没有暂存入口，答案仅保留在当前页面，请手动提交",
            saved === false ? "error" : "success");
          resolve();
        }
      });
    }
    async _tempSaveWork(iframeWindow, ctx) {
      const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
      const w = iframeWindow;
      if (!w) return false;
      let fn = null;
      try { fn = w.noSubmit; } catch (e) {}
      let btn = null;
      try { btn = w.document && w.document.querySelector("#tempsave, [onclick*='noSubmit']"); } catch (e) {}
      if (!btn) {
        try {
          const cands = w.document.querySelectorAll("a, button, span, div, input[type=button]");
          for (let i = 0; i < cands.length; i++) {
            const t = String(cands[i].textContent || cands[i].value || "").replace(/\s+/g, "");
            if ("暂时保存" === t || "暂存" === t) { btn = cands[i]; break; }
          }
        } catch (e) {}
      }
      const hasFn = "function" === typeof fn;
      if (!hasFn && !btn) { console.log("[暂存] 本页未提供 noSubmit()/暂存按钮，答案仅保留在当前页面"); return false; }
      if (aborted()) return "aborted";

      const sentinel = "__cxTempSaveSentinel__";
      const cap = { alerts: [], softFail: "" };
      w[sentinel] = cap;
      const readBtnTxt = () => { try { return String((w.document && w.document.querySelector("#tempsave") || {}).textContent || "").replace(/\s+/g, ""); } catch (e) { return ""; } };
      const txtBefore = readBtnTxt();
      const beforeAlerts = cap.alerts.length;

      const origAlert = w.alert;
      try { w.alert = function(m) { cap.alerts.push(String(m)); console.log("[暂存] 页面 alert 已静音:", m); }; } catch (e) {}

      try {
        if (hasFn) fn.call(w);
        else btn.click();
      } catch (e) {
        console.log("[暂存] 触发异常:", e);
        try { w.alert = origAlert; } catch (_) {}
        try { delete w[sentinel]; } catch (_) {}
        return false;
      }

      const TEMPSAVE_WAIT_MS = 8000, POLL = 250;
      const okRe = /保存成功|暂存成功/;
      const saveFailRe = /(提交失败|作业提交失败|保存失败|出错|异常|请重试|未成功|服务器繁忙|系统繁忙|网络异常|操作失败|账号发生异常|请刷新页面后重试|超过教师限制字数|字数未达到|只能录入不能粘贴)/;
      let ok = false, hardFail = "";
      for (let waited = 0; waited < TEMPSAVE_WAIT_MS; waited += POLL) {
        if (aborted()) { try { w.alert = origAlert; } catch (e) {} try { delete w[sentinel]; } catch (_) {} return "aborted"; }
        const bad = cap.alerts.slice(beforeAlerts).filter(function(m) { return saveFailRe.test(m); })[0];
        if (bad) { hardFail = bad; break; }
        if (cap.alerts.slice(beforeAlerts).some(function(m) { return okRe.test(m); })) { ok = true; break; }
        const nowTxt = readBtnTxt();
        if (nowTxt && "正在暂存" !== nowTxt && (txtBefore ? nowTxt === txtBefore : ("暂时保存" === nowTxt || "暂存" === nowTxt))) { ok = true; break; }
        await sleepMs(POLL);
      }
      try { w.alert = origAlert; } catch (e) {}
      try { delete w[sentinel]; } catch (_) {}
      if (hardFail) { console.log("[暂存] 页面返回失败:", hardFail); return false; }
      if (ok) { console.log("[暂存] 已确认页面临时保存成功（正向回执）"); return true; }
      console.log("[暂存] 已触发暂存但 " + (TEMPSAVE_WAIT_MS / 1000) + "s 内未确认结果 → 按「已暂存(未确认)」处理");
      return "unknown";
    }
    async _submitWork(iframeWindow, ctx) {
      const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
      const captured = [];
      const getTopWin = () => {
        let w = iframeWindow;
        try { for (let i = 0; i < 12 && w && w.parent && w.parent !== w; i++) w = w.parent; } catch (e) {}
        return w || iframeWindow;
      };
      const collectWins = () => {
        const wins = [], seen = [];
        const walk = (w, depth) => {
          if (!w || depth > 6 || wins.length > 80 || seen.indexOf(w) >= 0) return;
          seen.push(w); wins.push(w);
          let d = null;
          try { d = w.document; } catch (e) { return; }
          if (!d) return;
          let frames = [];
          try { frames = d.querySelectorAll("iframe, frame"); } catch (e) {}
          for (let i = 0; i < frames.length; i++) {
            let cw = null;
            try { cw = frames[i].contentWindow; } catch (e) {}
            if (cw && cw !== w) walk(cw, depth + 1);
          }
        };
        walk(getTopWin(), 0);
        return wins;
      };
      const getWins = collectWins;
      const getDocs = () => {
        const out = [];
        collectWins().forEach(function(w) { try { if (w.document) out.push(w.document); } catch (e) {} });
        return out;
      };
      const readFrameHref = () => { try { return iframeWindow.location.href; } catch (e) { return ""; } };
      const textOf = (el) => {
        if (!el) return "";
        try {
          let t = el.innerText || el.textContent || "";
          if (el.getAttribute) t += " " + (el.getAttribute("aria-label") || "");
          return String(t).replace(/\s+/g, " ").trim();
        } catch (e) { return ""; }
      };
      const origPopups = [];
      getWins().forEach(function(w) {
        try {
          const oc = w.confirm, oa = w.alert;
          origPopups.push({ w: w, confirm: oc, alert: oa });
          w.confirm = function(m) { captured.push(String(m == null ? "" : m)); console.log("[提交] confirm:", m, "→ 自动确定"); return true; };
          w.alert = function(m) { captured.push(String(m == null ? "" : m)); console.log("[提交] alert:", m); };
        } catch (e) { console.log("[提交] 接管弹窗失败:", e); }
      });
      const restorePopups = () => {
        origPopups.forEach(function(o) {
          try { if ("function" === typeof o.confirm) o.w.confirm = o.confirm; } catch (e) {}
          try { if ("function" === typeof o.alert) o.w.alert = o.alert; } catch (e) {}
        });
      };

      const failRe = /(提交失败|作业提交失败|提交出错|提交异常|请重试|未成功|服务器繁忙|系统繁忙|网络异常|操作失败|保存失败|账号发生异常|请刷新页面后重试|答案超过教师限制字数|答案字数未达到教师设置的最少字数要求|只能录入不能粘贴)/;
      const okRe = /(提交成功|已提交|提交完成|作答已提交|保存成功|重新作答|查看答案)/;
      const okPageRe = /(提交成功|答案已保存|已提交成功|提交完成)/;
      const unfinishedRe = /(未做完|未完成|还有\s*\d*\s*题)/;
      const confirmRe = /(确认提交|未做完|提交吗|是否提交|确定提交)/;
      const okBtnRe = /^(提交|确定|确认|是|继续|好的|好|OK|Ok|ok|立即提交)$/;
      const cancelRe = /(取消|关闭|返回|暂不|放弃|重做)/;
      let _lastTextScan = 0, _lastText = "";
      const readText = () => {
        const now = Date.now();
        if (now - _lastTextScan < 600) return _lastText;
        _lastTextScan = now;
        let s = "";
        try { s = (iframeWindow.document.body && iframeWindow.document.body.innerText) || ""; } catch (e) {}
        _lastText = s;
        return s;
      };
      const isVisible = (el) => {
        try {
          if (!el) return false;
          const st = el.style || {};
          if ("none" === st.display || "hidden" === st.visibility) return false;
          const win = (el.ownerDocument && el.ownerDocument.defaultView) || iframeWindow;
          const cs = win.getComputedStyle ? win.getComputedStyle(el) : null;
          if (cs && ("none" === cs.display || "hidden" === cs.visibility || "0" === cs.opacity)) return false;
          return !!(el.offsetWidth || el.offsetHeight || (el.getClientRects && el.getClientRects().length));
        } catch (e) { return false; }
      };
      const POPUPS = [
        { box: "#workpop", ok: "#popok", label: "workpop" },
        { box: "#confirmSubWin", ok: ".bluebtn", label: "confirmSubWin" },
        { box: "#worktoast", ok: "#toastok", label: "worktoast" },
        { box: "#hintPop", ok: "#hintOk", label: "hintPop" },
        { box: "#cxAlertBox1", ok: "#okBtn", label: "cxAlertBox" },
        { box: ".cx_alert-box", ok: ".cx_alert-blue", label: "cx_alert-box" }
      ];
      const MANUAL = [{ box: ".verify-box", label: "提交验证码" }, { box: "#verifyCodeWin", label: "提交验证码" }];
      const POP_SEL = ".maskDiv, .AlertCon02, [id*=pop], [class*=pop], [id*=Pop], [class*=Pop], [id*=alert], [class*=alert], [id*=Alert], [class*=Alert], [id*=dialog], [class*=dialog], [class*=Dialog], [role=dialog], [role=alertdialog]";
      const pickOkBtn = (box) => {
        const list = [];
        try {
          const ns = box.querySelectorAll("a, button, input[type=button], input[type=submit], .bluebtn, .jb_btn, [onclick]");
          for (let i = 0; i < ns.length && i < 60; i++) list.push(ns[i]);
        } catch (e) {}
        for (let i = 0; i < list.length; i++) {
          const t = textOf(list[i]);
          if (!t || cancelRe.test(t)) continue;
          if (okBtnRe.test(t) && isVisible(list[i])) return list[i];
        }
        return null;
      };
      const pickCancelBtn = (box) => {
        try { const p = box.querySelector("#popno"); if (p && isVisible(p)) return p; } catch (e) {}
        const list = [];
        try { const ns = box.querySelectorAll("a, button, input[type=button], [onclick]"); for (let i = 0; i < ns.length && i < 60; i++) list.push(ns[i]); } catch (e) {}
        for (let i = 0; i < list.length; i++) { const t = textOf(list[i]); if (t && /^(取消|关闭|暂不|返回)$/.test(t) && isVisible(list[i])) return list[i]; }
        return null;
      };
      const GANLINE = /(未达到及格线|不及格|低于及格)/;
      let clickCounts = {}, popupHits = 0;
      const firePopup = (label, txt, btn, btnName) => {
        btnName = btnName || "确定";
        const sig = label + "|" + txt;
        const cnt = clickCounts[sig] || 0;
        const shouldClick = cnt < 2;
        if (shouldClick) { clickCounts[sig] = cnt + 1; popupHits++; }
        if (shouldClick) {
          console.log("[提交] 检测到页面弹层(" + label + "):", txt || "(无文案)",
            unfinishedRe.test(txt) ? "【未做完确认框】" : "", btn ? "→ 已自动点击“" + btnName + "”" : "(未找到" + btnName + "按钮)");
        }
        if (shouldClick && btn) { try { btn.click(); } catch (e) { console.log("[提交] 点击" + btnName + "失败:", e); } return { manual: false, label, text: txt, clicked: true, btnName: btnName }; }
        return { manual: false, label, text: txt, clicked: false, btnName: btnName };
      };
      const dumpCandidates = () => {
        const out = [];
        const docs = getDocs();
        for (let i = 0; i < docs.length && out.length < 8; i++) {
          let ns = [];
          try { ns = docs[i].querySelectorAll(POP_SEL); } catch (e) { continue; }
          for (let q = 0; q < ns.length && out.length < 8; q++) {
            if (!isVisible(ns[q])) continue;
            const t = textOf(ns[q]).slice(0, 60);
            out.push("#" + i + " <" + (ns[q].tagName || "?").toLowerCase() + " id=" + (ns[q].id || "-") + " class=" + String(ns[q].className || "-").slice(0, 40) + "> " + t);
          }
        }
        return out.length ? out.join(" || ") : "(各帧均无可见弹层候选)";
      };
      let _popScanTick = 0;
      const popupCheck = () => {
        _popScanTick++;
        const doGeneric = 0 === _popScanTick % 3;
        const docs = getDocs();
        for (let i = 0; i < docs.length; i++) {
          const d = docs[i];
          for (let k = 0; k < MANUAL.length; k++) {
            let box = null;
            try { box = d.querySelector(MANUAL[k].box); } catch (e) {}
            if (isVisible(box)) return { manual: true, label: MANUAL[k].label, text: "", clicked: false };
          }
          {
            let box = null;
            try { box = d.querySelector("#workpop, .maskDiv, .AlertCon02"); } catch (e) {}
            if (isVisible(box) && GANLINE.test(textOf(box))) {
              const r = firePopup("及格线", textOf(box).slice(0, 120), pickCancelBtn(box), "取消");
              r.lowScore = true;
              return r;
            }
          }
          for (let k = 0; k < POPUPS.length; k++) {
            const cfg = POPUPS[k];
            let box = null;
            try { box = d.querySelector(cfg.box); } catch (e) { continue; }
            if (!isVisible(box)) continue;
            let btn = null;
            try { btn = box.querySelector(cfg.ok); } catch (e) {}
            if (!isVisible(btn)) btn = pickOkBtn(box);
            if (!isVisible(btn)) { try { btn = d.querySelector(cfg.ok); } catch (e) {} }
            return firePopup(cfg.label, textOf(box).slice(0, 120), btn);
          }
          if (doGeneric) {
            let cands = [];
            try { const ns = d.querySelectorAll(POP_SEL); for (let q = 0; q < ns.length && q < 200; q++) cands.push(ns[q]); } catch (e) {}
            for (let q = 0; q < cands.length; q++) {
              const el = cands[q];
              if (!isVisible(el)) continue;
              const txt = textOf(el);
              if (txt.length > 300 || !confirmRe.test(txt)) continue;
              return firePopup("通用弹层", txt.slice(0, 120), pickOkBtn(el));
            }
          }
        }
        return null;
      };

      const hasChoiceCheck = ctx && "function" === typeof ctx.choiceState;
      let refillDeadline = 0;
      let refillTries = 0;
      const pageBusy = () => {
        try { const d = iframeWindow.document; return !!(d && "loading" === d.readyState); } catch (e) { return true; }
      };
      const ensureAnswers = () => {
        if (!hasChoiceCheck) return true;
        let st = null;
        try { st = ctx.choiceState(); } catch (e) { return true; }
        if (!st || !st.total || !st.missing.length) { refillDeadline = 0; refillTries = 0; return true; }
        if (!refillDeadline) {
          refillDeadline = Date.now() + 15000;
          refillTries = 0;
          console.log("[提交] 答案模型缺失 " + st.missing.map(function(i) { return i + 1; }).join("、") + " 题，尝试补写…");
        }
        try { ctx.refillChoices && ctx.refillChoices(); } catch (e) {}
        try { st = ctx.choiceState(); } catch (e) { return true; }
        if (!st || !st.total || !st.missing.length) {
          refillDeadline = 0; refillTries = 0;
          console.log("[提交] 补写成功，答案已回到页面模型");
          return true;
        }
        refillTries++;
        if (refillTries >= 6) {
          console.log("[提交] 连续 6 次补写无进展，仍有 " + st.missing.length + " 题为空 → 拒绝提交空白答案");
          return false;
        }
        if (Date.now() > refillDeadline) {
          console.log("[提交] 补写超时(15s)，仍有 " + st.missing.length + " 题为空 → 拒绝提交空白答案");
          return false;
        }
        return "wait";
      };

      let ok = false, needManual = "", wasAborted = false, lastPopupText = "", unconfirmed = false, failedAny = false, answersBad = false;
      try {
        for (let attempt = 1; attempt <= 2 && !ok && !needManual && !wasAborted; attempt++) {
          if (aborted()) { wasAborted = true; break; }
          captured.length = 0; clickCounts = {}; popupHits = 0; lastPopupText = ""; refillDeadline = 0;
          const startHref = readFrameHref();
          const t0 = Date.now(), deadline = t0 + 20e3;
          let triggered = false;
          let clickedConfirm = 0;
          let popupClearedAt = 0;
          let sawFail = false;
          while (Date.now() < deadline) {
            if (aborted()) { wasAborted = true; break; }
            const el = Date.now() - t0;
            if (pageBusy()) { await sleepMs(300); continue; }
            const _ea = ensureAnswers();
            if (_ea === false) { answersBad = true; break; }
            if (_ea === "wait") { await sleepMs(300); continue; }
            if (!triggered) {
              try { if (iframeWindow.btnBlueSubmit) { iframeWindow.btnBlueSubmit(); triggered = true; console.log("[提交] 已调用 btnBlueSubmit()"); } } catch (e) { console.log("[提交] btnBlueSubmit 异常:", e); }
            }
            if (!triggered && el > 1200) {
              try { if (iframeWindow.submitCheckTimes) { iframeWindow.submitCheckTimes(); triggered = true; console.log("[提交] 已调用 submitCheckTimes()"); } } catch (e) { console.log("[提交] submitCheckTimes 异常:", e); }
            }
            if (!triggered && el > 3000) {
              let domBtn = null;
              const docs = getDocs(), sels = [".btnSubmit", ".btnBlueSubmit", "#btnBlueSubmit", "#submitBtn", ".subBtn", "#submit"];
              for (let di = 0; di < docs.length && !domBtn; di++) {
                for (let si = 0; si < sels.length && !domBtn; si++) {
                  let b = null;
                  try { b = docs[di].querySelector(sels[si]); } catch (e) {}
                  if (isVisible(b)) domBtn = b;
                }
              }
              if (domBtn) { try { domBtn.click(); triggered = true; console.log("[提交] 已点击页面提交按钮:", sels.join("/")); } catch (e) {} }
            }
            const hit = popupCheck();
            if (hit && hit.manual) { needManual = hit.label; break; }
            if (hit) {
              if (hit.text) lastPopupText = hit.text;
              if (hit.clicked) clickedConfirm++;
              if (hit.lowScore) console.log("[提交] 本章提交成功、但未达到及格线（已点“取消”继续，未触发重做）");
              popupClearedAt = 0;
            } else if (clickedConfirm > 0 && !popupClearedAt) popupClearedAt = Date.now();
            const failMsg = captured.filter(function(m) { return failRe.test(m); })[0];
            const txt = readText();
            if (failMsg || failRe.test(txt)) { sawFail = true; failedAny = true; console.log("[提交] 捕获失败提示:", failMsg || txt.slice(0, 120)); break; }
            if (captured.some(function(m) { return okRe.test(m); }) || okPageRe.test(txt)) { console.log("[提交] 检测到提交成功提示"); ok = true; break; }
            if (clickedConfirm > 0 && popupClearedAt && Date.now() - popupClearedAt > 2500 && !popupCheck()) {
              console.log("[提交] 确认弹层已点掉且无失败提示，判定提交成功（最后弹层:", lastPopupText || "(无)", "）"); ok = true; break;
            }
            if (clickedConfirm > 0 && readFrameHref() !== startHref) { console.log("[提交] 提交后页面已跳转，判定提交成功"); ok = true; break; }
            await sleepMs(200);
          }
          if (needManual || wasAborted || ok || answersBad) break;
          const stuck = popupCheck();
          if (stuck && stuck.manual) { needManual = stuck.label; break; }
          if (sawFail) {
            console.log("[提交] 第 " + attempt + " 次提交失败" + (attempt < 2 ? "，准备重试…" : ""));
            await sleepMs(1200);
          } else if (stuck) {
            console.log("[提交] 第 " + attempt + " 次结束仍有弹层未被点掉:", stuck.text || stuck.label, "；已点弹层次数:", popupHits);
            await sleepMs(1200);
          } else if (clickedConfirm > 0) {
            console.log("[提交] 第 " + attempt + " 次结束：确认弹层已点掉、无失败提示，判定提交成功（最后弹层:", lastPopupText || "(无)", "）");
            ok = true;
          } else {
            unconfirmed = true;
            console.log("[提交][诊断] 第 " + attempt + " 次：未找到确认弹层，也未捕获成功/失败提示；可见候选:", dumpCandidates());
            if (attempt < 2) await sleepMs(1200);
          }
        }
      } finally {
        restorePopups();
      }
      if (wasAborted) {
        this.askStore.log("提交过程中检测到手动切换章节，已中止提交", "info");
        return "aborted";
      }
      if (needManual) {
        this.askStore.log("需要人工处理（" + needManual + "），已停止自动提交与跳章", "error");
        return false;
      }
      if (!ok && answersBad) {
        const saved = await this._tempSaveWork(iframeWindow, ctx);
        if ("aborted" === saved) return "aborted";
        if (false !== saved) {
          console.log("[提交] 答案不完整（有题未答/未写入页面）→ 已改为调用页面「临时保存」暂存当前答案" + (saved === "unknown" ? "（结果未确认）" : ""));
          return "tempsaved";
        }
        this.askStore.log("页面上没有可提交的答案（答案没写进页面模型，或被页面刷新/失败重载清空），自动补写未成功，本页也没有暂存入口，已停止自动跳章，请手动检查", "error");
        return false;
      }
      if (!ok && (failedAny || unconfirmed)) {
        const savedF = await this._tempSaveWork(iframeWindow, ctx);
        if ("aborted" === savedF) return "aborted";
        if (false !== savedF) {
          console.log("[提交] 页面返回失败/未确认结果 → 已改为调用页面「临时保存」暂存当前答案" + (savedF === "unknown" ? "（结果未确认）" : ""));
          this.askStore.log(savedF === "unknown"
            ? "章节测验未能正常提交；已请求页面「临时保存」暂存答案（结果未确认，请稍后在页面上核对后再手动提交）"
            : "章节测验未能正常提交（页面返回失败提示或未能确认结果）；已调用页面「临时保存」暂存答案，请稍后手动提交", "error");
          return "tempsaved";
        }
        this.askStore.log("章节测验提交失败（页面返回失败提示或未能确认结果），且本页没有暂存入口，已停止自动跳章，请手动检查并提交", "error");
        return false;
      }
      if (!ok) {
        this.askStore.log("未能确认提交结果（未检测到确认弹层，也未捕获成功/失败提示），已停止自动跳章，请手动确认", "error");
        return "unconfirmed";
      }
      return true;
    }
    homework() {
      return new Promise(async (resolve) => {
        CX_LAST_FRAME = _unsafeWindow;   // 供「抓现场」使用
        const Timu = _unsafeWindow.document.querySelectorAll(".questionLi");
        if (!Timu || Timu.length === 0) {
          this.askStore.log("未找到题目元素（.questionLi），本页可能不是作业页", "error");
          return void resolve();
        }
        let ques = [];
        for (let i = 0; i < Timu.length; i++) {
          let data = getQuestion("2", Timu[i]);
          ques.push(data);
        }
        this.askStore.reset(), this.askStore.count = ques.length, this.askStore.task.name = "作业";
        for (let i = 0; i < ques.length; i++) {
          await sleep(this.answerSpeed), this.askStore.insert(ques[i]), this.askStore.task.work.inx = i;
          _unsafeWindow._aiQIdx = i;
          let data = await getAnswers(ques[i]);
          this.askStore.get(i).allAnswer = data;
          if (data && data[0] && data[0].parseNote) this.askStore.log("第" + (i + 1) + "题 " + data[0].parseNote, "info");
          let tmp = fillAnswer(data, ques[i], Timu[i], _unsafeWindow);
          if (tmp) {
            this.askStore.get(i).status = "primary";
            this.askStore.get(i).answer = tmp;
          } else {
            const e = (data && data[0] && data[0].error) ||
              (ques[i] && (ques[i]._fillError || (ques[i]._parseError ? "题目解析失败：" + ques[i]._parseError : ""))) ||
              "AI 未返回可用的答案";
            this.askStore.get(i).status = "danger";
            this.askStore.get(i).answer = "暂无答案\n\n【失败原因】" + e;
            this.askStore.log("第" + (i + 1) + "题失败：" + e, "error");
          }
          this.askStore.get(i).dom = Timu[i];
        }
        resolve();   // v1.2.x 修复：原实现正常路径不 resolve，外层 await 永久挂住
      });
    }
    exam() {
      return new Promise(async (resolve) => {
        CX_LAST_FRAME = _unsafeWindow;   // 供「抓现场」使用
        this.askStore.reset(), this.askStore.count = 1, this.askStore.task.name = "考试";
        let data = getQuestion("3", _unsafeWindow.document.body);
        if (!data || !data.question) {
          this.askStore.log("未能解析当前考题（页面结构未匹配），请手动答题", "error");
          this.askStore.task.status = "考题解析失败";
          return void resolve();
        }
        this.askStore.insert(data), this.askStore.task.work.inx = 0;
        let data1 = await getAnswers(data);
        this.askStore.get(0).allAnswer = data1;
        if (data1 && data1[0] && data1[0].parseNote) this.askStore.log("本题 " + data1[0].parseNote, "info");
        const markTable = document.getElementsByClassName("mark_table")[0];
        let tmp = markTable ? fillAnswer(data1, data, markTable, _unsafeWindow) : false;
        if (tmp) {
          this.askStore.get(0).status = "primary";
          this.askStore.get(0).answer = tmp;
        } else {
          const e = (data1 && data1[0] && data1[0].error) ||
            (data && (data._fillError || (data._parseError ? "题目解析失败：" + data._parseError : ""))) ||
            (markTable ? "AI 未返回可用的答案" : "页面没找到 .mark_table，无法定位答题区");
          this.askStore.get(0).status = "danger";
          this.askStore.get(0).answer = "暂无答案\n\n【失败原因】" + e;
          this.askStore.log("本题失败：" + e, "error");
        }
        if (this.defaultConfig.autoExam) {
          await sleep(this.answerSpeed);
          const nextButton = $$1('.nextDiv .jb_btn:contains("下一题")');
          nextButton.length ? nextButton.click() : (this.askStore.log("已完成答题，请自行检查答案填写后自行提交", "success"), this.askStore.task.status = "已完成答题，请自行检查答案填写后自行提交");
        } else
          this.askStore.task.status = "未开启自动切换，等待手动切换";
        resolve();
      });
    }
    pdf(iframeWindow) {
      return new Promise(async (resolve) => {
        try {
          const panView = iframeWindow.document.querySelector("#panView");
          const contentWindow = panView && panView.contentWindow;
          if (contentWindow && contentWindow.document && contentWindow.document.body) {
            contentWindow.scrollTo(0, contentWindow.document.body.scrollHeight);
          } else {
            console.log("[pdf] 未找到 #panView 或其为空，跳过滚动");
          }
        } catch (e) {
          console.log("[pdf] 滚动异常（已忽略）:", e);
        }
        resolve();
      });
    }
    async s(iframeWindow) {
      /* 已完成的章节测验，无需处理 */
    }
  }

  const pinia = pinia$1.createPinia(), app = vue.createApp(App).use(ElementPlus).use(pinia), _self = _unsafeWindow, top = _self.top, formStore = useformStore();
  switch (app.mount((() => {
    try {
      const div = top.document.createElement("div");
      return div.id = "cccxapp", top.document.getElementById(div.id) ? div : (top.document.body.append(div), div);
    } catch (e) {
      log(e, "error");
    }
  })()), (() => {
    document.body.oncopy = null, document.body.oncut = null, document.body.onpaste = null, document.body.onselectstart = null, document.body.ondragstart = null;
    const style = document.createElement("style");
    style.innerHTML = "\n       * {\n           -webkit-user-select: auto !important;\n           -moz-user-select: auto !important;\n           -o-user-select: auto !important;\n           user-select: auto !important;\n       }\n   ", document.head.appendChild(style);
  })(), _self.location.pathname) {
    case "/work/doHomeWorkNew":
    case "/mooc-ans/work/doHomeWorkNew":
    case "/mooc2-ans/work/doHomeWorkNew":
      location.href.includes("mooc2=1") && (location.href = location.href.replace(/&mooc2=1/g, ""));
      break;
    case "/mycourse/studentstudy":
    case "/mooc-ans/mycourse/studentstudy":
    case "/mooc2-ans/mycourse/studentstudy":
      if (!_self.location.href.match(/mooc2=1/)) {
        ElementPlus.ElNotification({ title: "Auto Ask", message: "暂不支持旧版章节，尝试切换至新版", type: "error" }), _self.location.href = _self.location.href + "&mooc2=1";
        break;
      }
      const cxModel = new Cx();
      cxModel.askStore.log("脚本初始化成功！", "success");
      const BUILD_TAG = CX_BUILD;
      try {
        console.log("[构建] 学习通AI助手 v" + BUILD_TAG + " | 特征: 页面内诊断面板(免F12) / 反F12拦截 / 视频倍速可调可关 / 日志上限300条 / 字体解码只算实际字符 / 按题型分配输出预算 / 本地答案缓存 / 推理模型参数阶梯 / 关闭思维链 / 结构化输出");
      } catch (e) {}
      let runningTask = false, taskEpoch = 0, handledKey = null, pendingKey = null, navSeen = false, seenKey = null, seenTimes = 0;
      const SLOG = function() { try { console.log.apply(console, ["[调度]"].concat([].slice.call(arguments))); } catch (e) {} };
      const shortUrl = (u) => {
        if (!u) return String(u);
        const m = u.match(/[?&]chapterId=(\d+)/);
        return (m ? "ch" + m[1] : String(u).slice(0, 110)) + (String(u).length > 110 ? "…" : "");
      };
      const VOLATILE_PARAM = /^(enc|cpi|openc|fragmentid)$/i;
      const normalizeUrl = (u) => {
        if (!u) return u;
        try {
          const i = String(u).indexOf("?");
          if (i < 0) return String(u);
          const base = String(u).slice(0, i);
          const qs = String(u).slice(i + 1).split("&").filter(function(p) {
            return p && !VOLATILE_PARAM.test(p.split("=")[0]);
          }).sort();
          return base + "?" + qs.join("&");
        } catch (e) { return u; }
      };
      const readChapterUrl = () => {
        try {
          const f = _self.document.querySelector("#iframe");
          return f && f.contentWindow ? f.contentWindow.location.href : null;
        } catch (e) { return null; }
      };
      const readChapterKey = () => normalizeUrl(readChapterUrl());
      const startWork = async () => {
        if (runningTask) return;
        runningTask = true;
        const myEpoch = ++taskEpoch;
        const aborted = () => myEpoch !== taskEpoch;
        const ctx = { aborted };
        let bailed = false;
        const bail = () => {
          if (bailed) return;
          bailed = true;
          SLOG("任务中止(epoch " + myEpoch + ")：检测到用户已切换内容");
          cxModel.askStore.log("检测到已手动切换章节，已中止当前任务", "info");
        };
        let submitFailedThisRound = false, doneChapterUrl = null;
        try {
        var _a, _b, _c, _d, _e;
        await waitElementLoaded(_self, "#iframe");
        if (aborted()) return bail();
        const cardsIframe = _self.document.querySelector("#iframe");
        if (!cardsIframe) return;
        await waitIframeLoaded(cardsIframe);
        if (aborted()) return bail();
        const _self1 = cardsIframe.contentWindow;
        if (!_self1) return;
        const startChapterUrl = _self1.location.href;
        const startChapterKey = normalizeUrl(startChapterUrl);
        SLOG("开始处理:", shortUrl(startChapterUrl), "(epoch " + myEpoch + ")");
        top.scroll2Job && top.scroll2Job();
        let jobList = _self1.document.querySelectorAll(".ans-job-icon") || [];
        for (let i = 0; i < jobList.length; i++) {
          if (aborted()) { bail(); break; }
          const item = jobList[i];
          if ((_a = item.parentElement) == null ? void 0 : _a.classList.contains("ans-job-finished")) {
            const iframe = (_b = item.parentElement) == null ? void 0 : _b.querySelector("iframe");
            if (iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/work\/index.html/)) {
              await waitIframeLoaded(iframe), JSON.parse(iframe.getAttribute("data"));
              const workIframe = (_c = iframe.contentWindow) == null ? void 0 : _c.document.querySelector("iframe");
              workIframe && (await waitIframeLoaded(workIframe), cxModel.s(workIframe.contentWindow));
            }
            console.log(iframe.src, "已完成"), cxModel.askStore.log("已完成的任务点,跳过");
          } else {
            const iframe = (_d = item.parentElement) == null ? void 0 : _d.querySelector("iframe");
            await waitIframeLoaded(iframe);
            if (aborted()) { bail(); break; }
            const otherInfo = JSON.parse(iframe.getAttribute("data"));
            if (cxModel.askStore.log(`正在完成任务:${otherInfo.name || otherInfo.title}`), iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/video\/index\.html/)) {
              if (!formStore.forminput.autoVideo) {
                cxModel.askStore.log("视频任务已跳过", "success");
                continue;
              }
              await cxModel.video(iframe.contentWindow, ctx);
              if (aborted()) { bail(); break; }
              cxModel.askStore.log("视频任务已完成", "success");
            } else if (iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/work\/index.html/)) {
              if (false === formStore.forminput.autoAnswer) {
                cxModel.askStore.log("自动答题已关闭，跳过本节测验/作业", "success");
                continue;
              }
              cxModel.askStore.log("即将开始做作业", "info");
              const workIframe = (_e = iframe.contentWindow) == null ? void 0 : _e.document.querySelector("iframe");
              if (workIframe) {
                await waitIframeLoaded(workIframe), await cxModel.work(workIframe.contentWindow, ctx);
                if (aborted()) { bail(); break; }
                if (cxModel.askStore.submitFailed) submitFailedThisRound = true;
                cxModel.askStore.log("作业任务已完成", "success");
              }
            } else if (iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/audio\/index.html/)) {
              if (log("音频", "error"), !formStore.forminput.autoVideo) {
                cxModel.askStore.log("音频任务已跳过", "success");
                continue;
              }
              if (iframe) {
                await waitIframeLoaded(iframe);
                if (aborted()) { bail(); break; }
                await cxModel.audio(iframe.contentWindow, ctx);
                if (aborted()) { bail(); break; }
                cxModel.askStore.log("音频任务已完成", "success");
              }
            } else
              (iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/pdf\/index.html/)) ? (log("文档", "error"), iframe && (await waitIframeLoaded(iframe), await cxModel.pdf(iframe.contentWindow), cxModel.askStore.log("pdf任务已完成", "success"))) : (console.log(iframe == null ? void 0 : iframe.src, "未知"), cxModel.askStore.log("未知任务跳过", "success"));
          }
        }
        await sleep(formStore.forminput.interval);
        if (aborted()) return bail();
        const curChapterUrl = readChapterUrl() || startChapterUrl;
        const stayedPut = normalizeUrl(curChapterUrl) === startChapterKey;
        doneChapterUrl = stayedPut ? curChapterUrl : null;
        SLOG("本轮结束判定: 停留本节=" + stayedPut + "，当前=" + shortUrl(curChapterUrl));
        if (submitFailedThisRound) {
          cxModel.askStore.log("检测到本章节提交失败，已停止自动跳章，请手动提交", "error");
        } else if (!stayedPut) {
          cxModel.askStore.log("检测到已手动切换内容，跳过自动跳章", "info");
        } else if (!formStore.forminput.autoJump) {
          cxModel.askStore.msg("由于未开启自动切换,请手动切换");
        } else {
          const nextChapterBtn = top == null ? void 0 : top.document.querySelector(".nextChapter");
          nextChapterBtn && nextChapterBtn.click();
        }
        } catch (e) {
          console.error("[超星AI助手]", e);
        } finally {
          runningTask = false;
          pendingKey = null;
          navSeen = false;
          const curKey = readChapterKey();
          if (doneChapterUrl) {
            handledKey = normalizeUrl(doneChapterUrl);
            if (curKey && curKey !== handledKey) {
              SLOG("正常结束后地址已变，立即接手:", shortUrl(readChapterUrl()));
              handledKey = curKey;
              cxModel.askStore.reset();
              startWork();
            }
          } else if (curKey) {
            SLOG("本任务被抢占/未完成，按当前内容重开:", shortUrl(readChapterUrl()));
            handledKey = curKey;
            cxModel.askStore.reset();
            startWork();
          } else {
            handledKey = null;
          }
        }
      };
      setInterval(async () => {
        try {
          await waitElementLoaded(_self, "#iframe");
          const cardsIframe = _self.document.querySelector("#iframe");
          if (!cardsIframe) return;
          await waitIframeLoaded(cardsIframe);
          if (!cardsIframe.contentWindow) return;
          const curUrl = readChapterUrl();
          const curKey = normalizeUrl(curUrl);
          if (!curKey) return;
          if (curKey === seenKey) seenTimes++; else { seenKey = curKey; seenTimes = 1; }
          if (curKey !== handledKey) navSeen = true;
          if (curKey === handledKey && !navSeen) return;
          if (handledKey !== null && seenTimes < 2) {
            SLOG("地址变化待确认(" + seenTimes + "/2):", shortUrl(curUrl));
            return;
          }
          if (runningTask) {
            if (pendingKey !== curKey) {
              pendingKey = curKey;
              const oldEpoch = taskEpoch;
              taskEpoch++;
              SLOG("抢占：中止当前任务(epoch " + oldEpoch + "→" + taskEpoch + ")，目标:", shortUrl(curUrl));
              cxModel.askStore.log("检测到手动切换章节，正在中止当前任务并切换…", "info");
            }
            return;
          }
          handledKey = curKey;
          navSeen = false;
          cxModel.askStore.reset();
          SLOG("开始处理:", shortUrl(curUrl));
          startWork();
        } catch (e) {
        }
      }, 2e3);
      break;
    case "/mooc2-ans/mycourse/stu":
    case "/mooc-ans/mycourse/stu":
    case "/mycourse/stu":
      ElementPlus.ElNotification({ title: "Auto Ask", message: "此页面无任务，请自行进入章节页面", type: "error" });
      break;
    case "/work/selectWorkQuestionYiPiYue":
    case "/knowledge/cards":
      break;
    case "/mooc2/work/dowork":
    case "/mooc-ans/mooc2/work/dowork":
    case "/mooc2-ans/mooc2/work/dowork":
      const cxModel1 = new Cx();
      if (false === formStore.forminput.autoAnswer) {
        cxModel1.askStore.log("自动答题已关闭，跳过本次作业", "success");
        break;
      }
      cxModel1.askStore.log("脚本初始化成功！", "success");
      try { await cxModel1.homework(); } catch (e) { cxModel1.askStore.log("作业处理异常：" + (e && e.message ? e.message : e), "error"); }
      break;
    case "/exam-ans/exam/test/reVersionTestStartNew":
      const cxModel2 = new Cx();
      try { await cxModel2.exam(); } catch (e) { cxModel2.askStore.log("考试处理异常：" + (e && e.message ? e.message : e), "error"); }
      cxModel2.askStore.log("脚本初始化成功！", "success");
  }

})(Vue, Pinia, ElementPlus, md5, $);
