const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const context = {};
const load = (file) => fs.readFileSync(path.join(root, file), "utf8");
vm.runInNewContext(
  load("web/assets/course-data.js") +
  "\n" + load("web/assets/lesson-data.js") +
  "\n;globalThis.__course = COURSE; globalThis.__lessons = LESSONS; globalThis.__quizzes = QUIZZES;",
  context,
  { filename: "computer-siksha-course-data.js" }
);

const errors = [];
const requireBilingual = (value, label) => {
  if (!value || typeof value !== "object" || !value.en || !value.hi) {
    errors.push(label + " must include non-empty en and hi values");
  }
};
const course = context.__course;
const lessons = context.__lessons;
const quizzes = context.__quizzes;

if (!course || !Array.isArray(course.modules) || course.modules.length !== 12) {
  errors.push("Expected exactly 12 course modules");
}
if (!Array.isArray(lessons)) errors.push("LESSONS must be an array");

const moduleIds = new Set((course?.modules || []).map((m) => m.id));
for (const module of course?.modules || []) {
  requireBilingual(module.title, module.id + " module title");
  requireBilingual(module.description, module.id + " module description");
  const group = lessons?.find((item) => item.module === module.id);
  if (!group || !Array.isArray(group.lessons) || group.lessons.length !== 3) {
    errors.push(module.id + " must contain exactly 3 lessons");
    continue;
  }
  for (const lesson of group.lessons) {
    requireBilingual(lesson.title, lesson.id + " title");
    requireBilingual(lesson.intro, lesson.id + " introduction");
    if (!Array.isArray(lesson.points) || lesson.points.length < 3) {
      errors.push(lesson.id + " must contain at least 3 learning points");
    } else {
      lesson.points.forEach((point, index) => {
        if (Array.isArray(point)) {
          if (!point[0] || !point[1]) errors.push(lesson.id + " point " + (index + 1) + " must include English and Hindi");
        } else {
          requireBilingual(point, lesson.id + " point " + (index + 1));
        }
      });
    }
  }
}
const lessonCount = (lessons || []).reduce((sum, group) => sum + (group.lessons?.length || 0), 0);
if (lessonCount !== 36) errors.push("Expected exactly 36 lessons; found " + lessonCount);
if (new Set((lessons || []).flatMap((group) => (group.lessons || []).map((lesson) => lesson.id))).size !== lessonCount) {
  errors.push("Lesson IDs must be unique");
}
if (!quizzes || Object.keys(quizzes).length !== 12) errors.push("Expected quizzes for all 12 modules");
let quizCount = 0;
for (const moduleId of moduleIds) {
  const items = quizzes?.[moduleId];
  if (!Array.isArray(items) || items.length !== 2) {
    errors.push(moduleId + " must contain exactly 2 quizzes");
    continue;
  }
  for (const quiz of items) {
    quizCount++;
    requireBilingual(quiz.q, quiz.id + " question");
    requireBilingual(quiz.why, quiz.id + " explanation");
    if (!Array.isArray(quiz.o) || quiz.o.length !== 3) errors.push(quiz.id + " must have exactly 3 options");
    else quiz.o.forEach((option, index) => requireBilingual(option, quiz.id + " option " + (index + 1)));
    if (!Number.isInteger(quiz.a) || quiz.a < 0 || quiz.a >= (quiz.o?.length || 0)) errors.push(quiz.id + " has an invalid answer index");
  }
}
if (quizCount !== 24) errors.push("Expected exactly 24 quizzes; found " + quizCount);


const uiContext = {};
vm.runInNewContext(load("web/assets/locales.js") + "\\n;globalThis.__ui = UI_TEXT;", uiContext);
const uiLanguages = Object.keys(uiContext.__ui || {}).sort();
if (JSON.stringify(uiLanguages) !== JSON.stringify(["en", "hi"])) {
  errors.push("The first-release interface must expose English and Hindi only; found: " + uiLanguages.join(", "));
}
const html = load("web/index.html");
const selectorLanguages = [...html.matchAll(/<option value="([^"]+)"/g)].map((match) => match[1]).sort();
if (JSON.stringify(selectorLanguages) !== JSON.stringify(["en", "hi"])) {
  errors.push("The website language selector must contain English and Hindi only");
}
const androidPairs = [
  ["web/index.html", "android/app/src/main/assets/index.html"],
  ["web/styles.css", "android/app/src/main/assets/styles.css"],
  ["web/app.js", "android/app/src/main/assets/app.js"],
  ["web/sw.js", "android/app/src/main/assets/sw.js"],
  ["web/assets/locales.js", "android/app/src/main/assets/assets/locales.js"],
  ["web/assets/course-locales.js", "android/app/src/main/assets/assets/course-locales.js"],
  ["web/assets/course-data.js", "android/app/src/main/assets/assets/course-data.js"],
  ["web/assets/lesson-data.js", "android/app/src/main/assets/assets/lesson-data.js"]
];
for (const [webFile, androidFile] of androidPairs) {
  if (load(webFile) !== load(androidFile)) {
    errors.push("Android bundled asset is out of sync: " + androidFile);
  }
}

if (errors.length) {
  console.error("Computer Siksha bilingual content validation FAILED:");
  errors.forEach((error) => console.error(" - " + error));
  process.exit(1);
}
console.log("Computer Siksha bilingual content validation PASSED: 12 modules, 36 lessons, 24 quizzes, English + Hindi.");
