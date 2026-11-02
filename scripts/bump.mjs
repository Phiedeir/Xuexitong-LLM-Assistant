#!/usr/bin/env node
/**
 * 版本号自动递增 + CHANGELOG 记录
 *
 * 用法：
 *   node scripts/bump.mjs patch "修复 matchAnswer 三层匹配"
 *   node scripts/bump.mjs minor "新增抓现场快照"
 *   node scripts/bump.mjs major "配置格式重构"
 *   node scripts/bump.mjs --set 1.3.0 "手工指定版本"
 *
 * 做四件事：
 *   1. 改写 .user.js 的 // @version
 *   2. 改写代码里的 CX_BUILD（形如 1.2.11-20261102a，同日多次自动 a→b→c）
 *   3. 在 CHANGELOG.md 顶部插入条目
 *   4. 打印本次变更，供 commit message 使用
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = join(ROOT, "chaoxing-ai-llm.user.js");
const CHANGELOG = join(ROOT, "CHANGELOG.md");

const args = process.argv.slice(2);
let mode = "patch";
let summary = "";
let explicit = null;

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--set") { explicit = args[++i]; mode = "set"; }
  else if (["patch", "minor", "major"].includes(a)) { mode = a; }
  else if (!summary) { summary = a; }
}

if (mode !== "set" && !summary) {
  console.error('用法: node scripts/bump.mjs patch "变更摘要"');
  process.exit(1);
}

const src = readFileSync(SCRIPT, "utf8");

// 当前版本
const m = src.match(/^\/\/\s*@version\s+(\S+)\s*$/m);
if (!m) { console.error("找不到 // @version 行"); process.exit(1); }
const cur = m[1];
const [major, minor, patch] = cur.split(".").map((x) => parseInt(x, 10) || 0);

// 新版本
let next;
if (mode === "set") next = explicit;
else if (mode === "major") next = `${major + 1}.0.0`;
else if (mode === "minor") next = `${major}.${minor + 1}.0`;
else next = `${major}.${minor}.${patch + 1}`;

if (next === cur) { console.error("版本没有变化: " + cur); process.exit(1); }
if (compareVersion(next, cur) <= 0) {
  console.error(`新版本 ${next} 必须大于当前 ${cur}（Tampermonkey 靠版本号判断更新）`);
  process.exit(1);
}

// 构建号：同日多次递增字母后缀
const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const ymd = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
const iso = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const existing = src.match(/const CX_BUILD = "([^"]+)"/);
let seq = "a";
if (existing) {
  const em = existing[1].match(/-(\d{8})([a-z])$/);
  if (em && em[1] === ymd) {
    seq = String.fromCharCode(em[2].charCodeAt(0) + 1);
  }
}
const build = `${next}-${ymd}${seq}`;

// 改写脚本
let out = src.replace(/^(\/\/\s*@version\s+)\S+(\s*)$/m, `$1${next}$2`);
if (existing) out = out.replace(/const CX_BUILD = "[^"]+"/, `const CX_BUILD = "${build}"`);
else out = out.replace(/^(\s*)\/\/ @name/m, `$1// @name`);
writeFileSync(SCRIPT, out, "utf8");

// 写 CHANGELOG
const entry = `## [${next}] - ${iso}\n\n- ${summary}\n- build: \`${build}\`\n\n`;
let cl = existsSync(CHANGELOG) ? readFileSync(CHANGELOG, "utf8") : "# Changelog\n\n";
const anchor = cl.indexOf("\n## ");
if (anchor >= 0) cl = cl.slice(0, anchor + 1) + entry + cl.slice(anchor + 1);
else cl = cl.replace(/\s*$/, "\n\n") + entry;
writeFileSync(CHANGELOG, cl, "utf8");

console.log(`✔ ${cur} → ${next}  (build ${build})`);
console.log(`✔ 已写 CHANGELOG.md`);
console.log(`\n建议 commit：\n  git add -A && git commit -m "chore(release): v${next} — ${summary}"`);

function compareVersion(a, b) {
  const pa = String(a).split(".").map((x) => parseInt(x, 10) || 0);
  const pb = String(b).split(".").map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
  }
  return 0;
}
