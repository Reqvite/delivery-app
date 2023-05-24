import { createSlice } from '@reduxjs/toolkit';
import { getCategories, getCategoryFood } from './operations';
import { CategoriesSchema } from './types';

const initialState: CategoriesSchema = {
    listOfCategories: [],
    listOfFood: [],
    isLoading: false,

};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listOfCategories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getCategoryFood.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getCategoryFood.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listOfFood = action.payload
            })
            .addCase(getCategoryFood.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: categoriesReducer } = categoriesSlice;