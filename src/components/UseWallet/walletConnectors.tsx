// walletConnectors.tsx
import Web3 from "web3";

interface EthereumWindow extends Window {
  ethereum?: {
    request: (request: { method: string; params?: any[] }) => Promise<any>;
  };
}

declare let window: EthereumWindow;
// Определяем тип для поддерживаемых кошельков
export enum WalletType {
  MetaMask = "MetaMask",
  OKX = "OKX",
  // Добавьте другие типы кошельков здесь...
}
export const walletConnectors: Record<
  WalletType,
  () => Promise<string | null>
> = {
  [WalletType.MetaMask]: async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts[0]) {
          localStorage.setItem("walletAddress", accounts[0]); // Сохраняем адрес в localStorage
        }
        return accounts[0]; // Возвращает адрес первого кошелька
      } catch (error) {
        console.error("Ошибка подключения к MetaMask:", error);
        return null;
      }
    } else {
      console.error("MetaMask не установлен!");
      return null;
    }
  },
  [WalletType.OKX]: async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return accounts[0]; // Возвращает адрес первого кошелька
      } catch (error) {
        console.error("Ошибка подключения к MetaMask:", error);
        return null;
      }
    } else {
      console.error("MetaMask не установлен!");
      return null;
    }
  },
  // Добавьте другие кошельки сюда, например:
  // OKX: async () => {...},
  // ...
};
