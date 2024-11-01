/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  root: __dirname,
  define: {
    BUILD_DATE: JSON.stringify(new Date().valueOf()),
  },
  cacheDir: '../../node_modules/.vite/apps/PlayAbWeb',
  base: '/talpakers/',
  server: {
    port: 3001,
    open: true,
    host: true,
  },

  preview: {
    port: 3001,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md']), mkcert()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
