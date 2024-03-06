import React, { useState } from "react";
import CryptoChart from "./CryptoChart";
import SwapHeader from "./SwapHeader";

const SwapChart: React.FC = () => {
  const selectedToken = "eth";
  const [timePeriod, setTimePeriod] = useState("24h");
  return (
    <div className="flex flex-col bg-neutral-900 rounded-3xl py-6 px-4">
      <SwapHeader />
      <div className="justify-end my-0 flex items-center">
        <div className="flex justify-center p-1 border border-neutral-100 rounded-3xl space-x-4">
          {/* Обработчики для изменения timePeriod */}
          <button
            onClick={() => setTimePeriod("24h")}
            className="text-neutral-950 text-sm px-2 py-1 bg-neutral-50 rounded-3xl"
          >
            24ч
          </button>
          <button
            onClick={() => setTimePeriod("7d")}
            className="text-neutral-50 text-sm px-2 py-1 "
          >
            7д
          </button>
          <button
            onClick={() => setTimePeriod("30d")}
            className="text-neutral-50 text-sm px-2 py-1 "
          >
            30д
          </button>
        </div>
      </div>
      <div className="mt-5 min-h-80	relative">
        <div className="w-full h-80">
          <div className="w-full h-80 select-none relative">
            <div className="relative h-80 p-0 w-full m-0">
              <CryptoChart
                selectedTokenId={selectedToken}
                timePeriod={timePeriod}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default SwapChart;
