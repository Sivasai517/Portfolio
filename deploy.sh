#!/bin/bash

echo "🚀 Building portfolio..."
npm run build

echo "✅ Build complete!"
echo ""
echo "Choose deployment option:"
echo "1. GitHub Pages"
echo "2. Vercel"
echo "3. Netlify"
echo ""
read -p "Enter option (1-3): " option

case $option in
  1)
    echo "📦 Deploying to GitHub Pages..."
    npm run deploy
    echo "✅ Deployed to GitHub Pages!"
    ;;
  2)
    echo "📦 Deploying to Vercel..."
    vercel --prod
    echo "✅ Deployed to Vercel!"
    ;;
  3)
    echo "📦 Deploying to Netlify..."
    netlify deploy --prod --dir=dist
    echo "✅ Deployed to Netlify!"
    ;;
  *)
    echo "❌ Invalid option"
    ;;
esac
