import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { Toaster } from "react-hot-toast"
import WalletConnection from "@/components/WalletConnection"
import TokenBalance from "./components/TokenBalance"
import TokenTransfer from "./components/TokenTransfer"
import RecentTransactions from "./components/RecentTransactions"
import { LucideLayoutDashboard } from 'lucide-react'

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  <LucideLayoutDashboard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Blockchain Dashboard
                  </h1>
                </div>
                <WalletConnection />
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/10 p-6 hover:shadow-md transition-shadow duration-300">
                  <TokenBalance />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/10 p-6 hover:shadow-md transition-shadow duration-300">
                  <TokenTransfer />
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/10 p-6 hover:shadow-md transition-shadow duration-300">
                  <RecentTransactions />
                </div>
              </div>
            </div>
          </main>

          <footer className="mt-auto py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Built with ❤️ by Kunal
              </div>
            </div>
          </footer>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            duration: 3000,
          }}
        />
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App