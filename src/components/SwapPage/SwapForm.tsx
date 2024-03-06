import React, { useState, useEffect } from "react";
import TokenInput from "./TokenInput";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import SwapOrOrderTabs from "./SwapOrderTabs";
import { useTokenContext } from "../../context/TokenContext";
const SwapForm = () => {
  // Массив доступных токенов
  const [isSwapSelected, setIsSwapSelected] = useState(true);
  // const [fromToken, setFromToken] = useState<string>("ETH");
  // const [toToken, setToToken] = useState<string>("USDT");
  const [amount, setAmount] = useState<number>(0);
  const { tokenData, setTokenData } = useTokenContext();
  // Пример значения, полученного из API или контракта
  const tokenBalance = 5; // Количество токенов на кошельке пользователя

  const walletAddress = useSelector(
    (state: RootState) => state.wallet.walletAddress
  );
  const isWalletConnected = !!walletAddress;

  // Эффект для обновления баланса кошелька и цены токена
  useEffect(() => {
    // Здесь код для получения баланса кошелька и цены токена
    // setWalletBalance(полученный баланс);
    // setTokenPrice(полученная цена);
  }, [walletAddress, tokenData.fromToken, tokenData.toToken]);
  const handleFromTokenChange = (token: string) => {
    setTokenData({ ...tokenData, fromToken: token });
  };

  const handleToTokenChange = (token: string) => {
    setTokenData({ ...tokenData, toToken: token });
  };

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };

  const handleSwap = () => {
    console.log(
      `Swapping ${amount} ${tokenData.fromToken} to ${tokenData.toToken}`
    );
    // Логика обмена
  };
  return (
    <div className="mb-5 max-f-full pt-4 bg-neutral-900 rounded-3xl pb-5 px-7">
      <SwapOrOrderTabs
        isSwapSelected={isSwapSelected}
        onSelectSwap={() => setIsSwapSelected(true)}
        onSelectOrder={() => setIsSwapSelected(false)}
      />
      <div className="relative">
        <div className="relative z-20 ">
          <TokenInput
            label="Отдаёте"
            tokens={tokenData.availableTokens}
            selectedToken={tokenData.fromToken}
            balance={tokenBalance}
            price={tokenData.fromTokenPrice}
            onTokenChange={handleFromTokenChange}
            onAmountChange={handleAmountChange}
          />
          <div className="bg-neutral-100 shadow-sm shadow-neutral-400 rounded-full absolute left-0 right-0 h-8 w-8 m-auto bottom-1 -top-14 text-center">
            <div className="flex items-center relative top-50  translate-y-1/2 pointer left-0">
              <ArrowDownUp className="size-4 left-0 right-0 m-auto" />
            </div>
          </div>
          <TokenInput
            label="Получаете"
            tokens={tokenData.availableTokens}
            selectedToken={tokenData.toToken}
            balance={tokenBalance} // Предполагается, что баланс для второго токена тоже известен
            price={tokenData.toTokenPrice} // И цена для второго токена тоже известна
            onTokenChange={handleToTokenChange}
            onAmountChange={() => {}} // Если это поле только для чтения, уберите этот пропс
          />
          <div className="w-full">
            <div className="mb-2">
              <div className="flex justify-between items-center">
                <div className="text-neutral-500 text-sm font-normal">
                  Прибл. сетевая комиссия
                </div>
                <div className="text-neutral-500 text-sm font-normal">
                  $8,07
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-neutral-500 text-sm font-normal">
                  Проскальзывание
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-neutral-500 text-sm font-normal">
                    0,5%
                  </div>
                  <ChevronDown className="size-4 stroke-neutral-300 -rotate-90" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-neutral-500 text-sm font-normal">
                  Выбрать ликвидность
                </div>
                <div className="flex items-center">
                  <div className="text-neutral-500 text-sm font-normal">
                    66/66
                  </div>
                  <ChevronDown className="size-4 stroke-neutral-300 -rotate-90" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-neutral-500 text-sm font-normal">
                  Сравнение котировок
                </div>
                <div className="text-neutral-500 text-sm font-normal">$0,3</div>
              </div>
            </div>
          </div>
          {isWalletConnected ? (
            <button
              className="bg-neutral-50 w-full rounded-full text-xl font-bold text-nutral-950 px-4 py-2"
              onClick={handleSwap}
            >
              Обмен
            </button>
          ) : (
            <button
              className="bg-neutral-50 w-full rounded-full text-xl font-bold text-nutral-950 px-4 py-2"
              onClick={() => {
                /* логика подключения кошелька */
              }}
            >
              Подключить кошелек
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapForm;
