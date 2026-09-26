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
  const s = read(SESSION_KEY) as SessionState | null;
  return s && Array.isArray(s.questionIds) && typeof s.index === 'number' ? s : null;
};
export const saveSession = (s: SessionState | null) => write(SESSION_KEY, s);
