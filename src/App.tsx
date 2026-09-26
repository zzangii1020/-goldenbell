import { useCallback, useEffect, useMemo, useState } from 'react';
import { questions } from './data/questions';
import type { Question } from './data/types';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Progress from './components/Progress';
import {
  emptyState,
  recordAttempt,
  toggleFavorite,
  type AttemptResult,
  type OrderMode,
  type StudyState,
} from './lib/progress';
import { createSession, type QuizMode, type SessionState } from './lib/session';
import { loadSession, loadState, saveSession, saveState } from './lib/storage';

type View = 'home' | 'quiz' | 'result' | 'progress';

export default function App() {
  const [state, setState] = useState<StudyState>(() => loadState());
  const [session, setSession] = useState<SessionState | null>(() => loadSession());
  const [view, setView] = useState<View>('home');
  const [notice, setNotice] = useState<string | null>(null);

  const byId = useMemo(() => new Map<string, Question>(questions.map((q) => [q.id, q])), []);

  useEffect(() => saveState(state), [state]);
  useEffect(() => saveSession(session), [session]);
  useEffect(() => window.scrollTo(0, 0), [view]);

  const startMode = useCallback(
    (mode: QuizMode) => {
      const s = createSession(mode, questions, state, state.order);
      if (!s) {
        setNotice(mode === 'wrong' ? '현재 틀린 문제가 없습니다.' : '즐겨찾기한 문제가 없습니다.');
        setView('home');
        return;
      }
      setNotice(null);
      setSession(s);
      setView('quiz');
    },
    [state],
  );

  const handleAnswer = useCallback((questionId: string, result: AttemptResult, answer: string | null) => {
    setState((prev) => recordAttempt(prev, questionId, result, answer));
    setSession((prev) =>
      prev ? { ...prev, answers: { ...prev.answers, [questionId]: { result, answer } } } : prev,
    );
  }, []);

  const goTo = useCallback((index: number) => {
    setSession((prev) => (prev ? { ...prev, index } : prev));
    window.scrollTo(0, 0);
  }, []);

  const finish = useCallback(() => {
    setSession((prev) => (prev ? { ...prev, finished: true } : prev));
    setView('result');
  }, []);

  const setOrder = (order: OrderMode) => setState((prev) => ({ ...prev, order }));
  const toggleFav = (id: string) => setState((prev) => toggleFavorite(prev, id));

  const resetAll = () => {
    setState({ ...emptyState(), order: state.order });
    setSession(null);
  };

  const sessionQuestions = session
    ? session.questionIds.map((id) => byId.get(id)).filter((q): q is Question => !!q)
    : [];

  if (view === 'quiz' && session && sessionQuestions.length > 0) {
    return (
      <Quiz
        session={session}
        questions={sessionQuestions}
        state={state}
        onAnswer={handleAnswer}
        onToggleFavorite={toggleFav}
        onGoTo={goTo}
        onFinish={finish}
        onExit={() => setView('home')}
      />
    );
  }

  if (view === 'result' && session) {
    return (
      <Result
        session={session}
        questions={sessionQuestions}
        state={state}
        onRestart={() => startMode(session.mode)}
        onStart={startMode}
        onHome={() => {
          setSession(null);
          setView('home');
        }}
      />
    );
  }

  if (view === 'progress') {
    return (
      <Progress
        state={state}
        questions={questions}
        onBack={() => setView('home')}
        onReset={resetAll}
      />
    );
  }

  return (
    <Home
      state={state}
      questions={questions}
      session={session && !session.finished ? session : null}
      notice={notice}
      onDismissNotice={() => setNotice(null)}
      onStart={startMode}
      onResume={() => setView('quiz')}
      onProgress={() => setView('progress')}
      onOrderChange={setOrder}
    />
  );
}
