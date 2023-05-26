import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { UserDataSchema } from "./types";
import { Food } from "../categories/types";
import {
  addUserOrder,
  getUserDiscount,
  getUserHistory,
} from "./asyncOperations";
import { calculateTotalSummary } from "~/shared/lib/calculateTotalSummary";
import {
  addFoodToList,
  deleteFoodFromList,
  addQuantity,
  removeQuantity,
  updateQuantityFromInput,
  clearState,
} from "./operations";

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
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    addFoodToList,
    deleteFoodFromList,
    addQuantity,
    removeQuantity,
    updateQuantityFromInput,
    emptyCart: (state) => {
      clearState(state);
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setRepeatOrder: (state, action: PayloadAction<Food[]>) => {
      clearState(state);
      state.deliveryList = action.payload;
      const { totalPrice, totalQuantity } = calculateTotalSummary(
        state.deliveryList
      );
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
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
          `Thank you for your order, our manager will contact you soon.`
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
        toast.success(`Coupon successfully applied.`);
      })
      .addCase(getUserDiscount.rejected, (state, action: any) => {
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
