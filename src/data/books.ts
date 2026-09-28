import type { Question } from './types';
import * as extinction from './extinction/questions';
import * as extinctionPages from './extinction/pages';
import * as plant from './plant/questions';
import * as plantPages from './plant/pages';
import * as city from './city/questions';
import * as cityPages from './city/pages';
import { fromMultiple as extinctionFromMultiple } from './extinction/fromMultiple';
import { fromMultiple as plantFromMultiple } from './plant/fromMultiple';
import { fromMultiple as cityFromMultiple } from './city/fromMultiple';

export interface Book {
  /** 학습 기록 저장 키에 쓰인다. 바꾸면 기존 기록을 못 불러오므로 바꾸지 말 것 */
  id: 'extinction' | 'plant' | 'city';
  title: string;
  author: string;
  publisher: string;
  /** 첫 화면 카드에 보이는 한 줄 소개 */
  tagline: string;
  /** 객관식 50 + 주관식 50 + 객관식 정답을 주관식으로 묻는 50 */
  questions: Question[];
  /** 책 쪽수 → "책 p.00 · PDF p.00 (파일)" */
  formatSource: (bookPage: number) => string;
  /** 요약 노트 PDF (public/ 폴더 기준 파일명) */
  studyGuide: string;
  /** 주관식 정답표 PDF (public/ 폴더 기준 파일명) */
  answerSheet: string;
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
    questions: [...extinction.questions, ...extinctionFromMultiple],
    formatSource: extinctionPages.formatSource,
    studyGuide: 'study-guide.pdf',
    answerSheet: 'answer-sheet-extinction.pdf',
    coverage: '책 p.1~331, 프롤로그~에필로그',
  },
  {
    id: 'plant',
    title: '식물의 사회생활',
    author: '이영숙·최배영',
    publisher: '동아시아',
    tagline: '한곳에 뿌리내린 식물이 다른 식물, 미생물, 동물, 인간과 맺는 관계',
    questions: [...plant.questions, ...plantFromMultiple],
    formatSource: plantPages.formatSource,
    studyGuide: 'study-guide-plant.pdf',
    answerSheet: 'answer-sheet-plant.pdf',
    coverage: '책 p.1~320, 1장~13장·맺음말',
  },
  {
    id: 'city',
    title: '도시는 무엇으로 사는가',
    author: '유현준',
    publisher: '을유문화사',
    tagline: '도시를 보는 열다섯 가지 인문적 시선',
    questions: [...city.questions, ...cityFromMultiple],
    formatSource: cityPages.formatSource,
    studyGuide: 'study-guide-city.pdf',
    answerSheet: 'answer-sheet-city.pdf',
    coverage: '책 p.11~383, 추천사~맺음말',
  },
];

export function getBook(id: string | null | undefined): Book | null {
  return BOOKS.find((b) => b.id === id) ?? null;
}
