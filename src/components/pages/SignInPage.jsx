// 로그인 페이지 컴포넌트
'use client';

// 로그인 페이지
import Link from 'next/link';
import { useAuthInput } from '@/hooks/useAuthInput';
import useAuth from '@/store/userStore';

import Input from '@/components/atoms/Input/Input.jsx';
import Button from '@/components/atoms/Button';

import styles from './styles/auth.module.css';

import Image from 'next/image';
import logo from '../../../public/assets/images/logo.svg';

export default function SignInPage() {
  const { values, errors, isLogInSubmitActive, onChange } = useAuthInput();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = values;
    const result = await login(email, password);
  };

  return (
    <div className="flex h-lvh w-[100%] items-center justify-center">
      <div className={styles.authBox}>
        <h1>회원가입</h1>
        {/* SignInPage 컴포넌트가 여기에 추가될 예정 */}
        <Image src={logo} alt="MainLogo" className="mb-[80px]" />
        <form
          className="flex w-[100%] flex-col gap-[44px]"
          onSubmit={handleSubmit}
        >
          <div className="flex w-[100%] flex-col gap-[34px]">
            <Input
              label="이메일"
              name="email"
              value={values.email}
              onChange={onChange}
              error={errors.email}
              placeholder="이메일을 입력해주세요"
            />
            <Input
              label="비밀번호"
              name="password"
              value={values.password}
              onChange={onChange}
              error={errors.password}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <Button thikness="thin" disabled={!isLogInSubmitActive}>
            로그인
          </Button>
        </form>
        <div className="flex gap-[10px]">
          <p className={styles.white}>최애의 포토가 처음이신가요?</p>
          <Link href="/sign-up">
            <span className={styles.yellow}>회원가입하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
