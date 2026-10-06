# coara.es

Website of the Spanish National Chapter of CoARA. Astro static site, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

```
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # output in dist/
```

Sections are listed once, in `src/data/sections.ts`; each has a page in `src/pages/`.
