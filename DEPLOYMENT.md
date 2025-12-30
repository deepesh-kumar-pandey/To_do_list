# QuestLog Deployment Guide - Vercel

Complete guide for deploying QuestLog to Vercel with production-grade configuration.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI** (optional but recommended):
   ```bash
   npm install -g vercel
   ```
3. **Supabase Project**: Ensure you have your Supabase URL and anon key ready

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository (GitHub, GitLab, or Bitbucket)
3. Select your QuestLog repository

#### Step 2: Configure Project

**IMPORTANT:** Use these exact settings:

1. **Framework Preset**: Select "Other" (this is a static site)
2. **Root Directory**: Leave as `./` (root of repository)
3. **Build Command**: Leave EMPTY (no build needed, or use `echo "Static site"`)
4. **Output Directory**: `frontend`
5. **Install Command**: `npm install` (or leave as default)

#### Step 3: Add Environment Variables

Click "Environment Variables" and add:

| Name | Value | Environment |
|------|-------|-------------|
| `SUPABASE_URL` | Your Supabase project URL | All (Production, Preview, Development) |
| `SUPABASE_ANON_KEY` | Your Supabase anon key | All (Production, Preview, Development) |

**Example:**
```
SUPABASE_URL=https://jyhouxrirfkposonrltu.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **Note**: Get these values from Supabase Dashboard → Settings → API

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment to complete (usually 30-60 seconds)
3. Your app will be live at `https://your-project.vercel.app`

---

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Navigate to Project Directory

```bash
cd "C++ 2nd project"
```

#### Step 4: Deploy

For production deployment:

```bash
vercel --prod
```

For preview deployment:

```bash
vercel
```

**During first deployment, answer the prompts:**
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **questlog** (or your preference)
- In which directory is your code located? **.**
- Want to override settings? **Y**
  - Output Directory? **frontend**
  - Build Command? Leave empty or type **echo "Static site"**

#### Step 5: Set Environment Variables

```bash
# Add Supabase URL
vercel env add SUPABASE_URL production
# Paste your Supabase URL when prompted

# Add Supabase anon key
vercel env add SUPABASE_ANON_KEY production
# Paste your Supabase anon key when prompted

# Pull env vars for local development (optional)
vercel env pull
```

Then redeploy:

```bash
vercel --prod
```

---

## Post-Deployment Configuration

### 1. Update Supabase Configuration

Update your Supabase project's allowed URLs:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **URL Configuration**
4. Add your Vercel URL to **Site URL**: `https://your-project.vercel.app`
5. Add to **Redirect URLs**:
   - `https://your-project.vercel.app`
   - `https://your-project.vercel.app/auth.html`
   - `https://your-project.vercel.app/index.html`
   - If using custom domain, add those URLs too

### 2. Verify Deployment

Visit your Vercel URL and test:

✅ **Authentication**
- Sign up with a test account
- Log in
- Log out

✅ **Quest Management**
- Create a new quest
- Complete a quest
- Delete a quest
- Check XP gain

✅ **Boss Battles**
- Navigate to Boss Battles tab
- Challenge a boss
- Complete a battle

✅ **Shop**
- Open the shop
- Check coin balance
- Attempt to purchase an item

### 3. Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate to be issued (automatic, ~5 minutes)

---

## Troubleshooting Common Issues

### Issue 1: 404 NOT_FOUND Error

**Symptoms:** 
- Vercel shows 404 error
- Page not found on deployment URL

**Solution:**
1. Verify `vercel.json` exists in project root
2. Check that `outputDirectory` is set to `frontend` in vercel.json
3. Ensure all files are in the `frontend/` directory
4. Redeploy:
   ```bash
   vercel --prod --force
   ```

### Issue 2: "Configuration not loaded" Error

**Symptoms:**
- App loads but shows "Configuration not loaded"
- Console error about CONFIG not found

**Solution:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
3. Ensure they're enabled for Production environment
4. Redeploy after adding variables:
   ```bash
   vercel --prod
   ```

### Issue 3: Authentication Fails

**Symptoms:**
- Can't sign up or log in
- "Invalid credentials" errors
- CORS errors in console

**Solution:**
1. Verify Supabase environment variables are correct in Vercel
2. Check that your Vercel URL is added to Supabase allowed URLs:
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel URL to Site URL and Redirect URLs
3. Clear browser cache and try again
4. Check browser console for specific error messages

### Issue 4: Assets Not Loading

**Symptoms:**
- CSS not applied
- Images missing  
- JavaScript not executing

**Solution:**
1. Check browser console for 404 errors
2. Verify file paths in HTML:
   - Should be `/app.js` not `/frontend/app.js`
   - Should be `/styles.css` not `/frontend/styles.css`
3. Check `vercel.json` routing configuration
4. Ensure files are in `frontend/` directory

### Issue 5: Service Worker Errors

**Symptoms:**
- Console errors about service worker
- PWA features not working

**Solution:**
1. Verify `service-worker.js` is in `frontend/` directory
2. Make sure paths in service worker use absolute paths (`/app.js` not `./app.js`)
3. Check that your site is served over HTTPS (Vercel does this automatically)
4. Clear service worker cache:
   - Chrome DevTools → Application → Service Workers → Unregister
   - Refresh page

---

## Environment-Specific Configuration

### Managing Multiple Environments

Vercel automatically creates three environments:

