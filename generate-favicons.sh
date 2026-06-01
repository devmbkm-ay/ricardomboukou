#!/bin/bash

# Script to generate favicons from SVG using ImageMagick
# Make sure you have ImageMagick installed: brew install imagemagick (macOS) or apt-get install imagemagick (Linux)

echo "Generating favicons from favicon.svg..."

# Create PNG favicons from SVG
convert -density 384 -background none public/favicon.svg -resize 32x32 public/favicon-32x32.png
convert -density 192 -background none public/favicon.svg -resize 16x16 public/favicon-16x16.png
convert -density 180 -background none public/favicon.svg -resize 180x180 public/apple-touch-icon.png
convert -density 192 -background none public/favicon.svg -resize 192x192 public/favicon-192x192.png
convert -density 512 -background none public/favicon.svg -resize 512x512 public/favicon-512x512.png

echo "Favicon generation complete!"
echo "Generated files:"
echo "  - favicon-32x32.png"
echo "  - favicon-16x16.png"
echo "  - apple-touch-icon.png"
echo "  - favicon-192x192.png"
echo "  - favicon-512x512.png"
