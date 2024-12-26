import { create } from 'zustand';
import { ethers } from 'ethers';
import { AuthSlice, AuthState } from '@/store/auth/types';
import { toast } from 'react-hot-toast';

const initialAuthState: AuthState = {
  account: null,
  provider: null,
  signer: null,
  connecting: false,
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const useAuthStore = create<AuthSlice>((set) => ({
  authState: initialAuthState,
  authActions: {
    connect: async () => {
      set((state) => ({
        authState: { ...state.authState, connecting: true },
      }));

      try {
        if (!window.ethereum) {
          toast.error(
            'MetaMask is not installed. Please install it to continue.',
          );
          set((state) => ({
            authState: { ...state.authState, connecting: false },
          }));
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        
        set(() => ({
          authState: {
            account,
            provider,
            signer,
            connecting: false,
          },
        }));

        toast.success('Wallet connected successfully!');
      } catch (error) {
        console.error('Connection error:', error);
        toast.error((error as Error).message || 'Failed to connect wallet.');

        set((state) => ({
          authState: { ...state.authState, connecting: false },
        }));
      }
    },
    disconnect: () => {
      set(() => ({ authState: initialAuthState }));
    },
  },
}));

export const useWallet = useAuthStore;
