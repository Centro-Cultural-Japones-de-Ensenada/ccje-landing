// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Precarga las páginas al pasar el cursor por los enlaces, para que la cortina no espere.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  vite: {
    plugins: [tailwindcss()]
  }
});
