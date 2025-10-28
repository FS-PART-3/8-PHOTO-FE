/**
 * API 요청을 위한 fetch 클라이언트
 */
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * 기본 request 함수
 */
async function request(endpoint, options = {}) {
  const url = `${baseURL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: '요청 처리 중 오류가 발생했습니다.',
      }));
      throw new Error(error.error || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('API Request Error:', error);
    throw error;
  }
}

/**
 * GET 요청
 */
async function get(endpoint, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * POST 요청
 */
async function post(endpoint, data, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT 요청
 */
async function put(endpoint, data, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 요청
 */
async function deleteFn(endpoint, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

/**
 * PATCH 요청
 */
async function patch(endpoint, data, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export const fetchClient = {
  request,
  get,
  post,
  put,
  delete: deleteFn,
  patch,
};

export default fetchClient;
