const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\9a854fd8-b3b8-4744-8a51-c8d36e16dbe4';
const outputDir = 'C:\\Users\\Admin\\Desktop\\Toy store\\assets';

async function processImages() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    // Remove the timestamp suffix from the file name e.g. home_hero_1783423195101.png -> home_hero.webp
    const baseName = file.replace(/_\d+\.png$/, '');
    const outputPath = path.join(outputDir, `${baseName}.webp`);
    
    // Skip if we already converted this image (basic check)
    if (fs.existsSync(outputPath)) {
        continue;
    }

    try {
      let quality = 80;
      console.log(`Processing ${file}...`);
      while(true) {
          await sharp(inputPath)
            .resize(800)
            .webp({ quality: quality })
            .toFile(outputPath);
          
          const stats = fs.statSync(outputPath);
          if(stats.size <= 70000 || quality <= 10) {
              console.log(`Saved ${baseName}.webp at ${stats.size} bytes with quality ${quality}`);
              break;
          }
          quality -= 10;
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processImages().then(() => console.log('Bulk conversion complete.'));
