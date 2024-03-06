import React from "react";
import Button from "../Button";
import { ChevronDown } from "lucide-react";
const HomeBannerJpg = require("../../img/HomeBanner.jpg");

const LaunchActiveBanner = () => {
  return (
    <div className="relative w-full">
      <div className="my-16">
        <p className="mb-4">Активные 🔥 </p>
        <div className="pointer relative mb-8 p-4 border border-gray-800">
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="bg-green-400 text-xl font-medium rounded-xl p-2 m-2 ">
                  Сезон 1
                </div>
              </div>
              <ChevronDown className="fill-green-400 stroke-green-400" />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <img></img>
                </div>
                <div>
                  <div className="text-gray-50">Polyhedra</div>
                  <div className="text-gray-50">
                    Играйте в игры и получайте награды из фонда в $600 тыс.
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchActiveBanner;
