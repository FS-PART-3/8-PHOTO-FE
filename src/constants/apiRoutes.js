// apiRoutes.js
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_UR;

const API_PREFIXES = {
  AUTH: '/api/auth',
  USERS: '/api/users',
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
    RESET_PW: `${API_PREFIXES.AUTH}/reset-password`,
  },
  USERS: {
    DATA: `${API_PREFIXES.USERS}/data`,
    NICKNAME: `${API_PREFIXES.USERS}/name`,
  },
  PRODUCTS: {
    // LIST: `${API_BASE_URL}/products`,
    // DETAIL: (id) => `${API_BASE_URL}/products/${id}`,
    // CREATE: `${API_BASE_URL}/products/create`,
  },
};
