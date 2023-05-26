import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { UserDataSchema } from "./types";

import { Food } from "../categories/types";
import { MAX_QUANTITY } from "~/shared/const/const";
import { calculateTotalSummary } from "~/shared/lib/calculateTotalSummary";

const calculateQuantity = (existingFood: Food) => {
  if (existingFood.quantity) {
    existingFood.quantity += 1;
    existingFood.totalPrice = existingFood.price * existingFood.quantity;
  }
};

const checkDiscount = (discount: number) => {
  if (discount !== 0) {
    toast.error(
      "You have already applied a coupon, complete your purchase, or empty your shopping cart to create a new order."
    );
    return true;
  }
};

export const clearState = (state: UserDataSchema) => {
  state.deliveryList = [];
  state.totalPrice = 0;
  state.totalQuantity = 0;
  state.activeCategory = "";
  state.address = "";
  state.discount = 0;
};

export const addFoodToList = (
  state: UserDataSchema,
  action: PayloadAction<Food>
) => {
  if (checkDiscount(state.discount)) {
    return;
  }

  const [existingFood] = state.deliveryList.filter(
    (item) => item._id === action.payload._id
  );

  if (existingFood) {
    if (existingFood.quantity! >= MAX_QUANTITY) {
      toast.error(`You cannot add a quantity greater than ${MAX_QUANTITY}.`);
      return;
    }
    calculateQuantity(existingFood);
  } else {
    const updatedProduct = {
      quantity: 1,
      totalPrice: action.payload.price,
      ...action.payload,
    };
    state.deliveryList.push(updatedProduct);
  }

  const { totalPrice, totalQuantity } = calculateTotalSummary(
    state.deliveryList
  );
  state.totalPrice = totalPrice;
  state.totalQuantity = totalQuantity;
  toast.success(`${action.payload?.title} added to cart.`);
};

export const deleteFoodFromList = (
  state: UserDataSchema,
  action: PayloadAction<string>
) => {
  if (checkDiscount(state.discount)) {
    return;
  }
  const idx = state.deliveryList.findIndex(
    (food) => food._id === action.payload
  );
  state.deliveryList.splice(idx, 1);
  const { totalPrice, totalQuantity } = calculateTotalSummary(
    state.deliveryList
  );
  state.totalPrice = totalPrice;
  state.totalQuantity = totalQuantity;
};

export const addQuantity = (
  state: UserDataSchema,
  action: PayloadAction<string>
) => {
  if (checkDiscount(state.discount)) {
    return;
  }
  const [existingFood] = state.deliveryList.filter(
    (item) => item._id === action.payload
  );

  if (existingFood.quantity) {
    if (existingFood.quantity >= MAX_QUANTITY) {
      return;
    }
  }

  calculateQuantity(existingFood);
  const { totalPrice, totalQuantity } = calculateTotalSummary(
    state.deliveryList
  );
  state.totalPrice = totalPrice;
  state.totalQuantity = totalQuantity;
};

export const removeQuantity = (
  state: UserDataSchema,
  action: PayloadAction<string>
) => {
  if (checkDiscount(state.discount)) {
    return;
  }
  const [existingFood] = state.deliveryList.filter(
    (item) => item._id === action.payload
  );

  if (existingFood.quantity === 1) {
    return;
  }

  if (existingFood.quantity) {
    existingFood.quantity -= 1;
    existingFood.totalPrice = existingFood.price * existingFood.quantity;
  }

  const { totalPrice, totalQuantity } = calculateTotalSummary(
    state.deliveryList
  );
  state.totalPrice = totalPrice;
  state.totalQuantity = totalQuantity;
};

export const updateQuantityFromInput = (
  state: UserDataSchema,
  action: PayloadAction<{ _id: string; quantity: number }>
) => {
  if (checkDiscount(state.discount)) {
    return;
  }
  const [existingFood] = state.deliveryList.filter(
    (item) => item._id === action.payload._id
  );

  if (existingFood.quantity) {
    existingFood.quantity = action.payload.quantity;
    existingFood.totalPrice = existingFood.price * existingFood.quantity;
  }

  const { totalPrice, totalQuantity } = calculateTotalSummary(
    state.deliveryList
  );
  state.totalPrice = totalPrice;
  state.totalQuantity = totalQuantity;
};
