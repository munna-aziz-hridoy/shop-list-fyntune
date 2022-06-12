import { combineReducers } from "redux";
import { shopReducer } from "./shopReducer";

export const reducers = combineReducers({
  allShops: shopReducer,
});
