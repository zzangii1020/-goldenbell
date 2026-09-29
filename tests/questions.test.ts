import { describe, expect, it } from 'vitest';
import { BOOKS } from '../src/data/books';
import * as extinction from '../src/data/extinction/questions';
import * as extinctionPages from '../src/data/extinction/pages';
import * as plant from '../src/data/plant/questions';
import * as plantPages from '../src/data/plant/pages';
import * as city from '../src/data/city/questions';
import * as cityPages from '../src/data/city/pages';
import type { Difficulty, Question } from '../src/data/types';
import { normalizeAnswer } from '../src/lib/grading';

interface Case {
  name: string;
  multipleQuestions: Question[];
  shortQuestions: Question[];
  questions: Question[];
  toPdfPage: (p: number) => number;
  /** 문제 출처로 쓸 수 있는 책 쪽수 범위 */
  maxBookPage: number;
  pdfPages: number;
  /** PDF 에 없어 PDF 쪽수 검사에서 제외할 책 쪽 */
  skip: (p: number) => boolean;
  chapters: number;
  /** 문제가 적어도 되는 장(에필로그·짧은 장) */
  minPerChapter: (category: string) => number;
}

const CASES: Case[] = [
  {
    name: '경험의 멸종',
    ...extinction,
    toPdfPage: extinctionPages.toPdfPage,
    maxBookPage: 331,
    pdfPages: 317,
    skip: (p) => p === 0 || (p >= 209 && p <= 213),
    chapters: 9,
    minPerChapter: (c) => (c === '에필로그' ? 5 : 8),
  },
  {
    name: '식물의 사회생활',
    ...plant,
    toPdfPage: plantPages.toPdfPage,
    maxBookPage: 320,
    pdfPages: 341,
    skip: () => false,
    chapters: 14,
    minPerChapter: (c) =>
      c.startsWith('11장') ? 1 : c === '맺음말' ? 2 : c.startsWith('6장') ? 5 : 7,
  },
  {
    name: '도시는 무엇으로 사는가',
    ...city,
    toPdfPage: cityPages.toPdfPage,
    maxBookPage: 383,
    pdfPages: 357,
    skip: () => false,
    chapters: 17,
    minPerChapter: (c) => (c === '추천사·머리말' ? 3 : c === '맺음말' ? 2 : 6),
  },
];

describe('책 목록', () => {
  it('세 권의 책과 지은이·출판사 문제가 있고 id 가 고유하다', () => {
    expect(BOOKS.map((b) => b.id)).toEqual(['extinction', 'plant', 'city', 'authors']);
  });

  it('책들의 문제 id 가 서로 겹치지 않는다', () => {
    const all = BOOKS.flatMap((b) => b.questions.map((q) => q.id));
    expect(new Set(all).size).toBe(all.length);
  });
});

for (const c of CASES) {
  const { questions } = c;

  describe(`문제 데이터 — ${c.name}`, () => {
    it('총 100문제: 객관식 50 + 주관식 50', () => {
      expect(questions).toHaveLength(100);
      expect(c.multipleQuestions.filter((q) => q.type === 'multiple')).toHaveLength(50);
      expect(c.shortQuestions.filter((q) => q.type === 'short')).toHaveLength(50);
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
        for (const ch of q.choices) expect(ch.trim().length, q.id).toBeGreaterThan(0);
      }
    });

    it('객관식 정답 위치가 한쪽으로 몰리지 않는다', () => {
      const counts = [0, 0, 0, 0];
      for (const q of questions) if (q.type === 'multiple') counts[q.answer]++;
      for (const n of counts) expect(n).toBeGreaterThanOrEqual(9);
    });

    it('주관식: 대표 정답이 있고, 인정 답안이 다른 문제의 정답과 겹치지 않는다', () => {
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
        expect(q.sourcePage, q.id).toBeLessThanOrEqual(c.maxBookPage);
        expect(['basic', 'detail', 'tricky', 'hard']).toContain(q.difficulty);
        expect(q.category.length).toBeGreaterThan(0);
      }
    });

    it(`출처 쪽수가 PDF(${c.pdfPages}쪽) 범위 안으로 변환된다`, () => {
      for (const q of questions) {
        if (c.skip(q.sourcePage)) continue;
        const pdf = c.toPdfPage(q.sourcePage);
        expect(pdf, q.id).toBeGreaterThanOrEqual(1);
        expect(pdf, q.id).toBeLessThanOrEqual(c.pdfPages);
      }
    });

    it('난이도 분포가 대략 기본30/세부40/헷갈림20/고난도10 에 가깝다', () => {
      const n: Record<Difficulty, number> = { basic: 0, detail: 0, tricky: 0, hard: 0 };
      for (const q of questions) n[q.difficulty]++;
      expect(n.basic).toBeGreaterThanOrEqual(22);
      expect(n.detail).toBeGreaterThanOrEqual(30);
      expect(n.tricky).toBeGreaterThanOrEqual(14);
      expect(n.hard).toBeGreaterThanOrEqual(6);
    });

    it('모든 장에서 고르게 출제된다', () => {
      const byCat = new Map<string, number>();
      for (const q of questions) byCat.set(q.category, (byCat.get(q.category) ?? 0) + 1);
      expect(byCat.size).toBe(c.chapters);
      for (const [cat, n] of byCat) expect(n, cat).toBeGreaterThanOrEqual(c.minPerChapter(cat));
    });
  });
}

