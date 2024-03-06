// Button.tsx
import React from "react";

interface ButtonProps {
  children: React.ReactNode; // содержимое кнопки
  onClick?: () => void; // обработчик клика
  className?: string; // дополнительные классы стилей
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} inline-block text-neutral-950 text-xs font-medium px-2 py-1 pointer bg-neutral-50 font-semibold border border-neutral-100 rounded-full transition-colors `}
    >
      {children}
    </button>
  );
};

export default Button;
