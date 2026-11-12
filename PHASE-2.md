# Computer Siksha — Phase 2

## Included in this release
- 12 bilingual computer-learning modules
- 36 short bilingual lessons (3 per module)
- 24 quick-check questions (2 per module)
- Search across module and lesson content
- Local device progress tracking (no account or server)
- Offline PWA cache for the complete bundled course
- Responsive layout for phones, tablets and desktop
- GitHub Pages deployment workflow

## Publish the website
1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Push to `main` or run **Deploy Computer Siksha website** from Actions.
4. After the workflow succeeds, open the Pages URL shown in the deployment job.

The workflow publishes the `web/` directory. GitHub Pages may need to be enabled once in repository settings by an owner.

## Run locally
From the repository root:
```bash
cd web
python -m http.server 8000
```
Open http://localhost:8000.

## Learning and privacy
Progress is stored in browser localStorage on the current device. It is not synced across devices and is not an account or cloud backup. Clearing browser data may erase progress. No login, wallet, payment or analytics is included.

## Android
The Android directory contains a native Kotlin/Jetpack Compose starter. The Android UI still needs to be connected to the shared lesson dataset and tested on an Android build runner. No APK is claimed as built by this commit.

## Content and accessibility
Lessons are original beginner-level educational explanations. Diagrams in this version are simple generated UI diagrams, not photographs. Review content with a qualified instructor before formal certification use.
