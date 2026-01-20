import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: 'src',
  publicDir: false,

  plugins: [
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        minifySvg: false // Match .htmlnanorc setting
      },
      inject: {
        data: {
          CLOUDFLARE_TOKEN: process.env.CLOUDFLARE_TOKEN || ''
        }
      }
    }),

    viteStaticCopy({
      targets: [
        {
          src: 'static/*',
          dest: '.'
        }
      ]
    }),

    legacy({
      targets: ['since 2017-06'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        promo: path.resolve(__dirname, 'src/promo.html'),
        thanks: path.resolve(__dirname, 'src/thanks/index.html'),
        'presentador-archivo': path.resolve(__dirname, 'src/presentador/archivo/index.html'),
        'presentador-version': path.resolve(__dirname, 'src/presentador/version/index.html'),
        'refined-jw': path.resolve(__dirname, 'src/refined-jw/index.html')
      }
    },
    cssMinify: 'cssnano'
  },

  server: {
    port: 1234,
    open: true
  },

  envPrefix: 'CLOUDFLARE_'
});
