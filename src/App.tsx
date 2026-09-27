import { useEffect, useState } from 'react';
import BookApp from './BookApp';
import BookSelect from './components/BookSelect';
import { getBook } from './data/books';

// 새로고침해도 보던 책에 머물도록 탭 단위(sessionStorage)로만 기억한다.
// 앱을 새로 열면 항상 책 선택 화면부터 시작한다.
const CURRENT_BOOK_KEY = 'goldenbell.currentBook';

function readCurrentBook(): string | null {
  try {
    return window.sessionStorage.getItem(CURRENT_BOOK_KEY);
  } catch {
    return null;
  }
}

export default function App() {
  const [bookId, setBookId] = useState<string | null>(() => readCurrentBook());
  const book = getBook(bookId);

  useEffect(() => {
    try {
      if (book) window.sessionStorage.setItem(CURRENT_BOOK_KEY, book.id);
      else window.sessionStorage.removeItem(CURRENT_BOOK_KEY);
    } catch {
      // 저장이 막혀도 동작에는 문제없다
    }
    window.scrollTo(0, 0);
  }, [book]);

  if (!book) return <BookSelect onSelect={setBookId} />;
  return <BookApp key={book.id} book={book} onChangeBook={() => setBookId(null)} />;
}
