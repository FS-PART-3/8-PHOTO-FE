function decodeJWT(token) {
  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));
  return decoded.exp; // UNIX timestamp
}

export function isExpired(token) {
  const exp = decodeJWT(token);
  const expiresAt = exp * 1000;
  const result = expiresAt < new Date().getTime();
  return result;
}

export function isTokenNotExpired(token) {
  return !!token && !isExpired(token);
}
