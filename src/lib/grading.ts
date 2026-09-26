import type { Question, ShortQuestion } from '../data/types';

/**
 * 주관식 비교용 정규화.
 * - 대소문자, 공백, 따옴표·괄호·가운뎃점·하이픈 등 문장부호 차이를 무시한다.
 * - 악센트(ê → e)를 제거한다.
 * - 끝에 붙인 "입니다/이다/다" 같은 서술어는 떼어낸다.
 * 의미가 다른 단어까지 맞다고 보지 않도록, 정규화 후에는 "완전 일치"로만 비교한다.
 */
export function normalizeAnswer(input: string): string {
  let s = input.normalize('NFKC').toLowerCase().trim();
  s = s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
  s = s.replace(/[\s'"“”‘’`.,!?·•ㆍ\-–—_~:;()[\]{}<>《》〈〉「」『』/\\]/g, '');
  s = s.replace(/(입니다|이에요|예요|이다|이요)$/u, '');
  return s;
}

export function acceptedAnswers(q: ShortQuestion): string[] {
  return [q.answer, ...q.acceptableAnswers];
}

export function gradeShort(q: ShortQuestion, input: string): boolean {
  const given = normalizeAnswer(input);
  if (!given) return false;
  return acceptedAnswers(q).some((a) => normalizeAnswer(a) === given);
}

export function gradeAnswer(q: Question, input: string | number): boolean {
  if (q.type === 'multiple') return Number(input) === q.answer;
  return gradeShort(q, String(input));
}

export function correctAnswerText(q: Question): string {
  if (q.type === 'multiple') return `${'①②③④'[q.answer]} ${q.choices[q.answer]}`;
  return q.answer;
}
