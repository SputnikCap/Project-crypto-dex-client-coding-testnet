// Button.tsx
import React from "react";

interface ButtonBannerProps {
  children: React.ReactNode; // содержимое кнопки
  onClick?: () => void; // обработчик клика
  className?: string; // дополнительные классы стилей
}

const ButtonBanner: React.FC<ButtonBannerProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} inline-block text-neutral-950 text-xl pointer bg-lime-400 font-bold px-4 py-2  rounded-full transition-colors `}
    >
      {children}
    </button>
  );
};

export default ButtonBanner;
