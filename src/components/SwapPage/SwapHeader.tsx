// SwapHeader.tsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
const ETH = require("src/img/coins/ETH.png");
const ETHgray = require("src/img/coins/ETHgray.png");
const USDC = require("src/img/coins/USDC.png");

const SwapHeader = () => {
  return (
    <div className="mt-0 mb-5 h-9 flex flex-col">
      <div className=" flex items-center justify-start">
        <div className="h-9 w-9 flex relative">
          <div className="h-9 w-9 absolute top-0 z-10 left-0 shadow-inner  file:border-solid">
            <img src={ETH} />
          </div>
          <div className="h-4 w-4 absolute z-20 flex rounded-full bg-gray-200 -bottom-2 -right-2">
            <img src={ETHgray} />
          </div>
        </div>
        <div className="h-9 -ml-2 z-20">
          <div className="h-9 w-9 flex relative">
            <div className="h-9 w-9 absolute top-0 z-10 left-0 shadow-inner  file:border-solid">
              <img src={USDC} />
            </div>
            <div className="h-4 w-4 absolute z-20 flex rounded-full  bg-gray-200 -bottom-2 -right-2">
              <img src={ETHgray} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="inline-block relative box-border">
            <div className="box-border pointer flex justify-start">
              <span>
                <h1 className="text-3xl h-9 ml-4 mr-2 font-bold">ETH/USDC</h1>
              </span>
              <i className="flex items-center mr-0">
                <ChevronDown className="stroke-neutral-50" />
              </i>
            </div>
          </div>
        </div>
      </div>
      <div className="h-10 justify-between py-2 relative">
        <div className="flex ">
          <p className="font-bold text-3xl">2 245,251861</p>
          <div className="top-0">
            <div className="flex items-center jystify-center text-green-500">
              <span className="text-lg text-green-500">+</span>
              <span className="text-lg text-green-500">1,72 %</span>
            </div>
          </div>
        </div>
        <div className="h-10 pointer flex items-center justify-start"></div>
      </div>
    </div>
  );
};

export default SwapHeader;
