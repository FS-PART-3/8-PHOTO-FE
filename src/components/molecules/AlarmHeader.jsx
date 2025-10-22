import Image from 'next/image';

export default function AlarmHeader({ handleClickClose }) {
  return (
    <div className="xs:hidden fixed top-0 left-0 z-50 flex h-[60px] w-full items-center justify-between gap-4 bg-black">
      <button
        onClick={handleClickClose}
        className="cursor-pointer p-2 px-4 text-white"
      >
        <Image
          src="/assets/icons/ic_left_arrow.svg"
          alt="back"
          width={24}
          height={24}
        />
      </button>
      <h1 className="text-lg font-medium text-white">알림</h1>
      <div className="w-10"></div>
    </div>
  );
}
