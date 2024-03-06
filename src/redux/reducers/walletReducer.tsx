// Используйте createReducer для определения редьюсера
import { createReducer } from "@reduxjs/toolkit";
import {
  connectWallet,
  disconnectWallet,
  updateWalletAddress,
} from "../actions/walletActions";

export interface WalletState {
  walletAddress: string | null;
}

const initialState: WalletState = {
  walletAddress: null,
};

export const walletReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(connectWallet, (state, action) => {
      state.walletAddress = action.payload;
    })
    .addCase(disconnectWallet, (state) => {
      state.walletAddress = null;
    })
    .addCase(updateWalletAddress, (state, action) => {
      state.walletAddress = action.payload;
    });
});
