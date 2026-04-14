/// <reference types='vitest' />
import { defineConfig, PluginOption, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import mkcert from 'vite-plugin-mkcert';

/**
 * Vite plugin that patches libraries calling ReactDOM.findDOMNode(),
 * which was removed from react-dom's public API in React 19.
 * Replaces the call with the internal API that still exists.
 * Handles both dev (optimizeDeps/esbuild) and serve (transform) paths.
 */
function findDOMNodeShimPlugin(): Plugin {
  const SHIM = '(ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?.findDOMNode || ReactDOM.findDOMNode).call(ReactDOM, ';
  const PATTERN = /ReactDOM\.findDOMNode\(/g;

  return {
    name: 'react-dom-finddomnode-shim',
    enforce: 'pre',
    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [
              {
                name: 'finddomnode-shim-esbuild',
                setup(build) {
                  build.onLoad({ filter: /RefFindNode\.js$/ }, async (args) => {
                    const fs = await import('fs');
                    const contents = fs.readFileSync(args.path, 'utf8');
                    return {
                      contents: contents.replace(PATTERN, SHIM),
                      loader: 'js',
                    };
                  });
                },
              },
            ],
          },
        },
      };
    },
    transform(code, id) {
      if (!id.includes('node_modules')) return;
      if (!code.includes('findDOMNode')) return;
      return code.replace(PATTERN, SHIM);
    },
  };
}

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

  plugins: [
    findDOMNodeShimPlugin() as PluginOption,
    react() as PluginOption,
    nxViteTsPaths() as unknown as PluginOption,
    nxCopyAssetsPlugin(['*.md']) as unknown as PluginOption,
    mkcert() as PluginOption,
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
