import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import image from '@astrojs/image';

const buildEnv = process.env.VLABS_BUILD_ENV || 'TEST';

const astroConfig = {
  PROD: {
    integrations: [
      react(),
      image({
        serviceEntryPoint: '@astrojs/image/sharp',
      }),
    ],
    site: 'https://vlead.vlabs.ac.in',
    build: {
      assets: 'astro',
    },
  },
  TEST: {
    integrations: [
      react(),
      image({
        serviceEntryPoint: '@astrojs/image/sharp',
      }),
    ],
    site: 'https://virtual-labs.github.io',
    base: '/app-vlead-web',
    build: {
      assets: 'astro',
    },
  },
};

const currentConfig = astroConfig[buildEnv] || astroConfig['TEST'];

export default defineConfig(currentConfig);