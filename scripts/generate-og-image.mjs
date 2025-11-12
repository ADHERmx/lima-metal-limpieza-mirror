import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function generateOGImage() {
  try {
    console.log('🎨 Generating Open Graph social sharing image...\n');

    const logoPath = join(projectRoot, 'src/assets/lima-logo-white.png');
    const outputPath = join(projectRoot, 'public/og-image.jpg');

    if (!existsSync(logoPath)) {
      throw new Error(`White logo not found at: ${logoPath}`);
    }

    // OG image dimensions: 1200x630 (Facebook/LinkedIn standard)
    const width = 1200;
    const height = 630;

    // Create gradient background with industrial orange
    // Using a dark to orange gradient
    const gradientSvg = `
      <svg width="${width}" height="${height}">
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" style="stop-color:#F25430;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
          </radialGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)" />
      </svg>
    `;

    // Create the background
    const background = Buffer.from(gradientSvg);

    // Resize logo to fit nicely (max 500px wide)
    const logo = await sharp(logoPath)
      .resize(500, 200, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    // Get logo dimensions after resize
    const logoMetadata = await sharp(logo).metadata();

    // Calculate position to center the logo
    const logoX = Math.floor((width - logoMetadata.width) / 2);
    const logoY = Math.floor((height - logoMetadata.height) / 2) - 40; // Slightly above center

    // Create text overlay SVG for tagline
    const textSvg = `
      <svg width="${width}" height="${height}">
        <text
          x="${width / 2}"
          y="${height - 100}"
          font-family="Arial, sans-serif"
          font-size="32"
          font-weight="600"
          fill="white"
          text-anchor="middle"
        >Limpieza de Metales</text>
        <text
          x="${width / 2}"
          y="${height - 50}"
          font-family="Arial, sans-serif"
          font-size="24"
          font-weight="400"
          fill="rgba(255,255,255,0.9)"
          text-anchor="middle"
        >Industria Metal Mecánica desde 1981</text>
      </svg>
    `;

    const textOverlay = Buffer.from(textSvg);

    // Composite everything together
    await sharp(background)
      .composite([
        {
          input: logo,
          top: logoY,
          left: logoX,
        },
        {
          input: textOverlay,
          top: 0,
          left: 0,
        }
      ])
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(outputPath);

    const stats = await sharp(outputPath).metadata();
    const fileSize = Math.round(stats.size / 1024);

    console.log(`✅ Generated: og-image.jpg`);
    console.log(`   Dimensions: ${stats.width}x${stats.height} px`);
    console.log(`   File size: ${fileSize} KB`);
    console.log(`   Format: JPEG\n`);

    console.log('🎉 Open Graph image generated successfully!');
    console.log(`📁 Saved to: ${outputPath}\n`);

    console.log('📝 Next steps:');
    console.log('   1. Update src/constants/seo.ts to reference /og-image.jpg');
    console.log('   2. Test with Facebook Debugger: https://developers.facebook.com/tools/debug/');
    console.log('   3. Test with Twitter Card Validator: https://cards-dev.twitter.com/validator\n');

  } catch (error) {
    console.error('❌ Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage();
