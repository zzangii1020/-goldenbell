# -goldenbell

## 독서 골든벨 문제풀이 앱

독서 골든벨 대비용 웹앱입니다. 앱을 열면 책을 고르는 화면이 먼저 나옵니다.

| 책 | 문제 | 출제 범위 |
|---|---|---|
| 《경험의 멸종》 크리스틴 로젠 (이영래 옮김, 어크로스) | 객관식 50 + 주관식 50 | 책 p.1~331, 프롤로그~에필로그 |
| 《식물의 사회생활》 이영숙·최배영 (동아시아) | 객관식 50 + 주관식 50 | 책 p.1~320, 1장~13장·맺음말 |

학습 기록(오답·즐겨찾기·진도)은 책마다 따로 저장됩니다.

## 실행 방법

Node.js 18 이상이 필요합니다.

```bash
npm install
npm run dev        # 개발 서버 → 터미널에 표시되는 주소(예: http://localhost:5173/-goldenbell/)로 접속
```

휴대폰에서 보려면 `npm run dev -- --host` 로 실행한 뒤, 같은 와이파이에 연결된 휴대폰에서
터미널에 표시된 `Network:` 주소로 접속하면 됩니다.

배포용 빌드:

```bash
npm run build      # dist/ 폴더 생성 (정적 파일이라 GitHub Pages·Netlify 등 어디에나 올릴 수 있음)
npm run preview    # 빌드 결과 확인
```

테스트:

```bash
npm test           # 문제 데이터 검증 + 채점/오답/즐겨찾기 로직 단위 테스트
npm run build && npm run test:e2e   # 실제 Chromium 브라우저(아이폰 화면 크기)에서 100문제 전체 풀이 포함 흐름 테스트
```

## 배포 (GitHub Pages)

- 접속 주소: **https://zzangii1020.github.io/-goldenbell/**
- `main` 브랜치에 push하면 `.github/workflows/deploy.yml` 이 테스트 → 빌드 → `gh-pages` 브랜치 갱신을 자동으로 실행하고, GitHub Pages가 `gh-pages` 브랜치를 게시합니다.
- 저장소 이름을 바꾸면 `vite.config.ts` 의 `base` 를 `'/<새 저장소 이름>/'` 로 바꿔야 합니다.
- 로컬에서 `npm run dev` 로 실행하면 `http://localhost:5173/-goldenbell/` 로 접속합니다.

## 요약 노트 PDF

- 경험의 멸종: https://zzangii1020.github.io/-goldenbell/study-guide.pdf
- 식물의 사회생활: https://zzangii1020.github.io/-goldenbell/study-guide-plant.pdf
- 각 책 홈 화면의 "📄 요약 노트 PDF" 버튼으로도 열 수 있습니다.
- 원본: `scripts/study-guide/guide.html`, `guide-plant.html` → `node scripts/study-guide/build.mjs` 로 `public/` 의 PDF를 다시 만듭니다.

## 주요 기능

- 메인: 전체/객관식/주관식/틀린 문제/즐겨찾기 개수, 랜덤·순서대로 선택, 이어서 풀기
- 풀이: `문제 12 / 50` + 진행률, 정답 제출 / **정답 확인**(누르면 틀린 문제로 기록) / ☆ 즐겨찾기
- 제출 후 정답·해설·출처(책 쪽수 + PDF 쪽수) 표시, 다음 문제
- 번호 직접 이동(상단 `12 / 50 ▾` 누르기), 현재 문제의 오답·즐겨찾기 상태 배지
- 틀린 문제 다시 풀기: 마지막 풀이 결과 기준. 다시 맞히면 목록에서 빠지고, 과거 오답 이력은 남음
- 결과 화면: 처음부터 다시 풀기 / 오답만 다시 풀기 / 즐겨찾기만 풀기
- 학습 현황: 전체·객관식·주관식 진행률, 맞힌/틀린/즐겨찾기/안 푼 문제, 정답률, 장별 진행, 최근 풀이 기록, 초기화
- 모든 기록은 브라우저 `localStorage` 에 저장되어 새로고침해도 유지

