import { useWallet } from "@/store/auth";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const WalletProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const { authState, authActions } = useWallet();
    const { account } = authState;

    useEffect(() => {
        const handleAccountsChanged = async (accounts: string[]) => {
            if (accounts.length === 0) {
                authActions.disconnect();
                toast.success('Wallet disconnected successfully.');
            } else if (accounts[0] !== account) {
                authActions.connect();
            }
        }
        
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        }
    }, [account, authActions]);

    return <>{children}</>;
}