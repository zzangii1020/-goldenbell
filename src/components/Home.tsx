import type { Question } from '../data/types';
import { useBook } from '../lib/bookContext';
import { favoriteIds, wrongIds, type OrderMode, type StudyState } from '../lib/progress';
import { MODE_LABEL, sessionSummary, type QuizMode, type SessionState } from '../lib/session';

interface Props {
  state: StudyState;
  questions: Question[];
  session: SessionState | null;
  notice: string | null;
  onDismissNotice: () => void;
  onStart: (mode: QuizMode) => void;
  onResume: () => void;
  onProgress: () => void;
  onOrderChange: (order: OrderMode) => void;
  onChangeBook: () => void;
}

export default function Home({
  state,
  questions,
  session,
  notice,
  onDismissNotice,
  onStart,
  onResume,
  onProgress,
  onOrderChange,
  onChangeBook,
}: Props) {
  const book = useBook();
  const allIds = questions.map((q) => q.id);
  const multipleCount = questions.filter((q) => q.type === 'multiple').length;
  const shortCount = questions.length - multipleCount;
  const wrongCount = wrongIds(state, allIds).length;
  const favCount = favoriteIds(state, allIds).length;
  const summary = session ? sessionSummary(session) : null;

  return (
    <main className="page home">
      <button type="button" className="icon-btn back book-switch" onClick={onChangeBook}>
        ‹ 책 선택
      </button>
      <header className="home-header">
        <p className="eyebrow">독서 골든벨 대비</p>
        <h1>《{book.title}》</h1>
        <p className="subtitle">
          {book.author} · 문제풀이 {questions.length}
        </p>
      </header>

      <section className="stat-grid" aria-label="문제 현황">
        <Stat label="전체 문제" value={questions.length} />
        <Stat label="객관식" value={multipleCount} />
        <Stat label="주관식" value={shortCount} />
        <Stat label="틀린 문제" value={wrongCount} tone="wrong" />
        <Stat label="즐겨찾기" value={favCount} tone="fav" />
      </section>

      {notice && (
        <div className="notice" role="status">
          <span>{notice}</span>
          <button type="button" className="link-btn" onClick={onDismissNotice}>
            닫기
          </button>
        </div>
      )}

      {session && summary && (
        <button type="button" className="resume-card" onClick={onResume}>
          <span className="resume-title">이어서 풀기 · {MODE_LABEL[session.mode]}</span>
          <span className="resume-sub">
            문제 {session.index + 1} / {summary.total} · 푼 문제 {summary.answered}
          </span>
        </button>
      )}

      <div className="order-toggle" role="radiogroup" aria-label="문제 순서">
        <span className="order-label">문제 순서</span>
        <div className="segmented">
          {(['random', 'sequential'] as OrderMode[]).map((o) => (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={state.order === o}
              className={state.order === o ? 'on' : ''}
              onClick={() => onOrderChange(o)}
            >
              {o === 'random' ? '랜덤' : '순서대로'}
            </button>
          ))}
        </div>
      </div>

      <nav className="menu">
        <button type="button" className="btn btn-primary btn-lg" onClick={() => onStart('all')}>
          전체 문제 풀기 <small>{questions.length}문제</small>
        </button>
        <div className="menu-row">
          <button type="button" className="btn btn-lg" onClick={() => onStart('multiple')}>
            객관식만 풀기 <small>{multipleCount}문제</small>
          </button>
          <button type="button" className="btn btn-lg" onClick={() => onStart('short')}>
            주관식만 풀기 <small>{shortCount}문제</small>
          </button>
        </div>
        <button
          type="button"
          className="btn btn-lg btn-wrong"
          onClick={() => onStart('wrong')}
          data-empty={wrongCount === 0}
        >
          틀린 문제 다시 풀기 <small>{wrongCount > 0 ? `틀린 문제 ${wrongCount}개` : '현재 틀린 문제가 없습니다.'}</small>
        </button>
        <button
          type="button"
          className="btn btn-lg btn-fav"
          onClick={() => onStart('favorite')}
          data-empty={favCount === 0}
        >
          즐겨찾기 문제 <small>{favCount > 0 ? `${favCount}개` : '즐겨찾기한 문제가 없습니다.'}</small>
        </button>
        <button type="button" className="btn btn-lg btn-ghost" onClick={onProgress}>
          학습 현황
        </button>
        <a className="btn btn-lg btn-ghost" href={`${import.meta.env.BASE_URL}${book.studyGuide}`} target="_blank" rel="noopener">
          📄 요약 노트 PDF <small>문제 풀기 전에 먼저 읽어보세요</small>
        </a>
      </nav>

      <footer className="home-footer">
        문제는 첨부된 《{book.title}》 PDF({book.coverage})의 내용만으로 출제되었습니다.
        <br />
        학습 기록은 이 기기의 브라우저에 자동 저장됩니다.
      </footer>
    </main>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: 'wrong' | 'fav' }) {
  return (
    <div className={`stat ${tone ?? ''}`}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
