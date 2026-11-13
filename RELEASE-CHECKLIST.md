# English/Hindi Release Checklist

This checklist is the acceptance gate for the first public release. The remaining 10 languages are out of scope until a later language phase.

## Content
- [ ] 12 modules are present and titled in English and Hindi.
- [ ] 36 lessons are present (3 per module).
- [ ] Every lesson has an English and Hindi title, introduction and all key points.
- [ ] 24 quizzes are present (2 per module).
- [ ] Every quiz has English and Hindi question text, answer choices and explanation.
- [ ] Answer keys have been reviewed for correctness.
- [ ] Technical explanations and examples have been reviewed for accuracy and beginner readability.
- [ ] Diagram labels and alt text are available in both languages where appropriate.

## Website/PWA
- [ ] Language selector offers English and Hindi only.
- [ ] Old saved preferences for deferred languages safely fall back to English.
- [ ] Both languages render lesson titles, introductions, bullet points, quiz questions, options and explanations.
- [ ] Search works in English and Hindi.
- [ ] Progress persists after reload and does not exceed the 36-lesson total.
- [ ] Offline cache includes all required course assets.
- [ ] Keyboard navigation, screen-reader labels and mobile layouts are checked.

## Android
- [ ] Android project builds with JDK 17 and the configured Android SDK.
- [ ] App bundles the same English/Hindi course data as the website.
- [ ] Language selection and progress work offline.
- [ ] Test on at least one real Android device.

## Deployment and release
- [ ] GitHub Actions validation passes.
- [ ] GitHub Pages deployment succeeds and the public URL is tested.
- [ ] Debug APK artifact is generated and installed for testing.
- [ ] Privacy, attribution and accessibility checks are complete.
- [ ] No claim of production readiness until all checks above are verified.

## Deferred
Spanish, Simplified Chinese, Arabic, French, Portuguese, Bengali, Russian, Urdu, Indonesian and Japanese will be added only after the English/Hindi release is stable.
