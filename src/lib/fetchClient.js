import useAuth from '@/store/userStore';
/**
 * API 요청을 위한 fetch 클라이언트
 */
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * 기본 request 함수
 */
async function request(endpoint, options = {}, authRequired = false) {
  const url = `${baseURL}${endpoint}`;

  // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 설정)
  const isFormData = options.body instanceof FormData;
  const headers = isFormData
    ? { ...options.headers }
    : { 'Content-Type': 'application/json', ...options.headers };

  const config = {
    ...options,
    headers,
  };

  try {
    const { authFetch } = useAuth.getState();
    const response = authRequired
      ? await authFetch(url, config)
      : await fetch(url, config);

    if (!response.ok) {
      // 에러 응답 파싱 시도
      const errorData = await response.json().catch(() => null);

      // 다양한 에러 메시지 형식 처리
      let errorMessage = '요청 처리 중 오류가 발생했습니다.';

      if (errorData) {
        errorMessage = errorData.message || errorMessage;
      }

      throw new Error(errorMessage);
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

async function authGet(endpoint, options = {}) {
  return request(
    endpoint,
    {
      ...options,
      method: 'GET',
    },
    true,
  );
}

/**
 * POST 요청
 */
async function post(endpoint, data, options = {}) {
  // FormData인 경우 JSON.stringify 하지 않음
  const isFormData = data instanceof FormData;

  return request(endpoint, {
    ...options,
    method: 'POST',
    body: isFormData ? data : JSON.stringify(data),
  });
}

async function authPost(endpoint, data, options = {}) {
  // FormData인 경우 JSON.stringify 하지 않음
  const isFormData = data instanceof FormData;

  return request(
    endpoint,
    {
      ...options,
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    },
    true,
  );
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

async function authPut(endpoint, data, options = {}) {
  return request(
    endpoint,
    {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    },
    true,
  );
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

async function authDelete(endpoint, options = {}) {
  return request(
    endpoint,
    {
      ...options,
      method: 'DELETE',
    },
    true,
  );
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

async function authPatch(endpoint, data, options = {}) {
  return request(
    endpoint,
    {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    },
    true,
  );
}

export const fetchClient = {
  request,
  get,
  post,
  put,
  delete: deleteFn,
  patch,
  authGet,
  authPost,
  authPut,
  authDelete,
  authPatch,
};

export default fetchClient;
