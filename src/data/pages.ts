/**
 * 책(인쇄본) 쪽수 → 첨부 PDF 쪽수 변환.
 *
 * 첨부 PDF는 촬영본 4개 파일(001-055, 056-110, 111-165, 166-220)을 이어 붙인
 * 총 220쪽이며, 각 장 사이의 빈 면이 빠져 있고 5장의 책 p.209~213이 누락되어 있다.
 * 아래 오프셋은 PDF 각 쪽 하단의 인쇄 쪽수를 직접 확인해 정한 값이다.
 */
const OFFSETS: Array<{ from: number; to: number; offset: number }> = [
  { from: 1, to: 48, offset: 6 }, // 프롤로그 ~ 1장 (책 p.11 = PDF p.5)
  { from: 49, to: 88, offset: 7 }, // 2장 (책 p.51 = PDF p.44)
  { from: 89, to: 124, offset: 9 }, // 3장 (책 p.91 = PDF p.82)
  { from: 125, to: 170, offset: 10 }, // 4장 (책 p.138 = PDF p.128)
  { from: 171, to: 208, offset: 11 }, // 5장 (책 p.173 = PDF p.162)
  { from: 209, to: 216, offset: 16 }, // 5장 끝 (책 p.214 = PDF p.198)
  { from: 217, to: 400, offset: 17 }, // 6장 (책 p.219 = PDF p.202)
];

export const PDF_FILES = ['001-055', '056-110', '111-165', '166-220'];

export function toPdfPage(bookPage: number): number {
  const range = OFFSETS.find((r) => bookPage >= r.from && bookPage <= r.to);
  return bookPage - (range ? range.offset : 0);
}

export function formatSource(bookPage: number): string {
  if (bookPage <= 0) return '책 앞부분 제사(題詞) · PDF p.4 (001-055 파일)';
  const pdf = toPdfPage(bookPage);
  const file = PDF_FILES[Math.min(PDF_FILES.length - 1, Math.floor((pdf - 1) / 55))];
  return `책 p.${bookPage} · PDF p.${pdf} (${file} 파일)`;
}
