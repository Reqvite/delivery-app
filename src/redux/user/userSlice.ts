import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataSchema } from "./types";
import { Food } from "../categories/types";
import { toast } from "react-hot-toast";
import { addUserOrder, getUserDiscount, getUserHistory } from "./operations";
import { calculateTotalSummary } from "~/shared/lib/calculateTotalSummary";
import { MAX_QUANTITY } from "~/shared/const/const";

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

const clearState = (state: UserDataSchema) => {
  state.deliveryList = [];
  state.totalPrice = 0;
  state.totalQuantity = 0;
  state.activeCategory = "";
  state.address = "";
  state.discount = 0;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    addFoodToList: (state, action: PayloadAction<Food>) => {
      if (checkDiscount(state.discount)) {
        return;
      }
      const [existingFood] = state.deliveryList.filter(
        (item) => item._id === action.payload._id
      );

      if (existingFood) {
        if (existingFood.quantity! >= MAX_QUANTITY) {
          toast.error(
            `You cannot add a quantity greater than ${MAX_QUANTITY}.`
          );
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
    },
    deleteFoodFromList: (state, action: PayloadAction<string>) => {
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
    },
    addQuantity: (state, action: PayloadAction<string>) => {
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
    },
    removeQuantity: (state, action: PayloadAction<string>) => {
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
    },
    updateQuantityFromInput: (
      state,
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
    },
    emptyCart: (state) => {
      clearState(state);
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setRepeatOerder: (state, action: PayloadAction<Food[]>) => {
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
