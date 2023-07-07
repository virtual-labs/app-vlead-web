import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),],
  site: "https://yatharth-gupta.github.io",
  base: "/app-vlead-web/",
  // output: 'static',
  // outDir: './docs',
  build: {
    assets: 'astro'
  }
});