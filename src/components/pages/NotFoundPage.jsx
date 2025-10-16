import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <Image
        src="/assets/images/logo.svg"
        alt="logo"
        width={200}
        height={100}
      />
      <h1 className="mt-6 mb-4 text-4xl font-bold text-[var(--color-main)] md:text-6xl">
        404
      </h1>
      <p className="mb-8 text-gray-300">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="rounded-md border border-blue-300 px-4 py-2 text-blue-300 hover:underline"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
