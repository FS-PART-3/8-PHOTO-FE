// 로그인 페이지 컴포넌트
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import logo from '../../../public/assets/images/logo.svg';

import useAsync from '@/hooks/useAsync';
import useAuth from '@/store/userStore';
import { useAuthInput } from '@/hooks/useAuthInput';
import SocialLogin from '../molecules/socialLogin/SocialLogin';
import Modal from '../organisms/modal/Modal';

import Input from '@/components/atoms/Input.jsx';
import Button from '@/components/atoms/Button';

export default function SignInPage() {
  const { values, errors, isLogInSubmitActive, onChange } = useAuthInput();
  const { login } = useAuth();
  const [pending, error, setError, loginFunc] = useAsync(login);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = values;
    const result = await loginFunc(email, password);
    if (result?.id) {
      router.push('/market');
    }
  };

  return (
    <div className="flex h-lvh w-full items-center justify-center">
      <div className="mx-15px lg:mx-20px my-auto flex h-fit w-full max-w-[520px] flex-col items-center gap-[40px]">
        {/* SignInPage 컴포넌트가 여기에 추가될 예정 */}
        <Link href="/">
          <Image src={logo} alt="MainLogo" className="mb-[80px]" />
        </Link>
        <form className="flex w-full flex-col" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col">
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
          </div>
          <div className="flex w-full flex-col gap-[34px]">
            <Button thikness="thin" disabled={!isLogInSubmitActive && !pending}>
              {pending ? '요청 중...' : '로그인'}
            </Button>
            <SocialLogin />
          </div>
        </form>
        <div className="flex gap-[10px] text-[16px] font-normal">
          <p className="text-[#fff]">최애의 포토가 처음이신가요?</p>
          <Link href="/sign-up">
            <span className="text-[#efff04]">회원가입하기</span>
          </Link>
        </div>
      </div>
      <Modal
        isOpen={error}
        onClose={() => {
          setError(null);
        }}
        onConfirm={() => {
          setError(null);
        }}
      >
        <span className="text-[#fff]">{error}</span>
      </Modal>
    </div>
  );
}
