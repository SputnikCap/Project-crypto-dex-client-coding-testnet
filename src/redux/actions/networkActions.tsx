// actions/networkActions.js
import { createAction } from "@reduxjs/toolkit";
import { SET_CURRENT_NETWORK } from "./actionTypes";

export const setCurrentNetwork = createAction<string>(SET_CURRENT_NETWORK);
