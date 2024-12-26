import { ethers } from 'ethers';

export interface AuthSlice {
    authState: AuthState;
    authActions: AuthActions;
}

export type AuthState = {
    account: string | null;
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    connecting: boolean;
}

export type AuthActions = {
    connect: () => Promise<void>;
    disconnect: () => void;
}