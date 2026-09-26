import type { Question } from '../data/types';
import { correctAnswerText } from '../lib/grading';
import { wrongIds, type StudyState } from '../lib/progress';
import { MODE_LABEL, sessionSummary, type QuizMode, type SessionState } from '../lib/session';

interface Props {
  session: SessionState;
  questions: Question[];
  state: StudyState;
  onRestart: () => void;
  onStart: (mode: QuizMode) => void;
  onHome: () => void;
}

export default function Result({ session, questions, state, onRestart, onStart, onHome }: Props) {
  const s = sessionSummary(session);
  const rate = s.answered ? Math.round((s.correct / s.answered) * 100) : 0;
  const missed = questions.filter((q) => {
    const a = session.answers[q.id];
    return a && a.result !== 'correct';
  });
  // 오답·즐겨찾기 수는 이번 풀이가 아니라 전체 100문제 기준
  const globalWrong = wrongIds(state, Object.keys(state.records)).length;
  const favCount = state.favorites.length;

  return (
    <main className="page result">
      <header className="page-head">
        <p className="eyebrow">{MODE_LABEL[session.mode]}</p>
        <h1>풀이 결과</h1>
      </header>

      <section className="score-card">
        <div className="score-big">
          {s.correct}
          <span> / {s.total}</span>
        </div>
        <p className="score-rate">정답률 {rate}% (푼 문제 {s.answered}개 기준)</p>
        <div className="score-row">
          <span className="pill ok">맞음 {s.correct}</span>
          <span className="pill ng">틀림 {s.wrong}</span>
          <span className="pill rv">정답 확인 {s.revealed}</span>
          {s.total - s.answered > 0 && <span className="pill">안 푼 문제 {s.total - s.answered}</span>}
        </div>
      </section>

      <nav className="menu">
        <button type="button" className="btn btn-primary btn-lg" onClick={onRestart}>
          처음부터 다시 풀기
        </button>
        <button
          type="button"
          className="btn btn-lg btn-wrong"
          onClick={() => onStart('wrong')}
          data-empty={globalWrong === 0}
        >
          오답만 다시 풀기 <small>{globalWrong > 0 ? `틀린 문제 ${globalWrong}개` : '현재 틀린 문제가 없습니다.'}</small>
        </button>
        <button
          type="button"
          className="btn btn-lg btn-fav"
          onClick={() => onStart('favorite')}
          data-empty={favCount === 0}
        >
          즐겨찾기만 풀기 <small>{favCount > 0 ? `${favCount}개` : '즐겨찾기한 문제가 없습니다.'}</small>
        </button>
        <button type="button" className="btn btn-lg btn-ghost" onClick={onHome}>
          홈으로
        </button>
      </nav>

      {missed.length > 0 && (
        <section className="review">
          <h2>이번에 틀린 문제</h2>
          <ul className="review-list">
            {missed.map((q) => (
              <li key={q.id}>
                <p className="review-q">{q.question}</p>
                <p className="review-a">정답: {correctAnswerText(q)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
