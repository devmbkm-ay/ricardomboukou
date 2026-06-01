#!/usr/bin/env node

/**
 * Favicon Generator Script
 * Generates various favicon formats from favicon.svg using sharp
 * 
 * Usage: node scripts/generate-favicons.js
 * 
 * Required: npm install sharp
 */

const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  try {
    const sharp = require('sharp');
    
    const svgPath = path.join(__dirname, '../public/favicon.svg');
    const outputDir = path.join(__dirname, '../public');

    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
      console.error('❌ favicon.svg not found at', svgPath);
      process.exit(1);
    }

    console.log('📦 Generating favicons from favicon.svg...\n');

    // Define favicon configurations
    const favicons = [
      { size: 32, name: 'favicon-32x32.png' },
      { size: 16, name: 'favicon-16x16.png' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 192, name: 'favicon-192x192.png' },
      { size: 512, name: 'favicon-512x512.png' },
    ];

    // Generate each favicon
    for (const favicon of favicons) {
      try {
        await sharp(svgPath)
          .resize(favicon.size, favicon.size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 },
          })
          .png()
          .toFile(path.join(outputDir, favicon.name));

        console.log(`✅ Generated ${favicon.name} (${favicon.size}x${favicon.size})`);
      } catch (err) {
        console.error(`❌ Failed to generate ${favicon.name}:`, err.message);
      }
    }

    console.log('\n✨ Favicon generation complete!');
    console.log('\nGenerated files:');
    favicons.forEach(f => console.log(`  - ${f.name}`));

  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error('❌ sharp module not found');
      console.error('\nTo install it, run:');
      console.error('  npm install --save-dev sharp');
      process.exit(1);
    } else {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  }
}

generateFavicons().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
