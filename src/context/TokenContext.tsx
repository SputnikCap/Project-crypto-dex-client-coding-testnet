// TokenContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface TokenPriceResponse {
  [key: string]: {
    usd: number;
  };
}

interface TokenDataContext {
  fromToken: string;
  toToken: string;
  fromTokenPrice: number | null;
  toTokenPrice: number | null;
  timePeriod: string;
  priceData: {
    [key: string]: number | null;
  };
  availableTokens: string[];
  availableTimePeriods: string[];
}

interface TokenContextType {
  tokenData: TokenDataContext;
  setTokenData: React.Dispatch<React.SetStateAction<TokenDataContext>>;
}

const TokenContext = createContext<TokenContextType | null>(null);

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
};

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokenData, setTokenData] = useState<TokenDataContext>({
    fromToken: "ETH",
    toToken: "USDT",
    fromTokenPrice: null,
    toTokenPrice: null,
    timePeriod: "24h",
    priceData: {},
    availableTokens: [
      "ethereum",
      "bitcoin",
      "tether",
      "usd-coin",
      "uniswap",
      "chainlink",
      "matic-network",
      "binancecoin",
    ],
    availableTimePeriods: ["24h", "7d", "30d"],
  });

  const fetchTokenPrices = async (fromToken: string, toToken: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/token-price`,
        {
          params: {
            tokenIds: `${fromToken},${toToken}`,
            vsCurrencies: "usd",
          },
        }
      );
      console.log(response.data);
      // Check if the data for both tokens exists
      const fromTokenData = response.data[fromToken];
      const toTokenData = response.data[toToken];

      if (!fromTokenData || !toTokenData) {
        console.error("Token data is missing in the response", response.data);
        return;
      }

      const fromPrice = fromTokenData.usd ?? null;
      const toPrice = toTokenData.usd ?? null;
      setTokenData((prevData) => ({
        ...prevData,
        fromTokenPrice: fromPrice,
        toTokenPrice: toPrice,
      }));
    } catch (error) {
      console.error("Error fetching token data:", error);
    }
  };

  // useEffect to trigger token price fetch when tokens change
  useEffect(() => {
    fetchTokenPrices(tokenData.fromToken, tokenData.toToken);
  }, [tokenData.fromToken, tokenData.toToken]);
  const value = {
    tokenData,
    setTokenData,
  };

  return (
    <TokenContext.Provider value={{ tokenData, setTokenData }}>
      {children}
    </TokenContext.Provider>
  );
};
