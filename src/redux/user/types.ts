import { Food } from "../categories/types";

export interface UserDataSchema {
  deliveryList: Food[];
  userHistory: [];
  isLoading: boolean;
  totalPrice: number;
  totalQuantity: number;
  error?: string;
  activeCategory?: string;
  discount: number;
  address: string;
  deliveryData?: { time: string; distance: string };
}
