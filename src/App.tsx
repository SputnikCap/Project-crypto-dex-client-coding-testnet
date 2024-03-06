// App.tsx
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import SwapPage from "./pages/SwapPage";
import MainPage from "./pages/MainPage";
import LaunchPage from "./pages/LaunchPage";
import Footer from "./components/footer/Footer";
import { connect } from "react-redux";
import { connectWallet as reduxConnectWallet } from "./redux/actions/walletActions";
import { TokenProvider } from "./context/TokenContext";

interface AppProps {
  connectWallet: (address: string) => void;
}
const App: React.FC<AppProps> = ({ connectWallet }) => {
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      connectWallet(savedWalletAddress);
    }
  }, [connectWallet]);
  return (
    <TokenProvider>
      <Router>
        <div className="bg-neutral-950">
          <Header />
          <div className="px-[calc(50%-640px)]">
            <Routes>
              <Route path="/swap" element={<SwapPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/Launch" element={<LaunchPage />} />
              {/* Определите другие маршруты по необходимости */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </TokenProvider>
  );
};

const mapDispatchToProps = {
  connectWallet: reduxConnectWallet,
};

export default connect(null, mapDispatchToProps)(App);
