import { BOOKS } from '../data/books';
import { wrongIds } from '../lib/progress';
import { loadState } from '../lib/storage';

interface Props {
  onSelect: (bookId: string) => void;
}

/** 앱 첫 화면: 문제를 풀 책을 고른다. */
export default function BookSelect({ onSelect }: Props) {
  return (
    <main className="page book-select">
      <header className="home-header">
        <p className="eyebrow">독서 골든벨 대비</p>
        <h1>어떤 책을 공부할까요?</h1>
        <p className="subtitle">책마다 문제 100개 · 학습 기록은 책별로 따로 저장됩니다.</p>
      </header>

      <nav className="book-list" aria-label="책 선택">
        {BOOKS.map((book) => {
          const state = loadState(book.id);
          const ids = book.questions.map((q) => q.id);
          const solved = ids.filter((id) => (state.records[id]?.attempts ?? 0) > 0).length;
          const wrong = wrongIds(state, ids).length;
          return (
            <button key={book.id} type="button" className="book-card" onClick={() => onSelect(book.id)}>
              <span className="book-title">《{book.title}》</span>
              <span className="book-meta">
                {book.author} · {book.publisher}
              </span>
              <span className="book-tagline">{book.tagline}</span>
              <span className="book-progress">
                <span className="progress-bar" aria-hidden>
                  <span className="progress-fill" style={{ width: `${(solved / ids.length) * 100}%` }} />
                </span>
                <span className="book-progress-text">
                  푼 문제 {solved} / {ids.length}
                  {wrong > 0 && <span className="book-wrong"> · 틀린 문제 {wrong}</span>}
                </span>
              </span>
            </button>
          );
        })}
      </nav>
    </main>
  );
}
