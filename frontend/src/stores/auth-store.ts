import { getData } from '@/utils/axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserProps = {
  email: string;
  role: string;
  name: string;
  userKid?: any;
  activeKid?: {
    id: number;
  };
};

type LoginDataProps = {
  token: string;
};

export const loginStore = {
  isHasShow: false,
};

interface AuthProps {
  login: (data: LoginDataProps) => void;
  logout: () => void;
  user?: UserProps;
  token?: string;
  myClass?: any;
  getMyProfile: () => void;
}

export const useAuthStore = create<AuthProps>()(
  persist(
    (set) => ({
      login: (data: any) => {
        set({
          token: data?.token,
        });
      },
      logout: () => {
        set({
          user: undefined,
          token: undefined,
        });
        const deleteLocalStorage = () => {
          const keys = Object.keys(localStorage);
          for (const key of keys) {
            localStorage.removeItem(key);
          }
        };
        deleteLocalStorage();
      },
      getMyProfile: async () => {
        if (
          !JSON.parse(localStorage.getItem('authentication') || '{}')?.state
            ?.token
        )
          return;
        const data = await getData('user/my-profile');
        set({
          user: data,
        });
      },
    }),
    { name: 'authentication' }
  )
);

export const getAllState = () => useAuthStore.getState();
