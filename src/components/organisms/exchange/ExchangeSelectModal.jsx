'use client';

import { useMemo, useState, useEffect } from 'react';
import ModalResponsive from '@/components/organisms/modal/ModalResponsive';
import Search from '@/components/molecules/Search';
import DropDown from '@/components/molecules/DropDown';
import { GRADE_OPTIONS, GENRE_OPTIONS } from '@/constants/productConstants';
import ExchangeSelectableCard from '@/components/organisms/exchange/ExchangeSelectableCard';
import ExchangeProposeModal from '@/components/organisms/exchange/ExchangeProposeModal';

/**
 * 교환 포토카드 선택 모달
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {Array} items
 * @param {(selectedId: string) => void} onConfirm
 * @param {boolean=} loading
 */
export default function ExchangeSelectModalWithFilters({
  open,
  onClose,
  items = [],
  onConfirm,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [proposeOpen, setProposeOpen] = useState(false);

  // 검색/필터 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState({ label: '', value: '' });
  const [selectedGenre, setSelectedGenre] = useState({ label: '', value: '' });

  // 모달 열릴 때마다 상태 초기화
  useEffect(() => {
    if (!open) {
      setSelectedId(null);
      setProposeOpen(false);
      setSearchQuery('');
      setSelectedGrade({ label: '', value: '' });
      setSelectedGenre({ label: '', value: '' });
    }
  }, [open]);

  // 필터링
  const filteredItems = useMemo(() => {
    let result = [...items];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q),
      );
    }
    if (selectedGrade.value) {
      result = result.filter(p => p.grade === selectedGrade.value);
    }
    if (selectedGenre.value) {
      result = result.filter(p => p.genre === selectedGenre.value);
    }
    return result;
  }, [items, searchQuery, selectedGrade.value, selectedGenre.value]);

  const selectedCard = useMemo(
    () => filteredItems.find(p => p.id === selectedId),
    [filteredItems, selectedId],
  );

  const handleCardClick = id => {
    setSelectedId(id);
    setProposeOpen(true);
  };

  const handleProposeConfirm = ({ offeredDescription }) => {
    if (!selectedId) return;
    const desc = (offeredDescription ?? '').trim();
    if (!desc) return;
    onConfirm?.({ offeredDescription: desc, offeredPhotoId: selectedId });
    setProposeOpen(false);
    onClose?.();
  };

  return (
    <>
      <ModalResponsive isOpen={open} onClose={onClose}>
        {/* 헤더 */}
        <div className="px-6 pt-6">
          <p className="beskin-h6 mt-10 text-sm text-white/60">마이갤러리</p>
          <h2 className="beskin-h3 t-2 text-3xl font-extrabold tracking-tight">
            포토카드 교환하기
          </h2>
          <hr className="mt-4 border-white/10" />

          {/* 검색/필터 바 */}
          <div className="mt-4 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 sm:max-w-[320px]">
              <Search
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onSubmit={() => {}}
                placeholder="검색"
                showSearchIcon
              />
            </div>

            <DropDown
              options={GRADE_OPTIONS}
              value={selectedGrade}
              onChange={setSelectedGrade}
              placeholder="등급"
              fontSize="text-sm"
            />
            <DropDown
              options={GENRE_OPTIONS}
              value={selectedGenre}
              onChange={setSelectedGenre}
              placeholder="장르"
              fontSize="text-sm"
            />
          </div>
        </div>

        {/* 카드 리스트 */}
        <div className="px-6 pb-6">
          {filteredItems.length > 0 ? (
            <div className="mx-auto grid min-h-[300px] w-full grid-cols-1 gap-6 sm:grid-cols-2">
              {filteredItems.map(card => (
                <ExchangeSelectableCard
                  key={card.id}
                  data={card}
                  selected={selectedId === card.id}
                  onSelect={() => handleCardClick(card.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/60">
              {searchQuery.trim() || selectedGrade.value || selectedGenre.value
                ? '검색/필터 조건에 맞는 포토카드가 없습니다.'
                : '교환 가능한 포토카드가 없습니다.'}
            </div>
          )}
        </div>
      </ModalResponsive>
      <ExchangeProposeModal
        open={proposeOpen}
        onClose={() => setProposeOpen(false)}
        card={selectedCard}
        onConfirm={handleProposeConfirm}
      />
    </>
  );
}
