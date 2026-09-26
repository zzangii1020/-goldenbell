import { Component, type ReactNode } from 'react';

interface State {
  error: Error | null;
}

/**
 * 화면을 그리다 오류가 나도 빈 화면 대신 오류 내용과 복구 버튼을 보여준다.
 * (React는 렌더링 오류가 나면 화면 전체를 비우기 때문)
 */
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  private goHome = () => {
    try {
      window.localStorage.removeItem('goldenbell.extinction.v1.session');
    } catch {
      // 저장소를 쓸 수 없어도 새로고침은 한다
    }
    window.location.reload();
  };

  private resetAll = () => {
    try {
      window.localStorage.removeItem('goldenbell.extinction.v1.session');
      window.localStorage.removeItem('goldenbell.extinction.v1.state');
    } catch {
      // 무시
    }
    window.location.reload();
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <main className="page">
        <section className="panel">
          <h1 style={{ fontSize: 22, marginBottom: 8 }}>화면을 표시하지 못했습니다</h1>
          <p>아래 오류 내용을 캡처해서 알려주시면 고칠 수 있습니다.</p>
          <pre className="error-box">
            {error.name}: {error.message}
            {'\n'}
            {navigator.userAgent}
          </pre>
          <div className="menu">
            <button type="button" className="btn btn-primary btn-lg" onClick={this.goHome}>
              홈으로 돌아가기 (학습 기록 유지)
            </button>
            <button type="button" className="btn btn-lg btn-outline" onClick={this.resetAll}>
              학습 기록 초기화 후 다시 시작
            </button>
          </div>
        </section>
      </main>
    );
  }
}
