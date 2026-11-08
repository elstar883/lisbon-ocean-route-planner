#!/usr/bin/env node
/*
 * Проверка целостности статического приложения «Маршрут — Лиссабон и океан».
 *
 * Скрипт не запускает браузер и не требует зависимостей:
 *  - проверяет обязательные файлы и метаданные репозитория;
 *  - проверяет разметку, стили и отсутствие внешних ресурсов;
 *  - сверяет демонстрационные данные и их статистику;
 *  - проверяет ключевые сценарии и локальное хранение;
 *  - проверяет синтаксис приложения.
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFile(join(root, path), "utf8");

const errors = [];
const check = (condition, message) => {
  if (!condition) {
    errors.push(message);
  }
};

const readJson = async (path) => JSON.parse(await read(path));

/* ---------- Обязательные файлы ---------- */

const requiredFiles = [
  "app/index.html",
  "app/styles.css",
  "app/app.js",
  "references/design-brief.md",
  "references/acceptance-checklist.md",
  "references/visual-reference.png",
  "docs/ARCHITECTURE.md",
  "docs/DATA-MODEL.md",
  "docs/QA-CHECKLIST.md",
  "docs/images/route-hero.png",
  "docs/images/route-desktop.png",
  "docs/images/route-mobile-hero.png",
  "docs/images/route-mobile.png",
  "docs/images/route-busy.png",
  "docs/images/route-states.png",
  "README.md",
  "LICENSE",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "Makefile",
  "package.json",
  "scripts/validate.mjs",
  ".editorconfig",
  ".gitattributes",
  ".gitignore",
  ".github/workflows/tests.yml",
  "opencode.json",
  ".opencode/skills/lisbon-ocean-route-planner/SKILL.md",
  ".opencode/commands/route-plan.md",
  ".opencode/commands/route-build.md",
  ".opencode/commands/route-qa.md",
];

for (const file of requiredFiles) {
  try {
    await read(file);
  } catch {
    check(false, `нет обязательного файла: ${file}`);
  }
}

/* ---------- Метаданные репозитория ---------- */

const packageJson = await readJson("package.json");
check(packageJson.name === "lisbon-ocean-route-planner", "неожиданное имя пакета");
check(packageJson.type === "module", 'в package.json должно быть "type": "module"');
check(packageJson.version === "1.0.1", "версия package.json должна быть 1.0.1");
check(packageJson.license === "MIT", "лицензия в package.json должна быть MIT");
check(
  !packageJson.dependencies && !packageJson.devDependencies,
  "у приложения не должно быть npm-зависимостей",
);
check(
  packageJson.scripts?.check === "node scripts/validate.mjs",
  "в package.json должен быть скрипт check",
);

const gitignore = await read(".gitignore");
for (const pattern of [".DS_Store", ".env", "*.zip", "*.pdf"]) {
  check(gitignore.includes(pattern), `.gitignore должен исключать ${pattern}`);
}

for (const artifact of [
  "app.zip",
  "lesson-6-route-planner-starter.zip",
  ".DS_Store",
  ".env",
]) {
  try {
    await read(artifact);
    check(false, `в репозитории не должно быть ${artifact}`);
  } catch {
    // Файла нет — это ожидаемо.
  }
}

/* ---------- Разметка ---------- */

const html = await read("app/index.html");
const requiredIds = [
  "countdownValue",
  "mobileToday",
  "mobileTodayDay",
  "mobileTodayEventTitle",
  "mobileTodayEventTime",
  "mobileTodayEventPlace",
  "mobileTodayEventStatus",
  "mobileTodayTask",
  "daysTabs",
  "dayCity",
  "dayDate",
  "routeLoading",
  "routeError",
  "routeEmpty",
  "routeContent",
  "routeRetryBtn",
  "eventsList",
  "plannedSum",
  "remainingSum",
  "budgetProgressFill",
  "budgetProgressLabel",
  "budgetCategoriesList",
  "bookingsList",
  "checklistContainer",
  "checklistProgressText",
  "checklistProgressFill",
  "resetDataBtn",
  "demoPanel",
  "demoPanelHeader",
  "demoPanelToggle",
  "demoPanelContent",
  "toastContainer",
];

for (const id of requiredIds) {
  check(html.includes(`id="${id}"`), `в app/index.html нет элемента #${id}`);
}

