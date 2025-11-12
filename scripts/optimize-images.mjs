import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const assetsDir = join(projectRoot, 'src/assets');

// Optimization settings
const QUALITY = {
  webp: 85,
  jpeg: 90,
  png: 90,
};

const MAX_SIZES = {
  hero: { width: 1920, height: 1080 },
  gallery: { width: 800, height: 600 },
  logo: { width: 500, height: 500 },
};

async function optimizeImage(inputPath, outputBasePath, config) {
  const ext = extname(inputPath).toLowerCase();
  const baseName = basename(inputPath, ext);

  try {
    // Get original metadata
    const metadata = await sharp(inputPath).metadata();
    const originalSize = metadata.size;

    // Optimize and create WebP version
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: QUALITY.webp })
      .toFile(`${outputBasePath}.webp`);

    // Optimize original format
    let optimizedImage = sharp(inputPath).resize(config.width, config.height, {
      fit: 'inside',
      withoutEnlargement: true,
    });

    if (ext === '.jpg' || ext === '.jpeg') {
      optimizedImage = optimizedImage.jpeg({ quality: QUALITY.jpeg, mozjpeg: true });
    } else if (ext === '.png') {
      optimizedImage = optimizedImage.png({ quality: QUALITY.png, compressionLevel: 9 });
    }

    await optimizedImage.toFile(`${outputBasePath}-optimized${ext}`);

    // Get optimized sizes
    const webpStats = await stat(`${outputBasePath}.webp`);
    const optimizedStats = await stat(`${outputBasePath}-optimized${ext}`);

    return {
      original: inputPath,
      originalSize,
      webpSize: webpStats.size,
      optimizedSize: optimizedStats.size,
      savings: Math.round(((originalSize - webpStats.size) / originalSize) * 100),
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🎨 Starting image optimization...\n');

  const results = {
    hero: [],
    gallery: [],
    logos: [],
  };

  // Optimize hero image
  const heroPath = join(assetsDir, 'hero-goff.jpg');
  if (existsSync(heroPath)) {
    console.log('📸 Optimizing hero image...');
    const result = await optimizeImage(
      heroPath,
      join(assetsDir, 'hero-goff'),
      MAX_SIZES.hero
    );
    if (result) {
      results.hero.push(result);
      console.log(`   ✅ hero-goff.jpg → WebP (${Math.round(result.webpSize / 1024)} KB, ${result.savings}% smaller)\n`);
    }
  }

  // Optimize gallery images
  const galleryDir = join(assetsDir, 'gallery');
  if (existsSync(galleryDir)) {
    console.log('🖼️  Optimizing gallery images...');
    const files = await readdir(galleryDir);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    for (const file of imageFiles) {
      const inputPath = join(galleryDir, file);
      const baseName = basename(file, extname(file));
      const outputBasePath = join(galleryDir, baseName);

      const result = await optimizeImage(inputPath, outputBasePath, MAX_SIZES.gallery);
      if (result) {
        results.gallery.push(result);
        console.log(`   ✅ ${file} → WebP (${Math.round(result.webpSize / 1024)} KB, ${result.savings}% smaller)`);
      }
    }
    console.log('');
  }

  // Optimize logos
  const logoFiles = ['lima-logo.png', 'lima-logo-white.png'];
  console.log('🏷️  Optimizing logos...');
  for (const file of logoFiles) {
    const inputPath = join(assetsDir, file);
    if (existsSync(inputPath)) {
      const baseName = basename(file, extname(file));
      const outputBasePath = join(assetsDir, baseName);

      const result = await optimizeImage(inputPath, outputBasePath, MAX_SIZES.logo);
      if (result) {
        results.logos.push(result);
        console.log(`   ✅ ${file} → WebP (${Math.round(result.webpSize / 1024)} KB, ${result.savings}% smaller)`);
      }
    }
  }
  console.log('');

  // Summary
  const totalOriginal = [
    ...results.hero,
    ...results.gallery,
    ...results.logos,
  ].reduce((sum, r) => sum + r.originalSize, 0);

  const totalWebP = [
    ...results.hero,
    ...results.gallery,
    ...results.logos,
  ].reduce((sum, r) => sum + r.webpSize, 0);

  const totalSavings = Math.round(((totalOriginal - totalWebP) / totalOriginal) * 100);

  console.log('📊 Optimization Summary:');
  console.log(`   Original total: ${Math.round(totalOriginal / 1024)} KB`);
  console.log(`   WebP total: ${Math.round(totalWebP / 1024)} KB`);
  console.log(`   Total savings: ${totalSavings}%\n`);

  console.log('🎉 All images optimized successfully!\n');
  console.log('📝 Next steps:');
  console.log('   1. Update Hero.tsx to use WebP images with picture elements');
  console.log('   2. Update Services.tsx to use WebP gallery images');
  console.log('   3. Add loading="lazy" to gallery images\n');
}

optimizeAllImages().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
