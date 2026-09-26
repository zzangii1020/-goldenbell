# -goldenbell

## 《경험의 멸종》 독서 골든벨 문제풀이 앱

크리스틴 로젠 《경험의 멸종》(이영래 옮김, 어크로스) 독서 골든벨 대비용 웹앱입니다.
객관식 50문제 + 주관식 50문제, 총 100문제입니다.

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

문제는 `src/data/questions.ts` 한 파일에 있습니다.

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

첨부 PDF(촬영본 4개 파일 001-220 + 추가 zip 221-317, 총 317쪽)는 책 전체(프롤로그~7장·에필로그,
p.1~334)를 담고 있으며, PDF에서 빠진 5장 p.209~213은 별도 사진으로 받아 반영했습니다. 모든 문제는 이 범위의 실제 내용만으로
출제했습니다(감사의 말과 6장의 성인 내용 부분은 출제 제외).

장별 문제 수: 프롤로그 9 · 1장 12 · 2장 13 · 3장 12 · 4장 12 · 5장 13 · 6장 14 · 7장 10 · 에필로그 5
책 쪽수 → PDF 쪽수 변환표는 `src/data/pages.ts` 에 있습니다.

## 구조

```
src/
  data/questions.ts     문제 100개
  data/pages.ts         책 쪽수 → PDF 쪽수 변환
  lib/grading.ts        채점(주관식 정규화)
  lib/progress.ts       학습 기록 모델(오답/정답 확인/즐겨찾기 규칙)
  lib/session.ts        풀이 세션(모드별 문제 목록, 랜덤)
  lib/storage.ts        localStorage 입출력
  components/           Home, Quiz, QuestionCard, MultipleChoiceQuestion,
                        ShortAnswerQuestion, AnswerFeedback, JumpSheet, Result, Progress
tests/                  단위 테스트
scripts/e2e.mjs         브라우저 E2E 테스트
```
