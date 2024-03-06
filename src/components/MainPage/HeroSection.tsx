import React from "react";
import ButtonBanner from "../ButtonBanner";
const HeroSectionImage = require("../../img/HeroSectionImage.png");

const HeroSection = () => {
  return (
    <div className="relative w-full">
      <div className="flex items-center flex-row  	">
        <div className="flex-1">
          <h1 className="pb-4 text-neutral-50">Торгуйте на шаг впереди</h1>
          <p className="pb-4">
            Раскройте потенциал Web3 и расширяйте свои возможности с помощью
            надёжной экосистемы
          </p>
          <ButtonBanner className=" ">Кнопка действия</ButtonBanner>
        </div>
        <div className="flex-1">
          <img className="min-w-96 min-h-96" src={HeroSectionImage} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
