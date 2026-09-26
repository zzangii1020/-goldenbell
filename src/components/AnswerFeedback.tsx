import type { Question } from '../data/types';
import { formatSource } from '../data/pages';
import { CIRCLED } from '../lib/labels';
import type { SessionAnswer } from '../lib/session';

interface Props {
  question: Question;
  sessionAnswer: SessionAnswer;
  /** 객관식 보기 표시 순서 */
  order: number[];
}

export default function AnswerFeedback({ question: q, sessionAnswer, order }: Props) {
  const { result, answer } = sessionAnswer;

  const status =
    result === 'correct'
      ? { cls: 'ok', title: '정답입니다.', sub: '맞은 문제로 기록했습니다.' }
      : result === 'wrong'
        ? { cls: 'ng', title: '틀렸습니다.', sub: '틀린 문제(오답 노트)에 추가했습니다.' }
        : { cls: 'rv', title: '정답 확인', sub: '정답을 확인했으므로 틀린 문제로 기록했습니다.' };

  let correctText: string;
  let myText: string | null = null;
  if (q.type === 'multiple') {
    const pos = order.indexOf(q.answer);
    correctText = `${CIRCLED[pos]} ${q.choices[q.answer]}`;
    if (answer != null) {
      const orig = Number(answer);
      myText = `${CIRCLED[order.indexOf(orig)]} ${q.choices[orig]}`;
    }
  } else {
    correctText = q.answer;
    myText = answer;
  }

  return (
    <section className={`feedback ${status.cls}`} aria-live="polite">
      <p className="fb-status">{status.title}</p>
      <p className="fb-sub">{status.sub}</p>
      <dl className="fb-list">
        <div>
          <dt>정답</dt>
          <dd className="fb-answer">{correctText}</dd>
        </div>
        {q.type === 'short' && q.acceptableAnswers.length > 0 && (
          <div>
            <dt>인정 답안</dt>
            <dd className="fb-small">{q.acceptableAnswers.join(', ')}</dd>
          </div>
        )}
        {myText && result !== 'correct' && (
          <div>
            <dt>내 답</dt>
            <dd>{myText}</dd>
          </div>
        )}
        <div>
          <dt>해설</dt>
          <dd>{q.explanation}</dd>
        </div>
        <div>
          <dt>출처</dt>
          <dd className="fb-small">{formatSource(q.sourcePage)}</dd>
        </div>
      </dl>
    </section>
  );
}
