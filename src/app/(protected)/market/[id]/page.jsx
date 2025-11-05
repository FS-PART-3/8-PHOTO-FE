import MarketDetailPageComponent from '@/components/pages/MarketDetailPage';
// 포토카드 상세페이지
export default async function MarketDetailPage({ params }) {
  const { id } = await params;
  const listingId = String(id);
  return (
    <div className="market-detail-page">
      {/* MarketDetailPage 컴포넌트가 여기에 추가될 예정 */}
      <MarketDetailPageComponent listingId={listingId} />
    </div>
  );
}
