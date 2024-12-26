import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '@/store/auth';
import { Coins } from 'lucide-react';

const TOKENS = [
  {
    address: '0xF1C1865253524F47Ce6ba1eAF35F8B914a852602',
    name: 'DAI',
    decimals: 18,
  },
];

const TokenBalance: React.FC = () => {
  const { authState } = useWallet();
  const { account } = authState;
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!account) return;

      setLoading(true);
      try {
        const provider = new ethers.JsonRpcProvider('https://sepolia.base.org');
        const newBalances: { [key: string]: string } = {};

        for (const token of TOKENS) {
            const contract = new ethers.Contract(
                token.address,
                ["function balanceOf(address) view returns (uint256)"],
                provider
              );
          console.log(contract);
          
          const balance = await contract.balanceOf(account);
        //   const decimals = await contract.decimals();
        //   const symbol = await contract.symbol();
          
          newBalances[token.address] = Number(ethers.formatUnits(balance.toString(), token.decimals)).toString();
        }

        setBalances(newBalances);
      } catch (error) {
        console.error('Error fetching balances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [account]);

  if (!account) return null;

  return (
    <div className="bg-blue-300 p-6 rounded-lg shadow-md dark:shadow-white dark:bg-blue-400">
      <div className="flex items-center space-x-2 mb-4">
        <Coins className="text-blue-600" />
        <h2 className="text-xl font-semibold">Token Balances</h2>
      </div>
      
      {loading ? (
        <div className="text-center py-4">Loading balances...</div>
      ) : (
        <div className="space-y-4">
          {TOKENS.map((token) => (
            <div key={token.address} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
              <span className="font-medium">{token.name}</span>
              <span className="text-gray-600 dark:text-white">
                {balances[token.address] ? Number(balances[token.address]).toFixed(4) : '0.0000'}
              </span>
            </div> 
          ))}
        </div>
      )}
    </div>
  );
};

export default TokenBalance;