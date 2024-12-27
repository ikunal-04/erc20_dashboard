# Blockchain Dashboard

Welcome to the Blockchain Dashboard project! This project aims to provide a user-friendly interface for monitoring and managing ERC20 tokens on the blockchain.

### Features

1. Wallet Connection: Users can connect their Ethereum wallet (e.g., MetaMask) to the dashboard.
2. Token Balances: Displays the user's DAI token balance.
3. Token Transfer: Allows users to transfer DAI tokens (have created own contract on base sepolia chain) to another wallet address.
4. Recent Transactions: Shows recent transactions for the connected wallet using the Blockscout API for base sepolia testnet.
5. Responsive Design: Works well on both mobile and desktop views.
6. Dark Mode: Supports dark mode for better viewing in low-light conditions.

### Technologies Used

- React.js (with hooks and functional components)
- ethers.js
- Tailwind CSS
- Blockscout API

### Setup Instructions

To get started with the Blockchain Dashboard, follow these steps:

1. Clone the repository:

  ```bash
  git clone https://github.com/ikunal-04/erc20dashboard.git
  ```

2. Install the project dependencies:

  ```bash
  cd erc20dashboard
  pnpm install
  ```

3. Configure the project:

  - As we are using the blockscout api so here in this project we don't need any api key provided by etherscan or any other explorer.

4. Start the development server:

  ```bash
  pnpm dev
  ```

5. Open your browser and navigate to `http://localhost:5173` to access the Blockchain Dashboard.

### Design Decisions

1. **Component Structure**: The application is divided into several components (WalletConnection, TokenBalance, TokenTransfer, RecentTransactions) to maintain a clear separation of concerns and improve code readability and maintainability.

2. **State Management**: Zustand is used for global state management, particularly for handling the wallet connection state across components.

3. **Responsive Design**: Tailwind CSS is utilized to create a responsive layout that adapts to different screen sizes.

4. **Dark Mode**: Dark mode is implemented using Theming(provided by shadcn), providing a toggle for users to switch between light and dark themes.

5. **Error Handling**: Try-catch blocks are used throughout the application to handle potential errors, especially during blockchain interactions and API calls.

### Challenges Faced

**Getting funds for already existing erc20 tokens on other chains**: Getting faucets was the main issue while developing this project. So to solve it, I've deployed my own ERC20 token (DAI) on base sepolia testnet with a net supply of 100000 tokens, here's the token contract address: ```0xF1C1865253524F47Ce6ba1eAF35F8B914a852602``` with 18 decimals.
