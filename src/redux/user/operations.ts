import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "~/shared/config/axiosConfig/axiosConfig";
import { Food } from "../categories/types";

interface Order {
    name: string,
    email: string,
    phone: string,
    address: string
    foodList: Food[]
}

export const addUserOrder = createAsyncThunk(
    'user/addUserOrder',
    async (order: Order, thunkAPI) => {
        try {
            const response = await instance.post(`api/user/order`, order);
            if (!response.data) {
                throw new Error();
            }
            return response.data.order;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    },
);