import DefaultLayout from '@/components/layouts/DefaultLayout';

// 보호된 라우트 레이아웃 (로그인 필요)
export default function ProtectedLayout({ children }) {
  return (
    <div className="protected-layout">
      <DefaultLayout>
        <main>{children}</main>
      </DefaultLayout>
    </div>
  );
}
