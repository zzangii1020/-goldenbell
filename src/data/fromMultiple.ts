import type { Question, ShortQuestion } from './types';

/**
 * 객관식 문제의 정답을 주관식으로 다시 묻는 문제.
 * [객관식 id, 주관식 문제, 대표 정답, 인정 답안]
 * 장·쪽수·난이도·해설은 원래 객관식 문제에서 그대로 가져온다(PDF 근거 유지).
 */
export type FromMultipleSpec = [mcId: string, question: string, answer: string, acceptable?: string[]];

export function buildFromMultiple(multipleQuestions: Question[], specs: FromMultipleSpec[]): ShortQuestion[] {
  return specs.map(([mcId, question, answer, acceptable = []]) => {
    const mc = multipleQuestions.find((q) => q.id === mcId);
    if (!mc || mc.type !== 'multiple') throw new Error(`객관식 문제 ${mcId} 가 없습니다`);
    return {
      id: `x${mcId}`,
      type: 'short',
      category: mc.category,
      difficulty: mc.difficulty,
      sourcePage: mc.sourcePage,
      question,
      answer,
      acceptableAnswers: acceptable,
      explanation: `객관식 정답: ${mc.choices[mc.answer]}. ${mc.explanation}`,
      fromMultiple: mcId,
    };
  });
}
