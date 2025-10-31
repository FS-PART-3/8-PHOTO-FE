//예시 authFetch
import url from './url.js';
import createAuthStore from '@/store/userStore.js';
//authFetch 만드는 법

export async function getTestTable() {
  const authFetch = createAuthStore.getState().authFetch;
  const result = await authFetch(`${url}/api/auth/test`).then(res =>
    res.json(),
  );
  return result;
}

export async function postTestTable(content) {
  const authFetch = createAuthStore.getState().authFetch;
  const body = {
    content,
  };
  const result = await authFetch(`${url}/api/auth/test`, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then(res => res.json());
  return result;
}
