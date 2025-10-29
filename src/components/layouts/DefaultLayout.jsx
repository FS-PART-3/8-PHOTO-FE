import Title from '../molecules/Title';
import Header from '../organisms/header/Header';

// 기본 레이아웃 컴포넌트
export default function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      <Header />
      {children}
    </div>
  );
}
