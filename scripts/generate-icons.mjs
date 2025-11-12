import sharp from 'sharp';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');

// Source logo (transparent PNG)
const logoPath = join(projectRoot, 'src/assets/lima-logo.png');

// Icon configurations
const icons = [
  { name: 'favicon-16x16.png', size: 16, padding: 2 },
  { name: 'favicon-32x32.png', size: 32, padding: 4 },
  { name: 'apple-touch-icon.png', size: 180, padding: 20 },
  { name: 'icon-192x192.png', size: 192, padding: 20 },
  { name: 'icon-512x512.png', size: 512, padding: 50 },
];

// Ensure public directory exists
mkdirSync(publicDir, { recursive: true });

// Generate icons
async function generateIcons() {
  try {
    console.log('🎨 Starting favicon and PWA icon generation...\n');

    if (!existsSync(logoPath)) {
      throw new Error(`Logo not found at: ${logoPath}`);
    }

    // Get logo metadata
    const logoMetadata = await sharp(logoPath).metadata();
    console.log(`📸 Source logo: ${logoMetadata.width}x${logoMetadata.height} px\n`);

    // Generate standard icons (transparent background)
    for (const icon of icons) {
      const logoSize = icon.size - (icon.padding * 2);
      const outputPath = join(publicDir, icon.name);

      await sharp(logoPath)
        .resize(logoSize, logoSize, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .extend({
          top: icon.padding,
          bottom: icon.padding,
          left: icon.padding,
          right: icon.padding,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ quality: 100, compressionLevel: 9 })
        .toFile(outputPath);

      console.log(`✅ Generated: ${icon.name} (${icon.size}x${icon.size} px)`);
    }

    // Generate maskable icon with orange background
    const maskableSize = 512;
    const maskablePadding = Math.floor(maskableSize * 0.4 / 2); // 40% safe zone = 20% padding each side
    const maskableLogoSize = maskableSize - (maskablePadding * 2);
    const maskablePath = join(publicDir, 'maskable-icon-512.png');

    await sharp(logoPath)
      .resize(maskableLogoSize, maskableLogoSize, {
        fit: 'contain',
        background: { r: 242, g: 84, b: 48, alpha: 1 } // #F25430
      })
      .extend({
        top: maskablePadding,
        bottom: maskablePadding,
        left: maskablePadding,
        right: maskablePadding,
        background: { r: 242, g: 84, b: 48, alpha: 1 } // #F25430
      })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(maskablePath);

    console.log(`✅ Generated: maskable-icon-512.png (512x512 px with orange background)\n`);

    console.log('🎉 All icons generated successfully!');
    console.log(`📁 Icons saved to: ${publicDir}\n`);

  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
