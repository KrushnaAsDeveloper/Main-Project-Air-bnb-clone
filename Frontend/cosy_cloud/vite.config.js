import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy : {
      '/api' : "https://main-project-air-bnb-clone.onrender.com/"
    }
  }, 
  plugins: [react(), tailwindcss(),],
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
})
