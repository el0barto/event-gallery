import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: 'index.html' // necesario para SPA
    }),
    paths: {
      base: '' // debe estar vacío si tu app va a la raíz /
    },
    prerender: {
      entries: [] // mantiene tu prerender vacío si solo quieres SPA
    }
  }
};

export default config;
