import { ActionTypes } from "../constants/actions-types";

export const setShop = (shops) => {
  return {
    type: ActionTypes.SET_SHOP,
    payload: shops,
  };
};
