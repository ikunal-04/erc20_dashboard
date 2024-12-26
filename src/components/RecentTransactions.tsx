import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import { useWallet } from '@/store/auth';
import axios from 'axios';

interface Transaction {
    transaction_hash: string;
    block_hash: string;
    from: {
        hash: string;
    };
    to: {
        hash: string;
    };
    total: {
        value: string;
    };
    timestamp: string;
    method: string;
}

const RecentTransactions: React.FC = () => {
    const { authState } = useWallet();
    const { account } = authState;
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!account) return;
            
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://base-sepolia.blockscout.com/api/v2/addresses/${account}/token-transfers?type=ERC-20&filter=to&token=0xF1C1865253524F47Ce6ba1eAF35F8B914a852602`
                );

                if (response.status === 200) {
                    setTransactions(response.data.items);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [account]);

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatValue = (value: string) => {
        return (BigInt(value) / BigInt(10 ** 18)).toString();
    };

    if (!account) return null;

    return (
        <div className="bg-blue-300 p-6 rounded-lg shadow-md dark:shadow-white dark:bg-blue-400">
            <div className="flex items-center space-x-2 mb-4">
                <History className="text-blue-600" />
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
            </div>

            {loading ? (
                <div className="text-center py-4">Loading transactions...</div>
            ) : (
                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div key={tx.transaction_hash} className="p-4 bg-gray-50 rounded-lg space-y-2 dark:text-gray-500">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Hash:</span>
                                <a
                                    href={`https://base-sepolia.blockscout.com/tx/${tx.transaction_hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {formatAddress(tx.transaction_hash)}
                                </a>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">From:</span>
                                <span>{formatAddress(tx.from.hash)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">To:</span>
                                <span>{formatAddress(tx.to.hash)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Value:</span>
                                <span>{formatValue(tx.total.value)} Tokens</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Method:</span>
                                <span>{tx.method}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Time:</span>
                                <span>{new Date(tx.timestamp).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;