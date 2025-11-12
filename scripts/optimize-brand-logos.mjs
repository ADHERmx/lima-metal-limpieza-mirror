import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const assetsDir = join(projectRoot, 'src/assets');

async function optimizeBrandLogos() {
  console.log('🎨 Optimizing brand logos to WebP...\n');

  const logos = [
    { name: 'carrier-logo.png', description: 'CARRIER brand logo' },
    { name: 'goff-logo.png', description: 'GOFF brand logo' },
  ];

  for (const logo of logos) {
    const inputPath = join(assetsDir, logo.name);
    const outputPath = inputPath.replace('.png', '.webp');

    if (!existsSync(inputPath)) {
      console.log(`⚠️  ${logo.name} not found, skipping...`);
      continue;
    }

    try {
      // Get original size
      const originalStats = await stat(inputPath);
      const originalSize = originalStats.size;

      // Convert to WebP
      await sharp(inputPath)
        .webp({ quality: 85, lossless: false })
        .toFile(outputPath);

      // Get WebP size
      const webpStats = await stat(outputPath);
      const webpSize = webpStats.size;
      const savings = Math.round(((originalSize - webpSize) / originalSize) * 100);

      console.log(`✅ ${logo.description}`);
      console.log(`   Original: ${Math.round(originalSize / 1024)} KB`);
      console.log(`   WebP: ${Math.round(webpSize / 1024)} KB`);
      console.log(`   Savings: ${savings}%\n`);

    } catch (error) {
      console.error(`❌ Error optimizing ${logo.name}:`, error.message);
    }
  }

  console.log('🎉 Brand logo optimization complete!\n');
  console.log('📝 Next step: Update Services.tsx to use WebP versions with picture elements');
}

optimizeBrandLogos().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
