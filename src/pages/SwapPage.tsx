// SwapPage.tsx
import React from "react";
import SwapRoute from "../components/SwapPage/SwapRoute";
import SwapChart from "../components/SwapPage/SwapChart";
import SwapForm from "../components/SwapPage/SwapForm";

const SwapPage = () => {
  return (
    <div className="w-full my-8 py-8">
      <div className="flex flex-wrap flex-row">
        <div className="box-border px-3 pt-8 w-7/12 ">
          <SwapChart />
          <SwapRoute />
        </div>
        <div className="top-16 h-[calc(100vh-64px)] items-end sticky z-10 box-border px-3 w-5/12 flex flex-col py-8">
          <SwapForm />
        </div>
      </div>
    </div>
  );
};

export default SwapPage;
