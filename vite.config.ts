import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' 로 두면 빌드 결과(dist)를 어떤 경로(GitHub Pages 등)에 올려도 동작한다.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
