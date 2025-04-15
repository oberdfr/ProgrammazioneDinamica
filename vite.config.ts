import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    allowedHosts: ["oberdfrhome.ddns.net","presentation.oberdfr.me" ],
  },
  plugins: [react(), tsconfigPaths()],
})
