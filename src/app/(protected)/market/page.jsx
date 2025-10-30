import Header from '@/components/organisms/header/Header';
import Title from '@/components/molecules/Title';
import MarketPage from '@/components/pages/MarketPage';

export default function Page() {
  return (
    <>
      <Header />
      <div className="mt-[60px] mx-auto max-w-[1200px]">
        <Title
          text="마켓플레이스"
          size="48"
          family="secondary"
          weight={400}
          containerWidth="full"
          justify="between"
          align="center"
          action={{ label: '내 포토카드 판매하기', href: '/sell', size: 'auto', variant: 'primary' }}
        />
      </div>

      <MarketPage />
    </>
  );
}
