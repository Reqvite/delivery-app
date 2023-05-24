import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDataSchema } from './types';
import { Food } from '../categories/types';
import { toast } from 'react-hot-toast';
import { addUserOrder } from './operations';

const calculateTotalPrice = (deliveryList: Food[]) => {
    return deliveryList.reduce((total, food) => {
        const price = total + (food.price * food.quantity!)
        return price;
    }, 0);
};

const initialState: UserDataSchema = {
    deliveryList: [],
    isLoading: false,
    totalPrice: 0,
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
            state.totalPrice = calculateTotalPrice(state.deliveryList);
            toast.success(`${action.payload?.title} added to cart.`);
        },
        deleteFoodFromList: (state, action: PayloadAction<string>) => {
            const idx = state.deliveryList.findIndex(food => food._id === action.payload)
            state.deliveryList.splice(idx, 1)
            state.totalPrice = calculateTotalPrice(state.deliveryList);
        },
        addQuantity: (state, action: PayloadAction<string>) => {
            const [existingFood] = state.deliveryList.filter((item) => item._id === action.payload);
            if (existingFood.quantity) {
                existingFood.quantity += 1;
                existingFood.totalPrice = existingFood.price * existingFood.quantity;
            }
            state.totalPrice = calculateTotalPrice(state.deliveryList);
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
            state.totalPrice = calculateTotalPrice(state.deliveryList);
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
            state.totalPrice = calculateTotalPrice(state.deliveryList);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUserOrder.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addUserOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(`Thank you for your order, our manager will contact you soon.`);
            })
            .addCase(addUserOrder.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;