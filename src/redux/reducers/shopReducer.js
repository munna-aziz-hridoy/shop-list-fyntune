import { ActionTypes } from "../constants/actions-types";

const initialState = {
  shops: [],
};

export const shopReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SHOP:
      return { ...state, shops: payload };
    default:
      return state;
  }
};
