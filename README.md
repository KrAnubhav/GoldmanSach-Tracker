# Goldman Sachs Interview Prep Tracker

A comprehensive interview preparation tracker for Goldman Sachs technical interviews, featuring LeetCode problem tracking, interview experiences, and AI-powered study assistance.

## 🚀 Deployment to Netlify

### Prerequisites
- A [Netlify account](https://app.netlify.com/signup) (free)
- Git installed on your machine
- Node.js 18+ installed

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project locally (optional - to test)**
   ```bash
   npm run build
   ```

4. **Login to Netlify**
   ```bash
   netlify login
   ```

5. **Deploy to Netlify**
   ```bash
   netlify deploy --prod
   ```
   - When prompted for the publish directory, enter: `dist`
   - Follow the prompts to create a new site or link to an existing one

### Option 2: Deploy via Netlify Dashboard

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and select your repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

### Option 3: Drag and Drop Deploy

1. **Build the project**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the `dist` folder
   - Your site will be live in seconds!

## 🔧 Environment Variables (Optional)

If you're using Firebase or Gemini API, add these environment variables in Netlify:

1. Go to Site settings → Environment variables
2. Add the following variables:
   - `FIREBASE_CONFIG` - Your Firebase configuration JSON
   - `APP_ID` - Your application ID
   - `INITIAL_AUTH_TOKEN` - Firebase auth token (if needed)

## 📦 Project Structure

```
GoldmanSach-Tracker/
├── src/
│   ├── App.jsx          # Main React component (your original code)
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── netlify.toml         # Netlify configuration
└── README.md           # This file
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Features

- ✅ Problem tracking with Firebase sync
- 📊 Progress statistics and analytics
- 🎯 Filter by difficulty, topic, and status
- 🔍 Search functionality
- 🤖 AI-powered hints and study plans (Gemini API)
- 📚 Real interview experiences
- 📱 Responsive design
- 💾 CSV import/export

## 🔒 Important Notes

- Your original `index.html` has been backed up as `index-original.html`
- All your content remains unchanged in `src/App.jsx`
- The project now uses Vite for building and bundling
- Netlify will automatically rebuild when you push changes to GitHub

## 🐛 Troubleshooting

### Build fails on Netlify
- Ensure Node.js version is 18+ in Netlify settings
- Check that all dependencies are in `package.json`
- Review build logs for specific errors

### Firebase not working
- Add Firebase config to environment variables
- Ensure Firebase is initialized in your project

### Styles not loading
- Clear browser cache
- Check that `index.css` is imported in `main.jsx`

## 📞 Support

For issues or questions, please check the Netlify documentation or create an issue in your repository.

---

**Happy Interview Prep! 🎯**