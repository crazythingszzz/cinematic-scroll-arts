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

const videos = [
  { name: 'ortus1', file: 'ortus1.mp4', frames: 50 },
  { name: 'ortus3', file: 'ortus3.mp4', frames: 50 },
  { name: 'ortus4', file: 'ortus4.mp4', frames: 50 }
];

async function extractFrames(videoName, videoFile, frameCount) {
  const outputDir = path.join(sequencesDir, videoName);
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const videoPath = path.join(__dirname, '..', 'public', 'videos', videoFile);
  
  console.log(`Extracting ${frameCount} frames from ${videoFile}...`);

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
      .on('end', () => {
        console.log(`✅ Frames extracted for ${videoName}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Error extracting frames for ${videoName}:`, err);
        reject(err);
      })
      .run();
  });
}

async function extractAllFrames() {
  console.log('🎬 Starting frame extraction...');
  
  try {
    for (const video of videos) {
      await extractFrames(video.name, video.file, video.frames);
    }
    
    console.log('🎉 All frames extracted successfully!');
    console.log('📁 Frames saved to:', sequencesDir);
  } catch (error) {
    console.error('💥 Frame extraction failed:', error);
    process.exit(1);
  }
}

extractAllFrames();
