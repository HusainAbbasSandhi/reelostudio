# Reelo Studio

Site generator tool for creating deployable restaurant/café client websites.

## Deploying via Vercel (no local setup needed)

1. Upload all these files to your GitHub repo (`HusainAbbasSandhi/reelostudio`) using GitHub's web "Add file → Upload files" feature. Drag the whole folder contents in (keep the `src/` folder structure intact) and commit.
2. In Vercel, go to your existing project → **Settings → Git**, and connect it to this repo.
3. Vercel will auto-detect this as a Vite project (Framework Preset: Vite). Default build settings work:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Redeploy — it will pick up every future push to this repo automatically.

## Local development (optional)

```bash
npm install
npm run dev
```
