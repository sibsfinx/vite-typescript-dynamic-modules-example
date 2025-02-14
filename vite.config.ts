import { defineConfig } from 'vite'
import * as path from 'node:path'
import type { UserConfig } from 'vite'
import type { ViteDevServer } from 'vite'
import serveStatic from 'serve-static'

export default defineConfig({
  // Base public path
  base: '/',

  // Build configuration
  build: {
    // Output directory for the production build
    outDir: 'dist',
    
    // Generate source maps
    sourcemap: true,

    // Asset handling
    assetsDir: 'assets',
    
    // Rollup options
    rollupOptions: {
      input: {
        main: path.resolve(process.cwd(), 'index.html'),
      },
      output: {
        // Chunk naming pattern
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'vendor') {
            return 'temp/vendor/[name].[hash].js'
          }
          return 'scripts/[name].[hash].js'
        },
        // Asset naming pattern
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name].[hash][ext]'
          
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return 'assets/images/[name].[hash].[ext]'
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/font/[name].[hash].[ext]'
          }
          if (/\.css$/.test(assetInfo.name)) {
            return 'styles/[name].[hash].[ext]'
          }
          if (/\.(glb|gltf)$/.test(assetInfo.name)) {
            return 'assets/models/[name].[hash].[ext]'
          }
          if (/\.(mp4|webm)$/.test(assetInfo.name)) {
            return 'assets/videos/[name].[hash].[ext]'
          }
          return `assets/${ext}/[name].[hash].[ext]`
        },
        // Entry chunk naming pattern
        entryFileNames: 'scripts/[name].[hash].js',
      }
    },
  },

  // Development server options
  server: {
    port: 8000,
    open: true,
  },

  // Optimization options
  optimizeDeps: {
    include: ['paper', 'opentype.js']
  },

  // Resolve configuration
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    }
  },

  // Custom static file serving
  plugins: [
    {
      name: 'static-files',
      configureServer(server: ViteDevServer) {
        // Serve assets directory
        server.middlewares.use('/assets', serveStatic('assets', { index: false }));
        
        // Serve libs directory as scripts
        server.middlewares.use('/scripts', serveStatic('libs', { index: false }));
        
        // Serve sprites directory
        server.middlewares.use('/sprites', serveStatic('sprites', { index: false }));
        
        // Serve settings directory
        server.middlewares.use('/settings', serveStatic('settings', { index: false }));
      },
      config() {
        return {
          resolve: {
            alias: {
              '/scripts': path.resolve(process.cwd(), 'libs'),
              '/settings': path.resolve(process.cwd(), 'settings'),
            }
          }
        }
      }
    }
  ]
} as UserConfig)