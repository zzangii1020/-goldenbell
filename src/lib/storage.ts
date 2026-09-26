import { sanitizeState, type StudyState } from './progress';
import type { SessionState } from './session';

const STATE_KEY = 'goldenbell.extinction.v1.state';
const SESSION_KEY = 'goldenbell.extinction.v1.session';

function read(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 사파리 개인정보 보호 모드 등에서 저장이 막혀도 앱은 계속 동작한다.
  }
}

export const loadState = (): StudyState => sanitizeState(read(STATE_KEY));
export const saveState = (s: StudyState) => write(STATE_KEY, s);

export const loadSession = (): SessionState | null => {
  const s = read(SESSION_KEY) as Partial<SessionState> | null;
  if (!s || !Array.isArray(s.questionIds) || typeof s.index !== 'number') return null;
  // 이전 형식이거나 손상된 값이어도 앱이 멈추지 않도록 보정
  return {
    mode: s.mode ?? 'all',
    order: s.order === 'sequential' ? 'sequential' : 'random',
    questionIds: s.questionIds.filter((id) => typeof id === 'string'),
    index: Math.max(0, Math.floor(s.index)),
    answers: s.answers && typeof s.answers === 'object' ? s.answers : {},
    choiceOrder: s.choiceOrder && typeof s.choiceOrder === 'object' ? s.choiceOrder : {},
    startedAt: typeof s.startedAt === 'number' ? s.startedAt : Date.now(),
    finished: !!s.finished,
  };
};
export const saveSession = (s: SessionState | null) => write(SESSION_KEY, s);
