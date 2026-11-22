import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Builds one self-contained dist/index.html (JS + CSS inlined) with relative paths,
// so it opens by double-click (file://) and also works on any static host.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
})
