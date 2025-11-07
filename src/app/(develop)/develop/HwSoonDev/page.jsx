import Profile from '../../../../components/molecules/Profile.jsx';
import RandomPoints from '../../../../components/organisms/modal/RandomPoints/RandomPoints.jsx';

// HwSoonDev 개발자 컴포넌트 테스트 페이지
export default function HwSoonDevPage() {
  return (
    <div className="developer-page">
      <h2>HwSoonDev 개발자 페이지</h2>
      <p>컴포넌트 테스트 및 개발 작업을 위한 페이지입니다.</p>
      <RandomPoints />
    </div>
  );
}
