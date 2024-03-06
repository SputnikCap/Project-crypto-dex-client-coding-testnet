import { ChevronDown } from "lucide-react";
const ETH = require("src/img/coins/ETH.png");
const ETHgray = require("src/img/coins/ETHgray.png");
const USDC = require("src/img/coins/USDC.png");

const SwapRoute = () => {
  return (
    <div className="my-10 py-10 block bg-neutral-900 px-6 rounded-3xl">
      <h2 className="text-xl font-bold mb-2 text-neutral-50">
        Торговый маршрут
      </h2>
      <p className="text-sm font-normal mb-2 text-gray-300 ">
        X Routing находит лучшего поставщика ликвидности LP и лучший маршрут,
        который уменьшает проскальзывание и сетевые комиссии на сотнях
        децентрализованных бирж (DEX), чтобы предложить вам лучшие обменные
        курсы. Это позволяет мгновенно обменивать криптовалюту в нашем понятном
        и продвинутом агрегаторе мостов и DEX по лучшим ценам в более чем 20
        сетях и 400 DEX, а также с помощью более 20 кроссчейн-мостов.{" "}
        <span className="select-none pointer text-blue-500 ">
          <span className="select-none pointer text-blue-500">Подробнее</span>
          <ChevronDown className="text-xs w-4 h-4 inline-block ml-1 -rotate-90" />
        </span>
      </p>
      <div className="relative z-10 my-2">
        <div className="h-9 transition-all">
          <div className="flex items-center justify-between relative">
            <div className="h-9 w-9 flex relative">
              <div className="h-9 w-9 absolute top-0 z-10 left-0 shadow-inner file:border-solid">
                <img src={ETH} />
              </div>
              <div className="h-4 w-4 absolute z-20 flex rounded-full bg-gray-200 -bottom-2 -right-2">
                <img src={ETHgray} />
              </div>
            </div>
            <div className="flex-1 ">
              <div className="pt-0 relative">
                <div className="pl-24 pr-5 ">
                  <div className="w-16 left-4 flex items-center jystify-between absolute translate-y-2.5">
                    <div className="flex items-center">
                      <div className="text-base font-medium px-1 text-neutral-50">
                        100
                      </div>
                      <div className="text-base font-medium px-1 text-neutral-50">
                        %
                      </div>
                    </div>
                    <div className=" flex items-center justify-center w-4 h-4">
                      <ChevronDown className="stroke-neutral-50 size-4 ml-1 -rotate-90" />
                    </div>
                  </div>
                  <div className="flex items center flex-row justify-between">
                    <div className="z-10 min-h-12 flex-1 px-2.5	py-3">
                      <div className="mb-3 flex items-center flex-row justify-start">
                        <div className="w-4 h-4">
                          <img src={USDC} />
                        </div>
                        <div className="flex-1 ml-2 font-medium text-neutral-50 text-sm">
                          USDC
                        </div>
                      </div>
                      <div className="mb-0 justify-between items-center flex">
                        <a className="text-neutral-50">
                          Uniswap V3 - 0.05% Pool
                        </a>
                        <div className="flex items-center">
                          <div className="text-base font-medium px-1 text-neutral-50">
                            100
                          </div>
                          <div className="text-base font-medium px-1 text-neutral-50">
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex relative h-9 w-9">
              <div className="h-9 w-9 absolute top-0 z-10 left-0 shadow-inner  file:border-solid">
                <img src={USDC} />
              </div>
              <div className="h-4 w-4 absolute z-20 flex rounded-full bg-gray-200 -bottom-2 -right-2">
                <img src={ETHgray} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapRoute;
