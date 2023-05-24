import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDataSchema } from './types';
import { Food } from '../categories/types';
import { toast } from 'react-hot-toast';


const initialState: UserDataSchema = {
    deliveryList: [],

};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addFoodToList: (state, action: PayloadAction<Food>) => {
            const [existingFood] = state.deliveryList.filter((item) => item._id === action.payload._id);

            if (existingFood) {
                if (existingFood.quantity) {
                    existingFood.quantity += 1;
                    existingFood.totalPrice = existingFood.price * existingFood.quantity;
                }
            } else {
                const updatedProduct = { quantity: 1, totalPrice: action.payload.price, ...action.payload }
                state.deliveryList.push(updatedProduct);
            }
            toast.success(`${action.payload?.title} added to cart.`);
        },
        deleteFoodFromList: (state, action: PayloadAction<string>) => {
            const idx = state.deliveryList.findIndex(food => food._id === action.payload)
            state.deliveryList.splice(idx, 1)
        },
        addQuantity: (state, action: PayloadAction<string>) => {
            const [existingFood] = state.deliveryList.filter((item) => item._id === action.payload);
            if (existingFood.quantity) {
                existingFood.quantity += 1;
                existingFood.totalPrice = existingFood.price * existingFood.quantity;
            }
        },
        removeQuantity: (state, action: PayloadAction<string>) => {
            const [existingFood] = state.deliveryList.filter((item) => item._id === action.payload);
            if (existingFood.quantity === 1) {
                return;
            }
            if (existingFood.quantity) {
                existingFood.quantity -= 1;
                existingFood.totalPrice = existingFood.price * existingFood.quantity;
            }
        },
        updateQuantityFromInput: (state, action: PayloadAction<{ _id: string, quantity: number }>) => {
            const [existingFood] = state.deliveryList.filter((item) => item._id === action.payload._id);

            if (existingFood.quantity) {
                if (action.payload.quantity === 0) {
                    existingFood.quantity = 1
                } else {
                    existingFood.quantity = action.payload.quantity
                }
                existingFood.totalPrice = existingFood.price * existingFood.quantity;
            }
        },
        // extraReducers: (builder) => {
        //     builder
        //         .addCase(loginByUsername.pending, (state) => {
        //             state.error = undefined;
        //             state.isLoading = true;
        //         })
        //         .addCase(loginByUsername.fulfilled, (state, action) => {
        //             state.isLoading = false;
        //         })
        //         .addCase(loginByUsername.rejected, (state, action) => {
        //             state.isLoading = false;
        //             state.error = action.payload;
        //         });
        // },
    }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;