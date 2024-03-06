// MainPage.tsx
import React, { useState } from "react";
import HeroSection from "../components/MainPage/HeroSection";
import PromoBanner from "../components/MainPage/PromoBanner";

const ETH = require("../img/coins/ETH.png");
const ETHgray = require("../img/coins/ETHgray.png");
const USDC = require("../img/coins/USDC.png");

const MainPage = () => {
  return (
    <div className="my-8 py-8">
      <HeroSection />
      <PromoBanner />
    </div>
  );
};

export default MainPage;
