#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const file = path.join(__dirname, "../web/assets/lesson-data.js");
const source = fs.readFileSync(file, "utf8");
const sandbox = {};
vm.runInNewContext(source + "\n;globalThis.__content = { LESSONS, QUIZZES };", sandbox);
const { LESSONS, QUIZZES } = sandbox.__content;
const fail = (message) => { console.error("CONTENT VALIDATION FAILED:", message); process.exitCode = 1; };
const locales = ["en", "hi"];
if (!Array.isArray(LESSONS) || LESSONS.length !== 12) fail("Expected exactly 12 lesson modules.");
if (!QUIZZES || Object.keys(QUIZZES).length !== 12) fail("Expected quizzes for all 12 modules.");

let lessonCount = 0;
const lessonIds = new Set();
for (const module of LESSONS || []) {
  if (!Array.isArray(module.lessons) || module.lessons.length !== 3) fail(module.module + " must contain 3 lessons.");
  for (const [index, lesson] of (module.lessons || []).entries()) {
    lessonCount++;
    if (lesson.id !== module.module + "-L" + String(index + 1).padStart(2, "0")) fail("Invalid or missing lesson ID in " + module.module + ".");
    if (lessonIds.has(lesson.id)) fail("Duplicate lesson ID: " + lesson.id);
    lessonIds.add(lesson.id);
    for (const locale of locales) {
      if (!lesson.title?.[locale] || !lesson.intro?.[locale]) fail(lesson.id + " is missing " + locale + " title/intro.");
    }
    if (!Array.isArray(lesson.points) || lesson.points.length < 3) fail(lesson.id + " must have at least 3 learning points.");
    for (const point of lesson.points || []) for (const locale of locales) if (!point[locales.indexOf(locale)]?.trim()) fail(lesson.id + " has an empty learning point.");
  }
}
let quizCount = 0;
const quizIds = new Set();
for (const moduleId of Object.keys(QUIZZES || {})) {
  const questions = QUIZZES[moduleId];
  if (!Array.isArray(questions) || questions.length !== 2) fail(moduleId + " must contain 2 quiz questions.");
  for (const [index, question] of (questions || []).entries()) {
    quizCount++;
    if (question.id !== moduleId + "-Q" + String(index + 1).padStart(2, "0")) fail("Invalid or missing quiz ID in " + moduleId + ".");
    if (quizIds.has(question.id)) fail("Duplicate quiz ID: " + question.id);
    quizIds.add(question.id);
    for (const locale of locales) {
      if (!question.q?.[locale] || !question.why?.[locale]) fail(question.id + " is missing " + locale + " question/explanation.");
      if (!Array.isArray(question.o) || question.o.length < 3 || question.o.some(option => !option?.[locale])) fail(question.id + " has incomplete " + locale + " answer options.");
    }
    if (moduleId === "M01") for (const locale of ["es", "fr", "pt"]) {
      if (!question.q?.[locale] || !question.why?.[locale] || question.o.some(option => !option?.[locale])) fail(question.id + " is missing " + locale + " quiz translation.");
    }
    if (!Number.isInteger(question.a) || question.a < 0 || question.a >= question.o.length) fail(question.id + " has an invalid correct-answer index.");
  }
}
if (lessonCount !== 36 || lessonIds.size !== 36) fail("Expected 36 unique lessons; found " + lessonCount + ".");
if (quizCount !== 24 || quizIds.size !== 24) fail("Expected 24 unique quiz questions; found " + quizCount + ".");
if (!process.exitCode) console.log("Content validation passed: 12 modules, 36 uniquely identified lessons, 24 uniquely identified quiz questions; English and Hindi base fields are complete.");