1. **Production**: Main branch deployments (`your-project.vercel.app`)
2. **Preview**: Pull request deployments (`your-project-git-branch.vercel.app`)
3. **Development**: Local development with `vercel dev`

Each can have different environment variables.

### Setting Environment Variables per Environment

```bash
# Production only
vercel env add SUPABASE_URL production

# Preview only  
vercel env add SUPABASE_URL preview

# Development only
vercel env add SUPABASE_URL development

# All environments
vercel env add SUPABASE_URL
```

---

## Vercel-Specific Features

### 1. Automatic HTTPS

- All Vercel deployments get automatic HTTPS
- SSL certificates are managed automatically
- HTTP requests are automatically redirected to HTTPS

### 2. Global CDN

- Your app is served from Vercel's global edge network
- Automatic caching for static assets (configured in vercel.json)
- Optimal performance worldwide

### 3. Preview Deployments

- Every pull request gets a unique preview URL
- Test changes before merging to production
- Preview URLs: `https://questlog-git-branch-name-username.vercel.app`

### 4. Analytics (Optional)

Enable Vercel Analytics:

1. Go to project settings in Vercel Dashboard
2. Navigate to **Analytics** tab
3. Enable "Vercel Analytics"
4. View real-time metrics:
   - Page views
   - Unique visitors
   - Top pages
   - Core Web Vitals

---

## Performance Optimization

### 1. Caching Strategy

Already configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)\\.(?:js|css|png|jpg|jpeg|gif|svg)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

- **Static assets** (JS, CSS, images): Cached for 1 year
- **HTML files**: No cache (always fresh)

### 2. Enable Compression

Vercel automatically compresses responses with:
- Brotli (preferred, ~20% better than gzip)
- Gzip (fallback for older browsers)

### 3. Monitor Performance

Use Vercel's built-in performance monitoring:

1. Go to **Analytics** in your project
2. View Core Web Vitals:
   - **LCP** (Largest Contentful Paint) - Target: < 2.5s
   - **FID** (First Input Delay) - Target: < 100ms
   - **CLS** (Cumulative Layout Shift) - Target: < 0.1

---

## Security Checklist

Before going live, ensure:

- [ ] Environment variables are set in Vercel (not hardcoded in code)
- [ ] Supabase Row Level Security (RLS) is enabled on all tables
- [ ] CSP headers are properly configured in `vercel.json`
- [ ] Supabase allowed URLs are restricted to your Vercel domain
- [ ] All dependencies are up to date (`npm audit`)
- [ ] Production mode is enabled in `config.js` (set `environment: 'production'`)
- [ ] No console.log statements with sensitive data
- [ ] HTTPS is enforced (automatic with Vercel)

---

## Continuous Deployment

Vercel automatically deploys when you push to your connected repository:

1. **Push to main branch** → Deploys to production
2. **Create pull request** → Creates preview deployment  
3. **Merge PR** → Preview becomes production

### Deployment Workflow

```bash
# Make changes locally
git add .
git commit -m "feat: add new feature"

# Push to trigger deployment
git push origin main

# Vercel automatically deploys
# Check deployment status at vercel.com/dashboard
```

### Deployment Notifications

Get notified when deployments complete:

1. Go to Project Settings → Notifications
2. Enable:
   - Slack notifications
   - Email notifications
   - GitHub comments on PRs

---

## Advanced: Build Step (Optional)

If you want to use the minification build step:

1. Update `vercel.json`:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "frontend/dist"
   }
   ```

2. Ensure `package.json` exists with build script
3. Commit and push

**Note:** For now, this is optional. Vercel can serve the frontend directly.

---

## Monitoring and Logs

### View Deployment Logs

1. Go to Vercel Dashboard
2. Click on your project  
3. Select a deployment from the list
4. View:
   - Build logs (if you have a build command)
   - Runtime logs
   - Function logs (if using Vercel Functions)

### Real-time Logs via CLI

```bash
# Follow logs in real-time
vercel logs --follow

# Get logs for specific deployment
vercel logs [deployment-url]

# Get last 100 lines
vercel logs -n 100
```

---

## Cost Considerations

### Free Tier (Hobby)

**Includes:**
- Unlimited preview deployments
- 100 GB bandwidth per month
- 100 GB-hours of build time per month
- Automatic SSL certificates
- Global CDN
- Basic analytics
- Community support

**Perfect for:**
- Personal projects
- Portfolios
- Side projects
- Testing

### Pro Tier ($20/month per user)

**Adds:**
- 1 TB bandwidth
- Unlimited team members
- Advanced analytics
- Password protection for deployments
- Priority support
- Commercial usage rights

**For this project, the free tier is more than sufficient** for personal use and moderate traffic.

---

## Quick Reference Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View logs
vercel logs --follow

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>

# Open project in browser
vercel open

# Check environment variables
vercel env ls

# Pull environment variables locally
vercel env pull

# Redeploy (force rebuild)
vercel --prod --force
```

---

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

---

## Next Steps After Successful Deployment

1. ✅ Test all features in production
2. ✅ Set up custom domain (optional)
3. ✅ Enable Vercel Analytics  
4. ✅ Configure monitoring and alerts
5. ✅ Share your QuestLog with users!
6. ✅ Monitor performance with Lighthouse
7. ✅ Set up error tracking (Sentry, optional)

---

**Last Updated**: 2025-12-30  
**QuestLog Version**: 1.2.0  
**Deployment Time**: ~5 minutes
