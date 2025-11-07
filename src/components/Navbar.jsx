import { useEffect, useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';

export default function Navbar() {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts) => {
      setAccount(accounts && accounts.length > 0 ? accounts[0] : null);
    };

    ethereum.on?.('accountsChanged', handleAccountsChanged);
    return () => {
      ethereum?.removeListener?.('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const connect = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert('MetaMask not detected. Please install it to continue.');
      return;
    }
    try {
      setIsConnecting(true);
      // Explicit permission prompt first
      await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    // No programmatic disconnect for EOA; clear local state only
    setAccount(null);
  };

  const shortAddr = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400/80 to-cyan-400/80" />
          <span className="text-neutral-100 font-semibold tracking-tight">ChainFolio</span>
        </div>
        <nav className="flex items-center gap-2">
          {account ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-neutral-300 px-3 py-1.5 rounded-md bg-neutral-800/60 border border-neutral-700/60">{shortAddr(account)}</span>
              <button
                onClick={disconnect}
                className="inline-flex items-center gap-2 rounded-md bg-neutral-800/80 hover:bg-neutral-700/70 text-neutral-100 border border-neutral-700 px-3 py-2 text-sm transition-colors"
              >
                <LogOut size={16} />
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={isConnecting}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 text-white px-4 py-2 text-sm font-medium shadow-lg shadow-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Wallet size={16} />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
