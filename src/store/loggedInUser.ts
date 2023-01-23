import { User } from '@supabase/supabase-js';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Users } from 'types/profilePageInfo';

type loggedInUserStore = {
  loggedInUser: Users | null;
  setloggedInUser: (loggedInUser: Users) => void;
  resetloggedInUser: () => void;
};

export const useloggedInUserStore = create<loggedInUserStore>()(
  persist(
    (set) => ({
      loggedInUser: null,
      setloggedInUser: (loggedInUser) => set({ loggedInUser }),
      resetloggedInUser: () => set({ loggedInUser: null }),
    }),
    {
      name: 'logged-in-user-storage',
    }
  )
);
