import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    open: true,
    port: 3000,

    proxy:{
      "/api1":{
        target:"http://localhost:8080",
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api1/,"")
      },
    }
  }
})
