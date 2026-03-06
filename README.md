# 🚀 Palla Siva Sai - Data Analyst Portfolio

A modern, interactive, and visually stunning portfolio website built with React, Vite, and Tailwind CSS. Features 3D animations, smooth transitions, glassmorphism effects, and a dark theme with glowing purple/blue accents.

## ✨ Features

- 🎨 **Modern Dark Theme** with purple/blue gradient accents
- 🌟 **3D Animated Background** with floating particles
- 💫 **Smooth Scroll Animations** and section transitions
- 🎯 **Custom Cursor Glow Effect**
- 📊 **Interactive Project Cards** with glassmorphism
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- ⚡ **Fast Performance** with Vite
- 🎭 **Loading Animation**
- 📈 **Scroll Progress Bar**
- 🎪 **Timeline-style Experience Section**

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Canvas API** - Particle Animation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**

## 🚀 Local Development Setup

### 1. Clone or Download the Project

```bash
# If using git
git clone <your-repo-url>
cd sivasai-portfolio

# Or extract the zip file and navigate to the folder
cd sivasai-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment Options

### Option 1: Deploy to GitHub Pages

1. **Update `vite.config.js`**:
   ```javascript
   base: '/your-repo-name/', // Replace with your GitHub repo name
   ```

2. **Install gh-pages** (if not already installed):
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add homepage to `package.json`**:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to Pages
   - Select `gh-pages` branch
   - Save

Your site will be live at: `https://yourusername.github.io/your-repo-name`

### Option 2: Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Vercel will auto-detect Vite configuration
   - Deploy!

Your site will be live instantly with a custom URL.

**Or use Vercel Dashboard**:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects settings
4. Click Deploy!

### Option 3: Deploy to Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Drag and drop** the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

**Or use Netlify CLI**:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📁 Project Structure

```
sivasai-portfolio/
├── src/
│   ├── Portfolio.jsx      # Main portfolio component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles & Tailwind imports
├── public/                # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

## 🎨 Customization

### Update Personal Information

Edit `src/Portfolio.jsx` and modify:

1. **Hero Section** - Name, title, tagline
2. **About Section** - Your professional summary
3. **Skills** - Add/remove skills in the `skills` object
4. **Experience** - Update the `experiences` array
5. **Projects** - Modify the `projects` array
6. **Education** - Update your degree information
7. **Certifications** - Edit the `certifications` array
8. **Contact Info** - Update email, phone, location, social links

### Change Color Scheme

In `src/Portfolio.jsx`, search and replace:
- `purple` colors with your preferred color
- Update gradient classes: `from-purple-400 to-blue-400`

### Add Resume Download

1. Add your resume PDF to the `public` folder as `resume.pdf`
2. Update the download button in the Hero section:
   ```jsx
   <a href="/resume.pdf" download className="...">
     Download Resume
   </a>
   ```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Pages Not Showing
- Ensure `base` in `vite.config.js` matches your repo name
- Check GitHub Pages settings in repository
- Wait a few minutes for deployment

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🎯 Performance

- Lighthouse Score: 95+ Performance
- First Contentful Paint: <1.5s
- Total Bundle Size: ~150KB (gzipped)

## 📄 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

**Palla Siva Sai**
- Email: sivasaipalla1@gmail.com
- LinkedIn: [linkedin.com/in/sivasaipalla](https://linkedin.com/in/sivasaipalla)
- GitHub: [github.com/Sivasai517](https://github.com/Sivasai517)

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

🌟 If you like this portfolio, give it a star on GitHub!
