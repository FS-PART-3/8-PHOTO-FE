// 로그인 페이지
import Image from 'next/image';
import logo from './(image)/main_logo.svg';

import styles from './signup.module.css';
import Input from './(components)/input';

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <h1>로그인</h1>
      {/* SignInPage 컴포넌트가 여기에 추가될 예정 */}
      <Image src={logo} alt="MainLogo" />
      <form className={styles.inputForm}>
        <Input
          label="이메일"
          value={null}
          onChange={null}
          error={null}
          placeholder="이메일을 입력해주세요"
        />
        <Input
          label="비밀번호"
          value={null}
          onChange={null}
          error={null}
          placeholder="비밀번호를 입력해주세요"
        />
      </form>
    </div>
  );
}
