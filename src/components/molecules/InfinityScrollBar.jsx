export default function InfinityScrollBar({
  hasNextPage,
  isFetchingNextPage,
  observerRef,
}) {
  return (
    <div
      ref={observerRef}
      className="my-10 flex h-10 w-full items-center justify-center"
      style={{
        backgroundColor: hasNextPage ? 'var(--color-main)' : '',
      }}
    >
      {isFetchingNextPage ? (
        <p className="text-gray-700">더 많은 카드를 불러오는 중...</p>
      ) : hasNextPage ? (
        <p className="text-gray-500">스크롤하여 더 보기</p>
      ) : (
        <p className="text-gray-300">모든 카드를 불러왔습니다</p>
      )}
    </div>
  );
}
