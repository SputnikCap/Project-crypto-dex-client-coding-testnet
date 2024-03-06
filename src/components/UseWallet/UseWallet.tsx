// useWallet.tsx
import { useState, useEffect } from "react";
import connectWallet from "./ConnectWallet";
import disconnectWallet from "./DisconnectWallet";
import { SetStateString } from "./DisconnectWallet";

interface EthereumWindow extends Window {
  ethereum?: {
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
  };
}

declare let window: EthereumWindow;

const useWallet = () => {
  const savedAddress = localStorage.getItem("walletAddress");
  const [walletAddress, setWalletAddress] = useState<string>(
    savedAddress || ""
  );
  const [status, setStatus] = useState<string | JSX.Element>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWalletAddress("");
        localStorage.removeItem("walletAddress");
      } else {
        const account = accounts[0];
        setWalletAddress(account);
        localStorage.setItem("walletAddress", account);
      }
    };

    const handleChainChanged = (_chainId: string) => {
      // Здесь можно более тонко обработать изменение сети, если необходимо
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      // Проверка текущего состояния кошелька
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged)
        .catch(console.error);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (!window.ethereum) {
        console.log("Make sure you have Metamask installed!");
        return;
      }

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setWalletAddress(account);
          localStorage.setItem("walletAddress", account);
        } else {
          console.log("No authorized account found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIfWalletIsConnected();
  }, []);
  /*const onConnectWallet = async (walletType: string) => {
    const walletResponse = await connectWallet(walletType);
    if (walletResponse) {
      localStorage.setItem("walletAddress", walletResponse.address);
      setWalletAddress(walletResponse.address);
      setStatus(walletResponse.status);
    }
  };*/

  const onDisconnectWallet = () => {
    disconnectWallet(
      setWalletAddress,
      setStatus as SetStateString,
      setIsDropdownOpen
    );
    localStorage.removeItem("walletAddress");
    window.location.reload();
  };

  return {
    walletAddress,
    status,

    onDisconnectWallet,
    isDropdownOpen,
  };
};

export default useWallet;
