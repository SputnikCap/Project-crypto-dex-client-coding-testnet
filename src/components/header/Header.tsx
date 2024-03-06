// Header.tsx
import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NetworkSelect from "./NetworkSelect";
import { ChevronDown } from "lucide-react";
import WalletConnectModal from "../UseWallet/WalletConnectModal";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import {
  disconnectWallet,
  connectWallet as reduxConnectWallet,
  updateWalletAddress,
} from "../../redux/actions/walletActions";

interface NavigationLinkProps {
  to: string;
  children: ReactNode;
}

interface HeaderProps {
  walletAddress: string | null;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  updateWalletAddress: (address: string) => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, children }) => (
  <li className="h-full flex items-center">
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "h-full flex items-center px-1 bg-neutral-800"
          : "h-full flex items-center px-2"
      }
    >
      {children}
    </NavLink>
  </li>
);

const Header: React.FC<HeaderProps> = ({
  walletAddress,
  connectWallet,
  disconnectWallet,
  updateWalletAddress,
}) => {
  const networks = {
    "0x1": "Ethereum",
    "0x38": "Binance Smart Chain",
    "0x89": "Polygon",
    "0xA4B1": "Arbitrum One",
    // добавьте другие сети по необходимости
  };
  const prevWalletAddress = useRef(walletAddress);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWalletSelectionOpen, setIsWalletSelectionOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // Записываем предыдущий адрес кошелька при каждом рендере
    prevWalletAddress.current = walletAddress;
  });

  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      connectWallet(savedWalletAddress);
    }
  }, [connectWallet]);

  useEffect(() => {
    if (
      prevWalletAddress.current &&
      walletAddress !== prevWalletAddress.current
    ) {
      // Если адрес кошелька изменился, закрываем Dropdown
      closeDropdown();
    }
  }, [walletAddress]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDisconnectClick = () => {
    disconnectWallet();
    localStorage.removeItem("walletAddress");
    setIsDropdownOpen(false);
  };
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
  };
  const resetSelectedNetwork = () => {
    // Логика для сброса выбранной сети
    // ...
  };
  // Функция для отображения кнопки подключения кошелька или адреса
  const renderWalletButtonOrAddress = () => {
    console.log("renderWalletButtonOrAddress вызвана, адрес:", walletAddress);
    if (walletAddress) {
      return (
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={openDropdown}
          >
            <div className="text-neutral-50 mr-2">
              {truncateAddress(walletAddress)}
            </div>
            <ChevronDown className="size-4" />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white shadow-lg rounded-lg">
              <div className="flex items-center justify-center">
                {/* Тут можно добавить дополнительные пункты меню */}
                <button
                  className="border border-neutral-300 rounded-xl"
                  onClick={handleDisconnectClick}
                >
                  <div className="m-2 text-xs text-neutral-950 font-normal">
                    Disconnect Wallet
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={() => setIsWalletSelectionOpen(true)}>
            Подключить кошелёк
          </Button>
          <WalletConnectModal
            isOpen={isWalletSelectionOpen}
            onClose={() => setIsWalletSelectionOpen(false)}
          />
        </div>
      );
    }
  };
  return (
    <header className="fixed top-0 z-50 bg-neutral-900 w-full h-14 flex items-center">
      <div className="px-4 flex items-center justify-between w-full h-full">
        {/* Логотип */}
        <Link
          to="/main"
          className="flex items-center h-full py-4 text-xl text-neutral-50 font-bold"
        >
          DEX
        </Link>
        <div className="w-px m-4 h-4 bg-zinc-700"></div>
        {/* Навигация */}
        <ul className="flex grow relative text-white h-full">
          {/* Используйте 'flex items-center h-full' для элементов списка, чтобы они занимали всю высоту хедера */}
          <div className="flex items-center h-full">
            <div className="flex flex-row items-center h-full">
              {/* Для каждого элемента списка */}
              <div className="h-full flex items-center cursor-pointer">
                <NavigationLink to="/swap">Обмен</NavigationLink>
              </div>
              <div className="h-full flex items-center cursor-pointer">
                <NavigationLink to="/launch">Центр наград</NavigationLink>
              </div>
            </div>
          </div>
          <li className="grow flex items-center h-full"></li>
          <li className="flex items-center h-full relative mr-1 shrink-0">
            <NetworkSelect
              networks={networks}
              walletConnected={!!walletAddress}
              resetNetwork={resetSelectedNetwork}
            />
          </li>
          {/*  <li className="w-px my-4 h-4 mx-4 bg-slate-300"></li>*/}
          <div className="flex items-center h-full relative ml-1  shrink-0">
            {renderWalletButtonOrAddress()}
          </div>
          {/* Дополнительные ссылки и компоненты */}
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({
  walletAddress: state.wallet.walletAddress,
});

const mapDispatchToProps = {
  connectWallet: reduxConnectWallet,
  disconnectWallet,
  updateWalletAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
