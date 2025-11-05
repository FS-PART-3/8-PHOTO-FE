import fetchClient from '@/lib/fetchClient';

/**
 * 포토카드 관련 API 서비스
 */
export const photoService = {
  /**
   * 마이갤러리 포토카드 목록 조회
   * @param {string} token - 인증 토큰
   * @param {Object} params - 쿼리 파라미터
   * @param {number} params.page - 페이지 번호 (기본값: 0)
   * @param {number} params.size - 페이지 크기 (기본값: 12)
   * @param {string} params.search - 제목 검색어 (선택)
   * @param {string} params.grade - 등급 필터 (선택)
   * @param {string} params.genre - 장르 필터 (선택)
   * @param {string} params.sortBy - 정렬 기준 (기본값: createdAt)
   * @param {string} params.sortOrder - 정렬 순서 (기본값: desc)
   * @returns {Promise} API 응답
   */
  async getMyGalleryPhotos(token, params = {}) {
    const queryParams = new URLSearchParams();

    // 기본값 설정
    const {
      page = 0,
      size = 12,
      search,
      grade,
      genre,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    // 쿼리 파라미터 추가
    queryParams.append('page', page);
    queryParams.append('size', size);
    if (search) queryParams.append('search', search);
    if (grade) queryParams.append('grade', grade);
    if (genre) queryParams.append('genre', genre);
    queryParams.append('sortBy', sortBy);
    queryParams.append('sortOrder', sortOrder);

    return fetchClient.get(`/api/gallery?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * 포토카드 생성
   * @param {string} token - 인증 토큰
   * @param {FormData} formData - 포토카드 생성 데이터
   * @returns {Promise} API 응답
   */
  async createPhoto(token, formData) {
    return fetchClient.post('/api/gallery', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // FormData 전송 시 Content-Type은 브라우저가 자동으로 설정
      },
    });
  },

  /**
   * 마켓플레이스 포토카드 목록 조회
   * @param {Object} params - 쿼리 파라미터
   * @param {string} params.search - 검색어 (선택)
   * @param {string} params.grade - 등급 필터 (선택)
   * @param {string} params.genre - 장르 필터 (선택)
   * @param {string} params.soldOut - 품절 여부 필터 (선택)
   * @param {string} params.sort - 정렬 기준 (선택)
   * @param {string} params.cursor - 커서 (선택)
   * @param {number} params.take - 한 번에 가져올 개수 (기본값: 15)
   * @returns {Promise} API 응답
   */
  async getMarketplaceListings(token, params = {}) {
    const queryParams = new URLSearchParams();

    const { search, grade, genre, soldOut, sort, cursor, take } = params;

    if (search) queryParams.append('search', search);
    if (grade) queryParams.append('grade', grade);
    if (genre) queryParams.append('genre', genre);
    if (soldOut) queryParams.append('soldOut', soldOut);
    if (sort) queryParams.append('sort', sort);
    if (cursor) queryParams.append('cursor', cursor); // cursor 추가
    if (take) queryParams.append('take', take); // take 추가

    return fetchClient.authGet(`/api/marketplace?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
