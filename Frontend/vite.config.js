import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      "/api": "https://e-commerce-web-u37o.vercel.app/" || " http://localhost:4000"
    }
  },
  plugins: [react(),tailwindcss(),],
})
