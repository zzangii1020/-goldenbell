import type { Difficulty } from '../data/types';

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  basic: '기본 개념',
  detail: '세부 내용',
  tricky: '헷갈리는 내용',
  hard: '고난도',
};

export const CIRCLED = ['①', '②', '③', '④'];

export function formatTime(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
