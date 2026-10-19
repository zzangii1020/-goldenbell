import { describe, expect, it } from 'vitest';
import { BOOKS } from '../src/data/books';
import { questions } from '../src/data/web/questions';
import { emptyState } from '../src/lib/progress';
import { idsForMode } from '../src/lib/session';

describe('웹프로그래밍 수업 노트 (서술형)', () => {
  it('노트 1~66번과 런타임, 모두 스스로 채점하는 서술형이다', () => {
    expect(questions).toHaveLength(67);
    expect(questions.map((q) => q.sourcePage)).toEqual(Array.from({ length: 67 }, (_, i) => i));
    for (const q of questions) {
      expect(q.type, q.id).toBe('short');
      if (q.type !== 'short') continue;
      expect(q.selfGrade, q.id).toBe(true);
      expect(q.answer.trim().length, q.id).toBeGreaterThan(0);
    }
    expect(new Set(questions.map((q) => q.id)).size).toBe(67);
    expect(new Set(questions.map((q) => q.question)).size).toBe(67);
  });

  it('책 선택 화면에서 세 책 다음, 지은이·출판사 앞에 있고 객관식이 없다', () => {
    const i = BOOKS.findIndex((b) => b.id === 'web');
    expect(i).toBe(3);
    expect(BOOKS[i].title).toBe('웹프로그래밍');
    const s = emptyState();
    expect(idsForMode('multiple', BOOKS[i].questions, s)).toHaveLength(0);
    expect(idsForMode('all', BOOKS[i].questions, s)).toHaveLength(67);
  });
});