describe('출처 표시', () => {
  it('식물의 사회생활: 추가 파일은 파일 안 쪽수도 보여준다', () => {
    expect(plantPages.formatSource(19)).toBe('책 p.19 · PDF p.11 (001-069 파일)');
    expect(plantPages.formatSource(271)).toBe('책 p.271 · PDF p.281 (277-341 파일, 파일 안 5쪽)');
  });
  it('도시는 무엇으로 사는가: 파일 안 쪽수', () => {
    expect(cityPages.formatSource(29)).toBe('책 p.29 · PDF p.23 (001-075 파일, 파일 안 23쪽)');
    expect(cityPages.formatSource(343)).toBe('책 p.343 · PDF p.318 (301-357 파일, 파일 안 18쪽)');
    expect(cityPages.formatSource(264)).toBe('책 p.264 · PDF p.243 (226-300 zip의 01-40 파일, 파일 안 18쪽)');
    expect(cityPages.formatSource(308)).toBe('책 p.308 · PDF p.285 (226-300 zip의 41-75 파일, 파일 안 20쪽)');
  });
});

describe('쪽수 변환이 PDF 에서 직접 확인한 기준점과 일치한다', () => {
  it('경험의 멸종', () => {
    const p = extinctionPages.toPdfPage;
    expect(p(11)).toBe(5);
    expect(p(51)).toBe(44);
    expect(p(91)).toBe(82);
    expect(p(138)).toBe(128);
    expect(p(173)).toBe(162);
    expect(p(214)).toBe(198);
    expect(p(235)).toBe(218);
    expect(p(238)).toBe(221); // 추가 zip 01-55.pdf 첫 쪽
    expect(p(278)).toBe(261);
    expect(p(315)).toBe(298); // 에필로그
    expect(p(334)).toBe(317); // zip 56-97.pdf 마지막 쪽
  });

  it('식물의 사회생활', () => {
    const p = plantPages.toPdfPage;
    expect(p(17)).toBe(9); // 1장 첫 쪽
    expect(p(100)).toBe(92); // 다른 책이 끼어들기 직전
    expect(p(101)).toBe(113); // 다른 책 20쪽 뒤
    expect(p(144)).toBe(156);
    expect(p(149)).toBe(160); // 7장
    expect(p(207)).toBe(218);
    expect(p(221)).toBe(231); // 9장
    expect(p(264)).toBe(274);
    expect(p(266)).toBe(276); // 첫 PDF 4개 파일의 마지막 쪽
    expect(p(267)).toBe(277); // 추가 파일 277-341 첫 쪽
    expect(p(271)).toBe(281); // 13장
    expect(p(316)).toBe(326); // 맺음말
    expect(p(331)).toBe(341); // 추가 파일 마지막 쪽
  });

  it('도시는 무엇으로 사는가', () => {
    const p = cityPages.toPdfPage;
    expect(p(11)).toBe(8); // 추천사
    expect(p(13)).toBe(10);
    expect(p(15)).toBe(11); // 머리말
    expect(p(18)).toBe(14);
    expect(p(21)).toBe(15); // 1장
    expect(p(49)).toBe(42); // 2장
    expect(p(64)).toBe(57);
    expect(p(97)).toBe(87); // 4장
    expect(p(123)).toBe(111); // 5장
    expect(p(143)).toBe(129); // 6장
    expect(p(161)).toBe(147); // 7장
    expect(p(187)).toBe(171); // 8장
    expect(p(205)).toBe(187); // 9장
    expect(p(229)).toBe(209); // 10장
    expect(p(245)).toBe(225); // 151-225 파일 마지막 쪽
    expect(p(246)).toBe(226); // 추가 zip 첫 쪽
    expect(p(249)).toBe(228); // 11장
    expect(p(270)).toBe(249);
    expect(p(273)).toBe(251); // 12장
    expect(p(294)).toBe(272);
    expect(p(297)).toBe(274); // 13장
    expect(p(318)).toBe(295);
    expect(p(321)).toBe(297); // 14장
    expect(p(324)).toBe(300); // 추가 zip 마지막 쪽
    expect(p(325)).toBe(301); // 301-357 파일 첫 쪽
    expect(p(341)).toBe(317); // 15장 속표지
    expect(p(343)).toBe(318);
    expect(p(375)).toBe(350);
    expect(p(377)).toBe(351); // 맺음말
    expect(p(383)).toBe(357); // 마지막 쪽
  });
});
