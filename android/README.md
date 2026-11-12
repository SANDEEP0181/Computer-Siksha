# Android app

The Android app is a native Kotlin host around the same offline-first learning experience used by the website. The web learning files are bundled under `app/src/main/assets/`, so lessons do not require a network connection.

## Build
From the repository root, with JDK 17 and Android SDK installed:
```bash
gradle -p android assembleDebug
```
The debug APK is created at `android/app/build/outputs/apk/debug/app-debug.apk`.

GitHub Actions also builds a debug APK on changes to `android/**` or `web/**` and uploads it as the workflow artifact. This is a test APK, not a Play Store signed release.
