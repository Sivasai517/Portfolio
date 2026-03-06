# 🚀 Quick Start Guide

Get your portfolio running in 3 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser

## Step 3: Customize Your Content

Edit `src/Portfolio.jsx` and update:

1. **Line 145**: Your name
2. **Line 149**: Your title/tagline  
3. **Lines 87-89**: Your skills
4. **Lines 91-120**: Your experience
5. **Lines 122-144**: Your projects
6. **Lines 181-183**: Your certifications
7. **Lines 266-287**: Your contact info

## Step 4: Build for Production

```bash
npm run build
```

## Step 5: Deploy (Choose One)

### Vercel (Easiest - Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repo
4. Click "Deploy"
5. Done! ✨

### GitHub Pages
```bash
# Update vite.config.js base to '/your-repo-name/'
npm run deploy
```

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

## 🎨 Customization Tips

### Change Colors
- Search for `purple-` and replace with your color
- Search for `blue-` and replace with your accent color

### Add Your Resume
1. Add `resume.pdf` to the `public` folder
2. Update download button href to `/resume.pdf`

### Update Social Links
- Update LinkedIn and GitHub URLs in the component

## 🆘 Need Help?

**Common Issues:**

1. **Port in use**: Change port with `npm run dev -- --port 3000`
2. **Build fails**: Delete `node_modules` and run `npm install` again
3. **GitHub Pages blank**: Check `base` in `vite.config.js`

## 📧 Questions?

Contact: sivasaipalla1@gmail.com

---

**That's it! Your modern portfolio is ready to impress recruiters! 🎉**
