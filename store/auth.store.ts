import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void; // function of type boolean i.e. isUser authenticated yes or no
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>(set => ({
  // create a store of type AuthState and we have a callback function set whoch will automatically return all values
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: value => set({isAuthenticated: value}), // set is zustand inbuilt setter
  setUser: user => set({user}),
  setLoading: value => set({isLoading: value}),
  fetchAuthenticatedUser: async () => {
    set({isLoading: true});

    try {
        const user = await getCurrentUser();

        if(user) set( {isAuthenticated: true, user: user as unknown as User})
        else set( { isAuthenticated: false, user: null});

    } catch (error) {
      console.log('fetchAuthenticatedUser error', error);
      set({isAuthenticated: false, user: null});
    } finally {
      set({isLoading: false});
    }
  },
}));

export default useAuthStore;
