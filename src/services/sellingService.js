/**
 * 판매 관련 API 서비스
 */
export const sellingService = {
  async getMySellingPhotos(token, params = {}) {
    const {
      page = 1,
      limit = 12,
      search,
      grade,
      genre,
      status,
      soldOut,
    } = params;

    const queryParams = new URLSearchParams();

    // 항상 포함되는 파라미터
    queryParams.set('page', page);
    queryParams.set('limit', limit);

    // 값이 있을 때만 포함되는 선택적 파라미터
    const optionalParams = { search, grade, genre, status, soldOut };
    Object.entries(optionalParams).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      }
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/my-photo-cards/sales?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.json();
  },
};
