// apiRoutes.js
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_UR;

const API_PREFIXES = {
  AUTH: '/api/auth',
  PRODUCTS: '/api/products',
};

//상대 경로
export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_PREFIXES.AUTH}/login`,
    SIGNUP: `${API_PREFIXES.AUTH}/signup`,
    LOGOUT: `${API_PREFIXES.AUTH}/logout`,
    GETREFRESHTOKEN: `${API_PREFIXES.AUTH}/refreshtoken`,
    REFRESH: `${API_PREFIXES.AUTH}/refresh`,
    CHECKAUTH: `${API_PREFIXES.AUTH}/check`,
    USERDATA: `${API_PREFIXES.AUTH}/userdata`,
  },
  USER: {
    // PROFILE: `${API_BASE_URL}/user/profile`,
    // UPDATE: `${API_BASE_URL}/user/update`,
    // DELETE: `${API_BASE_URL}/user/delete`,
  },
  PRODUCTS: {
    // LIST: `${API_BASE_URL}/products`,
    // DETAIL: (id) => `${API_BASE_URL}/products/${id}`,
    // CREATE: `${API_BASE_URL}/products/create`,
  },
};
