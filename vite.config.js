import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [

    react(),

    tailwindcss(),

    VitePWA({

      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.svg',
        'robots.txt',
      ],

      manifest: {

        name: 'FlashFrame OCR',

        short_name: 'FlashFrame',

        description:
          'Lightning-fast OCR extraction.',

        theme_color: '#ffffff',

        background_color: '#f5f3ef',

        display: 'standalone',

        orientation: 'portrait',

        start_url: '/',

        icons: [

          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },

          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },

        ],

      },

    }),

  ],
})