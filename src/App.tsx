import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { Toaster } from "react-hot-toast"
import WalletConnection from "@/components/WalletConnection"
import TokenBalance from "./components/TokenBalance"
import TokenTransfer from "./components/TokenTransfer"
import RecentTransactions from "./components/RecentTransactions"

function App() {

  return (
    <ThemeProvider>
      <WalletProvider>
      <div className="min-h-screen ">
        <nav className="shadow-sm dark:shadow-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Blockchain Dashboard</h1>
              <WalletConnection />
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <TokenBalance />
              <TokenTransfer />
            </div>
            <div>
              <RecentTransactions />
            </div>
          </div>
        </main>
      </div>
        <Toaster position="top-right"/>
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App
