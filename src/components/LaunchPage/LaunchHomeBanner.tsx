import React from "react";
import ButtonBanner from "../ButtonBanner";
const HomeBannerJpg = require("../../img/HomeBanner.jpg");

const LaunchHomeBanner = () => {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between py-16	">
        <div className="">
          <h3 className="pb-4">DEX Launchpad</h3>
          <p className="pb-4">
            Познакомьтесь с широким спектром DApp в различных блокчейн-сетях с
            помощью Cryptopedia. Получайте потрясающие вознаграждения и
            поощрения, знакомясь с новейшими децентрализованными технологиями.
          </p>
        </div>
        <div className="">
          <img className="min-w-96 min-h-96" src={HomeBannerJpg} />
        </div>
      </div>
    </div>
  );
};

export default LaunchHomeBanner;
