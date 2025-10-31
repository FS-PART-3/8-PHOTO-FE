import Image from 'next/image';

export default function AlarmButton({ isAlarm, onClick, size = 24 }) {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <Image
        src={`/assets/icons/ic_alarm_${isAlarm ? 'active' : 'default'}.svg`}
        alt="alarm"
        width={size}
        height={size}
      />
    </button>
  );
}
