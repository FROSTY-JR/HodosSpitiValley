Assets for hero video

Place these files in this folder (exact paths used by `index.html`):

- `assets/hero.mp4`  — primary MP4 (H.264, AAC), optimized for web
- `assets/hero.webm` — optional WebM fallback (VP9 or VP8, Opus)
- `assets/hero.jpg`  — poster/fallback image shown before video loads

Recommended encoding settings

1) MP4 (H.264)
- Video codec: `libx264`
- Profile: `high` or `main`
- CRF: `20-24` (lower = higher quality)
- Preset: `slow` or `medium`
- Audio codec: `aac`, bitrate `96-128k`
- Pixel height: `720` or `1080` (use 720 for smaller filesize)
- Add `-movflags +faststart` for progressive streaming

Example ffmpeg command (MP4, 720p):

```bash
ffmpeg -i "input.mp4" -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k -vf "scale=-2:720" -movflags +faststart assets/hero.mp4
```

2) WebM (VP9) fallback

```bash
ffmpeg -i "input.mp4" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 64k -vf "scale=-2:720" assets/hero.webm
```

3) Poster image (single frame)

```bash
ffmpeg -i "input.mp4" -ss 00:00:02 -vframes 1 -q:v 2 assets/hero.jpg
```

Size & hosting recommendations

- Keep hero files reasonably small (< 50MB preferred). If your MP4 is large, use Git LFS or host on CDN (Cloudinary, S3, etc.).
- GitHub rejects commits >100MB. Use Git LFS for large binaries: https://git-lfs.github.com/
- Netlify will serve files from your repo after deploy. For large video assets, hosting on S3/CloudFront or Cloudinary provides better performance and caching.

Deployment / Git steps (example):

```bash
git add assets/hero.mp4 assets/hero.webm assets/hero.jpg
git commit -m "Add hero video and poster"
git push origin main
```

After pushing, Netlify (connected to GitHub) will trigger a new deploy and your site will serve the files.

Mobile autoplay notes

- Ensure the `video` tag includes `muted playsinline autoplay` (already present in `index.html`).
- CSS should keep the hero area `min-height:100vh` so the video covers phone screens (already adjusted).
- If autoplay is blocked on some devices, the poster image will be shown instead.

If you want, I can:
- Download the Google Drive file for you and add encoded versions to this folder (you must provide a direct-download link or make the file publicly accessible), or
- Upload the final assets to Cloudinary/S3 and update `index.html` to point to the CDN URLs.

