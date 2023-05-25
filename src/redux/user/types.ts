import { Food } from "../categories/types";


export interface UserDataSchema {
    deliveryList: Food[];
    isLoading: boolean;
    totalPrice: number;
    error?: unknown;
    activeCategory?: string;
    address: string;
}
