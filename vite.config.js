import { defineConfig } from 'vite';

export default defineConfig({
  base: '/js-final-project/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html',
      },
    },
  },
});
