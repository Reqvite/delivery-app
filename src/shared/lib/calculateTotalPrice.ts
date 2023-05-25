import { Food } from "~/redux/categories/types";

export const calculateTotalPrice = (deliveryList: Food[]) => {
  return deliveryList.reduce((total, food) => {
    const price = total + food.price * food.quantity!;
    return price;
  }, 0);
};
