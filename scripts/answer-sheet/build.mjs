// 주관식 정답표 PDF (책마다 주관식 50 + 객관식 정답을 주관식으로 50 = 100문제)
// 맨 왼쪽 열이 정답이라 손이나 종이로 가리고 외울 수 있다.
// 사용법: node scripts/answer-sheet/build.mjs   (Noto Sans CJK KR 글꼴 필요)
import { existsSync } from 'node:fs';
import { build } from 'esbuild';
import { chromium } from 'playwright-core';

const out = await build({ entryPoints: ['src/data/books.ts'], bundle: true, write: false, format: 'esm' });
const { BOOKS } = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(book) {
  const shorts = book.questions.filter((q) => q.type === 'short');
  const chapters = [...new Set(book.questions.map((q) => q.category))];
  let n = 0;
  const rows = chapters
    .map((ch) => {
      const list = shorts.filter((q) => q.category === ch).sort((a, b) => a.sourcePage - b.sourcePage);
      if (!list.length) return '';
      return (
        `<tr class="ch"><td colspan="3">${esc(ch)} <span>${list.length}문제</span></td></tr>` +
        list
          .map((q) => {
            n++;
            // 띄어쓰기만 다른 인정 답안은 외울 필요가 없으니 뺀다
            const bare = (s) => s.replace(/\s/g, '').toLowerCase();
            const alt = q.acceptableAnswers.filter((a) => a.length <= 24 && bare(a) !== bare(q.answer)).slice(0, 3);
            return `<tr>
  <td class="ans">${esc(q.answer)}${alt.length ? `<small>${alt.map(esc).join(' · ')}</small>` : ''}</td>
  <td class="q"><b class="no">${n}</b>${q.fromMultiple ? '<i class="tag">객</i>' : ''}${esc(q.question)}</td>
  <td class="p">${q.sourcePage}</td>
</tr>`;
          })
          .join('')
      );
    })
    .join('');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>《${esc(book.title)}》 주관식 정답표</title>
<style>
  @page { size: A4; margin: 11mm 10mm 13mm 10mm; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: 'Noto Sans CJK KR', 'Noto Sans KR', sans-serif; color: #1d1f23; margin: 0; font-size: 10pt; line-height: 1.45; word-break: keep-all; }
  h1 { font-size: 16pt; margin: 0 0 1mm; color: #1f4e79; }
  .how { margin: 0 0 3mm; color: #5f646b; font-size: 9pt; }
  .how b { color: #9a3412; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  thead { display: table-header-group; }
  th { background: #1f4e79; color: #fff; font-size: 9pt; padding: 1.5mm 2mm; text-align: left; }
  td { border-bottom: 1px solid #d9dde3; padding: 1.8mm 2mm; vertical-align: top; }
  tr { page-break-inside: avoid; }
  tbody tr:nth-child(even) td.q { background: #f7f9fb; }
  td.ans { width: 31%; background: #fff4ec; border-right: 1.2mm solid #9a3412; font-weight: 700; font-size: 11.5pt; color: #7c2d12; }
  td.ans small { display: block; font-weight: 400; font-size: 7.5pt; color: #8a6a5a; margin-top: .5mm; }
  td.q { font-size: 9.8pt; }
  td.p { width: 9mm; color: #8a8f96; font-size: 8pt; text-align: right; }
  .no { display: inline-block; min-width: 7mm; color: #1f4e79; }
  .tag { font-style: normal; font-size: 7pt; color: #fff; background: #1f4e79; border-radius: 1mm; padding: 0 1mm; margin-right: 1mm; vertical-align: 1px; }
  tr.ch td { background: #eef3f8; color: #1f4e79; font-weight: 700; font-size: 10.5pt; border-bottom: .5mm solid #1f4e79; padding-top: 2.5mm; page-break-after: avoid; }
  tr.ch td span { font-weight: 400; font-size: 8.5pt; color: #5f646b; margin-left: 2mm; }
</style></head><body>
<h1>《${esc(book.title)}》 주관식 정답표 · ${n}문제</h1>
<p class="how"><b>왼쪽 정답 열을 손이나 종이로 가리고</b> 문제를 읽은 뒤 답을 말해 보고 확인하세요. 장별·쪽 순서입니다.
<i class="tag">객</i> = 객관식 문제의 정답을 주관식으로 묻는 문제 · 작은 글씨 = 함께 인정되는 답 · 오른쪽 숫자 = 책 쪽수</p>
<table><thead><tr><th style="width:31%">정답</th><th>문제</th><th style="width:9mm">쪽</th></tr></thead><tbody>${rows}</tbody></table>
</body></html>`;
}

const executablePath = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(
  (p) => p && existsSync(p),
);
const browser = await chromium.launch(executablePath ? { executablePath } : {});
for (const book of BOOKS.filter((b) => b.answerSheet)) {
  const page = await browser.newPage();
  await page.setContent(html(book), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const file = `public/${book.answerSheet}`;
  await page.pdf({
    path: file,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;font-size:8px;color:#8a8f96;text-align:center;font-family:Noto Sans CJK KR">《${esc(book.title)}》 주관식 정답표 · <span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
  });
  await page.close();
  console.log(file);
}
await browser.close();
