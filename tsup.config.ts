import { defineConfig } from 'tsup';

export default defineConfig({
  banner: { js: '#!/usr/bin/env node' },
  clean: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: true,
  outDir: 'dist',
  platform: 'node',
  target: 'node20',
});
