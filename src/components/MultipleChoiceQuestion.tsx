import type { MultipleQuestion } from '../data/types';
import { CIRCLED } from '../lib/labels';

interface Props {
  question: MultipleQuestion;
  /** 화면에 보여줄 순서 (원래 보기 인덱스의 배열) */
  order: number[];
  /** 선택한 보기의 원래 인덱스 */
  selected: number | null;
  disabled: boolean;
  revealCorrect: boolean;
  onSelect: (originalIndex: number) => void;
}

export default function MultipleChoiceQuestion({ question, order, selected, disabled, revealCorrect, onSelect }: Props) {
  return (
    <ol className="choices" role="radiogroup" aria-label="보기">
      {order.map((orig, pos) => {
        const isSel = selected === orig;
        const isAns = revealCorrect && orig === question.answer;
        const isWrongSel = revealCorrect && isSel && orig !== question.answer;
        const cls = ['choice', isSel ? 'selected' : '', isAns ? 'correct' : '', isWrongSel ? 'wrong' : '']
          .filter(Boolean)
          .join(' ');
        return (
          <li key={orig}>
            <button
              type="button"
              role="radio"
              aria-checked={isSel}
              className={cls}
              disabled={disabled}
              onClick={() => onSelect(orig)}
            >
              <span className="choice-num">{CIRCLED[pos]}</span>
              <span className="choice-text">{question.choices[orig]}</span>
              {isAns && <span className="choice-mark" aria-label="정답">정답</span>}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
