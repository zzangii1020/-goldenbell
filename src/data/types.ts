export type QuestionType = 'multiple' | 'short';

/**
 * 난이도
 * - basic  : 기본 개념형
 * - detail : 세부 내용 확인형
 * - tricky : 헷갈리기 쉬운 내용형
 * - hard   : 고난도 암기/정밀 독서형
 */
export type Difficulty = 'basic' | 'detail' | 'tricky' | 'hard';

export type Category =
  | '프롤로그'
  | '1장 직접 경험의 내리막'
  | '2장 대면 상호작용의 필요성'
  | '3장 손으로 써야만 배울 수 있는 것'
  | '4장 기다림과 지루함의 기능'
  | '5장 감정 길들이기'
  | '6장 기술로 매개된 쾌락'
  | '7장 소멸하는 장소, 개인화된 공간'
  | '에필로그';

interface BaseQuestion {
  /** 고유 ID. 한 번 정한 뒤에는 바꾸지 말 것 (학습 기록이 ID 기준으로 저장됨) */
  id: string;
  question: string;
  explanation: string;
  /** 책(인쇄본) 쪽수. PDF 쪽수는 src/data/pages.ts 에서 자동 계산 */
  sourcePage: number;
  difficulty: Difficulty;
  category: Category;
  /** 즐겨찾기 기본값. 실제 즐겨찾기 상태는 localStorage 에 저장된다. */
  favorite?: boolean;
}

export interface MultipleQuestion extends BaseQuestion {
  type: 'multiple';
  /** 반드시 4개 */
  choices: [string, string, string, string];
  /** 정답 선택지의 인덱스 (0~3) */
  answer: 0 | 1 | 2 | 3;
}

export interface ShortQuestion extends BaseQuestion {
  type: 'short';
  /** 대표 정답 */
  answer: string;
  /** 띄어쓰기·표기 차이를 고려한 인정 답안 (대표 정답은 자동 포함) */
  acceptableAnswers: string[];
}

export type Question = MultipleQuestion | ShortQuestion;
