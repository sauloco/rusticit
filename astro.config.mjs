// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

import react from '@astrojs/react';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react(), vue()],
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
        '@components': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/components'),
        '@stores': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/stores'),
      },
    },
  },
});