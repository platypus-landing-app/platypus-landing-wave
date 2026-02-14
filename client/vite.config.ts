import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    // ViteImageOptimizer disabled - we use pre-optimized images from /public/optimized
    // Run `npm run optimize-all` manually if you add new images
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Visualizer only in development - adds ~1s to build time
    ...(process.env.ANALYZE ? [visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })] : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-accordion'],
          helmet: ['react-helmet-async'],
          query: ['@tanstack/react-query'],
        },
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext ?? '')) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff2?|ttf|otf|eot/i.test(ext ?? '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Run minification twice for better results
        unsafe_arrows: true,
        unsafe_methods: true,
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        reduce_vars: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
    },
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096, // Inline assets < 4kb
    reportCompressedSize: false, // Faster builds
    target: 'es2020',
    modulePreload: {
      polyfill: false, // Remove if you need to support older browsers
    },
  },
  server: {
    cors: true,
    hmr: {
      overlay: true,
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
    exclude: ['@axe-core/react'],
  },
});
