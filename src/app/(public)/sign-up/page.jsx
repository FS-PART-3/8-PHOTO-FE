// 로그인 페이지
import Image from 'next/image';
import logo from './(image)/main_logo.svg';

import styles from './signup.module.css';
import Input from './(components)/input';
import Button from '@/components/atoms/Button';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex h-lvh w-[100%] items-center justify-center">
      <div className={styles.authBox}>
        <h1>회원가입</h1>
        {/* SignInPage 컴포넌트가 여기에 추가될 예정 */}
        <Image src={logo} alt="MainLogo" className="mb-[80px]" />
        <form className="flex w-[100%] flex-col gap-[44px]">
          <div className="flex w-[100%] flex-col gap-[34px]">
            <Input
              label="이메일"
              name="email"
              value={null}
              onChange={null}
              error="배고파요"
              placeholder="이메일을 입력해주세요"
            />
            <Input
              label="닉네임"
              name="name"
              value={null}
              onChange={null}
              error={null}
              placeholder="닉네임을 입력해주세요"
            />
            <Input
              label="비밀번호"
              name="password"
              value={null}
              onChange={null}
              error={null}
              placeholder="비밀번호를 입력해주세요"
            />
            <Input
              label="비밀번호 확인"
              name="passwordCheck"
              value={null}
              onChange={null}
              error={null}
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
          </div>
          <Button thikness="thin">가입하기</Button>
        </form>
        <div className="flex gap-[10px] text-[var(--font-16-regular)]">
          <p className="text-[var(--white-white, #FFF)]">
            이미 최애의 포토 회원이신가요?
          </p>
          <Link href="/sign-in">
            <span className="text-[var(--main-main, #EFFF04)]">로그인하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
