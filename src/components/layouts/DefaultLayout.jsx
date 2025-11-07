import Header from '../organisms/header/Header';
import RandomPoints from '../organisms/modal/RandomPoints/RandomPoints';

// 기본 레이아웃 컴포넌트
export default function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      <Header />
      {children}
      <RandomPoints />
    </div>
  );
}
