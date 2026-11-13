# Computer Siksha

**Computer Siksha** is a free, beginner-friendly computer-learning platform. The first complete release is focused on **English and Hindi only**. The remaining 10 planned languages are deferred until a later phase.

## Phase 1 language scope
- English (`en`)
- Hindi (`hi`)
- The website language selector displays only these two languages.
- Course lessons and quizzes must have complete English and Hindi content. No other language is part of the current release scope.

## Learning content target
- 12 computer education modules
- 36 lessons (3 per module), in English and Hindi
- 24 multiple-choice quizzes (2 per module), in English and Hindi
- Correct answers and explanations
- Educational diagrams and practical examples
- Search across modules and lessons
- Progress saved locally on the current device
- Offline-ready website and Android app

## Platforms
- Website/PWA: `web/`
- Android Kotlin app: `android/`
- Android app should bundle the same bilingual course data for offline learning.

## Run the website locally
From the repository root:
```bash
cd web
python -m http.server 8000
```
Open http://localhost:8000.

## Publish website with GitHub Pages
1. Open repository **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push a change to `web/` or run **Deploy Computer Siksha website** in the Actions tab.
4. Open the published URL shown by the successful deployment.

The Pages workflow is committed. A successful deployment run is still required to verify the public site.

## Build Android debug APK
With JDK 17 and Android SDK installed:
```bash
gradle -p android assembleDebug
```
APK output: `android/app/build/outputs/apk/debug/app-debug.apk`.

A debug APK is for testing; it is not a Play Store signed release.

## Privacy and limitations
- Learning progress is stored in browser local storage on that device only; it is not synced.
- Clearing app/browser data may clear progress.
- No account system, cloud sync, analytics or backend is included.
- Review educational content and complete real-device QA before public production release.

## Project documents
- [Architecture](ARCHITECTURE.md)
- [12-module syllabus](SYLLABUS.md)
- [Phase 2 implementation notes](PHASE-2.md)
- [Android build notes](android/README.md)
- [English/Hindi release checklist](RELEASE-CHECKLIST.md)
