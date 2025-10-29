'use client';

import Image from 'next/image';
import randomBox_1 from './randomBox_1.png';
import randomBox_2 from './randomBox_2.png';
import randomBox_3 from './randomBox_3.png';
import close_icon from './cancel_icon.svg';
import { useState } from 'react';

//랜덤 상자가 1시간 마다 포인트를 주는데
//유일한 통화 발행처이기 때문에 중요합니다.
//마지막으로 랜덤상자를 오픈한 시간을 DB에 저장해두었다가.
//메인 페이지 접속시 1시간 이상 차이나면, 모달을 띄워 깜짝 포인트를 주는 방식으로 만들 생각입니다.

//1. 글씨체
//2. api 기능

export default function RandomBoxModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="flex h-[100%] w-[100%] items-center justify-center bg-[#fff]">
          <div className="fixed top-[80px] flex h-[646px] w-[1034px] flex-col items-center justify-between rounded-[2px] bg-[#161616] px-[100px] py-[80px]">
            <div className="flex flex-col items-center gap-[40px] text-center text-[#fff]">
              <div className="text-[46px]">
                <span>랜덤</span>
                <span className="text-[#EFFF04]">포인트</span>
              </div>
              <span className="text-[20px]">
                1시간마다 돌아오는 기회!
                <br />
                랜덤 상자 뽑기를 통해 포인트를 획득하세요!
              </span>
              <div className="flex gap-[10px] text-[16px]">
                <span>다음 기회까지 남은 시간</span>
                <span className="text-[#EFFF04]">59분 59초</span>
              </div>
            </div>
            <div className="grid h-fit w-fit grid-cols-3 gap-[60px]">
              <Image
                src={randomBox_1}
                alt="box_1"
                className="h-[198px] w-[1fr]"
              />
              <Image
                src={randomBox_2}
                alt="box_2"
                className="h-[198px] w-[1fr]"
              />
              <Image
                src={randomBox_3}
                alt="box_3"
                className="h-[198 px] w-[1fr]"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-[30px] right-[30px] cursor-pointer"
            >
              <Image src={close_icon} alt="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
