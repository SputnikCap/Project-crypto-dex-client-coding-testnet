import React from "react";
import { X } from "lucide-react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWallet as reduxConnectWallet,
  updateWalletAddress,
  disconnectWallet,
} from "../../redux/actions/walletActions";
import { RootState } from "../../redux/store";
import { WalletType, walletConnectors } from "./walletConnectors";
const OKXIcon = require("src/img/okx-icon.png");
const MetaMaskIcon: string = require("src/img/metamask-icon.svg").default;

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectWallet: (address: string) => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
  connectWallet,
}) => {
  const handleWalletConnect = async (walletType: WalletType) => {
    console.log("Нажал на кнопку подключения и:", walletType);
    const connectFn = walletConnectors[walletType];
    if (connectFn) {
      const address = await connectFn(); // Вызываем функцию подключения кошелька
      if (address) {
        connectWallet(address); // Сохраняем адрес кошелька
      }
    } else {
      console.error(`Подключение к кошельку ${walletType} не поддерживается.`);
    }
    onClose(); // Закрыть модальное окно после попытки подключения
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-neutral-950 bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg">
        <div className="absolute top-2 right-2">
          <button
            className="p-1 hover:bg-neutral-300 hover:rounded-lg"
            onClick={onClose}
          >
            <X className="size-5 stroke-neutral-500" />
          </button>
        </div>
        <div className="flex flex-col py-4">
          <div className="text-xl font-bold text-neutral-950">
            Подключить кошелёк
          </div>
          <div className="text-sm font-normal text-neutral-400">
            Безопасно подключите кошелек, чтобы начать путешествие в Web3
          </div>
          <div className="mt-4 flex grid-cols-3	grid gap-2">
            <button
              className="flex items-center flex-col border border-neutral-200 rounded-xl hover:bg-neutral-300 hover:rounded-xl p-2"
              onClick={() => handleWalletConnect(WalletType.MetaMask)}
            >
              <img src={MetaMaskIcon} className="size-10" alt="MetaMask" />
              <div className="text-sm font-medium text-neutral-950">
                MetaMask
              </div>
            </button>
            <button
              className="flex items-center flex-col  border border-neutral-200 rounded-xl hover:bg-neutral-200 hover:rounded-xl p-2"
              onClick={() => handleWalletConnect(WalletType.OKX)}
            >
              <img className="size-10" src={OKXIcon} alt="OKX" />

              <div className="text-sm font-medium text-neutral-950">OKX</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  connectWallet: reduxConnectWallet,
  disconnectWallet,
};
export default connect(null, mapDispatchToProps)(WalletConnectModal);
