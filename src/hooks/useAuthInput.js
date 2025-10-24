'use client';

import { useState, useEffect } from 'react';

function validateEmailString(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

//유효성 검사 커스텀 훅
function useInputValidation(values) {
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const checkValidation = (name, value = values[name]) => {
    let msg = '';
    switch (name) {
      case 'name':
        if (value.length === 0) {
          msg = '닉네임을 입력해 주세요';
        } else if (value.length > 15) {
          msg = '닉네임을 15자 이하로 입력해주세요.';
        }
        break;
      case 'email':
        if (value.length === 0) {
          msg = '이메일을 입력해 주세요';
        } else if (!validateEmailString(value)) {
          msg = '잘못된 이메일 형식입니다';
        }
        break;
      case 'password':
        if (value.length === 0) {
          msg = '비밀번호를 입력해주세요';
        } else if (value.length < 8) {
          msg = '비밀번호를 8자 이상 입력해주세요';
        }
        break;
      case 'passwordCheck':
        if (values['password'].length < 8) {
          msg = '먼저 조건에 맞는 비밀번호를 입력해주세요';
        } else if (value !== values['password']) {
          msg = '비밀번호가 일치하지 않습니다';
        }
        break;
    }
    setErrors(prevValues => ({
      ...prevValues,
      [name]: msg,
    }));

    return msg === '';
  };

  return [errors, checkValidation];
}

//입력 폼 커스텀 훅
export function useAuthInput() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [errors, checkValidation] = useInputValidation(values);
  const [isLogInSubmitActive, setLoginSubmitActive] = useState(false);
  const [isSignUpSubmitActive, setSigninSubmitActive] = useState(false);

  //입력칸이 모두(태그 제외) 빈칸이면 등록 버튼 비활성화
  useEffect(() => {
    setLoginSubmitActive(
      values.name !== '' &&
        values.email !== '' &&
        values.password !== '' &&
        errors.name === '' &&
        errors.email === '' &&
        errors.password === '',
    );
    setSigninSubmitActive(
      values.name !== '' &&
        values.email !== '' &&
        values.password !== '' &&
        values.passwordCheck !== '' &&
        errors.name === '' &&
        errors.email === '' &&
        errors.password === '' &&
        errors.passwordCheck === '',
    );
  }, [values, errors]);

  const onChange = e => {
    const { name, value } = e.target;

    setValues(prevValues => ({
      ...prevValues,
      [name]: value, //대괄호 표기법 = 문자열
    }));

    //유효성 검사
    checkValidation(name, value);
    console.log(values);
  };

  return {
    values,
    errors,
    isLogInSubmitActive,
    isSignUpSubmitActive,
    onChange,
  };
}
