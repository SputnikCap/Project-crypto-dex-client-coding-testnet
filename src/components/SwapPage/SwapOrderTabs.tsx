import React from "react";

interface SwapOrOrderTabsProps {
  isSwapSelected: boolean;
  onSelectSwap: () => void;
  onSelectOrder: () => void;
}

const SwapOrOrderTabs: React.FC<SwapOrOrderTabsProps> = ({
  isSwapSelected,
  onSelectSwap,
  onSelectOrder,
}) => {
  return (
    <div className="flex h-14 mb-5">
      <button
        onClick={onSelectSwap}
        className={`mr-5 text-neutral-50 font-bold h-full  ${
          isSwapSelected
            ? "border-b border-lime-400 text-neutral-50"
            : "border-transparent text-neutral-500"
        }`}
      >
        Свап
      </button>
      <button
        onClick={onSelectOrder}
        className={`h-full  font-bold  ${
          !isSwapSelected
            ? "border-b border-lime-400 text-neutral-50"
            : "border-transparent text-neutral-500"
        }`}
      >
        Лимитный ордер
      </button>
    </div>
  );
};

export default SwapOrOrderTabs;
