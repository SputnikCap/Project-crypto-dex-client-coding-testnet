// MainPage.tsx
import React, { useState } from "react";
import LaunchHomeBanner from "../components/LaunchPage/LaunchHomeBanner";
import LaunchActiveBanner from "../components/LaunchPage/LaunchActiveBanner";
const LaunchPage = () => {
  return (
    <div>
      <LaunchHomeBanner />
      <LaunchActiveBanner />
    </div>
  );
};

export default LaunchPage;
