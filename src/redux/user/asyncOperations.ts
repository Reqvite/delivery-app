import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "~/shared/config/axiosConfig/axiosConfig";
import { Food } from "../categories/types";

interface Order {
  name: string;
  email: string;
  phone: string;
  address: string;
  foodList: Food[];
}

export const addUserOrder = createAsyncThunk(
  "user/addUserOrder",
  async (order: Order, thunkAPI) => {
    try {
      const response = await instance.post(`api/user/order`, order);
      return response.data.order;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const getUserHistory = createAsyncThunk(
  "user/getUserHistory",
  async (searchValue: string, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/user/?searchValue=${searchValue}`
      );
      return response.data.orders;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const getUserDiscount = createAsyncThunk(
  "user/getUserDiscount",
  async (discount: string, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/user/discount?title=${discount}`
      );
      return response.data.discount;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
