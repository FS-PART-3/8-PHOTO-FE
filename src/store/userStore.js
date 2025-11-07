import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_BASE_URL, API_ROUTES } from '@/constants/apiRoutes';
import fetchClient from '@/lib/fetchClient';

/* useAuth 훅 */
const useAuth = create(
  persist(
    (set, get) => ({
      accessToken: null,
      userName: null,
      points: null,
      provider: null,
      nextRewardTime: null,
      hasHydrated: false,
      setUserName: name => {
        set({ userName: name });
      },
      setPoints: amount => {
        set({ points: amount });
      },
      setHasHydrated: value => {
        set({ hasHydrated: value });
      },
      signup: async (name, email, password) => {
        const data = {
          name,
          email,
          password,
        };
        const result = await fetchClient.post(API_ROUTES.AUTH.SIGNUP, data);
        return result;
      },
      login: async (email, password) => {
        const data = {
          email,
          password,
        };
        const result = await fetchClient.post(API_ROUTES.AUTH.LOGIN, data);
        const { name, points, provider, accessToken } = result;
        set({
          userName: name,
          points,
          provider,
          accessToken,
        });
        get().setNextRewardTime();

        return result;
      },
      logout: async () => {
        // 백에 쿠키(리프레쉬토큰)를 지워달라고 하고,
        fetchClient.post(API_ROUTES.AUTH.LOGOUT, {});
        // 프론트에서는 로컬(액세스토큰) 지우기.
        set({ accessToken: '', userName: null, points: null });
      },
      setAccessToken: async accessToken => {
        set({ accessToken });
      },
      getRefreshToken: async () => {
        // 요청 시 백엔드에서 쿠키를 저장해줍니다.
        const result = await fetchClient.authPost(
          API_ROUTES.AUTH.GETREFRESHTOKEN,
          {},
        );
        return result;
      },
      refresh: async () => {
        const options = {
          credentials: 'include', // 쿠키 기반 인증 시 필요
        };
        const result = await fetchClient.post(
          API_ROUTES.AUTH.REFRESH,
          {},
          options,
        );
        return result;
      },
      /*
      인가가 필요한 api 요청용 커스텀 Fetch입니다.
      1) accessToken를 포함하여 api 요청을 실행, 유효하면 반환.
      2) accessToken 만료 시 refreshToken 유효 검사 후 둘다 재발급하고 api요청 재실행.
      3) refreshToken도 만료 시 로그인 창으로 강제 이동.
      */
      authFetch: async (url, options = {}) => {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${get().accessToken}`,
        };

        let result = await fetch(url, options);

        // Access Token 만료 시 (예: 401 Unauthorized)
        if (result.status === 401) {
          await fetch(`${API_BASE_URL}${API_ROUTES.AUTH.REFRESH}`, {
            method: 'POST',
            credentials: 'include', // 쿠키 기반 인증 시 필요
          })
            .then(async res => {
              if (res.ok) {
                const newAccessToken = res.json().accessToken;
                set({ accessToken: newAccessToken });

                // 원래 요청 재시도
                options.headers.Authorization = `Bearer ${newAccessToken}`;
                result = await fetch(url, options);
              } else {
                throw new Error('Session expired. Please log in again.');
              }
            })
            .catch(err => {
              // 리프레시 실패 → 로그아웃 처리
              // 강제 리로드 (hook이나, api 함수 안에서는 router를 쓸 수 없어서 이게 가장 안전하네요.)
              // 전체 페이지 리로드가 발생합니다.
              get().logout();
            });
        }
        return result;
      },
      // 페이지 권한 여부 등에 쓰이는 인가 여부 판단 api
      checkAuth: async () => {
        const result = await fetchClient.authPost(API_ROUTES.AUTH.CHECKAUTH);
        return result;
      },
      setNextRewardTime: () => {
        set({ nextRewardTime: new Date().getTime() + 3600000 });
      },
      getUserData: async () => {
        const result = await fetchClient.get(API_ROUTES.USERS.DATA, {
          headers: {
            Authorization: `Bearer ${get().accessToken}`,
          },
        });
        if (!result?.name) {
          return false;
        }
        const { name, points, provider } = result;
        set({ userName: name, points, provider });
        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        accessToken: state.accessToken,
        nextRewardTime: state.nextRewardTime,
        hasHydrated: state.hasHydrated,
      }),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useAuth;

// /* 기본 리스폰스 처리 */
// async function responseHandler(res) {
//   if (!res.ok) {
//     // JSON이 아닌 텍스트 오류 메시지 처리
//     const errorText = await res.text();
//     throw new Error(errorText);
//   }
//   return res.json();
// }

// /* 기본 에러 처리 */
// async function errorHandler(err) {
//   console.log(err);
// }
