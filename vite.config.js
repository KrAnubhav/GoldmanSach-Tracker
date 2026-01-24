import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    '__firebase_config': JSON.stringify(process.env.FIREBASE_CONFIG || '{}'),
    '__app_id': JSON.stringify(process.env.APP_ID || 'goldman-sachs-tracker'),
    '__initial_auth_token': JSON.stringify(process.env.INITIAL_AUTH_TOKEN || '')
  }
})
