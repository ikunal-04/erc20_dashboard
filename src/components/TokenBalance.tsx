import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '@/store/auth';
import { Coins } from 'lucide-react';

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

const TOKENS = [
  {
    address: '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD',
    name: 'DAI',
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    name: 'USDT',
  },
];

const TokenBalance: React.FC = () => {
  const { authState } = useWallet();
  const { account, provider } = authState;
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!account || !provider) return;

      setLoading(true);
      try {
        const newBalances: { [key: string]: string } = {};

        for (const token of TOKENS) {
          const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
          console.log(contract);
          
          const balance = await contract.balanceOf(account);
        //   const decimals = await contract.decimals();
        //   const symbol = await contract.symbol();
          
          newBalances[token.address] = ethers.formatUnits(balance, 18);
        }

        setBalances(newBalances);
      } catch (error) {
        console.error('Error fetching balances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [account, provider]);

  if (!account) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:shadow-white dark:bg-blue-400">
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