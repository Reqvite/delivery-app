import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import i18n from "~/shared/config/i18n/i18n";

import {
  addUserOrder,
  getUserDiscount,
  getUserHistory,
} from "./asyncOperations";
import {
  addFoodToList,
  addQuantity,
  clearState,
  deleteFoodFromList,
  emptyCart,
  removeQuantity,
  setActiveCategory,
  setAddress,
  setDelivaeryData,
  setRepeatOrder,
  updateQuantityFromInput,
} from "./operations";
import { UserDataSchema } from "./types";

const initialState: UserDataSchema = {
  deliveryList: [],
  userHistory: [],
  isLoading: false,
  totalPrice: 0,
  totalQuantity: 0,
  discount: 0,
  activeCategory: "",
  address: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDelivaeryData,
    setActiveCategory,
    addFoodToList,
    deleteFoodFromList,
    addQuantity,
    removeQuantity,
    updateQuantityFromInput,
    emptyCart,
    setAddress,
    setRepeatOrder,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserOrder.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(addUserOrder.fulfilled, (state) => {
        clearState(state);
        state.isLoading = false;
        toast.success(
          `${i18n.t('Thank you for your order')}.`
        );
      })
      .addCase(addUserOrder.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUserHistory.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getUserHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userHistory = action.payload;
      })
      .addCase(getUserHistory.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUserDiscount.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getUserDiscount.fulfilled, (state, action) => {
        state.discount = action.payload;
        const discount = (state.totalPrice * action.payload) / 100;
        state.totalPrice = state.totalPrice - discount;
        toast.success(`${i18n.t('Coupon successfully applied')}.`);
      })
      .addCase(getUserDiscount.rejected, (state, action: any) => {
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
