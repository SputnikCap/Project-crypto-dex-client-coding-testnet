// DisconnectWallet.tsx
import React from "react";

export type SetStateString = React.Dispatch<React.SetStateAction<string>>;
export type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

const disconnectWallet = (
  setWalletAddress: SetStateString,
  setStatus: SetStateString,
  setIsDropdownOpen: SetStateBoolean
) => {
  setWalletAddress("");
  setStatus("Кошелек отключен");
  setIsDropdownOpen(false);
};

export default disconnectWallet;
