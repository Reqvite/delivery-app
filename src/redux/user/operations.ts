import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "~/shared/config/axiosConfig/axiosConfig";

export const addUserOrder = createAsyncThunk(
    'user/addUserOrder',
    async (order, thunkAPI) => {
        try {
            const response = await instance.post(`api/user/order`, order);
            if (!response.data) {
                throw new Error();
            }
            console.log(response.data)
            return response.data.order;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    },
);