# 🚀 Quick Start Guide - QuestLog Production Deployment

## Prerequisites
- Vercel account ([signup free](https://vercel.com/signup))
- Supabase project with credentials ready
- Git repository (GitHub, GitLab, or Bitbucket)

## 5-Minute Deployment

### Step 1: Prepare Your Repository (1 min)

```bash
# Navigate to project
cd "C++ 2nd project"

# Install dependencies
npm install

# Commit all new files
git add .
git commit -m "feat: add production infrastructure"
git push origin main
```

### Step 2: Deploy to Vercel (2 min)

1. Visit [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Output Directory:** `frontend`
   - Leave build command empty (static site)

4. Add Environment Variables:
   ```
   SUPABASE_URL = your_supabase_project_url
   SUPABASE_ANON_KEY = your_supabase_anon_key
   ```

5. Click **Deploy**

### Step 3: Configure Supabase (1 min)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **URL Configuration**
4. Add your Vercel URL:
   - Site URL: `https://your-project.vercel.app`
   - Redirect URLs: Add the same URL

### Step 4: Test Your Deployment (1 min)

Visit `https://your-project.vercel.app` and test:
- ✅ Authentication (signup/login)
- ✅ Create a quest
- ✅ Complete a quest (gain XP)
- ✅ Challenge a boss
- ✅ Open shop

---

## That's It! 🎉

Your QuestLog is now live at: `https://your-project.vercel.app`

### What's Included:
- ✅ Production-grade deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ PWA capabilities (installable)
- ✅ Offline mode
- ✅ Security headers
- ✅ Automatic deployments on git push

---

## Next Steps (Optional)

### Add Custom Domain
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL (automatic, ~few minutes)

### Enable Analytics
1. Go to Vercel Dashboard → Analytics
2. Toggle "Enable Analytics"
3. View real-time visitor data

### Install as App (Mobile)
1. Visit your site on mobile
2. Tap browser menu → "Add to Home Screen"
3. App icon appears on home screen
4. Works offline!

---

## Troubleshooting

**Issue:** "Configuration not loaded"
- **Fix:** Ensure environment variables are set in Vercel dashboard

**Issue:** Authentication fails  
- **Fix:** Verify Vercel URL is in Supabase allowed URLs

**Issue:** Assets not loading
- **Fix:** Check browser console, verify file paths in vercel.json

---

## Support & Resources

- 📖 [Full Deployment Guide](DEPLOYMENT.md)
- 🔒 [Security Policy](SECURITY.md)
- 🤝 [Contributing Guide](CONTRIBUTING.md)
- 📝 [Changelog](CHANGELOG.md)

---

**Made with ❤️ for productivity gamification**

Deploy time: ~5 minutes | Cost: $0 (free tier)
