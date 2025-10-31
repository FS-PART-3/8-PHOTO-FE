// CHIJUNEE 개발자 컴포넌트 테스트 페이지

import Grade from '@/components/molecules/Grade';

export default function CHIJUNEEPage() {
  return (
    <div className="developer-page">
      <h2 className="text-white">CHIJUNEE 개발자 페이지</h2>
      <p className="text-white">
        컴포넌트 테스트 및 개발 작업을 위한 페이지입니다.
      </p>
      {/* 개발자가 작업할 컴포넌트들이 여기에 추가될 예정 */}
      <Grade grade="COMMON" variant="my_card" size="L" />
      <Grade grade="SUPER RARE" variant="my_card" size="S" />

      <Grade grade="RARE" variant="card" size="L" />
      <Grade grade="LEGENDARY" variant="card" size="S" />

      <Grade grade="SUPER RARE" variant="detail" size="L" />
    </div>
  );
}
