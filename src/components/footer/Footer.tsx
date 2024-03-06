// Footer.tsx
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

interface NavigationLinkProps {
  to: string;
  children: ReactNode;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, children }) => (
  <li className="h-full flex items-center">
    <NavLink
      to={to}
      className={
        ({ isActive }) =>
          isActive
            ? "h-full flex items-center px-1 bg-neutral-800" // Стиль для активной ссылки
            : "h-full flex items-center px-2" // Стиль для неактивной ссылки
      }
    >
      {children}
    </NavLink>
  </li>
);

const Footer = () => {
  const [isNetworkListOpen, setIsNetworkListOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("Сеть не выбрана");
  const networks = ["Ethereum", "Binance Smart Chain", "Polygon"];

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
  }, [dropdownRef]);

  const handleNetworkSelect = useCallback((network: string) => {
    setSelectedNetwork(network);
    setIsNetworkListOpen(false);
  }, []);

  const toggleNetworkList = useCallback(() => {
    setIsNetworkListOpen((prev) => !prev);
  }, []);
  return (
    <header className="bottom-0 z-50 mt-8 py-8 bg-neutral-900 w-full h-full  flex items-center">
      <div className="px-4 flex   w-full h-full">
        {/* Логотип */}
        <Link
          to="/main"
          className="flex items-center h-full py-4 text-xl text-neutral-50 font-bold"
        >
          DEX
        </Link>
        {/* Навигация */}
        <div className="relative text-white h-full">
          {/* Используйте 'flex items-center h-full' для элементов списка, чтобы они занимали всю высоту хедера */}
          <div className="flex items-center h-full">
            <div className="flex flex-row gap-8 h-full">
              {/* Для каждого элемента списка */}
              <div className="flex flex-col items-center">
                <div>Экосистема</div>
                <div className="flex flex-col items-center h-full">
                  {/* Для каждого элемента списка */}
                  <div className="h-full flex items-center cursor-pointer">
                    <NavigationLink to="/swap">Обмен</NavigationLink>
                  </div>
                  <div className="h-full flex items-center cursor-pointer">
                    <NavigationLink to="">Мост</NavigationLink>
                  </div>
                  <div className="h-full flex items-center cursor-pointer">
                    <NavigationLink to="">Пул</NavigationLink>
                  </div>
                  <div className="h-full flex items-center cursor-pointer">
                    <NavigationLink to="">Фарм</NavigationLink>
                  </div>
                  <div className="h-full flex items-center cursor-pointer">
                    <NavigationLink to="">Ликвидность</NavigationLink>
                  </div>
                  <div className="h-full flex items-center cursor-pointer">
                    <NavigationLink to="">Стейкинг</NavigationLink>
                  </div>
                  <div className="h-full flex items-center cursor-pointer">
                    <NavigationLink to="">IDO</NavigationLink>
                  </div>
                  <div className="h-full flex items-center cursor-pointer">
                    <NavigationLink to="/launch">Центр наград</NavigationLink>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>Бизнес</div>
                <div className=" flex  cursor-pointer">
                  <NavigationLink to="">Мост</NavigationLink>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>Разработчикам</div>
                <div className=" flex cursor-pointer">
                  <NavigationLink to="">Пул</NavigationLink>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>Помощь</div>
                <div className=" flex  cursor-pointer">
                  <NavigationLink to="">Фарм</NavigationLink>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>О нас</div>
                <div className=" flex cursor-pointer">
                  <NavigationLink to="">Ликвидность</NavigationLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Footer;
