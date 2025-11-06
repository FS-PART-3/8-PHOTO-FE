function decodeJWT(token) {
  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));
  return decoded.exp; // UNIX timestamp
}

export function isExpired(accessToken) {
  const exp = decodeJWT(accessToken);
  const expiresAt = exp * 1000;
  const result = expiresAt < new Date().getTime();
  return result;
}
