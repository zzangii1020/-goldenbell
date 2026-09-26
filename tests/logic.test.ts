import { describe, expect, it } from 'vitest';
import { questions } from '../src/data/questions';
import type { ShortQuestion } from '../src/data/types';
import { gradeAnswer, gradeShort, normalizeAnswer } from '../src/lib/grading';
import {
  emptyState,
  isWrongNow,
  recordAttempt,
  sanitizeState,
  toggleFavorite,
  wrongIds,
} from '../src/lib/progress';
import { createSession, idsForMode } from '../src/lib/session';

const short = (id: string) => questions.find((q) => q.id === id) as ShortQuestion;

describe('주관식 채점', () => {
  it('띄어쓰기·대소문자·문장부호 차이를 허용한다', () => {
    expect(gradeShort(short('s01'), '센서리엄')).toBe(true);
    expect(gradeShort(short('s01'), ' Sensorium ')).toBe(true);
    expect(gradeShort(short('s12'), '경험경제')).toBe(true);
    expect(gradeShort(short('s14'), '너 자신을 보여라.')).toBe(true);
    expect(gradeShort(short('s79'), '사진 트로피')).toBe(true);
    expect(gradeShort(short('s79'), '"사진-트로피"')).toBe(true);
    expect(gradeShort(short('s08'), 'veja du')).toBe(true);
    expect(gradeShort(short('s08'), 'vêja du')).toBe(true);
    expect(gradeShort(short('s85'), 'Proxemics')).toBe(true);
    expect(gradeShort(short('s89'), 'pplkpr')).toBe(true);
    expect(gradeShort(short('s89'), 'People Keeper')).toBe(true);
    expect(gradeShort(short('s84'), '뿌리뽑힘')).toBe(true);
    expect(gradeShort(short('s83'), 'iSpace')).toBe(true);
    expect(gradeShort(short('s04'), '선택이다')).toBe(true);
    expect(gradeShort(short('s23'), '200가지')).toBe(true);
  });

  it('인정 답안에 없는 표현은 틀린 것으로 처리한다 (너무 느슨하지 않게)', () => {
    expect(gradeShort(short('s01'), '센서')).toBe(false);
    expect(gradeShort(short('s01'), '')).toBe(false);
    expect(gradeShort(short('s04'), '필연')).toBe(false);
    expect(gradeShort(short('s27'), '사회적 유리')).toBe(false);
    expect(gradeShort(short('s75'), '쾌락 원리')).toBe(false);
    expect(gradeShort(short('s23'), '20')).toBe(false);
    expect(gradeShort(short('s82'), '공간')).toBe(false);
    expect(gradeShort(short('s87'), '특권')).toBe(false);
  });

  it('normalizeAnswer', () => {
    expect(normalizeAnswer('  CAD 자키 ')).toBe('cad자키');
    expect(normalizeAnswer('《그녀》')).toBe('그녀');
  });
});

describe('객관식 채점', () => {
  it('정답 인덱스만 맞음', () => {
    const q = questions.find((x) => x.type === 'multiple')!;
    if (q.type !== 'multiple') throw new Error();
    expect(gradeAnswer(q, q.answer)).toBe(true);
    expect(gradeAnswer(q, (q.answer + 1) % 4)).toBe(false);
  });
});

describe('오답·정답 확인·즐겨찾기 규칙', () => {
  it('틀리면 오답 노트에 들어가고, 다시 맞히면 빠지지만 과거 오답 이력은 남는다', () => {
    let s = emptyState();
    s = recordAttempt(s, 'm01', 'wrong', '0');
    expect(isWrongNow(s, 'm01')).toBe(true);
    s = recordAttempt(s, 'm01', 'correct', '1');
    expect(isWrongNow(s, 'm01')).toBe(false);
    expect(s.records.m01.everWrong).toBe(true);
    expect(s.records.m01.wrongCount).toBe(1);
    expect(s.records.m01.correctCount).toBe(1);
    expect(s.history).toHaveLength(2);
  });

  it('정답 확인을 누르면 틀린 문제로 기록된다', () => {
    let s = emptyState();
    s = recordAttempt(s, 's01', 'revealed', null);
    expect(isWrongNow(s, 's01')).toBe(true);
    expect(s.records.s01.revealedCount).toBe(1);
    expect(s.records.s01.everWrong).toBe(true);
  });

  it('즐겨찾기와 오답은 독립적이다', () => {
    let s = emptyState();
    s = toggleFavorite(s, 'm02');
    s = recordAttempt(s, 'm02', 'wrong', '3');
    expect(s.favorites).toContain('m02');
    expect(isWrongNow(s, 'm02')).toBe(true);
    s = recordAttempt(s, 'm02', 'correct', '0');
    expect(s.favorites).toContain('m02');
    s = toggleFavorite(s, 'm02');
    expect(s.favorites).not.toContain('m02');
  });

  it('모드별 문제 수', () => {
    let s = emptyState();
    expect(idsForMode('all', questions, s)).toHaveLength(100);
    expect(idsForMode('multiple', questions, s)).toHaveLength(50);
    expect(idsForMode('short', questions, s)).toHaveLength(50);
    expect(idsForMode('wrong', questions, s)).toHaveLength(0);
    expect(createSession('wrong', questions, s, 'random')).toBeNull();
    s = recordAttempt(s, 'm03', 'wrong', '0');
    s = recordAttempt(s, 's03', 'revealed', null);
    expect(wrongIds(s, questions.map((q) => q.id))).toEqual(['m03', 's03']);
    const session = createSession('wrong', questions, s, 'sequential')!;
    expect(session.questionIds).toEqual(['m03', 's03']);
  });

  it('랜덤 모드는 문제와 보기 순서를 섞되 모든 문제를 포함한다', () => {
    const session = createSession('all', questions, emptyState(), 'random')!;
    expect(new Set(session.questionIds).size).toBe(100);
    for (const order of Object.values(session.choiceOrder)) expect([...order].sort()).toEqual([0, 1, 2, 3]);
  });

  it('손상된 저장값도 안전하게 복구한다', () => {
    expect(sanitizeState('garbage').records).toEqual({});
    expect(sanitizeState({ records: { m01: { attempts: 2 } }, favorites: ['m01', 3] }).favorites).toEqual(['m01']);
  });
});
