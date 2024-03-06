// TokenInput.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import TokenModal from "../TokenModal";
import { ChevronDown } from "lucide-react";
import { ReactComponent as UsdtIcon } from "cryptocurrency-icons/svg/color/usdt.svg";
import { ReactComponent as EthIcon } from "cryptocurrency-icons/svg/color/eth.svg";
import { useTokenContext } from "../../context/TokenContext";

interface TokenInputProps {
  label: string;
  tokens: string[];
  selectedToken: string;
  balance: number; // Добавим баланс пользователя
  price: number | null; // Добавим цену токена
  onTokenChange: (token: string) => void;
  onAmountChange: (amount: number) => void;
}
const getPopularTokensForNetwork = (network: string) => {
  switch (network) {
    case "Ethereum":
      return ["ETH", "USDT", "DAI", "UNI", "LINK"];
    case "Polygon":
      return ["MATIC", "USDC", "AAVE", "QUICK", "WMATIC"];
    // Добавьте обработку других сетей по аналогии
    default:
      return [];
  }
};
const TokenInput: React.FC<TokenInputProps> = ({
  label,
  selectedToken,
  balance,
  price,
  onTokenChange,
  onAmountChange,
}) => {
  // Получаем текущую сеть из Redux или из другого источника
  const { tokenData, setTokenData } = useTokenContext();
  const currentNetwork = useSelector(
    (state: RootState) => state.network.currentNetwork
  );
  const [amount, setAmount] = useState<string>("");
  const [isTokenListOpen, setIsTokenListOpen] = useState<boolean>(false); // Добавьте это состояние
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAmountChange(parseFloat(e.target.value));
  };
  useEffect(() => {
    // Код для обновления данных о цене токена
    // и возможно, для запроса исторических данных для графика
  }, [tokenData.fromToken, tokenData.toToken, tokenData.timePeriod]);

  const popularTokens = currentNetwork
    ? getPopularTokensForNetwork(currentNetwork)
    : [];

  // Открывает или закрывает выпадающий список
  const toggleTokenListOpen = () => setIsTokenListOpen(!isTokenListOpen);

  // Обрабатывает выбор токена
  const handleSelectToken = useCallback(
    (token: string) => {
      setIsTokenListOpen(false); // Закрываем список токенов после выбора
      onTokenChange(token);
    },
    [onTokenChange]
  );
  const handleTokenClick = () => {
    // Переключаем состояние для отображения списка токенов
    setIsTokenSelectorOpen(!isTokenSelectorOpen);
  };
  const toggleTokenModal = () => {
    setIsTokenSelectorOpen(!isTokenSelectorOpen);
  };
  // Обновленный обработчик выбора токена из модального окна
  const handleTokenSelect = (token: string) => {
    // Обновляем контекст выбранным токеном
    setTokenData((prevData) => ({
      ...prevData,
      fromToken: token, // или toToken в зависимости от того, какой инпут вызвал модальное окно
    }));
    onTokenChange(token); // This will update the local state if necessary
    setIsTokenSelectorOpen(false);
    toggleTokenModal(); // Закрываем модальное окно
  };

  // Определяем, какой иконку показывать на основе выбранного токена
  const TokenIcon = selectedToken === "ETH" ? EthIcon : UsdtIcon;
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="text-sm text-gray-500">
          {`$${
            tokenData.fromToken === selectedToken
              ? tokenData.fromTokenPrice?.toFixed(2)
              : tokenData.toTokenPrice?.toFixed(2) || "Price not available"
          } per ${selectedToken}`}
        </div>
      </div>
      <div className="mt-2 flex">
        <button
          className="flex items-center justify-between bg-gray-200 rounded-l-xl px-3 py-2 text-gray-700"
          onClick={toggleTokenModal}
        >
          <TokenIcon className="w-4 h-4 mr-2" />
          <span className="text-neutral-950">{selectedToken}</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        <input
          type="number"
          className="flex-1 border-t border-b border-r rounded-r-xl px-3 py-2 outline-none"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="text-right text-sm text-gray-500 mt-2">
        1.35635 доступно
      </div>
      {isTokenSelectorOpen && (
        <TokenModal
          isOpen={isTokenSelectorOpen}
          onSelect={handleTokenSelect}
          tokens={tokenData.availableTokens}
          onClose={toggleTokenModal}
        />
      )}
    </div>
  );
};

export default TokenInput;
