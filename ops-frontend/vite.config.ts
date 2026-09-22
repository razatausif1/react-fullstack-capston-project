import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'ops_frontend',
      filename: 'remoteEntry.js',
      exposes: {
        './SupplierPage': './src/pages/SupplierPage.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@mui/material'],
      dts: false,
    }),
  ],
})
