import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '../public');
const outputDir = join(publicDir, 'optimized');

// Images that need responsive variants (large display images)
const RESPONSIVE_IMAGES = [
  'hero-image.png',
  '3ind.png',
  'Live GPS Tracking.png',
  'aboutus contact.png',
  'aboutus contact mobile.png',
  'Safety & Hygiene.png',
  'Care Like Family.png',
  'Back-Up Walkers.png',
  'Flexible Scheduling.png',
  'Certified Guardians.jpeg',
  'testimonial1.jpg',
  'testimonial2.jpg',
  'why-dog-walking-service.png',
];

// Responsive sizes
const SIZES = {
  small: 400,
  medium: 800,
  large: 1200,
};

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function optimizeImage(inputPath, filename) {
  const ext = extname(filename).toLowerCase();
  const name = basename(filename, ext);
  const needsResponsive = RESPONSIVE_IMAGES.includes(filename);

  console.log(`\n📸 Processing: ${filename}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    console.log(`   Original: ${width}x${height}, ${(metadata.size / 1024).toFixed(1)}KB`);

    // For responsive images, create multiple sizes
    if (needsResponsive && width > 400) {
      for (const [sizeName, targetWidth] of Object.entries(SIZES)) {
        if (targetWidth < width) {
          const resized = image.clone().resize(targetWidth, null, {
            withoutEnlargement: true,
            fit: 'inside',
          });

          // WebP
          await resized
            .clone()
            .webp({ quality: 85 })
            .toFile(join(outputDir, `${name}-${sizeName}.webp`));

          // AVIF
          await resized
            .clone()
            .avif({ quality: 80 })
            .toFile(join(outputDir, `${name}-${sizeName}.avif`));

          console.log(`   ✓ Generated ${sizeName} (${targetWidth}px) - WebP & AVIF`);
        }
      }

      // Also create full-size WebP and AVIF
      await image
        .clone()
        .webp({ quality: 85 })
        .toFile(join(outputDir, `${name}.webp`));

      await image
        .clone()
        .avif({ quality: 80 })
        .toFile(join(outputDir, `${name}.avif`));

      console.log(`   ✓ Generated original size - WebP & AVIF`);
    } else {
      // For non-responsive images, just create WebP and AVIF at original size
      await image
        .clone()
        .webp({ quality: 85 })
        .toFile(join(outputDir, `${name}.webp`));

      await image
        .clone()
        .avif({ quality: 80 })
        .toFile(join(outputDir, `${name}.avif`));

      console.log(`   ✓ Generated WebP & AVIF`);
    }
  } catch (error) {
    console.error(`   ✗ Error processing ${filename}:`, error.message);
  }
}

async function processAllImages() {
  console.log('🚀 Starting image optimization...\n');

  await ensureDir(outputDir);

  const files = await readdir(publicDir);
  const imageFiles = files.filter((file) => {
    const ext = extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });

  console.log(`Found ${imageFiles.length} images to process\n`);

  for (const file of imageFiles) {
    const inputPath = join(publicDir, file);
    const stats = await stat(inputPath);

    if (stats.isFile()) {
      await optimizeImage(inputPath, file);
    }
  }

  console.log('\n✅ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${outputDir}`);
}

processAllImages().catch(console.error);
