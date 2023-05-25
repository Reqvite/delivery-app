import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '~/shared/config/axiosConfig/axiosConfig';

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get("api/categories/");

            if (!response.data) {
                throw new Error();
            }

            return response.data.categories;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    },
);

export const getCategoryFood = createAsyncThunk(
    'categories/getCategoryFood',
    async (categoryName: string, thunkAPI) => {
        try {
            const response = await instance.get(`api/categories/category?name=${categoryName}`);
            if (!response.data) {
                throw new Error();
            }
            return response.data.food;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e);
        }
    },
);