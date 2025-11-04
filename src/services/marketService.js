import fetchClient from '@/lib/fetchClient';

const marketService = {
  async getListingDetail(listingId) {
    const id = encodeURIComponent(listingId);
    const data = await fetchClient.get(`/api/marketplace/${id}`);
    return {
      listingId: data.id,
      price: data.price ?? 0,
      quantity: data.quantity ?? 0,
      initQuantity: data.initQuantity ?? data.quantity ?? 0,
      status: data.status,
      seller: data.seller,
      myPhotoCard: data.myPhotoCard,
      preferredGrade: data.preferredGrade ?? null,
      preferredGenre: data.preferredGenre ?? null,
      preferredDescription: data.preferredDescription ?? null,
    };
  },

  async purchase(listingId, quantity) {
    const id = encodeURIComponent(listingId);
    return fetchClient.authPost(`/api/marketplace/${id}/purchase`, {
      quantity,
    });
  },
  async getMyExchangeOffers(listingId) {
    // 내가 해당 판매글에 제시한 교환 목록
    return fetchClient.authGet(
      `/api/marketplace/${listingId}/exchange-offers?mine=1`,
    );
  },
  async cancelExchangeOffer(offerId) {
    // 제안 취소
    return fetchClient.authPost(`/api/exchange-offers/${offerId}/cancel`, {});
  },

  async createExchangeOffer(listingId, payload) {
    const id = encodeURIComponent(listingId);
    return fetchClient.authPost(`/api/marketplace/${id}/exchanges`, {
      offeredDescription: payload.offeredDescription,
    });
  },
};

export default marketService;
