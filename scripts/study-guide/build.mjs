// 요약 노트 HTML → PDF (public/ 에 저장해 사이트에도 함께 배포)
// 사용법: node scripts/study-guide/build.mjs   (Noto Sans CJK KR 글꼴 필요)
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const executablePath = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(
  (p) => p && existsSync(p),
);
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage();
await page.goto(new URL('./guide.html', import.meta.url).href);
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: 'public/study-guide.pdf',
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font-size:8px;color:#8a8f96;text-align:center;font-family:Noto Sans CJK KR">《경험의 멸종》 골든벨 요약 노트 · <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});
await browser.close();
console.log('public/study-guide.pdf');
