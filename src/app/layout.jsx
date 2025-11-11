import '@/styles/globals.css';
import Providers from '@/app/providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const metadata = {
  title: '최애의 포토',
  description: '개인용 디지털 사진첩 생성 플랫폼, 최애의 포토',
  openGraph: {
    title: '최애의 포토',
    description: '개인용 디지털 사진첩 생성 플랫폼, 최애의 포토',
    images: ['/assets/images/market-og.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
