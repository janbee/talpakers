import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
// @ts-ignore
import { compilerOptions } from './tsconfig.paths.json';
import * as path from 'path';


const aliases = Object.keys(compilerOptions.paths).map(item => item.replace('/*', ''));


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    port: 3001,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
  },
  resolve: {
    alias: aliases.map(alias => (
      {
        find: alias,
        replacement: path.resolve(__dirname, `src/${alias.replace('@', '')}`),
      }
    )),
  },
  optimizeDeps: { esbuildOptions: { target: 'esnext' } }, // <-- Set this to resolve issue.
});
