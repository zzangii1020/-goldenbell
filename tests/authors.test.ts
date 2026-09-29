import { describe, expect, it } from 'vitest';
import { BOOKS } from '../src/data/books';
import { questions } from '../src/data/authors/questions';
import type { ShortQuestion } from '../src/data/types';
import { gradeShort } from '../src/lib/grading';
import { emptyState } from '../src/lib/progress';
import { idsForMode } from '../src/lib/session';

describe('지은이·출판사 (세 책 공통, 주관식만)', () => {
  const shorts = questions as ShortQuestion[];

  it('모두 주관식이고 id·문제 문장이 고유하다', () => {
    expect(questions.length).toBeGreaterThanOrEqual(15);
    expect(questions.every((q) => q.type === 'short')).toBe(true);
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
    expect(new Set(questions.map((q) => q.question)).size).toBe(questions.length);
  });

  it('정답이 책 목록의 지은이·출판사·제목과 일치한다', () => {
    const books = BOOKS.filter((b) => b.kind === 'book');
    const facts = new Set(books.flatMap((b) => [b.author, b.publisher, b.title]));
    for (const q of shorts) {
      if (q.category === '지은이·옮긴이' && q.answer !== '이영래' && q.answer !== '최배영' && q.answer !== '이영숙')
        expect(facts.has(q.answer), q.id).toBe(true);
      if (q.category !== '지은이·옮긴이') expect(facts.has(q.answer), q.id).toBe(true);
    }
  });

  it('인정 답안과 표기 차이는 맞고, 엉뚱한 답은 틀린다', () => {
    for (const q of shorts) {
      for (const a of [q.answer, ` ${q.answer.toUpperCase()} `, ...q.acceptableAnswers])
        expect(gradeShort(q, a), `${q.id}:${a}`).toBe(true);
      expect(gradeShort(q, '민음사'), q.id).toBe(false);
    }
  });

  it('책 선택 화면의 네 번째 항목이며, 객관식 없이 주관식만 푼다', () => {
    const extra = BOOKS[3];
    expect(extra.id).toBe('authors');
    expect(extra.kind).toBe('extra');
    const s = emptyState();
    expect(idsForMode('multiple', extra.questions, s)).toHaveLength(0);
    expect(idsForMode('short', extra.questions, s)).toHaveLength(questions.length);
    expect(idsForMode('all', extra.questions, s)).toHaveLength(questions.length);
  });
});
