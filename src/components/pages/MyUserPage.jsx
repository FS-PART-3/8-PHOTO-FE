//통칭 마이페이지입니다.

'use client';

import { useState, useEffect } from 'react';
import fetchClient from '@/lib/fetchClient';
import Title from '../molecules/Title';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import PointGraph from '../organisms/PointGraph';
import useAuth from '@/store/userStore';
import { API_ROUTES } from '@/constants/apiRoutes';
import Modal from '../organisms/modal/Modal';
import { sellingService } from '@/services/sellingService';

export default function MyUserPage({}) {
  const [pointHistory, setPointHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const bloom = {
    position: 'absolute',
    top: '0',
    right: 0,
    width: '300px',
    height: '300px',
    background:
      'radial-gradient(circle, rgba(97, 255, 223, 0.97) 0%, transparent 70%)',
    filter: 'blur(20px)',
    pointerEvents: 'none',
  };

  const bloom2 = {
    position: 'absolute',
    top: '70%',
    left: '-10% ',
    width: '500px',
    height: '500px',
    background:
      'radial-gradient(circle, rgba(51, 196, 111, 0.97) 0%, transparent 70%)',
    filter: 'blur(20px)',
    pointerEvents: 'none',
  };

  // 포인트 내역 불러오기
  useEffect(() => {
    async function fetchPoints() {
      setLoading(true);
      try {
        const result = await fetchClient.authGet('/api/points/history');
        setPointHistory(result.points);
      } catch (err) {
        console.error('포인트 내역 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPoints();
  }, []);

  return (
    <div className="flex h-fit w-full justify-center">
      <div className="fixed z-0 h-full w-full">
        <div style={bloom}></div>
        <div style={bloom2}></div>
      </div>
      <div className="relative z-10 mb-10 w-full max-w-[1200px] px-4">
        <Title text="마이페이지" />
        <div className="mt-10 w-full"></div>
        <UserData />
        <section className="mt-8 flex w-full flex-col justify-between text-white">
          <div className="h-fit w-full">
            <h2 className="beskin-h4 mb-2 mb-8 text-[#fff]">포인트 내역</h2>
            {loading ? (
              <p>불러오는 중...</p>
            ) : (
              <div className="flex w-full flex-col gap-8 lg:grid lg:grid-cols-[1.5fr_1fr]">
                <PointGraph pointHistory={pointHistory} />
                <PointHist pointHistory={pointHistory} />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function convertDate(isoString) {
  const date = new Date(isoString);
  // 각각 분해
  const year = date.getFullYear(); // 2025
  const month = date.getMonth() + 1; // 10 (0부터 시작하므로 +1)
  const day = date.getDate(); // 29
  const hour = date.getHours(); // 18 (한국 시간으로 변환 시)
  const minute = date.getMinutes();
  return { year, month, day, hour, minute };
}

function PointHist({ pointHistory }) {
  const reason = {
    PURCHASE: '카드 구입',
    SALE: '카드 판매',
    RANDOM_BOX_REWARD: '랜덤 포인트',
    ADMIN_ADJUSTMENT: '서버 조정',
  };

  const colorBlue = { color: 'var(--color-blue)' };

  const colorRed = { color: 'var(--color-red)' };

  return (
    <section className="h-fit w-full">
      <div className="mb-4 grid h-fit w-full grid-cols-[1.5fr_3fr_2fr] divide-x-1 divide-solid divide-[#fff] rounded-xl bg-[#2c2c2c] p-4 text-[#fff] inset-shadow-sm inset-shadow-[#dddddd] backdrop-blur-md">
        <div className="text-center">일자</div>
        <div className="text-center">내용</div>
        <div className="text-center">변동</div>
      </div>
      <ul className="scrollbar-hidden flex h-[500px] flex-col divide-y-1 divide-solid divide-[#161616] overflow-y-scroll rounded-xl bg-[#161616] shadow-sm inset-shadow-sm shadow-[#fff] inset-shadow-[#fff] backdrop-blur-md">
        {pointHistory.map((point, idx) => {
          const { year, month, day, hour, minute } = convertDate(
            point.createdAt,
          );
          const points = point.amount;
          return (
            <li
              key={idx + 1}
              className="grid w-full grid-cols-[1.5fr_3fr_2fr] gap-2 bg-[#ddd]/30 p-4 text-[#fff]"
            >
              <div>{`${year}/${month}/${day} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`}</div>
              <div>{reason[point.reason]}</div>
              <div
                style={points >= 0 ? colorRed : colorBlue}
                className="text-center"
              >
                {points >= 0 ? `+${points}` : `-${points}`}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function UserData({}) {
  const { userName, points, provider, setUserName } = useAuth();
  const [editMode, setEditMode] = useState('none');
  const [values, setValues] = useState({
    name: '',
    password: '',
    passwordCheck: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    password: '',
    passwordCheck: '',
    newPassword: '',
  });
  const [modalMsg, setModalMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [onSale, setOnSale] = useState(0);
  const [soldout, setSoldout] = useState(0);

  useEffect(() => {
    const loadSaleHistory = async () => {
      const pageSize = 20;
      let cntOnSale = 0;
      let cntSoldout = 0;
      let res;
      let page = 1;
      do {
        res = await sellingService.getMySellingPhotos({
          page,
          limit: pageSize,
          ststus: 'FOR_SALE',
        });
        cntOnSale += res.countsGroup.totalCounts;
        console.log(res.countsGroup);
        page++;
      } while (res.countsGroup.totalCounts >= pageSize);
      page = 1;
      do {
        res = await sellingService.getMySellingPhotos({
          page,
          limit: pageSize,
          ststus: 'SOLD_OUT',
        });
        cntSoldout += res.countsGroup.totalCounts;
        page++;
      } while (res.countsGroup.totalCounts >= pageSize);

      setOnSale(cntOnSale);
      setSoldout(cntSoldout);
    };

    loadSaleHistory();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    checkValidation(name, value);
  };

  const closeEdit = () => {
    setValues({ name: '', password: '', passwordCheck: '', newPassword: '' });
    setEditMode('none');
  };

  // 유저 정보 수정
  const handleSubmitName = async e => {
    e.preventDefault();
    const result = await fetchClient.authPost(API_ROUTES.USERS.NICKNAME, {
      newUserName: values.name,
    });
    if (result.ok) {
      setModalMsg('닉네임 변경에 성공했습니다.');
      setUserName(values.name);
      setIsModalOpen(true);
    }
    closeEdit();
  };

  const handleSubmitPw = async e => {
    e.preventDefault();
    const result = await fetchClient.authPost(API_ROUTES.AUTH.RESET_PW, {
      password: values.password,
      newPassword: values.newPassword,
    });
    if (result.ok) {
      setModalMsg('비밀번호 변경에 성공했습니다.');
      setIsModalOpen(true);
    }
    closeEdit();
  };

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
      case 'password':

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

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex h-fit justify-between gap-8">
        <div className="w-full text-white">
          <h2 className="beskin-h4 mb-8">개인 정보</h2>
          <div className="flex h-fit flex-col gap-8">
            <div className="flex items-center gap-32">
              <div className="flex items-center gap-4">
                <label className="beskin-h5">내 닉네임:</label>
                <span className="text-[20px]">{userName}</span>
              </div>
              {editMode !== 'name' && provider === 'local' && (
                <button
                  className="h-fit cursor-pointer text-white/70 hover:text-white/90"
                  onClick={() => {
                    setEditMode('name');
                  }}
                >
                  닉네임 수정하기
                </button>
              )}
            </div>
            <div className="flex h-fit justify-start">
              {editMode !== 'pw' && provider === 'local' && (
                <button
                  className="h-fit cursor-pointer text-white/70 hover:text-white/90"
                  onClick={() => {
                    setEditMode('pw');
                  }}
                >
                  비밀번호 변경하기
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          {editMode === 'name' && (
            <form className="flex h-fit flex-col items-start gap-8">
              <div className="flex h-fit flex-col gap-4">
                <Input
                  label="새로운 닉네임"
                  type="text"
                  name="name"
                  placeholder="새로운 닉네임"
                  value={values.name}
                  error={errors.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex w-fit items-center gap-4">
                <Button
                  type="button"
                  thikness="thin"
                  size="m"
                  onClick={handleSubmitName}
                >
                  수정하기
                </Button>
                <button
                  className="h-fit w-[100px] cursor-pointer text-center text-white text-white/70 hover:text-white/90"
                  onClick={() => {
                    setEditMode('none');
                  }}
                >
                  취소
                </button>
              </div>
            </form>
          )}
          {editMode === 'pw' && (
            <form className="flex h-fit flex-col items-start gap-8">
              <div className="flex h-fit flex-col gap-4">
                <Input
                  label="기존 비밀번호"
                  type="password"
                  name="password"
                  placeholder="기존 비밀번호"
                  value={values.password}
                  error={errors.password}
                  onChange={handleChange}
                />
                <Input
                  label="기존 비밀번호 확인"
                  type="password"
                  name="passwordCheck"
                  placeholder="기존 비밀번호 확인"
                  value={values.passwordCheck}
                  error={errors.passwordCheck}
                  onChange={handleChange}
                />
                <Input
                  label="새로운 비밀번호"
                  type="password"
                  name="newPassword"
                  placeholder="새로운 비밀번호"
                  value={values.newPassword}
                  error={errors.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="flex w-fit items-center gap-4">
                <Button
                  type="button"
                  thikness="thin"
                  size="m"
                  onClick={handleSubmitPw}
                >
                  수정하기
                </Button>
                <button
                  className="h-fit w-[100px] cursor-pointer text-center text-white text-white/70 hover:text-white/90"
                  onClick={() => {
                    setEditMode('none');
                  }}
                >
                  취소
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="m-0 flex h-fit w-full divide-x-1 divide-solid divide-white rounded-xl border-[1px] border-white bg-black p-0 text-white">
        <div className="flex h-fit w-full flex-col p-4 text-center">
          <span>포인트</span>
          <span>{points || 0}</span>
        </div>
        <div className="flex h-fit w-full flex-col p-4 text-center">
          <span>판매 중인 상품</span>
          <span>{onSale}개</span>
        </div>
        <div className="flex h-fit w-full flex-col p-4 text-center">
          <span>성사된 거래</span>
          <span>{soldout}건</span>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          setIsModalOpen(false);
        }}
      >
        <span className="text-[#fff]">{modalMsg}</span>
      </Modal>
    </div>
  );
}
