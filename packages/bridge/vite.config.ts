import react from '@vitejs/plugin-react';
import * as path from 'path';
import {defineConfig} from 'vite';

const SRC_DIR = path.resolve(__dirname, './src');
const DIST_DIR = path.resolve(__dirname, './dist');

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        root: SRC_DIR,
        resolve: {
            alias: {
                '@': SRC_DIR,
            },
        },
        server: {
            port: 3910,
        },
        build: {
            outDir: DIST_DIR,
            minify: true,
            sourcemap: false,
            brotliSize: true,
            emptyOutDir: true,
            lib: {
                entry: path.resolve(__dirname, './src/lib/index.ts'),
                formats: ['umd'],
                fileName: 'index',
                name: 'JsdkitBridge',
            },
        },
        plugins: [react()],
    };
});
