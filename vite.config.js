import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { handbookChatPlugin } from './src/handbook/ai/chatServerPlugin.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load every variable from .env / .env.local (the '' prefix means "not only VITE_ ones").
  // ANTHROPIC_API_KEY has no VITE_ prefix, so Vite never exposes it to browser code;
  // only the Node-side chat plugin below receives it.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), handbookChatPlugin({ apiKey: env.ANTHROPIC_API_KEY })],
    resolve: {
      alias: {
        // import { formatRupiah } from '@/utils/format.js'  →  src/utils/format.js
        // (must match "paths" in tsconfig.json, which tells TypeScript the same thing)
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rolldownOptions: {
        output: {
          // Split the build into several files instead of one huge one, so no file
          // goes over Vite's 500 kB warning as more parts are added:
          // React + icons, React Router, TanStack Query, Zod, and one file per handbook part.
          codeSplitting: {
            groups: [
              { name: 'vendor', test: /node_modules[\\/](react|react-dom|scheduler|lucide-react)[\\/]/ },
              { name: 'router', test: /node_modules[\\/]react-router[\\/]/ },
              { name: 'tanstack', test: /node_modules[\\/]@tanstack[\\/]/ },
              { name: 'zod', test: /node_modules[\\/]zod[\\/]/ },
              {
                name: (id) => `content-${id.match(/handbook[\\/]parts[\\/](part\d+|ts\d+|tan\d+)[\\/]/)[1]}`,
                // Files named *.lazy.jsx / *.lazy.tsx are left out on purpose: they are loaded with
                // lazy() (Part 13) and must stay in their own file, downloaded on demand.
                test: /src[\\/]handbook[\\/]parts[\\/](part\d+|ts\d+|tan\d+)[\\/](?!.*\.lazy\.(jsx|tsx)$)/,
              },
            ],
          },
        },
      },
    },
  }
})
