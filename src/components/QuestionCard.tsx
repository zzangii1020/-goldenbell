import { useEffect, useRef, useState } from 'react';
import type { Question } from '../data/types';
import { gradeAnswer } from '../lib/grading';
import type { AttemptResult, QuestionRecord } from '../lib/progress';
import type { SessionAnswer } from '../lib/session';
import { DIFFICULTY_LABEL } from '../lib/labels';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion';
import AnswerFeedback from './AnswerFeedback';

interface Props {
  question: Question;
  number: number;
  choiceOrder?: number[];
  sessionAnswer?: SessionAnswer;
  record?: QuestionRecord;
  isFavorite: boolean;
  isLast: boolean;
  onAnswer: (result: AttemptResult, answer: string | null) => void;
  onToggleFavorite: () => void;
  onNext: () => void;
  onPrev?: () => void;
}

export default function QuestionCard({
  question: q,
  number,
  choiceOrder,
  sessionAnswer,
  record,
  isFavorite,
  isLast,
  onAnswer,
  onToggleFavorite,
  onNext,
  onPrev,
}: Props) {
  const [selected, setSelected] = useState<number | null>(
    q.type === 'multiple' && sessionAnswer?.answer != null ? Number(sessionAnswer.answer) : null,
  );
  const [text, setText] = useState(q.type === 'short' ? (sessionAnswer?.answer ?? '') : '');
  const [hint, setHint] = useState<string | null>(null);

  const done = !!sessionAnswer;
  const feedbackRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const answeredHere = useRef(false);

  // 방금 답한 경우에만 해설로 스크롤 (번호 이동으로 다시 볼 때는 스크롤하지 않음)
  useEffect(() => {
    if (!done || !answeredHere.current) return;
    (document.activeElement as HTMLElement | null)?.blur?.(); // iOS 키보드 닫기
    feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nextRef.current?.focus({ preventScroll: true });
  }, [done]);
  const order = q.type === 'multiple' ? (choiceOrder ?? [0, 1, 2, 3]) : [];

  // 이 문제의 누적 기록(이번 풀이 이전 포함). 오답 노트 상태 표시용.
  const wrongNow = record?.lastResult === 'wrong' || record?.lastResult === 'revealed';
  const pastWrong = record ? record.wrongCount + record.revealedCount : 0;

  const submit = () => {
    if (done) return;
    if (q.type === 'multiple') {
      if (selected === null) {
        setHint('보기를 먼저 선택하세요.');
        return;
      }
      answeredHere.current = true;
      onAnswer(gradeAnswer(q, selected) ? 'correct' : 'wrong', String(selected));
    } else {
      if (!text.trim()) {
        setHint('답을 입력하세요.');
        return;
      }
      answeredHere.current = true;
      onAnswer(gradeAnswer(q, text) ? 'correct' : 'wrong', text.trim());
    }
    setHint(null);
  };

  const reveal = () => {
    if (done) return;
    const answer = q.type === 'multiple' ? (selected === null ? null : String(selected)) : text.trim() || null;
    answeredHere.current = true;
    onAnswer('revealed', answer);
    setHint(null);
  };

  return (
    <article className="question-card">
      <div className="q-meta">
        <span className="badge">{q.category}</span>
        <span className={`badge diff-${q.difficulty}`}>{DIFFICULTY_LABEL[q.difficulty]}</span>
        {wrongNow && <span className="badge badge-wrong">오답 노트</span>}
        {!wrongNow && pastWrong > 0 && <span className="badge badge-muted">과거 오답 {pastWrong}회</span>}
        {isFavorite && <span className="badge badge-fav">★ 즐겨찾기</span>}
      </div>

      <h2 className="q-text">
        <span className="q-num">Q{number}.</span> {q.question}
      </h2>

      {q.type === 'multiple' ? (
        <MultipleChoiceQuestion
          question={q}
          order={order}
          selected={selected}
          disabled={done}
          revealCorrect={done}
          onSelect={(i) => {
            setSelected(i);
            setHint(null);
          }}
        />
      ) : (
        <ShortAnswerQuestion
          value={text}
          disabled={done}
          onChange={(v) => {
            setText(v);
            setHint(null);
          }}
          onSubmit={submit}
        />
      )}

      {hint && (
        <p className="hint" role="alert">
          {hint}
        </p>
      )}

      {!done ? (
        <div className="actions">
          <button type="button" className="btn btn-primary btn-lg" onClick={submit}>
            정답 제출
          </button>
          <div className="actions-row">
            <button type="button" className="btn btn-lg btn-outline" onClick={reveal}>
              정답 확인
            </button>
            <button
              type="button"
              className={`btn btn-lg btn-outline fav-toggle ${isFavorite ? 'on' : ''}`}
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
            >
              {isFavorite ? '★ 즐겨찾기됨' : '☆ 즐겨찾기'}
            </button>
          </div>
          <p className="reveal-note">‘정답 확인’을 누르면 이 문제는 틀린 문제로 기록됩니다.</p>
        </div>
      ) : (
        <>
          <div ref={feedbackRef} className="feedback-anchor">
            <AnswerFeedback question={q} sessionAnswer={sessionAnswer!} order={order} />
          </div>
          <div className="actions">
            <button type="button" className="btn btn-primary btn-lg" onClick={onNext} ref={nextRef}>
              {isLast ? '결과 보기' : '다음 문제'}
            </button>
            <div className="actions-row">
              {onPrev && (
                <button type="button" className="btn btn-lg btn-outline" onClick={onPrev}>
                  이전 문제
                </button>
              )}
              <button
                type="button"
                className={`btn btn-lg btn-outline fav-toggle ${isFavorite ? 'on' : ''}`}
                onClick={onToggleFavorite}
                aria-pressed={isFavorite}
              >
                {isFavorite ? '★ 즐겨찾기됨' : '☆ 즐겨찾기'}
              </button>
            </div>
          </div>
        </>
      )}

      {!done && onPrev && (
        <button type="button" className="link-btn prev-link" onClick={onPrev}>
          ‹ 이전 문제
        </button>
      )}
    </article>
  );
}
