import fetchClient from '@/lib/fetchClient';
/**
 * 마켓플레이스 포토카드 목록 조회
 * @param {Object} params - 쿼리 파라미터
 * @param {string} params.search - 검색어 (선택)
 * @param {string} params.sort - 정렬 기준 (선택)
 * @param {string} params.cursor - 커서 (선택)
 * @param {number} params.take - 한 번에 가져올 개수 (기본값: 15)
 * @returns {Promise} API 응답
 */
export async function getPointsHistoryListings(params = {}) {
  const queryParams = new URLSearchParams();

  const { search, sort, cursor, take } = params;

  if (search) queryParams.append('search', search);
  if (sort) queryParams.append('sort', sort);
  if (cursor) queryParams.append('cursor', cursor); // cursor 추가
  if (take) queryParams.append('take', take); // take 추가

  return fetchClient.authGet(`/points/history?${queryParams.toString()}`);
}
