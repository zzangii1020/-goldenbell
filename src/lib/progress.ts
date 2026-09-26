/**
 * 학습 기록 모델과 순수 함수들 (localStorage 입출력은 storage.ts 에서 담당).
 *
 * 채점 규칙
 * - 정답 제출 → 맞음 : lastResult = 'correct'
 * - 정답 제출 → 틀림 : lastResult = 'wrong'
 * - 정답 확인 버튼   : lastResult = 'revealed' (틀린 문제로 취급)
 *
 * "현재 틀린 문제(오답 노트)"는 마지막 결과가 wrong/revealed 인 문제다.
 * 다시 맞히면 오답 노트에서 빠지지만, everWrong·wrongCount 로 과거 오답 이력은 남는다.
 */

export type AttemptResult = 'correct' | 'wrong' | 'revealed';

export interface QuestionRecord {
  attempts: number;
  correctCount: number;
  wrongCount: number;
  revealedCount: number;
  lastResult: AttemptResult | null;
  lastAnswer: string | null;
  lastAt: number | null;
  /** 한 번이라도 틀리거나 정답 확인을 누른 적이 있는지 */
  everWrong: boolean;
}

export interface HistoryEntry {
  questionId: string;
  result: AttemptResult;
  answer: string | null;
  at: number;
}

export type OrderMode = 'random' | 'sequential';

export interface StudyState {
  version: 1;
  records: Record<string, QuestionRecord>;
  favorites: string[];
  history: HistoryEntry[];
  order: OrderMode;
}

export const HISTORY_LIMIT = 300;

export function emptyState(): StudyState {
  return { version: 1, records: {}, favorites: [], history: [], order: 'random' };
}

export function emptyRecord(): QuestionRecord {
  return {
    attempts: 0,
    correctCount: 0,
    wrongCount: 0,
    revealedCount: 0,
    lastResult: null,
    lastAnswer: null,
    lastAt: null,
    everWrong: false,
  };
}

export function recordAttempt(
  state: StudyState,
  questionId: string,
  result: AttemptResult,
  answer: string | null,
  now: number = Date.now(),
): StudyState {
  const prev = state.records[questionId] ?? emptyRecord();
  const next: QuestionRecord = {
    attempts: prev.attempts + 1,
    correctCount: prev.correctCount + (result === 'correct' ? 1 : 0),
    wrongCount: prev.wrongCount + (result === 'wrong' ? 1 : 0),
    revealedCount: prev.revealedCount + (result === 'revealed' ? 1 : 0),
    lastResult: result,
    lastAnswer: answer,
    lastAt: now,
    everWrong: prev.everWrong || result !== 'correct',
  };
  const history = [{ questionId, result, answer, at: now }, ...state.history].slice(0, HISTORY_LIMIT);
  return { ...state, records: { ...state.records, [questionId]: next }, history };
}

export function toggleFavorite(state: StudyState, questionId: string): StudyState {
  const has = state.favorites.includes(questionId);
  return {
    ...state,
    favorites: has ? state.favorites.filter((id) => id !== questionId) : [...state.favorites, questionId],
  };
}

export function isWrongNow(state: StudyState, questionId: string): boolean {
  const r = state.records[questionId];
  return !!r && (r.lastResult === 'wrong' || r.lastResult === 'revealed');
}

export function wrongIds(state: StudyState, allIds: string[]): string[] {
  return allIds.filter((id) => isWrongNow(state, id));
}

export function favoriteIds(state: StudyState, allIds: string[]): string[] {
  const set = new Set(state.favorites);
  return allIds.filter((id) => set.has(id));
}

/** 불러온 값이 손상됐거나 이전 형식이어도 앱이 깨지지 않도록 보정 */
export function sanitizeState(raw: unknown): StudyState {
  const base = emptyState();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<StudyState>;
  const records: Record<string, QuestionRecord> = {};
  if (r.records && typeof r.records === 'object') {
    for (const [id, rec] of Object.entries(r.records)) {
      if (rec && typeof rec === 'object') records[id] = { ...emptyRecord(), ...rec };
    }
  }
  return {
    version: 1,
    records,
    favorites: Array.isArray(r.favorites) ? r.favorites.filter((x) => typeof x === 'string') : [],
    history: Array.isArray(r.history) ? r.history.slice(0, HISTORY_LIMIT) : [],
    order: r.order === 'sequential' ? 'sequential' : 'random',
  };
}

export function shuffle<T>(items: T[], rand: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
