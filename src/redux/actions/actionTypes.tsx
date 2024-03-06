// Этот файл нужен для определения констант типов действий и интерфейсов для действий
export const CONNECT_WALLET = "CONNECT_WALLET";
export const DISCONNECT_WALLET = "DISCONNECT_WALLET";
export const UPDATE_WALLET_ADDRESS = "UPDATE_WALLET_ADDRESS";
export const SET_CURRENT_NETWORK = "SET_CURRENT_NETWORK";
export interface ConnectWalletAction {
  type: typeof CONNECT_WALLET;
  payload: string;
}

export interface DisconnectWalletAction {
  type: typeof DISCONNECT_WALLET;
}

export interface UpdateWalletAddressAction {
  type: typeof UPDATE_WALLET_ADDRESS;
  payload: string;
}

export type WalletAction =
  | ConnectWalletAction
  | DisconnectWalletAction
  | UpdateWalletAddressAction;
