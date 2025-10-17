import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple HTML canvas-based frame generator
function createTestFrame(frameNumber, videoName) {
  // This creates a simple colored rectangle as a test frame
  const canvas = `
    <canvas width="1920" height="1080" style="background: linear-gradient(45deg, 
      hsl(${200 + frameNumber * 2}, 70%, ${50 + frameNumber * 0.5}%), 
      hsl(${300 + frameNumber * 3}, 60%, ${40 + frameNumber * 0.3}%)
    );"></canvas>
  `;
  
  return canvas;
}

// Create test frames for each video
const videos = ['ortus1', 'ortus3', 'ortus4'];

async function createTestFrames() {
  console.log('🎨 Creating test frames...');
  
  for (const videoName of videos) {
    const outputDir = path.join(__dirname, '..', 'public', 'sequences', videoName);
    
    // Create output directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create 10 test frames for each video
    for (let i = 1; i <= 10; i++) {
      const frameContent = createTestFrame(i, videoName);
      const framePath = path.join(outputDir, `frame-${i}.webp`);
      
      // For now, create a simple text file as placeholder
      // In a real implementation, you'd use canvas.toBlob() or similar
      const placeholderContent = `# Test Frame ${i} for ${videoName}\n# This is a placeholder - replace with actual WebP frame`;
      
      fs.writeFileSync(framePath.replace('.webp', '.txt'), placeholderContent);
    }
    
    console.log(`✅ Created 10 test frames for ${videoName}`);
  }
  
  console.log('🎉 Test frames created!');
  console.log('📝 Note: These are placeholder files. For real frames, install ffmpeg and run extract-frames.js');
}

createTestFrames().catch(console.error);
