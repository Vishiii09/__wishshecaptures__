import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Listen on all local IPs
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom'],
                    'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
                    'vendor-framer': ['framer-motion'],
                    'vendor-icons': ['lucide-react']
                }
            }
        }
    }
})
