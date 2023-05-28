import { createSlice } from "@reduxjs/toolkit";

import { getCategories, getCategoryFood, getFoodCoupons } from "./operations";
import { CategoriesSchema } from "./types";

const initialState: CategoriesSchema = {
  listOfCategories: [],
  listOfFood: [],
  coupons: [],
  isLoading: false,
  pageIsLoading: true,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.pageIsLoading = false;
        state.listOfCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.pageIsLoading = false;
        state.error = action.payload;
      })
      .addCase(getCategoryFood.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getCategoryFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listOfFood = action.payload;
      })
      .addCase(getCategoryFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getFoodCoupons.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getFoodCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = action.payload;
      })
      .addCase(getFoodCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: categoriesReducer } = categoriesSlice;
