// NetworkSelect.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, CircleDot } from "lucide-react";
import Button from "../Button";
declare global {
  interface Window {
    ethereum?: {
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
      removeListener?: (
        event: string,
        callback: (...args: any[]) => void
      ) => void;
    };
  }
}

interface NetworkSelectProps {
  networks: { [chainId: string]: string };
  walletConnected: boolean;
  resetNetwork: () => void;
}

const YOUR_CHAIN_ID = "0x1";

const NetworkSelect: React.FC<NetworkSelectProps> = ({
  networks,
  walletConnected,
  resetNetwork,
}) => {
  const [isNetworkListOpen, setIsNetworkListOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsNetworkListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNetworkSelect = async (network: string, chainId: string) => {
    if (!window.ethereum) {
      console.error("Ethereum object not found");
      return;
    }
    // Сохраняем текущую сеть перед попыткой переключения
    const previousNetwork = selectedNetwork;
    setSelectedNetwork(network);
    setIsNetworkListOpen(false);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
      setSelectedNetwork(network);
    } catch (error) {
      const switchError = error as { code?: number; message?: string };
      if (switchError.code === 4001) {
        console.log("Пользователь отказался переключить сеть");
        setSelectedNetwork(previousNetwork);
      } else if (switchError.code === 4902) {
        console.log("Указанная сеть не поддерживается, попытка добавить сеть");
        try {
          // Здесь необходимо добавить параметры сети Arbitrum
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainId, // Необходим Chain ID в шестнадцатеричном формате
                chainName: network, // Имя сети
                nativeCurrency: {
                  name: "Ether", // Например, "Ether"
                  symbol: "ETH", // Например, "ETH"
                  decimals: 18,
                },
                rpcUrls: ["https://arb1.arbitrum.io/rpc"], // RPC URL сети Arbitrum
                blockExplorerUrls: ["https://arbiscan.io"], // URL блок-эксплорера сети Arbitrum
              },
            ],
          });
          setSelectedNetwork(network);
        } catch (addError) {
          console.error("Ошибка при добавлении сети:", addError);
        }
      } else {
        console.error(
          "Произошла ошибка при переключении сети:",
          switchError.message
        );
        setSelectedNetwork(previousNetwork);
      }
    }
  };
  useEffect(() => {
    if (!walletConnected) {
      setSelectedNetwork(null); // Сбросить выбранную сеть
      resetNetwork(); // Вызовите resetNetwork, если нужно выполнить дополнительные действия при сбросе
    }
  }, [walletConnected, resetNetwork]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const networkName = networks[chainId];
        if (networkName) {
          setSelectedNetwork(networkName);
        }

        const handleChainChanged = (newChainId: string) => {
          const updatedNetworkName = networks[newChainId];
          if (updatedNetworkName) {
            setSelectedNetwork(updatedNetworkName);
          }
        };

        window.ethereum.on &&
          window.ethereum.on("chainChanged", handleChainChanged);

        return () => {
          if (window.ethereum && window.ethereum.removeListener) {
            window.ethereum.removeListener("chainChanged", handleChainChanged);
          }
        };
      }
    };
    init();
  }, [networks]);
  useEffect(() => {
    // Вызовите resetNetwork при необходимости (например, когда кошелёк отключается)
    // Это может быть вызвано из родительского компонента (Header.tsx)
    // Другой код...
  }, [resetNetwork]);
  const toggleNetworkList = () => {
    setIsNetworkListOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleNetworkList}
        className="flex items-center px-2  focus:outline-none"
      >
        <CircleDot
          className={`mr-2 size-3 ${
            selectedNetwork
              ? "fill-lime-400 stroke-lime-400"
              : "fill-red-500 stroke-red-500"
          }`}
        />
        {selectedNetwork || "Сеть не выбрана"}
        <ChevronDown className="ml-1 size-4 inline-block stroke-neutral-900" />
      </Button>
      {isNetworkListOpen && (
        <ul
          ref={dropdownRef}
          className="absolute bg-white overflow-hidden rounded-xl shadow-lg mt-1 z-10 transition-opacity duration-300 ease-in-out"
          style={{ opacity: isNetworkListOpen ? 1 : 0 }}
        >
          {Object.entries(networks).map(([chainId, networkName]) => (
            <li
              key={chainId}
              onClick={() => handleNetworkSelect(networkName, chainId)}
              className="px-4 py-2 hover:bg-gray-300 text-neutral-950 cursor-pointer"
            >
              {networkName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default NetworkSelect;
