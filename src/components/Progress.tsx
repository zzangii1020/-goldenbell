import { useState } from 'react';
import type { Category, Question } from '../data/types';
import { formatSource } from '../data/pages';
import { formatTime } from '../lib/labels';
import { favoriteIds, wrongIds, type StudyState } from '../lib/progress';

interface Props {
  state: StudyState;
  questions: Question[];
  onBack: () => void;
  onReset: () => void;
}

const RESULT_LABEL = { correct: '맞음', wrong: '틀림', revealed: '정답 확인' } as const;

export default function Progress({ state, questions, onBack, onReset }: Props) {
  const [confirming, setConfirming] = useState(false);
  const allIds = questions.map((q) => q.id);
  const byId = new Map(questions.map((q) => [q.id, q]));

  const stats = (list: Question[]) => {
    let solved = 0;
    let attempts = 0;
    let correctAttempts = 0;
    let correctNow = 0;
    for (const q of list) {
      const r = state.records[q.id];
      if (!r || r.attempts === 0) continue;
      solved++;
      attempts += r.attempts;
      correctAttempts += r.correctCount;
      if (r.lastResult === 'correct') correctNow++;
    }
    const rate = attempts ? Math.round((correctAttempts / attempts) * 100) : null;
    return { total: list.length, solved, attempts, correctAttempts, correctNow, rate };
  };

  const all = stats(questions);
  const mc = stats(questions.filter((q) => q.type === 'multiple'));
  const sa = stats(questions.filter((q) => q.type === 'short'));
  const wrongCount = wrongIds(state, allIds).length;
  const favCount = favoriteIds(state, allIds).length;
  const everWrong = allIds.filter((id) => state.records[id]?.everWrong).length;

  const categories = Array.from(new Set(questions.map((q) => q.category))) as Category[];

  return (
    <main className="page progress-page">
      <header className="page-head with-back">
        <button type="button" className="icon-btn back" onClick={onBack}>
          ‹ 홈
        </button>
        <h1>학습 현황</h1>
      </header>

      <section className="panel">
        <Meter label="전체 진행률" value={all.solved} total={all.total} />
        <Meter label="객관식" value={mc.solved} total={mc.total} />
        <Meter label="주관식" value={sa.solved} total={sa.total} />
      </section>

      <section className="stat-grid">
        <Tile label="맞힌 문제" value={all.correctNow} hint="마지막 풀이 기준" />
        <Tile label="틀린 문제" value={wrongCount} hint="오답 노트" tone="wrong" />
        <Tile label="즐겨찾기" value={favCount} tone="fav" />
        <Tile label="안 푼 문제" value={all.total - all.solved} />
        <Tile label="한 번이라도 틀린 문제" value={everWrong} hint="다시 맞혀도 남는 이력" />
      </section>

      <section className="panel">
        <h2>정답률</h2>
        <Rate label="전체" s={all} />
        <Rate label="객관식" s={mc} />
        <Rate label="주관식" s={sa} />
        <p className="muted small">정답률 = 맞힌 횟수 ÷ 전체 풀이 횟수 (정답 확인은 틀린 것으로 계산)</p>
      </section>

      <section className="panel">
        <h2>장별 진행</h2>
        {categories.map((c) => {
          const s = stats(questions.filter((q) => q.category === c));
          return <Meter key={c} label={c} value={s.solved} total={s.total} extra={`맞힘 ${s.correctNow}`} />;
        })}
      </section>

      <section className="panel">
        <h2>최근 풀이 기록</h2>
        {state.history.length === 0 ? (
          <p className="muted">아직 풀이 기록이 없습니다.</p>
        ) : (
          <ul className="history">
            {state.history.slice(0, 30).map((h, i) => {
              const q = byId.get(h.questionId);
              if (!q) return null;
              return (
                <li key={`${h.at}-${i}`}>
                  <span className={`pill ${h.result === 'correct' ? 'ok' : h.result === 'wrong' ? 'ng' : 'rv'}`}>
                    {RESULT_LABEL[h.result]}
                  </span>
                  <span className="history-q">{q.question}</span>
                  <span className="history-meta">
                    {formatTime(h.at)} · {q.type === 'multiple' ? '객관식' : '주관식'} · {formatSource(q.sourcePage).split(' · ')[0]}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="panel danger">
        {!confirming ? (
          <button type="button" className="btn btn-outline" onClick={() => setConfirming(true)}>
            학습 기록 초기화
          </button>
        ) : (
          <div className="confirm">
            <p>모든 풀이 기록·오답·즐겨찾기를 지웁니다. 되돌릴 수 없습니다.</p>
            <div className="actions-row">
              <button type="button" className="btn btn-outline" onClick={() => setConfirming(false)}>
                취소
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onReset();
                  setConfirming(false);
                }}
              >
                초기화
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Meter({ label, value, total, extra }: { label: string; value: number; total: number; extra?: string }) {
  const pct = total ? (value / total) * 100 : 0;
  return (
    <div className="meter">
      <div className="meter-head">
        <span>{label}</span>
        <span className="meter-num">
          {value} / {total}
          {extra && <span className="muted"> · {extra}</span>}
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Tile({ label, value, hint, tone }: { label: string; value: number; hint?: string; tone?: 'wrong' | 'fav' }) {
  return (
    <div className={`stat ${tone ?? ''}`}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  );
}

function Rate({ label, s }: { label: string; s: { rate: number | null; correctAttempts: number; attempts: number } }) {
  return (
    <div className="rate-row">
      <span>{label}</span>
      <strong>{s.rate === null ? '—' : `${s.rate}%`}</strong>
      <span className="muted small">
        {s.correctAttempts} / {s.attempts}회
      </span>
    </div>
  );
}
