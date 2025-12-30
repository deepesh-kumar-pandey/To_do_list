# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.2.x   | :white_check_mark: |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :x:                |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of QuestLog seriously. If you've discovered a security vulnerability, please help us protect our users by following these guidelines:

### How to Report

1. **DO NOT** disclose the vulnerability publicly until it has been addressed
2. Email details to: [your-email@example.com] (replace with your actual contact)
3. Include the following information:
   - Type of vulnerability
   - Full paths of source file(s) related to the issue  
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the issue and how an attacker might exploit it

### What to Expect

- **Initial Response**: Within 48 hours of your report
- **Status Updates**: Every 7 days until the vulnerability is resolved
- **Disclosure Timeline**: We aim to patch critical vulnerabilities within 30 days
- **Credit**: We'll publicly acknowledge your responsible disclosure (unless you prefer to remain anonymous)

## Security Best Practices for Deployment

### 1. Environment Variables

**NEVER** commit sensitive credentials to version control:

```bash
# ❌ Bad - Hardcoded credentials
const supabaseUrl = 'https://yourproject.supabase.co';

# ✅ Good - Environment variables
const supabaseUrl = process.env.SUPABASE_URL;
```

**For Vercel Deployment:**
1. Go to Project Settings → Environment Variables
2. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY`
3. Ensure they're set for Production, Preview, and Development

### 2. Supabase Row Level Security (RLS)

Always enable RLS on all tables:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE boss_progress ENABLE ROW LEVEL SECURITY;

-- Example policy: Users can only access their own data
CREATE POLICY "Users can only access their own profile"
  ON profiles FOR ALL
  USING (auth.uid() = id);
```

See `frontend/security_policies.sql` for complete RLS setup.

### 3. Content Security Policy (CSP)

Our CSP headers prevent XSS attacks:

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
           connect-src 'self' https://yourproject.supabase.co;
           script-src 'self' https://cdn.jsdelivr.net;">
```

**Important**: Update CSP if you:
- Add new external services
- Deploy to a custom domain
- Integrate third-party scripts

### 4. HTTPS Only

- ✅ Vercel provides automatic HTTPS
- ✅ All HTTP requests are redirected to HTTPS
- ✅ HSTS headers are set automatically

### 5. Input Validation & Sanitization

All user inputs are sanitized:

```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

Never use `innerHTML` with unescaped user content.

### 6. Authentication Best Practices

- ✅ Passwords are hashed by Supabase (bcrypt)
- ✅ Session tokens are HTTP-only cookies
- ✅ Failed login attempts should be rate-limited (implement server-side)
- ⚠️ Consider enabling email verification in Supabase Auth settings
- ⚠️ Implement password strength requirements

### 7. API Security

**Supabase Anon Key:**
- The anon key is safe to expose in client-side code
- It's READ-ONLY and limited by RLS policies
- Never expose the `service_role` key in client code

**Database Access:**
- All database access is controlled by RLS policies
- Users can only modify their own data
- Sensitive operations should happen on the backend

## Known Security Considerations

### 1. Client-Side Storage
- User preferences are stored in `localStorage`
- `localStorage` is vulnerable to XSS if properly sanitized inputs fail
- No sensitive data (passwords, tokens) should ever be stored in `localStorage`

### 2. Supabase Credentials
- Current setup has credentials in `config.js` for simplicity
- **Production recommendation**: Use environment variables + build-time injection
- See DEPLOYMENT.md for Vercel environment variable setup

### 3. CORS
- Supabase handles CORS automatically
- Restrict allowed URLs in Supabase dashboard to your production domain

### 4. Rate Limiting
- Supabase provides basic rate limiting
- For production, consider implementing additional rate limiting for:
  - Login attempts
  - Quest creation
  - Boss battle attempts

## Security Audit History

| Date | Version | Auditor | Findings | Status |
|------|---------|---------|----------|--------|
| 2025-12-30 | 1.2.0 | Internal | CSP, RLS, Input escaping | ✅ Implemented |

## Dependencies

We regularly update dependencies to patch known vulnerabilities:

```bash
# Check for vulnerabilities (when using NPM)
npm audit

# Fix automatically where possible
npm audit fix
```

## Additional Resources

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Guide](https://content-security-policy.com/)

---

**Last Updated**: 2025-12-30  
**QuestLog Version**: 1.2.0

Thank you for helping keep QuestLog secure! 🔒
