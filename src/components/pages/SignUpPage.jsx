// 회원가입 페이지 컴포넌트
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

export default function SignUpPage() {
  const router = useRouter();
  const { values, errors, isSignUpSubmitActive, onChange } = useAuthInput();
  const { signup } = useAuth();
  const [pending, error, setError, signupFunc] = useAsync(signup);

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = values;
    const result = await signupFunc(name, email, password);
    if (result?.name) {
      router.push('/sign-in');
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
          <div className="flex flex-col gap-[34px]">
            <Button
              thikness="thin"
              disabled={!isSignUpSubmitActive && !pending}
            >
              {pending ? '요청 중...' : '가입하기'}
            </Button>
            <SocialLogin />
          </div>
        </form>
        <div className="flex gap-[10px] text-[16px] font-normal">
          <p className="text-[#fff]">이미 최애의 포토 회원이신가요?</p>
          <Link href="/sign-in">
            <span className="text-[#efff04]">로그인하기</span>
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