check(html.includes('lang="ru"'), 'app/index.html должен быть на русском языке');
check(html.includes('name="viewport"'), "app/index.html должен содержать viewport");
check(html.includes("styles.css"), "app/index.html должен подключать styles.css");
check(html.includes('src="app.js"'), "app/index.html должен подключать app.js");
check(
  html.includes("Лиссабон и океан"),
  "app/index.html должен содержать название поездки",
);
check(
  (html.match(/class="demo-btn/g) || []).length === 4,
  "в демо-панели должно быть четыре состояния",
);
check(
  (html.match(/class="bottom-nav__btn/g) || []).length === 4,
  "в нижней навигации должно быть четыре пункта",
);

const externalRefs = [...html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/g)]
  .map((match) => match[1])
  .filter((value) => /^(?:https?:)?\/\//i.test(value));
check(externalRefs.length === 0, `app/index.html загружает внешние ресурсы: ${externalRefs.join(", ")}`);
check(
  !/<script(?![^>]*\bsrc=)/i.test(html),
  "app/index.html не должен содержать встроенных скриптов",
);

/* ---------- Стили ---------- */

const css = await read("app/styles.css");
check(!/@import/i.test(css), "app/styles.css не должен использовать @import");
check(
  !/url\(\s*["']?(?:https?:)?\/\//i.test(css),
  "app/styles.css не должен загружать внешние ресурсы",
);
check(
  /prefers-reduced-motion/i.test(css),
  "app/styles.css должен учитывать prefers-reduced-motion",
);
for (const selector of [".mobile-today", ".bottom-nav", "@media (max-width: 600px)", "@media (max-width: 768px)", "@media (max-width: 390px)"]) {
  check(css.includes(selector), `app/styles.css не содержит ${selector}`);
}

/* ---------- Данные и сценарии ---------- */

const appSource = await read("app/app.js");

check(appSource.includes('title: "Лиссабон и океан"'), "неожиданное название поездки");
check(appSource.includes('start: "2025-09-12"'), "неожиданная дата начала поездки");
check(appSource.includes('end: "2025-09-18"'), "неожиданная дата окончания поездки");
check(/daysCount:\s*7\b/.test(appSource), "поездка должна длиться 7 дней");
check(/budgetTotal:\s*180000\b/.test(appSource), "общий бюджет должен быть 180 000 ₽");

check(appSource.includes("const PACE_CONFIG"), "в app.js нет PACE_CONFIG");
check(appSource.includes("const DAYS_BY_PACE"), "в app.js нет DAYS_BY_PACE");
check(appSource.includes("const BOOKINGS_INITIAL"), "в app.js нет BOOKINGS_INITIAL");
check(appSource.includes("const CHECKLIST_INITIAL"), "в app.js нет CHECKLIST_INITIAL");
check(appSource.includes("const BUDGET_CATEGORIES_BASE"), "в app.js нет BUDGET_CATEGORIES_BASE");

for (const fn of [
  "initFromStorage",
  "renderDaysTabs",
  "renderEvents",
  "renderPace",
  "renderBudget",
  "renderBookings",
  "renderChecklist",
  "renderMobileToday",
  "setupBottomNav",
  "renderAll",
  "showToast",
]) {
  check(appSource.includes(`function ${fn}`), `в app.js нет функции ${fn}`);
}

check(
  (appSource.match(/dayNum:\s*[1-7]/g) || []).length === 14,
  "DAYS_BY_PACE должен содержать по 7 дней в каждом темпе",
);

const dayBlockStart = appSource.indexOf("const DAYS_BY_PACE");
const calmStart = appSource.indexOf("calm: [", dayBlockStart);
const busyStart = appSource.indexOf("busy: [", calmStart);
const dayBlockEnd = appSource.indexOf("\n};", busyStart);
check(dayBlockStart >= 0 && calmStart > dayBlockStart && busyStart > calmStart && dayBlockEnd > busyStart, "не удалось разобрать DAYS_BY_PACE");
const calmBlock = appSource.slice(calmStart, busyStart);
const busyBlock = appSource.slice(busyStart, dayBlockEnd);

const countMatches = (source, regex) => (source.match(regex) || []).length;
check(
  countMatches(calmBlock, /id:\s*"d\d-c\d"/g) === 17,
  "в режиме «Спокойно» должно быть 17 событий",
);
check(
  countMatches(busyBlock, /id:\s*"d\d-b\d"/g) === 28,
  "в режиме «Насыщенно» должно быть 28 событий",
);
check(
  countMatches(calmBlock, /dayNum:\s*[1-7]/g) === 7,
  "в режиме «Спокойно» должно быть 7 дней",
);
check(
  countMatches(busyBlock, /dayNum:\s*[1-7]/g) === 7,
  "в режиме «Насыщенно» должно быть 7 дней",
);

const sumCosts = (source) => {
  let total = 0;
  for (const match of source.matchAll(/\bcost:\s*(\d+)/g)) {
    total += Number(match[1]);
  }
  return total;
};
const calmCost = sumCosts(calmBlock);
const busyCost = sumCosts(busyBlock);
check(calmCost === 52830, `сумма событий «Спокойно» должна быть 52 830, получено ${calmCost}`);
check(busyCost === 112930, `сумма событий «Насыщенно» должна быть 112 930, получено ${busyCost}`);
check(calmCost - 10000 === 42830, "прогноз «Спокойно» должен быть 42 830");
check(busyCost + 15000 === 127930, "прогноз «Насыщенно» должен быть 127 930");

check(/calm:\s*\{[\s\S]*?costMultiplier:\s*0\.9/.test(appSource), "множитель calm должен быть 0.9");
check(/busy:\s*\{[\s\S]*?costMultiplier:\s*1\.15/.test(appSource), "множитель busy должен быть 1.15");

const bookingIds = [...appSource.matchAll(/\bid:\s*"(b-[a-z]+)"/g)].map((match) => match[1]);
const bookingRefs = [...appSource.matchAll(/bookingRef:\s*"(b-[a-z]+)"/g)].map((match) => match[1]);
check(bookingIds.length === 4, `должно быть 4 бронирования, получено ${bookingIds.length}`);
check(new Set(bookingIds).size === 4, "идентификаторы бронирований должны быть уникальны");
for (const ref of new Set(bookingRefs)) {
  check(bookingIds.includes(ref), `событие ссылается на неизвестное бронирование ${ref}`);
}

check(
  (appSource.match(/\bid:\s*"c\d+"/g) || []).length === 10,
  "в чек-листе должно быть 10 задач",
);
check(
  (appSource.match(/\{\s*key:\s*"[a-z]+",\s*label:/g) || []).length === 6,
  "в бюджете должно быть 6 категорий",
);

const budgetAmounts = [...appSource.matchAll(/key:\s*"[a-z]+",\s*label:\s*"[^"]+",\s*amount:\s*(\d+)/g)].map((match) => Number(match[1]));
const budgetTotal = budgetAmounts.reduce((sum, amount) => sum + amount, 0);
check(budgetAmounts.length === 6, "не удалось прочитать категории бюджета");
check(budgetTotal === 180000, `сумма категорий бюджета должна быть 180 000, получено ${budgetTotal}`);

for (const stateName of ["loading", "error", "empty", "success"]) {
  check(appSource.includes(`"${stateName}"`), `в app.js нет состояния ${stateName}`);
}

for (const storageKey of [
  "routePlanner.bookings",
  "routePlanner.checklist",
  "routePlanner.pace",
]) {
  check(appSource.includes(storageKey), `в app.js нет ключа localStorage ${storageKey}`);
}
check(appSource.includes("localStorage.setItem"), "app.js должен сохранять данные в localStorage");
check(appSource.includes("localStorage.getItem"), "app.js должен читать данные из localStorage");

const forbidden = /\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon|import\s*\(|\bsessionStorage\b/;
check(!forbidden.test(appSource), "app/app.js не должен обращаться к сети или использовать sessionStorage");

/* ---------- README и документация ---------- */

const readme = await read("README.md");
for (const heading of [
  "Быстрый старт",
  "Скриншоты",
  "Демонстрационная поездка",
  "Ограничения",
  "Лицензия",
]) {
  check(readme.includes(heading), `в README.md нет раздела «${heading}»`);
}
check(
  readme.includes("lisbon-ocean-route-planner"),
  "README.md должен содержать имя репозитория",
);

const imageLinks = [...readme.matchAll(/!\[[^\]]*\]\((docs\/images\/[^)]+)\)/g)].map((match) => match[1]);
check(imageLinks.length >= 3, "README.md должен показывать скриншоты приложения");
for (const link of imageLinks) {
  try {
    await read(link);
  } catch {
    check(false, `в README.md ссылка на отсутствующий файл: ${link}`);
  }
}

const architecture = await read("docs/ARCHITECTURE.md");
check(architecture.includes("localStorage"), "docs/ARCHITECTURE.md должен описывать localStorage");
check(architecture.includes("renderMobileToday"), "docs/ARCHITECTURE.md должен описывать мобильный режим");
const dataModel = await read("docs/DATA-MODEL.md");
check(dataModel.includes("routePlanner.bookings"), "docs/DATA-MODEL.md должен описывать ключи localStorage");
const qaChecklist = await read("docs/QA-CHECKLIST.md");
check(qaChecklist.includes("validate.mjs"), "docs/QA-CHECKLIST.md должен ссылаться на validate.mjs");

/* ---------- Синтаксис ---------- */

const syntax = spawnSync(process.execPath, ["--check", join(root, "app/app.js")], {
  encoding: "utf8",
});
check(
  syntax.status === 0,
  `синтаксис app/app.js не проходит node --check: ${(syntax.stderr || "").trim()}`,
);

/* ---------- Итог ---------- */

if (errors.length > 0) {
  console.error(`Проверка не пройдена: ${errors.length} ошибок.`);
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(
  "OK: 7 дней, 17 событий «Спокойно», 28 событий «Насыщенно», " +
    "4 бронирования, 10 задач чек-листа и 6 категорий бюджета.",
);
