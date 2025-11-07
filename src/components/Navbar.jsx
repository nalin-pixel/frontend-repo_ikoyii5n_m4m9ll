import { useEffect, useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';

export default function Navbar() {
  const [account, setAccount] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    // Listen for account changes if MetaMask is present
    if (window.ethereum) {
      const handler = (accounts) => {
        setAccount(accounts && accounts.length ? accounts[0] : null);
      };
      window.ethereum.on('accountsChanged', handler);
      return () => window.ethereum.removeListener('accountsChanged', handler);
    }
  }, []);

  const connect = async () => {
    try {
      setConnecting(true);
      if (!window.ethereum) {
        alert('MetaMask not detected. Please install it to connect.');
        return;
      }
      // Explicitly request permission and accounts (no auto-reconnect)
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    // Clear local state only; user can reconnect explicitly
    setAccount(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500" />
          <span className="text-white font-semibold tracking-tight">ChainFolio</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#explore" className="hover:text-white transition-colors">Explore</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-3">
          {account ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-white/80 text-sm max-w-[140px] truncate">
                {account}
              </span>
              <button onClick={disconnect} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15 text-white text-sm border border-white/10 transition-colors">
                <LogOut size={16} />
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={connect} disabled={connecting} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-sm font-medium shadow-lg shadow-violet-500/20 disabled:opacity-60">
              <Wallet size={16} />
              {connecting ? 'Connecting…' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
