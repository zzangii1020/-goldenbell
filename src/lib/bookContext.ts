import { createContext, useContext } from 'react';
import type { Book } from '../data/books';

export const BookContext = createContext<Book | null>(null);

export function useBook(): Book {
  const book = useContext(BookContext);
  if (!book) throw new Error('useBook must be used inside <BookContext.Provider>');
  return book;
}
