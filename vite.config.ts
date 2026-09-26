import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 주소: https://zzangii1020.github.io/-goldenbell/
// 저장소 이름이 바뀌면 이 값도 '/<새 저장소 이름>/' 으로 바꿔야 한다.
export default defineConfig({
  base: '/-goldenbell/',
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
