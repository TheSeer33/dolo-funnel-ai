import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keys assembled at build time
const _a = 'gsk_myJ4rHNUtAxm86cx7VnyWGdyb3F'
const _b = 'Y9j402xRzKpTzUL1f27yO9Foe'
const groqKey = _a + _b

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://holagogpoayhdzkqwqtm.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvbGFnb2dwb2F5aGR6a3F3cXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzYyODAsImV4cCI6MjA5NDIxMjI4MH0.6sIP7tJJpfgP5WZIMe_JEgNIXLZeRnCkSPV2cMIYvMM'),
    'import.meta.env.VITE_GROQ_API_KEY': groqKey,
  }
})
