// 실제 브라우저(Chromium)에서 아이폰 화면 크기로 주요 흐름을 검사한다.
// 사용법: npm run build && npm run test:e2e
// CHROMIUM_PATH 환경변수로 브라우저 경로를 지정할 수 있다.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { build } from 'esbuild';

// 실제 문제 데이터를 불러와 전체 문제 풀이에 사용한다.
const loadData = async (entry) => {
  const out = await build({ entryPoints: [entry], bundle: true, write: false, format: 'esm' });
  return import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
};
const { questions } = await loadData('src/data/extinction/questions.ts');
const { questions: plantQuestions } = await loadData('src/data/plant/questions.ts');

const PORT = 4179;
const URL = `http://127.0.0.1:${PORT}/-goldenbell/`;
const SHOTS = 'e2e-screenshots';
mkdirSync(SHOTS, { recursive: true });

const candidates = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/opt/pw-browsers/chromium/chrome-linux/chrome',
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], {
  stdio: 'pipe',
  detached: true,
});
const stopServer = () => {
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    server.kill();
  }
};
await new Promise((resolve, reject) => {
  const t = setTimeout(() => reject(new Error('preview server timeout')), 20000);
  server.stdout.on('data', (d) => {
    if (String(d).includes(String(PORT))) {
      clearTimeout(t);
      resolve();
    }
  });
});

let failures = 0;
const check = (cond, msg) => {
  console.log(`${cond ? '✔' : '✘'} ${msg}`);
  if (!cond) failures++;
};

const browser = await chromium.launch(executablePath ? { executablePath } : {});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  locale: 'ko-KR',
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

const checkGuide = async (file) => {
  const href = await page.getByRole('link', { name: /요약 노트 PDF/ }).getAttribute('href');
  const res = await page.request.get(new globalThis.URL(href, URL).href);
  check(href.endsWith(file) && res.ok() && (res.headers()['content-type'] || '').includes('pdf'), `요약 노트 PDF 링크 동작 (${href})`);
};

const statValue = (label) =>
  page.locator('.stat', { has: page.locator('.stat-label', { hasText: new RegExp(`^${label}$`) }) }).locator('.stat-value').innerText();