## 문제 수정·추가

문제는 책마다 `src/data/extinction/questions.ts`, `src/data/plant/questions.ts` 에 있습니다.

```ts
{
  id: 's81',                 // 새 고유 ID (기존 ID는 바꾸지 마세요 — 학습 기록이 ID 기준)
  type: 'short',             // 'multiple' | 'short'
  category: C3,              // 장
  difficulty: 'detail',      // basic | detail | tricky | hard
  sourcePage: 99,            // 책(인쇄본) 쪽수. PDF 쪽수는 자동 계산
  question: '...',
  answer: '대표 정답',
  acceptableAnswers: ['인정 답안1', 'english'],   // 주관식만
  explanation: '...',
}
```

객관식은 `choices` 에 보기 4개, `answer` 에 정답 인덱스(0~3)를 적습니다.
수정 후 `npm test` 를 실행하면 보기 개수·정답 인덱스·ID 중복·정답 겹침 등을 자동으로 검사합니다.

주관식 채점은 띄어쓰기·대소문자·문장부호·악센트 차이만 무시하고, 그 외에는 `answer` 또는
`acceptableAnswers` 와 정확히 일치해야 정답으로 처리합니다.

## 출제 범위

### 《경험의 멸종》
첨부 PDF(촬영본 4개 파일 001-220 + 추가 zip 221-317, 총 317쪽)는 책 전체(p.1~334)를 담고 있으며, PDF에서 빠진 5장 p.209~213은
별도 사진으로 받아 반영했습니다(감사의 말과 6장의 성인 내용 부분은 출제 제외).
장별 문제 수: 프롤로그 9 · 1장 12 · 2장 13 · 3장 12 · 4장 12 · 5장 13 · 6장 14 · 7장 10 · 에필로그 5

### 《식물의 사회생활》
첨부 PDF(촬영본 4개 파일 001-276 + 추가 파일 277-341, 총 341쪽)는 책 p.1~331을 담고 있습니다.
머리말~맺음말(p.320)에서 출제했고, 감사의 말과 부록(DNA 염기서열 분석)은 제외했습니다.
PDF p.93~112에 끼어 있는 다른 책(《역사 속의 문화기행》) 20쪽도 제외했습니다.
13장·맺음말을 추가하면서 기존 문제 16개(비중이 컸던 4장·7장 위주)를 빼고 새 문제 16개로 바꿔 50/50을 유지했습니다.
남은 문제의 id는 그대로여서 기존 학습 기록이 이어집니다.
장별 문제 수: 1장 9 · 2장 8 · 3장 8 · 4장 8 · 5장 7 · 6장 5 · 7장 9 · 8장 7 · 9장 7 · 10장 7 · 11장 1 · 12장 9 · 13장 13 · 맺음말 2

책 쪽수 → PDF 쪽수 변환표는 `src/data/<책>/pages.ts` 에 있습니다.

## 구조

```
src/
  App.tsx                    책 선택 ↔ 책별 앱 전환
  BookApp.tsx                한 권의 문제풀이 앱 (홈·풀이·결과·학습 현황)
  data/books.ts              책 목록 (제목·문제·출처 변환·요약 노트)
  data/extinction/           경험의 멸종: questions.ts, pages.ts
  data/plant/                식물의 사회생활: questions.ts, pages.ts
  lib/grading.ts             채점(주관식 정규화)
  lib/progress.ts            학습 기록 모델(오답/정답 확인/즐겨찾기 규칙)
  lib/session.ts             풀이 세션(모드별 문제 목록, 랜덤)
  lib/storage.ts             localStorage 입출력 (책별 키)
  components/                BookSelect, Home, Quiz, QuestionCard, MultipleChoiceQuestion,
                             ShortAnswerQuestion, AnswerFeedback, JumpSheet, Result, Progress
tests/                       단위 테스트 (두 책 모두)
scripts/e2e.mjs              브라우저 E2E 테스트 (두 책 200문제 전체 풀이 포함)
scripts/study-guide/         요약 노트 원본 HTML과 PDF 생성 스크립트
```
