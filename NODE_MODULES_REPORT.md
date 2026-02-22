# node_modules Report

## Why node_modules was not committed

`node_modules/` is generated locally by `npm install` and should remain untracked because it is:

- Large (`155M` in this project)
- Platform-dependent (Linux/macOS/Windows differences)
- Reproducible from `package.json` + `package-lock.json`

The correct files to commit are:

- `package.json` (declared dependencies)
- `package-lock.json` (exact resolved versions)

## Important installed packages (top-level)

### Runtime (app/backend)

- `react@18.2.0` – SPA UI rendering
- `react-dom@18.2.0` – React DOM mounting
- `express@5.2.1` – backend API (`/api/songs`, `/api/health`)
- `cors@2.8.6` – CORS middleware for API access
- `framer-motion@12.34.3` – carousel and track transition animation
- `web-vitals@3.1.0` – frontend performance metrics helper

### Build/dev tooling

- `vite@6.3.6` – frontend dev server + production build
- `@vitejs/plugin-react@4.7.0` – React support in Vite
- `tailwindcss@4.2.0` + `@tailwindcss/vite@4.2.0` – styling pipeline
- `autoprefixer@10.4.24` – CSS compatibility processing
- `concurrently@9.2.1` – runs frontend/backend in one command

### Test tooling

- `vitest@3.0.7` – test runner
- `jsdom@26.1.0` – browser-like DOM for tests
- `@testing-library/react@13.4.0`
- `@testing-library/jest-dom@5.16.5`
- `@testing-library/user-event@14.4.3`

## Useful generated executables in node_modules/.bin

- `vite`, `vitest`, `vite-node`
- `concurrently`, `conc`
- `autoprefixer`, `terser`, `rollup`, `esbuild`

## Dependency footprint snapshot

- Total dependencies resolved: `418`
  - Prod: `189`
  - Dev: `227`
  - Optional: `77`
- Security (runtime audit): `1 moderate` vulnerability (`lodash`, transitive)

## Reproduce locally

```bash
npm install
npm run dev
npm test -- --run
npm run build
```
