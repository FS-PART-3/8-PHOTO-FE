'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Modal from '@/components/organisms/Modal';
import Search from '@/components/molecules/Search';
import DropDown from '@/components/molecules/DropDown';
import ProductCard from '../organisms/card/ProductCard';

import { GRADE_OPTIONS, GENRE_OPTIONS, SOLD_OUT_OPTIONS as SOLD_OPTIONS, } from '@/constants/productConstants';

const GENRE_VALUE_MAP = {
  풍경: 'landscape',
  인물: 'portrait',
  도시: 'city',
  자연: 'nature',
};

const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '낮은 가격순', value: 'price_asc' },
  { label: '높은 가격순', value: 'price_desc' },
];

export default function MarketPage() {
  const router = useRouter();
  const isAuthed = false;

  const [q, setQ] = useState('');
  const [grade, setGrade] = useState({ label: '', value: '' });
  const [genre, setGenre] = useState({ label: '', value: '' });
  const [sold, setSold] = useState({ label: '', value: '' });
  const [sort, setSort] = useState(SORT_OPTIONS[1]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pendingCardId, setPendingCardId] = useState(null);

  const fetchMarketplaceListings = async () => {
    const url = new URL('https://eight-photo-be.onrender.com/api/marketplace');

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['marketplace', q],
    queryFn: fetchMarketplaceListings,
  });

  const raw = Array.isArray(data?.data) ? data.data : [];

  const filtered = useMemo(() => {
    let out = [...raw];

    if (grade.value) {
      out = out.filter((it) => it.photoCards?.[0]?.grade === grade.value);
    }
 
    const selectedGenre = GENRE_VALUE_MAP[genre.value] ?? genre.value;
    if (selectedGenre) {
      out = out.filter((it) => it.photoCards?.[0]?.genre === selectedGenre);
    }

    if (sold.value === 'false') out = out.filter((it) => (it.quantity ?? 0) > 0);
    if (sold.value === 'true') out = out.filter((it) => (it.quantity ?? 0) <= 0);

    return out;
  }, [raw, grade.value, genre.value, sold.value]);

  const list = useMemo(() => {
    const out = [...filtered];
    switch (sort.value) {
      case 'price_asc':
        out.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price_desc':
        out.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'latest':
      default:
        if (out?.[0]?.createdAt) {
          out.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        break;
    }
    return out;
  }, [filtered, sort.value]);

  const handleCardClick = (card) => {
    if (!isAuthed) {
      setPendingCardId(card?.id ?? null);
      setLoginOpen(true);
      return;
    }
    router.push(`/market/${card.id}`);
  };

  return (
    <div className="market-page">
      <div className="mx-auto mt-[20px] max-w-[1200px]">
        <div className="flex items-center">
          <form
            className="w-auto"
            onSubmit={(e) => {
              e.preventDefault();
              refetch();
            }}
          >
            <Search
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onSubmit={() => refetch()}
              placeholder="검색어를 입력하세요"
            />
          </form>

          <div className="ml-[60px]">
            <DropDown
              options={GRADE_OPTIONS}
              value={grade}
              onChange={(opt) => setGrade(opt)}
              placeholder="등급"
              fontSize="text-sm"
            />
          </div>

          <div className="ml-[45px]">
            <DropDown
              options={GENRE_OPTIONS}
              value={genre}
              onChange={(opt) => setGenre(opt)}
              placeholder="장르"
              fontSize="text-sm"
            />
          </div>

          <div className="ml-[45px]">
            <DropDown
              options={SOLD_OPTIONS}
              value={sold}
              onChange={(opt) => setSold(opt)}
              placeholder="매진여부"
              fontSize="text-sm"
            />
          </div>

          <div className="ml-auto">
            <DropDown
              options={SORT_OPTIONS}
              value={sort}
              onChange={(opt) => setSort(opt)}
              placeholder="낮은 가격순"
              fontSize="text-sm"
            />
          </div>
        </div>
      </div>

      {isPending && (
        <p className="mx-auto max-w-[1200px] text-white/70">불러오는 중…</p>
      )}
      {error && !isPending && (
        <p className="mx-auto max-w-[1200px] text-red-500">데이터 로드 실패</p>
      )}

      <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-4 py-8">
        {list.length > 0 ? (
          list.map((listing) => (
            <div
              key={listing.id}
              className="cursor-pointer"
              onClick={() =>
                handleCardClick({
                  id: listing.id,
                  title: listing.photoCards?.[0]?.title,
                })
              }
            >
              <ProductCard
                type="original"
                cardId={listing.id}
                title={listing.photoCards?.[0]?.title}
                grade={listing.photoCards?.[0]?.grade}
                genre={listing.photoCards?.[0]?.genre}
                imageUrl={listing.photoCards?.[0]?.imgUrl}
                status={listing.status}
                price={listing.price}
                quantity={listing.quantity}
                initQuantity={listing.initQuantity}
                userName={listing.seller?.name}
              />
            </div>
          ))
        ) : (
          !isPending &&
          !error && (
            <div className="market-empty mx-auto max-w-[1200px]">
              등록된 상품이 없습니다.
            </div>
          )
        )}
      </div>

      <Modal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        title="로그인이 필요합니다."
        description={`로그인 하시겠습니까?\n다양한 서비스를 편리하게 이용하실 수 있습니다.`}
        confirmText="확인"
        onConfirm={() => router.push('/auth/login')}
        cancelText="닫기"
        onCancel={() => setLoginOpen(false)}
        width="md"
      />
    </div>
  );
}
