import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create sequences directory
const sequencesDir = path.join(__dirname, '..', 'public', 'sequences');
if (!fs.existsSync(sequencesDir)) {
  fs.mkdirSync(sequencesDir, { recursive: true });
}

async function extractHeroFrames() {
  const videoName = 'hero';
  const videoFile = 'hero.mp4';
  const outputDir = path.join(sequencesDir, videoName);
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const videoPath = path.join(__dirname, '..', 'public', 'videos', videoFile);
  
  console.log(`🎬 Extracting frames from ${videoFile}...`);

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions([
        '-vf', 'fps=30', // Extract at 30fps
        '-f', 'image2', // Force individual image files
        '-vcodec', 'libwebp', // Use WebP codec
        '-lossless', '0', // Use lossy compression for smaller files
        '-compression_level', '6',
        '-q:v', '80' // Quality setting for WebP
      ])
      .output(path.join(outputDir, 'frame-%d.webp'))
      .on('start', (commandLine) => {
        console.log('FFmpeg command:', commandLine);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          console.log(`Processing: ${Math.round(progress.percent)}% done`);
        }
      })
      .on('end', () => {
        console.log(`✅ Frames extracted for ${videoName}`);
        console.log(`📁 Frames saved to: ${outputDir}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Error extracting frames for ${videoName}:`, err);
        reject(err);
      })
      .run();
  });
}

async function main() {
  console.log('🎬 Starting hero frame extraction...');
  
  try {
    await extractHeroFrames();
    console.log('🎉 Hero frames extracted successfully!');
  } catch (error) {
    console.error('💥 Hero frame extraction failed:', error);
    process.exit(1);
  }
}

main();
