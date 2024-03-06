import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { walletReducer } from "./reducers/walletReducer";
import { networkReducer } from "./reducers/networkReducer";
const rootReducer = combineReducers({
  wallet: walletReducer,
  network: networkReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
