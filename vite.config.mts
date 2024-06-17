import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import { compilerOptions } from './tsconfig.paths.json';
import * as path from 'path';


const aliases = Object.keys(compilerOptions.paths).map(item => item.replace('/*', ''));


console.log('gaga-------------------------------------', process.env.environment);
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    BUILD_DATE: JSON.stringify(new Date().valueOf()),
  },
  plugins: [react(), mkcert()],
  base: '/talpakers/',
  server: {
    port: 3001,
    open: true,
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
    exclude: [
      ...configDefaults.exclude,
      'generate-react-templates',
    ],
  },
  resolve: {
    alias: aliases.map(alias => (
      {
        find: alias,
        replacement: path.resolve(__dirname, `src/${alias.replace('@', '')}`),
      }
    )),
  },
  // https://stackoverflow.com/questions/76616620/vite-refuses-to-use-the-correct-build-target-in-my-svelte-ts-project
  build: {
    target: 'es2022',
  },
  esbuild: {
    target: 'es2022',
    drop: process.env.NODE_ENV === 'development' ? [] : ['console', 'debugger'],
  },
  optimizeDeps: { esbuildOptions: { target: 'esnext' } }, // <-- Set this to resolve issue.
});
