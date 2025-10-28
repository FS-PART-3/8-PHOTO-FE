import Header from '../organisms/header/Header';
import Button from '../atoms/Button';

export default function LandingPage() {
  return (
    <main className="bg-[var(--color-black)] text-[var(--color-white)]">
      <div className="mx-auto relative w-[1920px] h-[4281px] overflow-hidden">
        <Header />

        <div className="mt-[13px] relative w-screen">
          <div className="relative mx-auto w-[1798px] h-[1086px] overflow-visible">
            <img
              src="/assets/images/landingbg.svg"
              alt=""
              className="absolute inset-0 w-[1798px] h-[1086px]"
            />

            <img
              src="/assets/images/logo.svg"
              alt="로고"
              className="absolute z-[2] top-[77px] left-[832px] w-[138.94px] h-[23.2px] pointer-events-none select-none"
            />

            <div className="absolute z-[2] top-[123px] left-[734px] w-[328px] h-[96px] pointer-events-none select-none">
              <p className="text-[40px] font-[700] leading-[48px] text-[var(--color-white)] text-center">
                구하기 어려웠던<br />
                <span className="text-[var(--color-main)]">나의 최애</span>가 여기에!
              </p>
            </div>

            <div
              className="absolute z-[4]"
              style={{
                top: 252,
                left: 786,
                right: 786,
                height: 55,
              }}
            >
              <Button
                variant="primary"
                thikness="thin"
                size="m"
                className="
                  w-full h-full px-0 py-[17px]
                  !min-h-[55px] !max-w-none
                  !bg-[var(--color-main)]
                  !text-[var(--color-black)] text-[16px] font-[700]
                  !rounded-[2px]
                "
              >
                최애 찾으러 가기
              </Button>
            </div>
          </div>

          <img
            src="/assets/images/landing.svg"
            alt="랜딩 이미지"
            className="absolute z-[3] top-[319px] left-[calc((100vw-1798px)/2-58px)] w-[1917px] h-[765px] pointer-events-none select-none"
          />

          <div className="relative mx-auto mt-[138px] w-[1798px]">
            <div className="w-[325px] ml-[428px]">
              <p className="text-[36px] font-[700] text-[var(--color-white)] whitespace-nowrap">
                포인트로 <span className="text-[var(--color-main)]">안전하게 거래</span>하세요
              </p>
              <p className="mt-[14px] text-[18px] font-[400] text-[#9F9F9F] whitespace-nowrap">
                내 포토카드를 포인트로 팔고, 원하는 포토카드를<br />
                포인트로 안전하게 교환하세요
              </p>
            </div>

            <img
              src="/assets/images/landing-img2.svg"
              alt="랜딩 이미지 2"
              className="relative z-[10] block mt-[8px] mb-[35px] ml-[428px] w-[1068px] h-[518px] pointer-events-none select-none"
            />
          </div>

          <div
            className="absolute z-[0] top-[1524px] left-[calc((100vw-1798px)/2+501px)] w-[1480px] h-[1480px] pointer-events-none select-none rounded-[9999px]"
            style={{
              opacity: 0.2,
              background: 'linear-gradient(180deg, #EFFF04 0%, #0F0F0F 100%)',
              boxShadow: '0px 0px 50px rgba(255, 255, 255, 0.10) inset',
              border: '2px #EFFF04 solid',
            }}
          />

          <section className="relative z-[2] mt-[35px] mx-auto w-[1920px] h-[800px] bg-[var(--color-black)] overflow-hidden">
            <div className="relative w-full h-full">
              <div
                className="
                  absolute z-[0]
                  top-[407px] left-[83px]
                  w-[1606px] h-[1606px]
                  rounded-[9999px]
                  pointer-events-none select-none
                "
                style={{
                  opacity: 0.30,
                  background: 'linear-gradient(180deg, #0085BA 0%, #0F0F0F 100%)',
                  boxShadow: '0px 0px 50px rgba(255, 255, 255, 0.10) inset',
                  border: '2px #149CFF solid',
                }}
              />

              <div className="absolute z-[10] top-[128px] left-0 w-[1920px]">
                <div className="ml-[428px] w-[389px]">
                  <p className="text-[36px] font-[700] whitespace-nowrap text-[var(--color-white)]">
                    알림으로 보다 <span className="text-[#04B8FF]">빨라진 거래</span>
                  </p>
                  <p className="mt-[14px] text-[18px] font-[400] text-[#9F9F9F] whitespace-nowrap">
                    교환 제안부터 판매 완료까지,<br />
                    실시간 알림으로 놓치지 마세요
                  </p>
                </div>

                <img
                  src="/assets/images/landing-img3.svg"
                  alt="랜딩 이미지 3"
                  className="block mt-[9px] ml-[427px] w-[1068px] h-auto pointer-events-none select-none"
                />
              </div>
            </div>
          </section>

          <section className="relative z-[2] mx-auto w-[1920px] h-[900px] bg-[var(--color-black)] overflow-hidden">
            <div
              className="absolute left-0 top-[307px] w-[1920px] h-[594px]"
              style={{ background: 'linear-gradient(180deg, #0F0F0F 0%, #262900 100%)' }}
            />

            <div
              className="absolute z-[1] pointer-events-none select-none"
              style={{
                top: 'calc(133px + 328.37px)',
                left: 26.01,
                right: 1107.19,
                height: 530.96417,
              }}
            >
              <img
                src="/assets/images/decoimg1.svg"
                alt=""
                className="w-full h-full opacity-15"
                style={{ objectFit: 'contain' }}
              />
            </div>

            <div
              className="absolute z-[1] pointer-events-none select-none"
              style={{
                top: 'calc(133px + 207.57px)',
                left: 1333,
                right: 277.6,
              }}
            >
              <img
                src="/assets/images/decoimg2.svg"
                alt=""
                className="w-full h-auto opacity-15"
                style={{ objectFit: 'contain' }}
              />
            </div>

            <div className="absolute z-[10] left-0 top-[133px] w-[1920px]">
              <div className="ml-[428px]" style={{ width: 392 }}>
                <p className="text-[36px] font-[700] whitespace-nowrap text-[var(--color-white)]">
                  랜덤 상자로 <span className="text-[var(--color-main)]">포인트 받자!</span> 🎉
                </p>
                <p className="mt-[14px] text-[18px] font-[400] text-[#9F9F9F] whitespace-nowrap">
                  한 시간마다 주어지는 랜덤 상자를 열고,<br />
                  포인트를 획득하세요
                </p>
              </div>

              <img
                src="/assets/images/landing-img4.svg"
                alt="랜덤 상자 미리보기"
                className="block mt-[40px] ml-[515.55px] w-[888.89px] h-auto pointer-events-none select-none"
              />
            </div>
          </section>

          <div className="h-[1px]" />
          <div className="w-screen bg-[var(--color-black)]">
            <div className="relative mx-auto" style={{ marginTop: 114 }}>

              <img
                src="/assets/images/photo.svg"
                alt="photo"
                className="block pointer-events-none select-none"
                style={{
                  width: 103.69505,
                  height: 150.93391,
                  marginLeft: 881.47,
                }}
              />

              <p
                className="absolute text-[28px] font-[700] leading-[28px] text-[var(--color-white)] whitespace-nowrap pointer-events-none select-none"
                style={{
                  top: 178.25391,
                  left: 801,
                  right: 780,
                }}
              >
                나의 최애를 지금 찾아보세요!
              </p>

              <button
                className="absolute text-[16px] font-[700] whitespace-nowrap select-none"
                style={{
                  top: 233.64391,
                  left: 847,
                  right: 847,
                  width: 226,
                  height: 55,
                  padding: '17px 0',
                  background: 'var(--color-main)',
                  color: 'var(--color-black)',
                  borderRadius: '2px',
                }}
              >
                최애 찾으러 가기
              </button>

              <div style={{ height: 161 }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
