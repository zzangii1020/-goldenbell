/**
 * 《도시는 무엇으로 사는가》 책(인쇄본) 쪽수 → 첨부 PDF 쪽수 변환.
 *
 * 첨부 PDF는 촬영본 파일 001-075, 076-150, 151-225, 추가 zip 226-300(01-40.pdf, 41-75.pdf), 301-357 로
 * 모두 357쪽이며 책 표지~p.383(맺음말)을 담고 있다.
 * 장마다 속표지·빈 쪽 일부가 촬영되지 않아 쪽수 차이가 조금씩 벌어진다.
 * 아래 오프셋은 PDF 각 쪽 하단의 인쇄 쪽수를 직접 확인해 정한 값이다.
 */
const OFFSETS: Array<{ from: number; to: number; pdfMinusBook: number }> = [
  { from: 1, to: 13, pdfMinusBook: -3 }, // 추천사 (책 p.11 = PDF p.8)
  { from: 14, to: 18, pdfMinusBook: -4 }, // 머리말 (책 p.15 = PDF p.11)
  { from: 19, to: 46, pdfMinusBook: -6 }, // 1장 (책 p.21 = PDF p.15)
  { from: 47, to: 95, pdfMinusBook: -7 }, // 2~3장 (책 p.49 = PDF p.42)
  { from: 96, to: 121, pdfMinusBook: -10 }, // 4장 (책 p.97 = PDF p.87)
  { from: 122, to: 141, pdfMinusBook: -12 }, // 5장 (책 p.123 = PDF p.111)
  { from: 142, to: 185, pdfMinusBook: -14 }, // 6~7장 (책 p.143 = PDF p.129)
  { from: 186, to: 203, pdfMinusBook: -16 }, // 8장 (책 p.187 = PDF p.171)
  { from: 204, to: 227, pdfMinusBook: -18 }, // 9장 (책 p.205 = PDF p.187)
  { from: 228, to: 246, pdfMinusBook: -20 }, // 10장 (책 p.229 = PDF p.209, 책 p.246 = PDF p.226)
  { from: 247, to: 271, pdfMinusBook: -21 }, // 11장 (책 p.249 = PDF p.228)
  { from: 272, to: 295, pdfMinusBook: -22 }, // 12장 (책 p.273 = PDF p.251)
  { from: 296, to: 319, pdfMinusBook: -23 }, // 13장 (책 p.297 = PDF p.274)
  { from: 320, to: 342, pdfMinusBook: -24 }, // 14장 (책 p.321 = PDF p.297, 책 p.325 = PDF p.301)
  { from: 343, to: 375, pdfMinusBook: -25 }, // 15장 (책 p.343 = PDF p.318)
  { from: 376, to: 400, pdfMinusBook: -26 }, // 맺음말 (책 p.377 = PDF p.351, 책 p.383 = PDF p.357)
];

const PDF_FILES = [
  { from: 1, to: 75, name: '001-075' },
  { from: 76, to: 150, name: '076-150' },
  { from: 151, to: 225, name: '151-225' },
  { from: 226, to: 265, name: '226-300 zip의 01-40' },
  { from: 266, to: 300, name: '226-300 zip의 41-75' },
  { from: 301, to: 357, name: '301-357' },
];

/** 변환표에 없는 쪽은 0 을 돌려준다. */
export function toPdfPage(bookPage: number): number {
  const range = OFFSETS.find((r) => bookPage >= r.from && bookPage <= r.to);
  return range ? bookPage + range.pdfMinusBook : 0;
}

export function formatSource(bookPage: number): string {
  const pdf = toPdfPage(bookPage);
  const file = PDF_FILES.find((f) => pdf >= f.from && pdf <= f.to);
  if (!file) return `책 p.${bookPage}`;
  // 파일마다 따로 열어 보므로 파일 안에서의 쪽수도 함께 적는다.
  return `책 p.${bookPage} · PDF p.${pdf} (${file.name} 파일, 파일 안 ${pdf - file.from + 1}쪽)`;
}
