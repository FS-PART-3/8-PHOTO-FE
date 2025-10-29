import AuthLayout from '@/components/layouts/AuthLayout';

// 퍼블릭 라우트 레이아웃 (로그인 불필요)
export default function PublicLayout({ children }) {
  return (
    <div className="public-layout">
      <AuthLayout>
        <main>{children}</main>
      </AuthLayout>
    </div>
  );
}
