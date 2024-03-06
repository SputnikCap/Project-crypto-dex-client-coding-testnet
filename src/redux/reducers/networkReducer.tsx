// reducers/networkReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { setCurrentNetwork } from "../actions/networkActions";

export interface NetworkState {
  currentNetwork: string | null;
}

const initialState: NetworkState = {
  currentNetwork: null,
};

export const networkReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCurrentNetwork, (state, action) => {
    state.currentNetwork = action.payload;
  });
});
