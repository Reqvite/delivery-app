import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "~/shared/config/axiosConfig/axiosConfig";

import { Food } from "../categories/types";

export interface Order {
  name: string;
  email: string;
  phone: string;
  address: string;
  foodList: Food[];
  totalPrice: number;
  discount: number;
}

export const addUserOrder = createAsyncThunk(
  "user/addUserOrder",
  async (order: Order, thunkAPI) => {
    try {
      const response: any = await instance.post(`api/user/order`, order);

      window.location.replace(
        `https://www.liqpay.ua/api/3/checkout?data=${response.data.liqPaySignature.data}&signature=${response.data.liqPaySignature.signature}`
      );
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
