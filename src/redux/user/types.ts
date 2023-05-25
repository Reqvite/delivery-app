import { Food } from "../categories/types";

export interface UserDataSchema {
  deliveryList: Food[];
  userHistory: [];
  isLoading: boolean;
  totalPrice: number;
  error?: unknown;
  activeCategory?: string;
  address: string;
}
