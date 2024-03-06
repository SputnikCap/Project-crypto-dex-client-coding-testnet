// TokenSelector.tsx
import React from "react";
import { ChevronDown } from "lucide-react";
const ETH = require("src/img/coins/ETH.png");

interface TokenSelectorProps {
  selectedToken: string;
  onTokenChange: (token: string) => void;
  tokens: string[];
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenChange,
  tokens,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleTokenSelect = (token: string) => {
    onTokenChange(token);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <span>{selectedToken}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white border border-neutral-300 shadow-lg z-10">
          {tokens.map((token) => (
            <div
              key={token}
              onClick={() => handleTokenSelect(token)}
              className="cursor-pointer hover:bg-gray-100 p-2"
            >
              {token}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TokenSelector;
