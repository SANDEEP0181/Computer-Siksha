# Computer Siksha

**Computer Siksha** is a free, beginner-friendly computer-learning platform in Hindi and English. It includes a responsive website/PWA and an Android app that bundles the same lessons for offline use.

## Current learning content
- 12 computer education modules
- 36 short bilingual lessons (3 per module)
- 24 multiple-choice practice questions (2 per module)
- Original educational diagrams for the computer data cycle, hardware overview and a basic network
- Search across module and lesson content
- Progress saved locally on the current device
- Offline-ready website cache and Android bundled assets
- No login, payment, wallet or account required

## Platforms
- Website/PWA: `web/`
- Android Kotlin app: `android/`
- Android app displays the same bundled offline web lessons inside a native Android shell.

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

The Pages workflow is committed. GitHub Pages must be enabled once in repository settings by a repository owner before the workflow can deploy.

## Build Android debug APK
With JDK 17 and Android SDK installed:
```bash
gradle -p android assembleDebug
```
APK output: `android/app/build/outputs/apk/debug/app-debug.apk`.

GitHub Actions automatically builds a debug APK when Android or web files change and uploads it as the `computer-siksha-debug-apk` artifact. A debug APK is for testing; it is not a Play Store signed release.

## Privacy and limitations
- Learning progress is stored in browser local storage on that device only. It is not synced between devices.
- Clearing app/browser data may clear progress.
- No account system, cloud sync, analytics or backend is included.
- Review educational content before using it for formal training or certification.
- App and website need real-device/browser QA before public production release.

## Project documents
- [Architecture](ARCHITECTURE.md)
- [12-module syllabus](SYLLABUS.md)
- [Phase 2 implementation notes](PHASE-2.md)
- [Android build notes](android/README.md)
