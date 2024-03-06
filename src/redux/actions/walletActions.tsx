// Используйте createAction для определения действий
import { createAction } from "@reduxjs/toolkit";
import {
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  UPDATE_WALLET_ADDRESS,
} from "./actionTypes";

export const connectWallet = createAction<string>(CONNECT_WALLET);
export const disconnectWallet = createAction("DISCONNECT_WALLET");
export const updateWalletAddress = createAction<string>(UPDATE_WALLET_ADDRESS);
