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

export interface UserDataSchema {
  deliveryList: Food[];
  userHistory: Order[];
  isLoading: boolean;
  totalPrice: number;
  totalQuantity: number;
  error?: string;
  activeCategory?: string;
  discount: number;
  address: string;
  deliveryData?: { time: string; distance: string };
}
