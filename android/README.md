# Android app

The Android app is a native Kotlin/Jetpack Compose host around the shared offline-first learning website. Its bundled assets are kept in sync with the website and include the complete first-release course in **English and Hindi only**.

## Build

The repository GitHub Actions workflow installs JDK 17, Android SDK Platform 35 and Gradle 8.9, then builds the debug APK:

```bash
gradle -p android assembleDebug
```

The debug APK is created at `android/app/build/outputs/apk/debug/app-debug.apk`.

GitHub Actions also builds a debug APK on changes to `android/**` or `web/**` and uploads it as the `computer-siksha-debug-apk` artifact. This is a test APK, not a Play Store signed release.

## Release status

A successful CI build and installation test on a real Android device are required before calling the Android app release-ready. Progress is stored locally on the device; cloud sync and accounts are not included.
