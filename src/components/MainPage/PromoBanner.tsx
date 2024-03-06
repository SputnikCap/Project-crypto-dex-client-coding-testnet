import React, { useRef, useState } from "react";
import Slider from "react-slick";
import Button from "../Button";
import { ReactComponent as BtcIcon } from "cryptocurrency-icons/svg/color/btc.svg";
import { ReactComponent as UsdtIcon } from "cryptocurrency-icons/svg/color/usdt.svg";
import { ReactComponent as EthIcon } from "cryptocurrency-icons/svg/color/eth.svg";
import { ReactComponent as DogeIcon } from "cryptocurrency-icons/svg/color/doge.svg";
import CryptoTable from "./CryptoTable";

const PromoBanner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: null as any, // Используем 'any' для обхода проверки типа
    prevArrow: null as any, // Используем 'any' для обхода проверки типа
    afterChange: (current: number) => setActiveSlide(current),
  };
  const goToSlide = (slideNumber: number) => {
    setActiveSlide(slideNumber);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(slideNumber);
    }
  };
  const getButtonClass = (slideNumber: number, totalSlides: number) =>
    `px-2 py-1 text-xs rounded-full transition-colors duration-300 ease-in-out ${
      slideNumber === activeSlide
        ? "bg-neutral-50 text-neutral-900"
        : "text-neutral-50 bg-transparent"
    } font-medium ${slideNumber === totalSlides - 1 ? "" : "mr-2"}`;
  // Пример данных для таблицы
  const tableData = [
    {
      id: 1,
      pair: {
        currency1: <BtcIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "BTC/USDT",
      },

      price: 22304,
      tvl: 73904,
      change: "+1.23%",
    },
    {
      id: 2,
      pair: {
        currency1: <EthIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "ETH/USDT",
      },

      price: 1664,
      tvl: 52004,
      change: "+2.53%",
    },
    {
      id: 3,
      pair: {
        currency1: <DogeIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "DOGE/USDT",
      },

      price: 0.003312,
      tvl: 33004,
      change: "-4.23%",
    },
    {
      id: 4,
      pair: {
        currency1: <BtcIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "BTC/USDT",
      },

      price: 2304,
      tvl: 72004,
      change: "+1.23%",
    },
    {
      id: 5,
      pair: {
        currency1: <EthIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "ETH/USDT",
      },

      price: 1664,
      tvl: 52004,
      change: "+2.53%",
    },
    {
      id: 6,
      pair: {
        currency1: <DogeIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "DOGE/USDT",
      },

      price: 0.003312,
      tvl: 33004,
      change: "-4.23%",
    },
    {
      id: 7,
      pair: {
        currency1: <BtcIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "BTC/USDT",
      },

      price: 2304,
      tvl: 72004,
      change: "+1.23%",
    },
    {
      id: 8,
      pair: {
        currency1: <EthIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "ETH/USDT",
      },

      price: 1664,
      tvl: 52004,
      change: "+2.53%",
    },
    {
      id: 9,
      pair: {
        currency1: <DogeIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "DOGE/USDT",
      },

      price: 0.003312,
      tvl: 33004,
      change: "-4.23%",
    },
    {
      id: 10,
      pair: {
        currency1: <BtcIcon className="size-4" />,
        currency2: <UsdtIcon className="size-4" />,
        text: "BTC/USDT",
      },

      price: 2304,
      tvl: 72004,
      change: "+1.23%",
    },
    // ... другие данные ...
  ];
  return (
    <div className="relative w-full border border-neutral-800 rounded-3xl">
      <div className="flex flex-col max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex mb-4 items-center justify-center">
          <div className="p-1 flex items-center border  border-neutral-800 rounded-full">
            <button
              className={getButtonClass(0, 3)}
              onClick={() => goToSlide(0)}
            >
              Обмен
            </button>
            <button
              className={getButtonClass(1, 3)}
              onClick={() => goToSlide(1)}
            >
              IDO
            </button>
            <button
              className={getButtonClass(2, 3)}
              onClick={() => goToSlide(2)}
            >
              Центр наград
            </button>
          </div>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {/* Карточка 1 */}
          <div className="px-4 py-10   rounded-3xl relative  border-gray-800">
            {/* содержимое карточки */}
            <h3 className="mt-2">Обменивайте криптовалюту легко</h3>
            <div className="relative flex items-center justify-between mt-4">
              <div className="flex flex-col items-center">
                <span className="mb-2">1. Подключите кошелёк</span>
                <div className="h-2 w-2 bg-lime-400 rounded-full absolute -bottom-1  transform -translate-x-1/2" />
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-2">2. Выберите токен</span>
                <div className="h-2 w-2 bg-lime-400 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2" />
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-2">3. Обменяйте токен</span>
                <div className="h-2 w-2 bg-lime-400 rounded-full absolute -bottom-1  transform -translate-x-1/2" />
              </div>
              <div className="h-[1px] w-full bg-lime-400 absolute bottom-0 left-0"></div>
            </div>
            <div className="flex items-center">
              <div className="text-neutral-50 text-xl mr-2 my-2 text-neutral-50 font-normal">
                447 Токенов
              </div>
              <div className="text-neutral-50 text-xl font-norlam text-neutral-50">
                8 Сетей
              </div>
            </div>
            <div className="text-neutral-50">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-neutral-50 text-xl my-2 text-neutral-50 font-normal">
                    Популярные токены за
                  </div>
                  <div className="flex items-center gap-2 p-1 border  border-neutral-800 rounded-full">
                    <button className={getButtonClass(0, 3)}>24ч</button>
                    <button className={getButtonClass(1, 3)}>7д</button>
                    <button className={getButtonClass(2, 3)}>30д</button>
                  </div>
                </div>
                <CryptoTable data={tableData} />{" "}
                {/* Используйте компонент CryptoTable */}
              </div>
            </div>
            <div className="flex items-center">
              <Button className="mt-4 mr-2">Все токены</Button>
              <Button className="mt-4">Подключить кошелек</Button>
            </div>
          </div>
          {/* Карточка 2 */}
          <div className="px-4 py-10   rounded-3xl relative  border-gray-800">
            {/* содержимое карточки */}
            <h3 className="mt-2">
              Станьте первыми получателями токенов со скидкой
            </h3>
            <div className="relative flex items-center justify-between mt-4">
              <div className="flex flex-col items-center">
                <span className="mb-2">1. Внесите криптовалюту</span>
                <div className="h-2 w-2 bg-lime-400 rounded-full absolute -bottom-1  transform -translate-x-1/2" />
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-2">2. Выберите токен</span>
                <div className="h-2 w-2 bg-lime-400 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2" />
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-2">3. Обменяйте токен</span>
                <div className="h-2 w-2 bg-lime-400 rounded-full absolute -bottom-1  transform -translate-x-1/2" />
              </div>
              <div className="h-[1px] w-full bg-lime-400 absolute bottom-0 left-0"></div>
            </div>
            <div className="flex items-center">
              <div className="text-neutral-50 text-xl mr-2 my-2 text-neutral-50 font-normal">
                $684.9K Всего собрано
              </div>
              <div className="text-neutral-50 text-xl font-norlam text-neutral-50">
                442.74K Всего участников
              </div>
            </div>
            <div className="text-neutral-50">
              <div className="flex flex-col">
                <span>Популярные токены за сегодня</span>
                <div>
                  <div className="flex">
                    <BtcIcon className="size-6" />
                    <UsdtIcon className="size-6" />
                  </div>
                  <p>BTC/USDT</p>
                  <p>Etherium</p>
                </div>
              </div>
            </div>
            <div></div>
            <Button className="mt-4">Подключить кошелек</Button>
          </div>
          {/* Карточка 3 */}
          <div className="px-4 py-10   rounded-3xl relative  border-gray-800">
            {/* содержимое карточки */}
            <h3 className="mt-2">Обменивайте криптовалюту легко</h3>
            <div className="relative flex items-center justify-between mt-4">
              <div className="flex flex-col items-center">
                <span className="mb-2">1. Внесите криптовалюту</span>
                <div className="h-2 w-2 bg-lime-400 rounded-full absolute -bottom-1  transform -translate-x-1/2" />
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-2">2. Выберите токен</span>
                <div className="h-2 w-2 bg-lime-400 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2" />
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-2">3. Обменяйте токен</span>
                <div className="h-2 w-2 bg-lime-400 rounded-full absolute -bottom-1  transform -translate-x-1/2" />
              </div>
              <div className="h-[1px] w-full bg-lime-400 absolute bottom-0 left-0"></div>
            </div>
            <div className="flex items-center">
              <div className="text-neutral-50 text-xl mr-2 my-2 text-neutral-50 font-normal">
                447 Токенов
              </div>
              <div className="text-neutral-50 text-xl font-norlam text-neutral-50">
                8 Сетей
              </div>
            </div>
            <div className="text-neutral-50">
              Популярные токены за сегодня
              <BtcIcon className="size-4" />
              <UsdtIcon className="size-4" />
            </div>
            <div></div>
            <Button className="mt-4">Подключить кошелек</Button>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default PromoBanner;
