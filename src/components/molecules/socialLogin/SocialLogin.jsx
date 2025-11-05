import Image from 'next/image';
import googleImage from './google-logo.png';
import Link from 'next/link';

export default function SocialLogin({}) {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google`}
      className="relative flex min-h-[60px] w-full max-w-[520px] cursor-pointer items-center justify-center gap-4 rounded-[2px] bg-[#d4d4aeff] text-[18px] font-bold text-[var(--color-black)] transition duration-200 ease-in-out hover:opacity-90"
    >
      간편 로그인 (구글)
      <Image
        src={googleImage}
        className="absolute right-20 h-[50px] w-[50px]"
        alt="google_icon"
      />
    </Link>
  );
}
