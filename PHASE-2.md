# Computer Siksha — English/Hindi Release

## Release scope
- 12 computer-learning modules
- 36 lessons (3 per module), in English and Hindi
- 24 quick-check questions (2 per module), in English and Hindi
- Correct answers and clear explanations
- Search across module and lesson content
- Local device progress tracking (no account or server)
- Offline PWA cache for the complete bundled course
- Responsive layout for phones, tablets and desktop
- Android app with the same offline bilingual course content

## Required verification before calling the release complete
1. Confirm every lesson has English and Hindi title, introduction and key points.
2. Confirm all 24 quizzes have English and Hindi question text and answer options.
3. Confirm every answer key is correct and each answer has an explanation in both languages.
4. Confirm all 12 modules and 36 lessons can be opened and completed.
5. Confirm progress is saved and restored after reload.
6. Confirm search works in both languages.
7. Confirm the website works offline after the first successful load.
8. Build Android debug APK and test on a real Android device.
9. Verify GitHub Pages deployment and test the published URL.

## Publish the website
1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Push to `main` or run **Deploy Computer Siksha website** from Actions.
4. After the workflow succeeds, open the Pages URL shown in the deployment job.

## Run locally
From the repository root:
```bash
cd web
python -m http.server 8000
```
Open http://localhost:8000.

## Privacy and limitations
Progress is stored in browser localStorage on the current device. It is not synced across devices. No login, wallet, payment or analytics is included.

The remaining 10 languages are explicitly deferred to a later phase. This document does not claim public release QA or signed Android release completion.
