import { describe, expect, it } from 'vitest';
import { questions, multipleQuestions, shortQuestions } from '../src/data/questions';
import { toPdfPage } from '../src/data/pages';
import { normalizeAnswer } from '../src/lib/grading';

describe('문제 데이터', () => {
  it('총 100문제: 객관식 50 + 주관식 50', () => {
    expect(questions).toHaveLength(100);
    expect(multipleQuestions.filter((q) => q.type === 'multiple')).toHaveLength(50);
    expect(shortQuestions.filter((q) => q.type === 'short')).toHaveLength(50);
  });

  it('id 가 모두 고유하다', () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('같은 문제 문장이 중복되지 않는다', () => {
    const texts = questions.map((q) => q.question.replace(/\s/g, ''));
    expect(new Set(texts).size).toBe(texts.length);
  });

  it('객관식: 보기 4개, 보기 중복 없음, 정답 인덱스 유효', () => {
    for (const q of questions) {
      if (q.type !== 'multiple') continue;
      expect(q.choices, q.id).toHaveLength(4);
      expect(new Set(q.choices).size, q.id).toBe(4);
      expect([0, 1, 2, 3], q.id).toContain(q.answer);
      for (const c of q.choices) expect(c.trim().length, q.id).toBeGreaterThan(0);
    }
  });

  it('객관식 정답 위치가 한쪽으로 몰리지 않는다', () => {
    const counts = [0, 0, 0, 0];
    for (const q of questions) if (q.type === 'multiple') counts[q.answer]++;
    for (const c of counts) expect(c).toBeGreaterThanOrEqual(9);
  });

  it('주관식: 대표 정답이 있고, 인정 답안끼리 정규화 후 서로 다른 문제의 정답과 겹치지 않는다', () => {
    const owner = new Map<string, string>();
    for (const q of questions) {
      if (q.type !== 'short') continue;
      expect(q.answer.trim().length, q.id).toBeGreaterThan(0);
      for (const a of [q.answer, ...q.acceptableAnswers]) {
        const n = normalizeAnswer(a);
        expect(n.length, `${q.id}:${a}`).toBeGreaterThan(0);
        const prev = owner.get(n);
        if (prev) expect(prev, `${q.id} 와 ${prev} 의 정답이 겹침: ${a}`).toBe(q.id);
        owner.set(n, q.id);
      }
    }
  });

  it('모든 문제에 해설·출처·난이도·분류가 있다', () => {
    for (const q of questions) {
      expect(q.explanation.length, q.id).toBeGreaterThan(10);
      expect(q.sourcePage, q.id).toBeGreaterThanOrEqual(0);
      expect(q.sourcePage, q.id).toBeLessThanOrEqual(237);
      expect(['basic', 'detail', 'tricky', 'hard']).toContain(q.difficulty);
      expect(q.category.length).toBeGreaterThan(0);
    }
  });

  it('출처 쪽수가 PDF(220쪽) 범위 안으로 변환된다', () => {
    for (const q of questions) {
      if (q.sourcePage === 0) continue;
      const pdf = toPdfPage(q.sourcePage);
      expect(pdf, q.id).toBeGreaterThanOrEqual(1);
      expect(pdf, q.id).toBeLessThanOrEqual(220);
    }
  });

  it('쪽수 변환이 PDF 에서 직접 확인한 기준점과 일치한다', () => {
    expect(toPdfPage(11)).toBe(5);
    expect(toPdfPage(51)).toBe(44);
    expect(toPdfPage(91)).toBe(82);
    expect(toPdfPage(138)).toBe(128);
    expect(toPdfPage(173)).toBe(162);
    expect(toPdfPage(214)).toBe(198);
    expect(toPdfPage(235)).toBe(218);
  });

  it('난이도 분포가 대략 기본30/세부40/헷갈림20/고난도10 에 가깝다', () => {
    const c = { basic: 0, detail: 0, tricky: 0, hard: 0 };
    for (const q of questions) c[q.difficulty]++;
    expect(c.basic).toBeGreaterThanOrEqual(22);
    expect(c.detail).toBeGreaterThanOrEqual(30);
    expect(c.tricky).toBeGreaterThanOrEqual(14);
    expect(c.hard).toBeGreaterThanOrEqual(6);
  });

  it('모든 장에서 고르게 출제된다', () => {
    const byCat = new Map<string, number>();
    for (const q of questions) byCat.set(q.category, (byCat.get(q.category) ?? 0) + 1);
    expect(byCat.size).toBe(7);
    for (const n of byCat.values()) expect(n).toBeGreaterThanOrEqual(8);
  });
});
