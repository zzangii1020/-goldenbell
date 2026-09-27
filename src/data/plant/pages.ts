/**
 * 《식물의 사회생활》 책(인쇄본) 쪽수 → 첨부 PDF 쪽수 변환.
 *
 * 첨부 PDF는 촬영본 4개 파일(001-069, 070-138, 139-207, 208-276)을 이어 붙인 총 276쪽이며
 * 책 p.1~266(머리말~12장 중간)을 담고 있다.
 * PDF p.93~112에는 다른 책(《역사 속의 문화기행》) 20쪽이 끼어 있어서 그 뒤부터 쪽수가 밀린다.
 * 각 부(部) 사이 속표지 일부도 촬영되지 않았다.
 * 아래 오프셋은 PDF 각 쪽 하단의 인쇄 쪽수를 직접 확인해 정한 값이다.
 */
const OFFSETS: Array<{ from: number; to: number; pdfMinusBook: number }> = [
  { from: 1, to: 100, pdfMinusBook: -8 }, // 머리말 ~ 4장 (책 p.17 = PDF p.9, 책 p.100 = PDF p.92)
  { from: 101, to: 147, pdfMinusBook: 12 }, // 4장 ~ 6장 (책 p.101 = PDF p.113, 책 p.144 = PDF p.156)
  { from: 148, to: 218, pdfMinusBook: 11 }, // 3부 (책 p.149 = PDF p.160, 책 p.207 = PDF p.218)
  { from: 219, to: 400, pdfMinusBook: 10 }, // 4부 (책 p.221 = PDF p.231, 책 p.264 = PDF p.274)
];

const PDF_FILES = [
  { from: 1, to: 69, name: '001-069' },
  { from: 70, to: 138, name: '070-138' },
  { from: 139, to: 207, name: '139-207' },
  { from: 208, to: 276, name: '208-276' },
];

export function toPdfPage(bookPage: number): number {
  const range = OFFSETS.find((r) => bookPage >= r.from && bookPage <= r.to);
  return bookPage + (range ? range.pdfMinusBook : 0);
}

export function formatSource(bookPage: number): string {
  const pdf = toPdfPage(bookPage);
  const file = PDF_FILES.find((f) => pdf >= f.from && pdf <= f.to) ?? PDF_FILES[PDF_FILES.length - 1];
  return `책 p.${bookPage} · PDF p.${pdf} (${file.name} 파일)`;
}
