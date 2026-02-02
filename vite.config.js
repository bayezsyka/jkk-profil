import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        // Gzip Compression
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
        }),
        // Brotli Compression
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
        }),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    build: {
        target: 'es2020',
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom') || id.includes('@inertiajs')) {
                            return 'vendor-react';
                        }
                        return 'vendor'; 
                    }
                },
            },
        },
    ssr: {
        noExternal: ['@inertiajs/server'],
    },
});
