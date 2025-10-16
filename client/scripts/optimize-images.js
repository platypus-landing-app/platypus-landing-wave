const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public';
const files = [
  'hero-image.png',
  'Ellipse 25.png',
  'logo.png',
  'aboutus-bg.png',
  'testimonial1.jpg',
  'testimonial2.jpg',
  'Certified Guardians.jpeg',
  'footer.png',
  'Live GPS Tracking.png',
  'Flexible Scheduling.png',
  'Safety & Hygiene.png',
  'Care Like Family.png',
  'Back-Up Walkers.png',
];

async function optimizeImages() {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${file} - not found`);
      continue;
    }

    const ext = path.extname(file);
    const name = path.basename(file, ext);
    const outputPath = path.join(inputDir, `${name}.webp`);

    try {
      await sharp(inputPath)
        .resize(1920, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`✓ Optimized: ${file} -> ${name}.webp`);
    } catch (error) {
      console.error(`✗ Error optimizing ${file}:`, error.message);
    }
  }
}

optimizeImages();