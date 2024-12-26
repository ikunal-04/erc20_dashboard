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
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-100">
                        {`${account.slice(0, 6)}...${account.slice(-4)}`}
                    </span>
                    <button
                        onClick={disconnect}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        Disconnect
                    </button>
                    <ModeToggle />
                </div>
            ) : (
                <div className='flex items-center space-x-4'>
                    <button
                        onClick={connect}
                        disabled={connecting}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Wallet size={20} />
                        <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
                    </button>
                    <ModeToggle />
                </div>
            )}
        </div>
    );
};

export default WalletConnection;