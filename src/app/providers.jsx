'use client';

import { AuthProvider } from '@/providers/AuthProvider';
import QueryProvider from '@/providers/QueryProvider';

// 프로바이더들을 감싸는 최상위 컴포넌트
export default function Providers({ children }) {
  return (
    <>
      {/* AuthProvider, QueryProvider 등이 여기에 추가될 예정 */}
      <AuthProvider>
        <QueryProvider>{children}</QueryProvider>
      </AuthProvider>
    </>
  );
}
