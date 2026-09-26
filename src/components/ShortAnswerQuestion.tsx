interface Props {
  value: string;
  disabled: boolean;
  onChange: (v: string) => void;
  onSubmit: () => void;
}

export default function ShortAnswerQuestion({ value, disabled, onChange, onSubmit }: Props) {
  return (
    <form
      className="short-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="short-answer" className="sr-only">
        답 입력
      </label>
      <input
        id="short-answer"
        className="short-input"
        type="text"
        inputMode="text"
        enterKeyHint="done"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        placeholder="정답을 입력하세요"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="short-help">띄어쓰기·영문 표기 차이는 정답으로 인정됩니다.</p>
    </form>
  );
}
