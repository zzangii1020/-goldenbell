import type { Question } from '../data/types';
import type { SessionState } from '../lib/session';

interface Props {
  session: SessionState;
  questions: Question[];
  current: number;
  onPick: (index: number) => void;
  onFinish: () => void;
  onClose: () => void;
}

/** 문제 번호 직접 이동 */
export default function JumpSheet({ session, questions, current, onPick, onFinish, onClose }: Props) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label="문제 번호로 이동" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <strong>문제 번호로 이동</strong>
          <button type="button" className="link-btn" onClick={onClose}>
            닫기
          </button>
        </div>
        <div className="legend">
          <span className="dot ok" /> 맞음 <span className="dot ng" /> 틀림·정답 확인 <span className="dot none" /> 안 푼 문제
        </div>
        <div className="jump-grid">
          {questions.map((q, i) => {
            const a = session.answers[q.id];
            const cls = a ? (a.result === 'correct' ? 'ok' : 'ng') : 'none';
            return (
              <button
                key={q.id}
                type="button"
                className={`jump-cell ${cls} ${i === current ? 'current' : ''}`}
                onClick={() => onPick(i)}
                aria-label={`${i + 1}번 문제`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <button type="button" className="btn btn-outline btn-lg" onClick={onFinish}>
          여기까지 채점 결과 보기
        </button>
      </div>
    </div>
  );
}
