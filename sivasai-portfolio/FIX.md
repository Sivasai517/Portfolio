# ⚠️ QUICK FIX - Missing Dev Dependencies

## The Problem
The `npm install` command only installed basic dependencies, not the dev dependencies needed to run the dev server.

## ✅ SOLUTION (Run this command):

```bash
npm install --include=dev
```

OR simply:

```bash
npm install vite @vitejs/plugin-react tailwindcss autoprefixer postcss
```

Then run:

```bash
npm run dev
```

## 🎯 Alternative: Complete Fresh Install

If the above doesn't work, try:

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# OR on Windows PowerShell:
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Fresh install
npm install

# Run dev server
npm run dev
```

## ✨ Expected Result

After running `npm install --include=dev`, you should see:

```
added 300+ packages
```

Then `npm run dev` should show:

```
VITE v4.4.5  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open http://localhost:5173 and your portfolio should be running! 🎉

---

## 🆘 Still Not Working?

Try this complete reinstall:

```bash
npm cache clean --force
npm install --legacy-peer-deps
npm run dev
```
