import Image from 'next/image';
import googleImage from './google-logo.png';

export default function SocialLogin({}) {
  return (
    <button className="flex min-h-[60px] w-full max-w-[520px] cursor-pointer items-center justify-center gap-4 rounded-[2px] bg-[#d4d4aeff] text-[18px] font-bold text-[var(--color-black)] transition duration-200 ease-in-out hover:opacity-90">
      간편 로그인 하기
      <Image src={googleImage} className="h-[50px] w-[50px]" />
    </button>
  );
}
