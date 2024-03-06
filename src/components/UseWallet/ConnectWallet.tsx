// connectWallet.tsx
import Web3 from "web3";

interface EthereumWindow extends Window {
  ethereum?: {
    request: (request: { method: string; params?: any[] }) => Promise<any>;
  };
}

declare let window: EthereumWindow;

const connectWallet = async (walletType: string, requestMethod: string) => {
  if (window.ethereum) {
    try {
      let method = "";
      switch (walletType) {
        case "MetaMask":
          method = "eth_requestAccounts";
          break;
        case "OKX":
          method = "eth_requestAccounts"; // Используйте тот же метод для OKX, если он поддерживает eth_requestAccounts
          break;
        default:
          // Handle other wallet types
          break;
      }
      if (method) {
        const addressArray = await window.ethereum.request({
          method: requestMethod,
        });
        return {
          status: "👆🏽 Подключен",
          address: addressArray[0],
        };
      }
    } catch (err) {
      if (err instanceof Error) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
      return {
        address: "",
        status: "😥 An unknown error occurred.",
      };
    }
  } else {
    return {
      address: "",
      status:
        "🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.", // Обновлено: просто строка, без JSX
    };
  }
};
export default connectWallet;
