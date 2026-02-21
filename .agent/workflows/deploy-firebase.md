---
description: How to deploy your portfolio to Firebase Hosting
---

To deploy this Next.js app to Firebase Hosting, you need to follow these steps. Next.js on Firebase works best with **Next.js SSR** support or **Static Export**.

### Pre-requisites
1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Login: `firebase login`

### Step-by-Step Deployment

1. **Initialize Firebase**
   Run this in your terminal:
   ```bash
   firebase init hosting
   ```
   - Select your project.
   - Use `out` as your public directory (if using static export) or leave defaults for Next.js.
   - Configure as a single-page app: **Yes**.
   - Set up automatic builds and deploys with GitHub: **Optional but recommended**.

2. **Configure Static Export (Recommended for Portfolios)**
   Update your `next.config.ts` (or `.js`) to include `output: 'export'`:
   ```ts
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true }
   };
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Required Information
- **Project ID**: Found in Firebase Console Settings.
- **Service Account (for CI/CD)**: If you want to automate deployment via GitHub Actions.

*Note: Since this is a Next.js 16 app, Firebase Hosting should automatically detect it and set up the necessary experimental features if you don't use 'export' mode.*
