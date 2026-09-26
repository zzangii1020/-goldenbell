import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 주소: https://zzangii1020.github.io/-goldenbell/
// 저장소 이름이 바뀌면 이 값도 '/<새 저장소 이름>/' 으로 바꿔야 한다.
export default defineConfig({
  base: '/-goldenbell/',
  plugins: [react()],
  // 구형 iOS Safari·안드로이드 브라우저(카카오톡 인앱 브라우저 등)에서도 동작하도록 문법을 낮춰서 빌드
  build: {
    target: ['es2017', 'safari12', 'chrome61'],
    cssTarget: ['safari12', 'chrome61'],
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
