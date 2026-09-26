// 실제 브라우저(Chromium)에서 아이폰 화면 크기로 주요 흐름을 검사한다.
// 사용법: npm run build && npm run test:e2e
// CHROMIUM_PATH 환경변수로 브라우저 경로를 지정할 수 있다.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';

const PORT = 4179;
const URL = `http://127.0.0.1:${PORT}/`;
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

const statValue = (label) =>
  page.locator('.stat', { has: page.locator('.stat-label', { hasText: new RegExp(`^${label}$`) }) }).locator('.stat-value').innerText();

try {
  await page.goto(URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();

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
  await page.screenshot({ path: `${SHOTS}/09-progress.png`, fullPage: true });

  // 7. 랜덤 모드 전체 풀이
  await page.getByRole('button', { name: '‹ 홈' }).click();
  await page.getByRole('radio', { name: '랜덤' }).click();
  await page.getByRole('button', { name: /전체 문제 풀기/ }).click();
  check((await page.locator('.quiz-count').innerText()).startsWith('1 / 100'), '전체 모드: 1 / 100');

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
