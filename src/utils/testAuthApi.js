//예시 authFetch
import url from './url.js';
import useAuth from '@/context/useAuth.js';
//authFetch 만드는 법

export async function getTestTable() {
  const authFetch = useAuth.getState().authFetch;
  const result = await authFetch(`${url}/test`).then(res => res.json());
  return result;
}

export async function postTestTable(content) {
  const authFetch = useAuth.getState().authFetch;
  const body = {
    content,
  };
  const result = await authFetch(`${url}/test`, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then(res => res.json());
  return result;
}
