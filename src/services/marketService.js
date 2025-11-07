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
      sellerId: data.sellerId,
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
  getMyExchangeOffers(listingId) {
    return fetchClient.authGet(
      `/api/marketplace/${listingId}/exchange-offers/mine`,
    );
  },
  getOffersForMyListing(listingId) {
    return fetchClient.authGet(`/api/marketplace/${listingId}/exchange-offers`);
  },
  cancelExchangeOffer(offerId) {
    return fetchClient.authPatch(
      `/api/marketplace/exchange-offers/${offerId}/cancel`,
    );
  },
  acceptExchangeOffer(offerId) {
    return fetchClient.authPatch(
      `/api/marketplace/exchange-offers/${offerId}/accept`,
    );
  },
  cancelListing(listingId) {
    return fetchClient.authPatch(`/api/marketplace/${listingId}/cancel`);
  },
  rejectExchangeOffer(offerId) {
    return fetchClient.authPatch(
      `/api/marketplace/exchange-offers/${offerId}/reject`,
    );
  },

  async createExchangeOffer(listingId, payload) {
    const id = encodeURIComponent(listingId);
    const { offeredDescription, offeredPhotoId } = payload;
    return fetchClient.authPost(`/api/marketplace/${id}/exchanges`, {
      offeredDescription: offeredDescription?.trim?.() ?? '',
      offeredPhotoId: String(offeredPhotoId),
    });
  },

  async updateListing(listingId, payload) {
    const id = encodeURIComponent(listingId);
    return fetchClient.authPatch(`/api/marketplace/${id}`, payload);
  },
};
export default marketService;
