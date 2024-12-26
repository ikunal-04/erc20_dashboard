import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import { useWallet } from '@/store/auth';

interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    timestamp: string;
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
                const response = await fetch(
                    `https://api.etherscan.io/api?module=account&action=txlist&address=0x181b05D98dCCB9e38cf51fd30F4A225De79A3366&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=59U645PFSFERUI1B4XEV9RC3R8Y795DJRJ`
                );
                const data = await response.json();
                console.log(data);

                if (data.status === '1') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const formattedTxs = data.result.map((tx: any) => ({
                        hash: tx.hash,
                        from: tx.from,
                        to: tx.to,
                        value: (Number(tx.value) / 1e18).toFixed(4),
                        timestamp: new Date(Number(tx.timeStamp) * 1000).toLocaleString(),
                    }));
                    setTransactions(formattedTxs);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [account]);

    if (!account) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md dark:shadow-white dark:bg-blue-400">
            <div className="flex items-center space-x-2 mb-4">
                <History className="text-blue-600 " />
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
            </div>

            {loading ? (
                <div className="text-center py-4">Loading transactions...</div>
            ) : (
                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div key={tx.hash} className="p-4 bg-gray-50 rounded-lg space-y-2 dark:text-gray-500">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Hash:</span>
                                <a
                                    href={`https://etherscan.io/tx/${tx.hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {`${tx.hash.slice(0, 6)}...${tx.hash.slice(-4)}`}
                                </a>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">From:</span>
                                <span>{`${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">To:</span>
                                <span>{`${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Value:</span>
                                <span>{`${tx.value} ETH`}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Time:</span>
                                <span>{tx.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;