import { useEffect, useState, useCallback } from 'react';

export function useMetamask() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const eth = typeof window !== 'undefined' ? window.ethereum : null;
    setProvider(eth ?? null);

    if (eth) {
      eth.request({ method: 'eth_accounts' })
        .then((accs) => {
          if (accs && accs.length > 0) setAccount(accs[0]);
        })
        .catch(() => {});

      eth.request({ method: 'eth_chainId' })
        .then((cid) => setChainId(cid))
        .catch(() => {});

      const handleAccountsChanged = (accs) => {
        setAccount(accs && accs.length ? accs[0] : null);
      };
      const handleChainChanged = (cid) => {
        setChainId(cid);
      };

      eth.on?.('accountsChanged', handleAccountsChanged);
      eth.on?.('chainChanged', handleChainChanged);

      return () => {
        eth.removeListener?.('accountsChanged', handleAccountsChanged);
        eth.removeListener?.('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const connect = useCallback(async () => {
    if (!provider) return { ok: false, error: 'NO_PROVIDER' };
    try {
      setConnecting(true);
      const accs = await provider.request({ method: 'eth_requestAccounts' });
      if (accs && accs.length > 0) {
        setAccount(accs[0]);
        return { ok: true, account: accs[0] };
      }
      return { ok: false, error: 'NO_ACCOUNTS' };
    } catch (e) {
      return { ok: false, error: e?.code || 'USER_REJECTED' };
    } finally {
      setConnecting(false);
    }
  }, [provider]);

  const disconnect = useCallback(() => {
    // MetaMask doesn't support programmatic disconnect. We clear local state.
    setAccount(null);
  }, []);

  return {
    provider,
    hasProvider: !!provider,
    account,
    chainId,
    connecting,
    connect,
    disconnect,
  };
}
