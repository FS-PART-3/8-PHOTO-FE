import DefaultLayout from '@/components/layouts/DefaultLayout';
import LandingPage from '../components/pages/LandingPage';

export const metadata = {
  title: '최애의 포토',
  description: '개인용 디지털 사진첩 생성 플랫폼, 최애의 포토',
  openGraph: {
    title: '최애의 포토',
    description: '개인용 디지털 사진첩 생성 플랫폼, 최애의 포토',
    images: ['/assets/images/market-og.png'],
  },
};

export default function Page() {
  return (
    <DefaultLayout>
      <LandingPage />
    </DefaultLayout>
  );
}
