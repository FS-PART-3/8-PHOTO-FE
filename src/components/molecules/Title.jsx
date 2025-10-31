import Link from 'next/link';

const SIZE_CLS = {
  62: 'text-[62px]',
  48: 'text-[48px]',
  46: 'text-[46px]',
  40: 'text-[40px]',
  32: 'text-[32px]',
  28: 'text-[28px]',
  24: 'text-[24px]',
  22: 'text-[22px]',
};

function TitleButton({ label, href, size = 'L', variant = 'primary' }) {
  const isL = size === 'L';
  const isM = size === 'M';
  const isAuto = size === 'auto';

  const base = 'flex items-center justify-center overflow-hidden rounded-[2px]';
  const dims = isAuto
    ? 'h-[60px] px-6'
    : isL
      ? 'h-[60px] w-[440px] py-[17px]'
      : 'h-[60px] w-[342px] py-[17px]';
  const typo = isL ? 'text-[18px] font-bold' : 'text-[16px] font-bold';
  const color =
    variant === 'primary'
      ? 'bg-[var(--color-main)] text-[var(--color-black)]'
      : 'bg-[var(--color-black)] text-[var(--color-white)] border border-[var(--color-gray-100)]';

  const inner = <span className={typo}>{label}</span>;
  return href ? (
    <Link href={href} className={`${base} ${dims} ${color}`}>
      {inner}
    </Link>
  ) : (
    <div className={`${base} ${dims} ${color}`}>{inner}</div>
  );
}

export default function Title({
  text = '마켓플레이스',
  size = '62',
  family = 'secondary',
  weight = 700,
  colorClass = 'text-white',
  containerWidth = 'full',
  justify = 'between',
  align = 'center',
  gap = 20,
  action,
  divider = true,
  dividerOffset = 20,
  dividerColor = 'var(--color-gray-100)',
}) {
  const sizeCls = SIZE_CLS[size] ?? SIZE_CLS['62'];
  const gapCls = gap === 10 ? 'gap-[10px]' : 'gap-[20px]';
  const justifyCls =
    justify === 'between'
      ? 'justify-between'
      : justify === 'center'
        ? 'justify-center'
        : 'justify-start';
  const alignCls =
    align === 'end'
      ? 'items-end'
      : align === 'center'
        ? 'items-center'
        : 'items-start';

  const widthStyle =
    containerWidth === 'full'
      ? { width: '100%' }
      : {
          width:
            typeof containerWidth === 'number' ? `${containerWidth}px` : '100%',
        };

  const familyVar =
    family === 'secondary' ? 'var(--font-secondary)' : 'var(--font-primary)';

  return (
    <div className={`inline-flex w-full flex-col ${gapCls}`}>
      <div
        className={`inline-flex ${justifyCls} ${alignCls}`}
        style={widthStyle}
      >
        <h1
          className={`${colorClass} ${sizeCls} leading-none break-words`}
          style={{ fontFamily: familyVar, fontWeight: weight }}
        >
          {text}
        </h1>
        {action ? (
          <TitleButton
            label={action.label}
            href={action.href}
            size={action.size ?? 'L'}
            variant={action.variant ?? 'primary'}
          />
        ) : null}
      </div>

      {divider && (
        <div
          style={{ ...widthStyle, marginTop: `${dividerOffset}px`, height: '1px', background: dividerColor }}
        />
      )}
    </div>
  );
}

export function TitleBox({ children }) {
  return (
    <div className="mx-auto mt-[60px] max-w-[1200px] border-b-[2px] border-[var(--color-white)] pb-4">
      {children}
    </div>
  );
}
