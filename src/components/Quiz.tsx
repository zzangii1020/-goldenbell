import { useState } from 'react';
import type { Question } from '../data/types';
import type { AttemptResult, StudyState } from '../lib/progress';
import { MODE_LABEL, type SessionState } from '../lib/session';
import QuestionCard from './QuestionCard';
import JumpSheet from './JumpSheet';

interface Props {
  session: SessionState;
  questions: Question[];
  state: StudyState;
  onAnswer: (questionId: string, result: AttemptResult, answer: string | null) => void;
  onToggleFavorite: (questionId: string) => void;
  onGoTo: (index: number) => void;
  onFinish: () => void;
  onExit: () => void;
}

export default function Quiz({
  session,
  questions,
  state,
  onAnswer,
  onToggleFavorite,
  onGoTo,
  onFinish,
  onExit,
}: Props) {
  const [jumpOpen, setJumpOpen] = useState(false);
  const index = Math.min(session.index, questions.length - 1);
  const q = questions[index];
  const total = questions.length;
  const answeredCount = Object.keys(session.answers).length;
  const isLast = index === total - 1;
  const isFav = state.favorites.includes(q.id);
  const typeLabel = q.type === 'multiple' ? '객관식' : '주관식';
  const modeLabel =
    session.mode === 'all' || session.mode === 'multiple' || session.mode === 'short'
      ? typeLabel
      : `${MODE_LABEL[session.mode]} · ${typeLabel}`;

  return (
    <main className="page quiz">
      <header className="quiz-top">
        <button type="button" className="icon-btn back" onClick={onExit} aria-label="홈으로">
          ‹ 뒤로
        </button>
        <div className="quiz-title">
          <span className="quiz-mode">{modeLabel}</span>
          <button
            type="button"
            className="quiz-count"
            onClick={() => setJumpOpen(true)}
            aria-label="문제 번호로 이동"
          >
            {index + 1} / {total} <span aria-hidden>▾</span>
          </button>
        </div>
        <button
          type="button"
          className={`icon-btn star ${isFav ? 'on' : ''}`}
          onClick={() => onToggleFavorite(q.id)}
          aria-pressed={isFav}
          aria-label={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {isFav ? '★' : '☆'}
        </button>
      </header>

      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answeredCount}
        aria-label="푼 문제 수"
      >
        <div className="progress-fill" style={{ width: `${(answeredCount / total) * 100}%` }} />
      </div>
      <p className="progress-caption">
        문제 {index + 1} / {total} · 푼 문제 {answeredCount}
      </p>

      <QuestionCard
        key={`${session.startedAt}-${q.id}`}
        question={q}
        number={index + 1}
        choiceOrder={session.choiceOrder[q.id]}
        sessionAnswer={session.answers[q.id]}
        record={state.records[q.id]}
        isFavorite={isFav}
        isLast={isLast}
        onAnswer={(result, answer) => onAnswer(q.id, result, answer)}
        onToggleFavorite={() => onToggleFavorite(q.id)}
        onNext={() => (isLast ? onFinish() : onGoTo(index + 1))}
        onPrev={index > 0 ? () => onGoTo(index - 1) : undefined}
      />

      {jumpOpen && (
        <JumpSheet
          session={session}
          questions={questions}
          current={index}
          onPick={(i) => {
            setJumpOpen(false);
            onGoTo(i);
          }}
          onFinish={() => {
            setJumpOpen(false);
            onFinish();
          }}
          onClose={() => setJumpOpen(false)}
        />
      )}
    </main>
  );
}
