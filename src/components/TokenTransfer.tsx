import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '@/store/auth';
import { Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ERC20_ABI = [
  'function transfer(address to, uint amount) returns (bool)',
  'function decimals() view returns (uint8)',
];

const TokenTransfer: React.FC = () => {
  const { authState } = useWallet();
  const { account, signer } = authState;
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState(
    '0xF1C1865253524F47Ce6ba1eAF35F8B914a852602'
  );
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer || !account) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const decimals = await contract.decimals();
      const transferAmount = ethers.parseUnits(amount, decimals);
      
      const tx = await contract.transfer(recipient, transferAmount);
      toast.loading('Transaction pending...', { id: tx.hash });
      
      await tx.wait();
      toast.success('Transfer successful!', { id: tx.hash });
      
      setAmount('');
      setRecipient('');
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error('Transfer failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!account) return null;

  return (
    <div className="bg-blue-300 p-6 rounded-lg shadow-md dark:shadow-white dark:bg-blue-400">
      <div className="flex items-center space-x-2 mb-4">
        <Send className="text-blue-600" />
        <h2 className="text-xl font-semibold">Transfer Tokens</h2>
      </div>

      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Token
          </label>
          <select
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black"
          >
            <option value="0xF1C1865253524F47Ce6ba1eAF35F8B914a852602">DAI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black"
            placeholder="0x..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-black"
            placeholder="0.0"
            step="0.000001"
            min="0"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !recipient || !amount}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Send Tokens'}
        </button>
      </form>
    </div>
  );
};

export default TokenTransfer;