import type { Question } from '../data/types';
import {
  favoriteIds,
  shuffle,
  wrongIds,
  type AttemptResult,
  type OrderMode,
  type StudyState,
} from './progress';

export type QuizMode = 'all' | 'multiple' | 'short' | 'converted' | 'wrong' | 'favorite';

export const MODE_LABEL: Record<QuizMode, string> = {
  all: '전체 문제',
  multiple: '객관식',
  short: '주관식',
  converted: '객관식 정답을 주관식으로',
  wrong: '틀린 문제 다시 풀기',
  favorite: '즐겨찾기 문제',
};

export interface SessionAnswer {
  result: AttemptResult;
  answer: string | null;
}

/** 진행 중인 한 번의 풀이. 새로고침해도 이어서 풀 수 있도록 localStorage 에 저장된다. */
export interface SessionState {
  mode: QuizMode;
  order: OrderMode;
  questionIds: string[];
  index: number;
  answers: Record<string, SessionAnswer>;
  /** 랜덤 모드에서 객관식 보기 순서 (원래 인덱스의 배열) */
  choiceOrder: Record<string, number[]>;
  startedAt: number;
  finished: boolean;
}

export function idsForMode(mode: QuizMode, all: Question[], state: StudyState): string[] {
  const allIds = all.map((q) => q.id);
  switch (mode) {
    case 'all':
      return allIds;
    case 'multiple':
      return all.filter((q) => q.type === 'multiple').map((q) => q.id);
    case 'short':
      return all.filter((q) => q.type === 'short' && !q.fromMultiple).map((q) => q.id);
    case 'converted':
      return all.filter((q) => q.type === 'short' && q.fromMultiple).map((q) => q.id);
    case 'wrong':
      return wrongIds(state, allIds);
    case 'favorite':
      return favoriteIds(state, allIds);
  }
}

export function createSession(
  mode: QuizMode,
  all: Question[],
  state: StudyState,
  order: OrderMode,
  rand: () => number = Math.random,
): SessionState | null {
  const ids = idsForMode(mode, all, state);
  if (ids.length === 0) return null;
  const questionIds = order === 'random' ? shuffle(ids, rand) : ids;
  const choiceOrder: Record<string, number[]> = {};
  if (order === 'random') {
    for (const q of all) {
      if (q.type === 'multiple' && questionIds.includes(q.id)) choiceOrder[q.id] = shuffle([0, 1, 2, 3], rand);
    }
  }
  return { mode, order, questionIds, index: 0, answers: {}, choiceOrder, startedAt: Date.now(), finished: false };
}

export function sessionSummary(s: SessionState) {
  const values = Object.values(s.answers);
  const correct = values.filter((a) => a.result === 'correct').length;
  const wrong = values.filter((a) => a.result === 'wrong').length;
  const revealed = values.filter((a) => a.result === 'revealed').length;
  return { total: s.questionIds.length, answered: values.length, correct, wrong, revealed };
}
