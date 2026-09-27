import type { Question } from './types';
import * as extinction from './extinction/questions';
import * as extinctionPages from './extinction/pages';
import * as plant from './plant/questions';
import * as plantPages from './plant/pages';

export interface Book {
  /** 학습 기록 저장 키에 쓰인다. 바꾸면 기존 기록을 못 불러오므로 바꾸지 말 것 */
  id: 'extinction' | 'plant';
  title: string;
  author: string;
  publisher: string;
  /** 첫 화면 카드에 보이는 한 줄 소개 */
  tagline: string;
  questions: Question[];
  /** 책 쪽수 → "책 p.00 · PDF p.00 (파일)" */
  formatSource: (bookPage: number) => string;
  /** 요약 노트 PDF (public/ 폴더 기준 파일명) */
  studyGuide: string;
  /** 출제 범위 안내 */
  coverage: string;
}

export const BOOKS: Book[] = [
  {
    id: 'extinction',
    title: '경험의 멸종',
    author: '크리스틴 로젠',
    publisher: '어크로스',
    tagline: '기술이 경험을 대체하는 시대, 인간은 계속 인간일 수 있을까',
    questions: extinction.questions,
    formatSource: extinctionPages.formatSource,
    studyGuide: 'study-guide.pdf',
    coverage: '책 p.1~331, 프롤로그~에필로그',
  },
  {
    id: 'plant',
    title: '식물의 사회생활',
    author: '이영숙·최배영',
    publisher: '동아시아',
    tagline: '한곳에 뿌리내린 식물이 다른 식물, 미생물, 동물, 인간과 맺는 관계',
    questions: plant.questions,
    formatSource: plantPages.formatSource,
    studyGuide: 'study-guide-plant.pdf',
    coverage: '책 p.1~320, 1장~13장·맺음말',
  },
];

export function getBook(id: string | null | undefined): Book | null {
  return BOOKS.find((b) => b.id === id) ?? null;
}
