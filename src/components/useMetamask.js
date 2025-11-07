import { useEffect, useState, useCallback, useRef } from 'react';

export function useMetamask() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const lastAttemptRef = useRef(0);

  const throttledRequestAccounts = useCallback(async (eth) => {
    const now = Date.now();
    if (now - lastAttemptRef.current < 1500) return;
    lastAttemptRef.current = now;
    try {
      setConnecting(true);
      const reqAccs = await eth.request({ method: 'eth_requestAccounts' });
      if (reqAccs && reqAccs.length) setAccount(reqAccs[0]);
    } catch (_) {
      // user may reject; we simply stop
    } finally {
      setConnecting(false);
    }
  }, []);

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

      const handleAccountsChanged = async (accs) => {
        if (accs && accs.length) {
          setAccount(accs[0]);
        } else {
          setAccount(null);
          await throttledRequestAccounts(eth);
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
  }, [throttledRequestAccounts]);

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

  const disconnect = useCallback(async () => {
    // MetaMask doesn't support programmatic disconnect; clear local state
    setAccount(null);
    if (provider) {
      // Immediately prompt connect again per request
      await throttledRequestAccounts(provider);
    }
  }, [provider, throttledRequestAccounts]);

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