try {
  await page.goto(URL);
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload();

  // 0. 첫 화면: 책 선택
  check(await page.getByRole('heading', { name: '어떤 책을 공부할까요?' }).isVisible(), '첫 화면: 책 선택');
  check((await page.locator('.book-card').count()) === 2, '책 선택: 2권');
  await page.screenshot({ path: `${SHOTS}/00-book-select.png`, fullPage: true });
  await page.locator('.book-card', { hasText: '경험의 멸종' }).click();
  check(await page.getByRole('heading', { name: '《경험의 멸종》' }).isVisible(), '경험의 멸종 선택 → 홈');

  // 1. 홈 화면
  check((await statValue('전체 문제')) === '100', '홈: 전체 문제 100');
  check((await statValue('객관식')) === '50', '홈: 객관식 50');
  check((await statValue('주관식')) === '50', '홈: 주관식 50');
  check((await statValue('틀린 문제')) === '0', '홈: 틀린 문제 0');
  await page.screenshot({ path: `${SHOTS}/01-home.png`, fullPage: true });

  // 빈 오답 목록
  await page.getByRole('button', { name: /틀린 문제 다시 풀기/ }).click();
  check(await page.getByRole('status').getByText('현재 틀린 문제가 없습니다.').isVisible(), '오답 0개일 때 안내 문구');

  // 2. 객관식 순서대로
  await page.getByRole('radio', { name: '순서대로' }).click();
  await page.getByRole('button', { name: /객관식만 풀기/ }).click();
  check((await page.locator('.quiz-count').innerText()).startsWith('1 / 50'), '문제 화면: 1 / 50 표시');
  check(await page.getByRole('button', { name: '정답 제출' }).isVisible(), '정답 제출 버튼');
  check(await page.getByRole('button', { name: '정답 확인' }).isVisible(), '정답 확인 버튼 (별도)');
  check(await page.getByRole('button', { name: '☆ 즐겨찾기' }).isVisible(), '☆ 즐겨찾기 버튼');
  await page.screenshot({ path: `${SHOTS}/02-mc-question.png`, fullPage: true });

  // Q1 m01: 정답은 원래 순서 ① (순서대로 모드에서는 보기 순서도 그대로)
  await page.locator('.choice').nth(0).click();
  await page.getByRole('button', { name: '정답 제출' }).click();
  check(await page.getByText('정답입니다.').isVisible(), '정답 제출 → 정답입니다.');
  check(await page.getByText(/책 p\.18 · PDF p\.12/).isVisible(), '해설에 출처(책/PDF 쪽수) 표시');
  await page.screenshot({ path: `${SHOTS}/03-mc-correct.png`, fullPage: true });
  await page.getByRole('button', { name: '다음 문제' }).click();

  // Q2 m02: 정답 확인 → 틀린 문제로 기록, 즐겨찾기
  await page.getByRole('button', { name: '☆ 즐겨찾기' }).click();
  check(await page.getByRole('button', { name: '★ 즐겨찾기됨' }).isVisible(), '즐겨찾기 토글 → ★ 즐겨찾기됨');
  await page.getByRole('button', { name: '정답 확인' }).click();
  check(await page.getByText('정답을 확인했으므로 틀린 문제로 기록했습니다.').isVisible(), '정답 확인 → 틀린 문제로 기록 안내');
  check(await page.locator('.badge-wrong').isVisible(), '현재 문제 오답 여부 배지 표시');
  await page.screenshot({ path: `${SHOTS}/04-mc-reveal.png`, fullPage: true });
  await page.getByRole('button', { name: '다음 문제' }).click();

  // Q3 m03: 오답 (정답 ③ → ① 선택)
  await page.locator('.choice').nth(0).click();
  await page.getByRole('button', { name: '정답 제출' }).click();
  check(await page.getByText('틀렸습니다.').isVisible(), '오답 제출 → 틀렸습니다.');
  check(await page.locator('.choice.correct').isVisible(), '오답 시 정답 보기 강조');
  await page.screenshot({ path: `${SHOTS}/05-mc-wrong.png`, fullPage: true });

  // 문제 번호 이동
  await page.locator('.quiz-count').click();
  await page.getByRole('button', { name: '10번 문제' }).click();
  check((await page.locator('.quiz-count').innerText()).startsWith('10 / 50'), '번호 직접 이동 → 10 / 50');

  // 홈으로
  await page.getByRole('button', { name: '홈으로' }).click();
  check((await statValue('틀린 문제')) === '2', '홈: 틀린 문제 2 (오답 1 + 정답 확인 1)');
  check((await statValue('즐겨찾기')) === '1', '홈: 즐겨찾기 1');
  check(await page.getByText(/틀린 문제 2개/).isVisible(), '홈 버튼: 틀린 문제 2개');
  check(await page.locator('.resume-card').isVisible(), '이어서 풀기 카드');

  // 3. 새로고침 후 유지
  await page.reload();
  check((await statValue('틀린 문제')) === '2', '새로고침 후 틀린 문제 유지');
  check((await statValue('즐겨찾기')) === '1', '새로고침 후 즐겨찾기 유지');
  await page.locator('.resume-card').click();
  check((await page.locator('.quiz-count').innerText()).startsWith('10 / 50'), '새로고침 후 이어서 풀기 위치 유지');
  await page.getByRole('button', { name: '홈으로' }).click();

  // 4. 주관식
  await page.getByRole('button', { name: /주관식만 풀기/ }).click();
  check(await page.locator('.short-input').isVisible(), '주관식 입력창');
  await page.locator('.short-input').fill(' Sensorium ');
  await page.screenshot({ path: `${SHOTS}/06-short-question.png`, fullPage: true });
  await page.locator('.short-input').press('Enter');
  check(await page.getByText('정답입니다.').isVisible(), '주관식 영문/공백 변형 정답 인정');
  await page.getByRole('button', { name: '다음 문제' }).click();
  await page.locator('.short-input').fill('아무 말');
  await page.getByRole('button', { name: '정답 제출' }).click();
  check(await page.getByText('틀렸습니다.').isVisible(), '주관식 오답 처리');
  await page.screenshot({ path: `${SHOTS}/07-short-wrong.png`, fullPage: true });
  await page.getByRole('button', { name: '홈으로' }).click();
  check((await statValue('틀린 문제')) === '3', '홈: 틀린 문제 3');

  // 5. 틀린 문제 다시 풀기: m02, m03, s02 → m02 맞히면 오답 목록에서 제거
  await page.getByRole('button', { name: /틀린 문제 다시 풀기/ }).click();
  check((await page.locator('.quiz-count').innerText()).startsWith('1 / 3'), '오답 모드: 1 / 3');
  await page.locator('.choice').nth(0).click(); // m02 정답 ①
  await page.getByRole('button', { name: '정답 제출' }).click();
  check(await page.getByText('정답입니다.').isVisible(), '오답 다시 풀어 정답');
  check(await page.getByText('과거 오답 1회').isVisible(), '다시 맞혀도 과거 오답 이력 표시');
  await page.getByRole('button', { name: '다음 문제' }).click();
  await page.getByRole('button', { name: '정답 확인' }).click(); // m03 계속 오답
  await page.getByRole('button', { name: '다음 문제' }).click();
  await page.locator('.short-input').fill('가짜 사건');
  await page.getByRole('button', { name: '정답 제출' }).click();
  await page.getByRole('button', { name: '결과 보기' }).click();
  check(await page.getByRole('heading', { name: '풀이 결과' }).isVisible(), '결과 화면');
  check((await page.locator('.score-big').innerText()).replace(/\s/g, '') === '2/3', '결과: 2 / 3');
  check(await page.getByText('틀린 문제 1개').isVisible(), '결과 화면: 남은 오답 1개');
  await page.screenshot({ path: `${SHOTS}/08-result.png`, fullPage: true });

  // 즐겨찾기만 풀기
  await page.getByRole('button', { name: /즐겨찾기만 풀기/ }).click();
  check((await page.locator('.quiz-count').innerText()).startsWith('1 / 1'), '즐겨찾기 모드: 1 / 1');
  await page.getByRole('button', { name: '홈으로' }).click();
  check((await statValue('틀린 문제')) === '1', '홈: 틀린 문제 1 (다시 맞힌 문제 제거)');

  // 6. 학습 현황
  await page.getByRole('button', { name: '학습 현황' }).click();
  const meters = await page.locator('.meter-num').allInnerTexts();
  check(meters[0].startsWith('5 / 100'), `학습 현황: 전체 진행률 5 / 100 (${meters[0]})`);
  check(meters[1].startsWith('3 / 50'), `학습 현황: 객관식 3 / 50 (${meters[1]})`);
  check(meters[2].startsWith('2 / 50'), `학습 현황: 주관식 2 / 50 (${meters[2]})`);
  check((await statValue('한 번이라도 틀린 문제')) === '3', '학습 현황: 한 번이라도 틀린 문제 3 (m02·m03·s02)');
  check((await page.locator('.history li').count()) === 8, '최근 풀이 기록 8건');
  check(await page.getByText('7장 소멸하는 장소, 개인화된 공간').isVisible(), '학습 현황: 7장 항목 표시');
  check(await page.getByText('에필로그', { exact: true }).isVisible(), '학습 현황: 에필로그 항목 표시');
  await page.screenshot({ path: `${SHOTS}/09-progress.png`, fullPage: true });

  // 7. 랜덤 모드 전체 풀이
  await page.getByRole('button', { name: '‹ 홈' }).click();
  await page.getByRole('radio', { name: '랜덤' }).click();
  await page.getByRole('button', { name: /전체 문제 풀기/ }).click();
  check((await page.locator('.quiz-count').innerText()).startsWith('1 / 100'), '전체 모드: 1 / 100');


  // ───────── 8. 전체 100문제 실제 풀이 (객관식 50 + 주관식 50) ─────────
  await page.evaluate(() => localStorage.clear());
  await page.goto(URL);
  await page.getByRole('radio', { name: '순서대로' }).click();

  const runAll = async (mode, list, label) => {
    await page.getByRole('button', { name: new RegExp(label) }).click();
    let ok = 0;
    for (let i = 0; i < list.length; i++) {
      const q = list[i];
      const count = await page.locator('.quiz-count').innerText();
      if (!count.startsWith(`${i + 1} / ${list.length}`)) throw new Error(`${q.id}: 번호 표시 오류 ${count}`);
      const text = await page.locator('.q-text').innerText();
      if (!text.includes(q.question.slice(0, 20))) throw new Error(`${q.id}: 문제 순서 불일치`);
      if (mode === 'multiple') {
        await page.locator('.choice', { hasText: q.choices[q.answer] }).first().click();
      } else {
        // 대표 정답 대신 인정 답안(또는 띄어쓰기를 바꾼 대표 정답)으로 채점 검증
        const alt = q.acceptableAnswers.length && i % 2 === 0 ? q.acceptableAnswers[0] : ` ${q.answer.toUpperCase()} `;
        await page.locator('.short-input').fill(alt);
      }
      await page.getByRole('button', { name: '정답 제출' }).click();
      if (await page.getByText('정답입니다.').isVisible()) ok++;
      else console.log(`   ✘ ${q.id} 정답 처리 실패`);
      await page.getByRole('button', { name: i === list.length - 1 ? '결과 보기' : '다음 문제' }).click();
    }
    return ok;
  };

  const mcList = questions.filter((q) => q.type === 'multiple');
  const saList = questions.filter((q) => q.type === 'short');
  check(mcList.length === 50 && saList.length === 50, `데이터: 객관식 ${mcList.length} / 주관식 ${saList.length}`);
  const mcOk = await runAll('multiple', mcList, '객관식만 풀기');
  check(mcOk === 50, `객관식 50문제 전부 정답 처리 (${mcOk}/50)`);
  check((await page.locator('.score-big').innerText()).replace(/\s/g, '') === '50/50', '객관식 결과 화면 50 / 50');
  await page.getByRole('button', { name: '홈으로' }).click();
  const saOk = await runAll('short', saList, '주관식만 풀기');
  check(saOk === 50, `주관식 50문제 입력 채점 전부 정답 (${saOk}/50)`);
  await page.getByRole('button', { name: '홈으로' }).click();

  // 오답 입력 채점: 주관식 오답 3개 + 정답 확인 2개
  await page.getByRole('button', { name: /주관식만 풀기/ }).click();
  for (const wrong of ['센서', '감각', '']) {
    if (wrong) await page.locator('.short-input').fill(wrong);
    await page.getByRole('button', { name: '정답 제출' }).click();
    if (!wrong) {
      check(await page.getByText('답을 입력하세요.').isVisible(), '빈 답 제출 시 안내');
      await page.getByRole('button', { name: '정답 확인' }).click();
    } else check(await page.getByText('틀렸습니다.').isVisible(), `주관식 오답 "${wrong}" → 틀렸습니다`);
    await page.getByRole('button', { name: '다음 문제' }).click();
  }
  await page.getByRole('button', { name: '홈으로' }).click();
  // s01·s02 오답 제출 + s03 정답 확인 → 틀린 문제 3개
  check((await statValue('틀린 문제')) === '3', '전체 풀이 후 오답·정답 확인으로 틀린 문제 3개');

  await page.reload();
  await page.getByRole('button', { name: '학습 현황' }).click();
  const m2 = await page.locator('.meter-num').allInnerTexts();
  check(m2[0].startsWith('100 / 100') && m2[1].startsWith('50 / 50') && m2[2].startsWith('50 / 50'), `새로고침 후 진도율 100/100·50/50·50/50 유지 (${m2.slice(0, 3).join(', ')})`);
  check((await statValue('맞힌 문제')) === '97', '새로고침 후 맞힌 문제 97 유지');
  check((await statValue('안 푼 문제')) === '0', '안 푼 문제 0');
  const stored = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('goldenbell.extinction.v1.state')).records).length);
  check(stored === 100, `localStorage 에 100문제 기록 저장 (${stored})`);
  await page.getByRole('button', { name: '‹ 홈' }).click();
  await page.getByRole('button', { name: /틀린 문제 다시 풀기/ }).click();
  check((await page.locator('.quiz-count').innerText()).startsWith('1 / 3'), '틀린 문제 다시 풀기: 1 / 3');

  // 요약 노트 PDF 링크
  await page.goto(URL);
  check(await page.getByRole('heading', { name: '《경험의 멸종》' }).isVisible(), '새로고침해도 보던 책(경험의 멸종)에 머묾');
  await checkGuide('study-guide.pdf');

  // ───────── 9. 식물의 사회생활 ─────────
  await page.getByRole('button', { name: '‹ 책 선택' }).click();
  const extCard = await page.locator('.book-card', { hasText: '경험의 멸종' }).innerText();
  check(extCard.includes('푼 문제 100 / 100'), '책 선택 화면: 경험의 멸종 진도 100 / 100 표시');
  await page.locator('.book-card', { hasText: '식물의 사회생활' }).click();
  check(await page.getByRole('heading', { name: '《식물의 사회생활》' }).isVisible(), '식물의 사회생활 선택 → 홈');
  check((await statValue('전체 문제')) === '100', '식물: 전체 문제 100');
  check((await statValue('틀린 문제')) === '0', '식물: 경험의 멸종과 기록이 분리됨 (틀린 문제 0)');
  await page.screenshot({ path: `${SHOTS}/10-plant-home.png`, fullPage: true });
  await page.getByRole('radio', { name: '순서대로' }).click();
  const pMc = plantQuestions.filter((q) => q.type === 'multiple');
  const pSa = plantQuestions.filter((q) => q.type === 'short');
  check(pMc.length === 50 && pSa.length === 50, `식물 데이터: 객관식 ${pMc.length} / 주관식 ${pSa.length}`);
  await page.getByRole('button', { name: /객관식만 풀기/ }).click();
  await page.screenshot({ path: `${SHOTS}/11-plant-question.png`, fullPage: true });
  await page.getByRole('button', { name: '홈으로' }).click();
  const pMcOk = await runAll('multiple', pMc, '객관식만 풀기');
  check(pMcOk === 50, `식물 객관식 50문제 전부 정답 처리 (${pMcOk}/50)`);
  await page.getByRole('button', { name: '홈으로' }).click();
  const pSaOk = await runAll('short', pSa, '주관식만 풀기');
  check(pSaOk === 50, `식물 주관식 50문제 입력 채점 전부 정답 (${pSaOk}/50)`);
  await page.getByRole('button', { name: '홈으로' }).click();
  await page.getByRole('button', { name: /주관식만 풀기/ }).click();
  await page.getByRole('button', { name: '정답 확인' }).click();
  check(await page.getByText('정답을 확인했으므로 틀린 문제로 기록했습니다.').isVisible(), '식물: 정답 확인 → 틀린 문제로 기록');
  check(await page.getByText(/책 p\.19 · PDF p\.11 \(001-069 파일\)/).isVisible(), '식물: 출처에 책/PDF 쪽수 표시');
  await page.screenshot({ path: `${SHOTS}/12-plant-reveal.png`, fullPage: true });
  await page.getByRole('button', { name: '홈으로' }).click();
  await page.reload();
  check(await page.getByRole('heading', { name: '《식물의 사회생활》' }).isVisible(), '새로고침해도 식물의 사회생활에 머묾');
  check((await statValue('틀린 문제')) === '1', '식물: 새로고침 후 틀린 문제 1 유지');
  const keys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.endsWith('.state')).sort());
  check(JSON.stringify(keys) === JSON.stringify(['goldenbell.extinction.v1.state', 'goldenbell.plant.v1.state']), `책별 localStorage 저장 (${keys.join(', ')})`);
  await checkGuide('study-guide-plant.pdf');
  await page.getByRole('button', { name: '학습 현황' }).click();
  const pm = await page.locator('.meter-num').allInnerTexts();
  check(pm[0].startsWith('100 / 100'), `식물 학습 현황: 전체 진행률 ${pm[0]}`);
  check(await page.getByText('12장 사람들이 만든 지구환경의 변화와 식물').isVisible(), '식물 학습 현황: 장별 진행 표시');
  await page.getByRole('button', { name: '‹ 홈' }).click();

  // 앱을 새로 열면 책 선택 화면부터
  const fresh = await context.newPage();
  await fresh.goto(URL);
  check(await fresh.getByRole('heading', { name: '어떤 책을 공부할까요?' }).isVisible(), '새 탭으로 열면 책 선택 화면부터 시작');
  await fresh.close();

  // 가로 스크롤 없음
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  check(!overflow, '모바일 화면에서 가로 스크롤 없음');

  check(errors.length === 0, `콘솔/페이지 오류 없음 ${errors.join(' | ')}`);
} catch (e) {
  failures++;
  console.error(e);
  await page.screenshot({ path: `${SHOTS}/error.png`, fullPage: true }).catch(() => {});
} finally {
  await browser.close();
  stopServer();
}

console.log(failures === 0 ? '\nE2E: 모든 검사 통과' : `\nE2E: ${failures}개 실패`);
process.exit(failures === 0 ? 0 : 1);
