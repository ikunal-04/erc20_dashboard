import React from 'react';
import { useWallet } from '@/store/auth';
import { Wallet } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

const WalletConnection: React.FC = () => {
    const { authState, authActions } = useWallet();
    const { account, connecting } = authState;
    const { connect, disconnect } = authActions;

    return (
        <div className="flex items-center space-x-4">
            {account ? (
                <>
                    <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
                        {`${account.slice(0, 6)}...${account.slice(-4)}`}
                    </span>
                    <button
                        onClick={disconnect}
                        className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-full hover:bg-red-500/10 transition-colors"
                    >
                        Disconnect
                    </button>
                </>
            ) : (
                <button
                    onClick={connect}
                    disabled={connecting}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    <Wallet className="w-5 h-5" />
                    <span>{connecting ? 'Connecting...' : 'Connect'}</span>
                </button>
            )}
            <ModeToggle />
        </div>
    );
};

export default WalletConnection;