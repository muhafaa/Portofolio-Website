import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this repo from /Portofolio-Website/.
// Change `base` to '/' if the site moves to a custom domain or a <user>.github.io repo.
export default defineConfig({
  base: '/Portofolio-Website/',
  plugins: [vue(), tailwindcss()],
  test: {
    environment: 'jsdom',
  },
})
