# Scroll Sequence Frames

This directory contains the extracted frames for the scroll sequence animations.

## Frame Extraction

To extract frames from the videos, run:

```bash
node scripts/extract-frames.js
```

**Prerequisites:**
- Install ffmpeg: https://ffmpeg.org/download.html
- Make sure ffmpeg is in your PATH

## Expected Structure

```
public/sequences/
├── ortus1/
│   ├── frame-1.webp
│   ├── frame-2.webp
│   └── ... (50 frames total)
├── ortus3/
│   ├── frame-1.webp
│   └── ... (50 frames total)
└── ortus4/
    ├── frame-1.webp
    └── ... (50 frames total)
```

## Manual Frame Creation

If you prefer to create frames manually:
1. Extract frames from videos using any video editor
2. Save as WebP format with quality 80
3. Name files as `frame-1.webp`, `frame-2.webp`, etc.
4. Ensure frames are 1920x1080 resolution

## Fallback

The scroll sequence will fall back to the original videos if frames are not found.
