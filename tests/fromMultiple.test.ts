import { describe, expect, it } from 'vitest';
import { BOOKS } from '../src/data/books';
import type { ShortQuestion } from '../src/data/types';
import { gradeShort, normalizeAnswer } from '../src/lib/grading';
import { emptyState } from '../src/lib/progress';
import { idsForMode } from '../src/lib/session';

for (const book of BOOKS.filter((b) => b.kind === 'book')) {
  const mcs = book.questions.filter((q) => q.type === 'multiple');
  const converted = book.questions.filter((q): q is ShortQuestion => q.type === 'short' && !!q.fromMultiple);
  const originalShort = book.questions.filter((q): q is ShortQuestion => q.type === 'short' && !q.fromMultiple);

  describe(`객관식 정답을 주관식으로 — ${book.title}`, () => {
    it('책마다 150문제: 객관식 50 + 주관식 50 + 객관식 정답 주관식 50', () => {
      expect(book.questions).toHaveLength(150);
      expect(mcs).toHaveLength(50);
      expect(originalShort).toHaveLength(50);
      expect(converted).toHaveLength(50);
    });

    it('객관식 50문제가 빠짐없이 한 번씩 주관식으로 바뀌었다', () => {
      const sources = converted.map((q) => q.fromMultiple);
      expect(new Set(sources).size).toBe(50);
      expect([...sources].sort()).toEqual(mcs.map((q) => q.id).sort());
    });

    it('장·쪽수·난이도는 원래 객관식 문제와 같다', () => {
      for (const q of converted) {
        const mc = mcs.find((m) => m.id === q.fromMultiple)!;
        expect(q.category, q.id).toBe(mc.category);
        expect(q.sourcePage, q.id).toBe(mc.sourcePage);
        expect(q.difficulty, q.id).toBe(mc.difficulty);
        expect(q.explanation, q.id).toContain(mc.explanation);
      }
    });

    it('문제 문장은 원래 객관식 문제 말고는 다른 문제와 겹치지 않는다', () => {
      const owner = new Map<string, string>();
      for (const q of book.questions) {
        const key = q.question.replace(/\s/g, '');
        const source = q.type === 'short' ? q.fromMultiple : undefined;
        const prev = owner.get(key);
        // 보기만 뺀 같은 문장은 허용 (객관식 정답을 그대로 주관식으로 묻는 문제)
        if (prev && prev !== source) throw new Error(`${q.id} 와 ${prev} 의 문제 문장이 겹침`);
        owner.set(key, q.id);
      }
    });

    it('정답(인정 답안 포함)이 기존 주관식을 포함한 다른 문제와 겹치지 않는다', () => {
      const owner = new Map<string, string>();
      for (const q of [...originalShort, ...converted]) {
        for (const a of [q.answer, ...q.acceptableAnswers]) {
          const n = normalizeAnswer(a);
          expect(n.length, `${q.id}:${a}`).toBeGreaterThan(0);
          const prev = owner.get(n);
          if (prev) expect(prev, `${q.id} 와 ${prev} 의 정답이 겹침: ${a}`).toBe(q.id);
          owner.set(n, q.id);
        }
      }
    });

    it('대표 정답·인정 답안·표기 차이는 맞고, 다른 문제의 정답은 틀린다', () => {
      converted.forEach((q, i) => {
        for (const a of [q.answer, ` ${q.answer.toUpperCase()} `, ...q.acceptableAnswers])
          expect(gradeShort(q, a), `${q.id}:${a}`).toBe(true);
        const other = converted[(i + 1) % converted.length];
        expect(gradeShort(q, other.answer), `${q.id} ← ${other.answer}`).toBe(false);
      });
    });

    it('풀이 모드: 주관식만 = 기존 50, 객관식 정답을 주관식으로 = 50', () => {
      const s = emptyState();
      expect(idsForMode('all', book.questions, s)).toHaveLength(150);
      expect(idsForMode('multiple', book.questions, s)).toHaveLength(50);
      expect(idsForMode('short', book.questions, s)).toEqual(originalShort.map((q) => q.id));
      expect(idsForMode('converted', book.questions, s)).toEqual(converted.map((q) => q.id));
    });
  });
}
