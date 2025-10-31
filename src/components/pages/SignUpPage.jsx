// 회원가입 페이지 컴포넌트
'use client';

// 로그인 페이지
import Image from 'next/image';
import logo from '../../../public/assets/images/logo.svg';

import styles from '@/styles/components/auth.module.css';

import Input from '@/components/atoms/Input.jsx';
import Button from '@/components/atoms/Button';
import Link from 'next/link';
import { useAuthInput } from '@/hooks/useAuthInput';
import createAuthStore from '@/store/userStore';
import { useRouter } from 'next/navigation';
import useAsync from '@/hooks/useAsync';

export default function SignUpPage() {
  const router = useRouter();
  const { values, errors, isSignUpSubmitActive, onChange } = useAuthInput();
  const { signup } = createAuthStore();
  const [pending, error, signupFunc] = useAsync(signup);

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = values;
    const result = await signupFunc(name, email, password);
    if (result?.name) {
      router.push('/sign-in');
    }
  };

  return (
    <div className="flex h-lvh w-[100%] items-center justify-center">
      <div className={styles.authBox}>
        <h1>회원가입</h1>
        {/* SignInPage 컴포넌트가 여기에 추가될 예정 */}
        <Link href="/">
          <Image src={logo} alt="MainLogo" className="mb-[80px]" />
        </Link>
        <form
          className="flex w-[100%] flex-col gap-[44px]"
          onSubmit={handleSubmit}
        >
          <div className="flex w-[100%] flex-col gap-[34px]">
            <Input
              label="이메일"
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={onChange}
              error={errors.email}
              placeholder="이메일을 입력해주세요"
              size="lg"
            />
            <Input
              label="닉네임"
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={onChange}
              error={errors.name}
              placeholder="닉네임을 입력해주세요"
              size="lg"
            />
            <Input
              label="비밀번호"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={onChange}
              error={errors.password}
              placeholder="비밀번호를 입력해주세요"
              size="lg"
            />
            <Input
              label="비밀번호 확인"
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              value={values.passwordCheck}
              onChange={onChange}
              error={errors.passwordCheck}
              placeholder="비밀번호를 한번 더 입력해주세요"
              size="lg"
            />
          </div>
          <Button thikness="thin" disabled={!isSignUpSubmitActive && !pending}>
            {pending ? '요청 중...' : '가입하기'}
          </Button>
        </form>
        <div className="flex gap-[10px]">
          <p className={styles.white}>이미 최애의 포토 회원이신가요?</p>
          <Link href="/sign-in">
            <span className={styles.yellow}>로그인하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
