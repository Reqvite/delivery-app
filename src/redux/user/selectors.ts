import { StateSchema } from "~/app/providers/StoreProvider";

export const selectDeliveryList = (state: StateSchema) =>
  state?.user.deliveryList;
export const selectTotalPrice = (state: StateSchema) => state?.user.totalPrice;
export const selectUserIsLoading = (state: StateSchema) =>
  state?.user.isLoading;
export const selectActiveCategory = (state: StateSchema) =>
  state?.user.activeCategory;
export const selectUserAddress = (state: StateSchema) => state?.user.address;
export const selectUserHistory = (state: StateSchema) =>
  state?.user.userHistory;
export const selectUserTotalQuantity = (state: StateSchema) =>
  state?.user.totalQuantity;
