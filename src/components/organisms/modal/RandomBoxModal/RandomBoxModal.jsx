'use client';
import { useEffect, useState } from 'react';
import useAuth from '@/store/userStore';

import Button from '@/components/atoms/Button';
import fetchClient from '@/lib/fetchClient';

import styles from '../../../../styles/components/RandomBoxModal.module.css';

import Image from 'next/image';
import randomBox_1 from './randomBox_1.png';
import randomBox_2 from './randomBox_2.png';
import randomBox_3 from './randomBox_3.png';
import closeIcon from './cancel_icon.svg';
import pointIcon from './point_icon.svg';

//랜덤 상자가 1시간 마다 포인트를 주는데
//유일한 통화 발행처이기 때문에 중요합니다.
//마지막으로 랜덤상자를 오픈한 시간을 DB에 저장해두었다가.
//메인 페이지 접속시 1시간 이상 차이나면, 모달을 띄워 깜짝 포인트를 주는 방식으로 만들 생각입니다.

//1. 글씨체
//2. api 기능

export default function RandomBoxModal() {
  const { nextRewardTime, setNextRewardTime } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isRecieved, setIsRecieved] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  const covertToTimerOutput = diff => {
    const abs = Math.abs(diff > 0 ? diff : diff - 1000);
    const secfloor = time => {
      return diff > 0 ? Math.floor(time) : Math.ceil(time) - 1;
    };

    return {
      sign: Math.floor(diff / 1000) > -1 ? '' : '-',
      hours: Math.floor((abs / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((abs / (1000 * 60)) % 60),
      seconds: secfloor((abs / 1000) % 60),
    };
  };

  const [outForm, setOutForm] = useState(covertToTimerOutput(3600000));

  const makeTimer = () => {
    return setInterval(() => {
      //화살표 함수는 선언 시점 스코프를 따르기 때문에 한번만 targetTime을 설정해주면 계속 작동.
      const diff = nextRewardTime - new Date().getTime();
      if (diff < 0) {
        setIsRecieved(false); //리워드 수령 안함 상태
        setNextRewardTime(); //다음 수령 시간 재설정
        setIsOpen(true); //모달 오픈
      }
      //  setTimeLeft(diff);
      setOutForm(covertToTimerOutput(diff));
    }, 500);
  };

  useEffect(() => {
    if (!nextRewardTime) {
      return;
    }
    let timer = null;
    timer = makeTimer();

    /* ureEffect의 "정리 함수"에도 clearInterval을 넣어서 반드시 Interval 함수 제거. */
    return () => clearInterval(timer);
  }, [nextRewardTime]);

  const [amount, setAmount] = useState(0);

  function getRandomInt(min = 50, max = 200) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleGetPoint = async () => {
    const _amount = getRandomInt(50, 200);
    setAmount(_amount);
    const result = await fetchClient.authPost(`/api/points/reward`, {
      amount: _amount,
    });
    console.log(result);
    setIsRecieved(true);
  };

  const isSelected = num => {
    if (!selectedBox) {
      return true;
    }
    return num === selectedBox;
  };

  return (
    <>
      {isOpen && (
        <div className="flex h-[100%] w-[100%] items-center justify-center bg-[#fff]">
          <div className="fixed top-[80px] flex h-fit w-fit flex-col items-center gap-[94px] rounded-[2px] bg-[#161616] px-[100px] py-[80px]">
            <div className="flex flex-col items-center gap-[40px] text-center text-[#fff]">
              <div className="text-[46px]">
                <span>랜덤</span>
                <span className="text-[#EFFF04]">포인트</span>
              </div>
              {!isRecieved && (
                <span className="text-[20px]">
                  1시간마다 돌아오는 기회!
                  <br />
                  랜덤 상자 뽑기를 통해 포인트를 획득하세요!
                  {selectedBox}
                </span>
              )}
              {isRecieved && (
                <div>
                  <Image src={pointIcon} alt="pointIcon" />
                  <div className="text-[32px]">
                    <span className="text-[#EFFF04]">{amount}P </span>
                    <span>획득!</span>
                  </div>
                </div>
              )}
              <div className="flex gap-[10px] text-[16px]">
                <span>다음 기회까지 남은 시간</span>
                <span className="text-[#EFFF04]">{`${outForm.minutes}분 ${outForm.seconds}초`}</span>
              </div>
            </div>
            {!isRecieved && (
              <div className="flex flex-col items-center gap-[76px]">
                <div className="relative grid h-fit w-fit grid-cols-3 items-end gap-[60px]">
                  <button
                    className={`${styles.pointBoxBtn} ${styles.box1}`}
                    onClick={() => setSelectedBox(1)}
                  >
                    <Image
                      src={randomBox_1}
                      alt="box_1"
                      className="h-[100%] w-[100%]"
                      style={{
                        opacity: isSelected(1) ? 1 : 0.3,
                      }}
                    />
                  </button>
                  <button
                    className={`${styles.pointBoxBtn} ${styles.box2}`}
                    onClick={() => setSelectedBox(2)}
                  >
                    <Image
                      src={randomBox_2}
                      alt="box_2"
                      className="h-[100%] w-[100%]"
                      style={{
                        opacity: isSelected(2) ? 1 : 0.3,
                      }}
                    />
                  </button>
                  <button
                    className={`${styles.pointBoxBtn} ${styles.box3}`}
                    onClick={() => setSelectedBox(3)}
                  >
                    <Image
                      src={randomBox_3}
                      alt="box_3"
                      className="h-[100%] w-[100%]"
                      style={{
                        opacity: isSelected(3) ? 1 : 0.3,
                      }}
                    />
                  </button>
                </div>
                {selectedBox && (
                  <Button thikness="thin" size="l" onClick={handleGetPoint}>
                    선택완료
                  </Button>
                )}
              </div>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-[30px] right-[30px] cursor-pointer"
            >
              <Image src={closeIcon} alt="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
