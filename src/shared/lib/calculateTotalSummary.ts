import { Food } from "~/redux/categories/types";

export interface TotalSummary {
  totalPrice: number;
  totalQuantity: number;
}

export const calculateTotalSummary = (deliveryList: Food[]): TotalSummary => {
  const totalSummary: TotalSummary = {
    totalPrice: 0,
    totalQuantity: 0,
  };

  deliveryList.forEach((food) => {
    const price = food.price * food.quantity!;
    totalSummary.totalPrice += price;
    totalSummary.totalQuantity += food.quantity!;
  });

  return totalSummary;
};
