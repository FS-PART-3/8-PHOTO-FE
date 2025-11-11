import Button from '../atoms/Button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="bg-[var(--color-black)] text-[var(--color-white)]">
      <div className="relative mx-auto h-[4281px] w-full max-w-[1920px] overflow-hidden">
        <div className="relative mt-[13px] w-full">
          <div className="relative mx-auto h-[1086px] w-full max-w-[1798px] overflow-visible">
            <img
              src="/assets/images/landingbg.svg"
              alt=""
              className="absolute inset-0 mx-auto h-[1086px] w-[1798px]"
            />

            <img
              src="/assets/images/logo.svg"
              alt="로고"
              className="pointer-events-none absolute top-[77px] left-[50%] z-[2] h-[23.2px] w-[138.94px] -translate-x-1/2 select-none"
            />

            <div className="pointer-events-none absolute top-[123px] left-[50%] z-[2] h-[96px] w-[328px] -translate-x-1/2 select-none">
              <p className="text-center text-[40px] leading-[48px] font-[700] text-[var(--color-white)]">
                구하기 어려웠던
                <br />
                <span className="text-[var(--color-main)]">나의 최애</span>가
                여기에!
              </p>
            </div>

            <div
              className="absolute left-[50%] z-[4] w-[226px] -translate-x-1/2"
              style={{
                top: 252,
                height: 55,
              }}
            >
              <Link href="/market" className="h-full w-full">
                <Button variant="primary" thikness="thin" size="m">
                  최애 찾으러 가기
                </Button>
              </Link>
            </div>
          </div>

          <img
            src="/assets/images/landing.svg"
            alt="랜딩 이미지"
            className="pointer-events-none absolute top-[319px] left-[50%] z-[3] h-[765px] w-[1917px] -translate-x-1/2 select-none"
          />

          <div className="relative mx-auto mt-[138px] flex w-full max-w-[1798px] flex-col items-center">
            <div className="w-[325px]">
              <p className="text-[36px] font-[700] whitespace-nowrap text-[var(--color-white)]">
                포인트로{' '}
                <span className="text-[var(--color-main)]">안전하게 거래</span>
                하세요
              </p>
              <p className="mt-[14px] text-[18px] font-[400] whitespace-nowrap text-[#9F9F9F]">
                내 포토카드를 포인트로 팔고, 원하는 포토카드를
                <br />
                포인트로 안전하게 교환하세요
              </p>
            </div>

            <img
              src="/assets/images/landing-img2.svg"
              alt="랜딩 이미지 2"
              className="pointer-events-none relative z-[10] mt-[8px] mb-[35px] block h-[518px] w-[1068px] select-none"
            />
          </div>

          <div
            className="pointer-events-none absolute top-[1524px] left-[50%] z-[0] h-[1480px] w-[1480px] -translate-x-1/2 rounded-[9999px] select-none"
            style={{
              opacity: 0.2,
              background: 'linear-gradient(180deg, #EFFF04 0%, #0F0F0F 100%)',
              boxShadow: '0px 0px 50px rgba(255, 255, 255, 0.10) inset',
              border: '2px #EFFF04 solid',
            }}
          />

          <section className="relative z-[2] mx-auto mt-[35px] h-[800px] w-full max-w-[1920px] overflow-hidden bg-[var(--color-black)]">
            <div className="relative h-full w-full">
              <div
                className="pointer-events-none absolute top-[407px] left-[83px] z-[0] h-[1606px] w-[1606px] rounded-[9999px] select-none"
                style={{
                  opacity: 0.3,
                  background:
                    'linear-gradient(180deg, #0085BA 0%, #0F0F0F 100%)',
                  boxShadow: '0px 0px 50px rgba(255, 255, 255, 0.10) inset',
                  border: '2px #149CFF solid',
                }}
              />

              <div className="absolute top-[128px] left-0 z-[10] flex w-full max-w-[1920px] flex-col items-center">
                <div className="w-[389px]">
                  <p className="text-[36px] font-[700] whitespace-nowrap text-[var(--color-white)]">
                    알림으로 보다{' '}
                    <span className="text-[#04B8FF]">빨라진 거래</span>
                  </p>
                  <p className="mt-[14px] text-[18px] font-[400] whitespace-nowrap text-[#9F9F9F]">
                    교환 제안부터 판매 완료까지,
                    <br />
                    실시간 알림으로 놓치지 마세요
                  </p>
                </div>

                <img
                  src="/assets/images/landing-img3.svg"
                  alt="랜딩 이미지 3"
                  className="pointer-events-none mt-[9px] block h-auto w-[1068px] select-none"
                />
              </div>
            </div>
          </section>

          <section className="relative z-[2] mx-auto h-[900px] w-full max-w-[1920px] overflow-hidden bg-[var(--color-black)]">
            <div
              className="absolute top-[307px] left-0 h-[594px] w-full max-w-[1920px]"
              style={{
                background: 'linear-gradient(180deg, #0F0F0F 0%, #262900 100%)',
              }}
            />

            <div
              className="pointer-events-none absolute z-[1] select-none"
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
                className="h-full w-full opacity-15"
                style={{ objectFit: 'contain' }}
              />
            </div>

            <div
              className="pointer-events-none absolute z-[1] select-none"
              style={{
                top: 'calc(133px + 207.57px)',
                left: 1333,
                right: 277.6,
              }}
            >
              <img
                src="/assets/images/decoimg2.svg"
                alt=""
                className="h-auto w-full opacity-15"
                style={{ objectFit: 'contain' }}
              />
            </div>

            <div className="absolute top-[133px] left-0 z-[10] flex w-full max-w-[1920px] flex-col items-center">
              <div style={{ width: 392 }}>
                <p className="text-[36px] font-[700] whitespace-nowrap text-[var(--color-white)]">
                  랜덤 상자로{' '}
                  <span className="text-[var(--color-main)]">포인트 받자!</span>{' '}
                  🎉
                </p>
                <p className="mt-[14px] text-[18px] font-[400] whitespace-nowrap text-[#9F9F9F]">
                  한 시간마다 주어지는 랜덤 상자를 열고,
                  <br />
                  포인트를 획득하세요
                </p>
              </div>

              <img
                src="/assets/images/landing-img4.svg"
                alt="랜덤 상자 미리보기"
                className="pointer-events-none mt-[40px] block h-auto w-[888.89px] select-none"
              />
            </div>
          </section>

          <div className="h-[1px]" />
          <div className="w-full max-w-[100vw] bg-[var(--color-black)]">
            <div
              className="relative mx-auto flex flex-col items-center"
              style={{ marginTop: 114 }}
            >
              <img
                src="/assets/images/photo.svg"
                alt="photo"
                className="pointer-events-none block select-none"
                style={{
                  width: 103.69505,
                  height: 150.93391,
                }}
              />

              <p
                className="pointer-events-none text-[28px] leading-[28px] font-[700] whitespace-nowrap text-[var(--color-white)] select-none"
                style={{
                  marginTop: 27.32,
                }}
              >
                나의 최애를 지금 찾아보세요!
              </p>

              <Link
                href="/market"
                style={{
                  marginTop: 27.39,
                  width: 226,
                  height: 55,
                }}
              >
                <Button
                  variant="primary"
                  thikness="thin"
                  size="m"
                  className="h-full w-full !rounded-[2px] !bg-[var(--color-main)] text-[16px] font-[700] !text-[var(--color-black)]"
                >
                  최애 찾으러 가기
                </Button>
              </Link>

              <div style={{ height: 161 }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
