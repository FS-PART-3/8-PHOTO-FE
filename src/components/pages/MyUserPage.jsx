//통칭 마이페이지입니다.

'use client';

import { useState, useEffect } from 'react';
import fetchClient from '@/lib/fetchClient';
import Title from '../molecules/Title';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import PointGraph from '../organisms/PointGraph';
import { useUserData } from '@/providers/AuthProvider';

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
        console.log(result);
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
                <PointChart pointHistory={pointHistory} />
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

function PointChart({ pointHistory }) {
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
  const { userName, points } = useUserData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState('none');

  // 유저 정보 수정
  const handleUpdate = async () => {
    // try {
    //   const res = await fetch('/api/user/update', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password }),
    //   });
    //   const result = await res.json();
    //   alert(result.message || '수정 완료');
    // } catch (err) {
    //   console.error('유저 정보 수정 실패:', err);
    // }
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
              {editMode !== 'name' && (
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
              {editMode !== 'pw' && (
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
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="flex w-fit items-center gap-4">
                <Button
                  type="button"
                  thikness="thin"
                  size="m"
                  onClick={() => {
                    setEditMode('none');
                  }}
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Input
                  label="기존 비밀번호 확인"
                  type="password"
                  name="password"
                  placeholder="기존 비밀번호 확인"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Input
                  label="새로운 비밀번호"
                  type="password"
                  name="password"
                  placeholder="새로운 비밀번호"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="flex w-fit items-center gap-4">
                <Button
                  type="button"
                  thikness="thin"
                  size="m"
                  onClick={() => {
                    setEditMode('none');
                  }}
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
          <span>{points}</span>
        </div>
        <div className="flex h-fit w-full flex-col p-4 text-center">
          <span>판매 중인 상품</span>
          <span>{0}개</span>
        </div>
        <div className="flex h-fit w-full flex-col p-4 text-center">
          <span>성사된 거래</span>
          <span>{0}건</span>
        </div>
      </div>
    </div>
  );
}
