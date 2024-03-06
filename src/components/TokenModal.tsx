// TokenModal.tsx
import React from "react";
import ReactDOM from "react-dom";
import { ChevronDown, X } from "lucide-react";

interface TokenModalProps {
  isOpen: boolean;
  tokens: string[];
  onSelect: (token: string) => void;
  onClose: () => void;
}

const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  tokens,
  onSelect,
  onClose,
}) => {
  if (!isOpen) return null;
  // Закрываем модальное окно при клике на фон
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={handleCloseClick}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4">
          <h4 className="text-lg font-semibold">Выберите токен</h4>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        {tokens.map((token) => (
          <div
            key={token}
            onClick={() => onSelect(token)}
            className="cursor-pointer hover:bg-gray-100 p-2"
          >
            {token}
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default TokenModal;
