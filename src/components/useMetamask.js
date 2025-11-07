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
      // Read current state without triggering any popups
      eth.request({ method: 'eth_accounts' })
        .then((accs) => {
          if (accs && accs.length > 0) setAccount(accs[0]);
        })
        .catch(() => {});

      eth.request({ method: 'eth_chainId' })
        .then((cid) => setChainId(cid))
        .catch(() => {});

      const handleAccountsChanged = (accs) => {
        if (accs && accs.length) {
          setAccount(accs[0]);
        } else {
          // Do NOT auto-prompt. Leave it to explicit user action.
          setAccount(null);
        }
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
      // Always open MetaMask permission UI so the user sees a popup every time
      await provider.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });
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

  const disconnect = useCallback(async () => {
    // MetaMask cannot be programmatically disconnected; clear local state only
    setAccount(null);
    // Intentionally do NOT auto-prompt here. User must click Connect to see a popup.
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
