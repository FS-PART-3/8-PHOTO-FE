const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

export async function fetchMarketplaceListings({ cache = 'no-store' } = {}) {
  const res = await fetch(`${API_BASE}/api/marketplace`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Marketplace fetch failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  const items = Array.isArray(json?.data) ? json.data : [];

  return items.map((it) => ({
    id: it?.listing_id ?? '',
    title: it?.myPhotoCard?.title ?? '',
    grade: it?.myPhotoCard?.grade ?? '',
    genre: it?.myPhotoCard?.genre ?? '',
    imageUrl: it?.myPhotoCard?.imgUrl ?? '',
    price: it?.price ?? 0,
    quantity: it?.quantity ?? 0,
    sellerName: it?.seller?.name ?? '',
    isSoldOut: (it?.quantity ?? 0) <= 0,
  }));
}
