import { StateSchema } from "~/app/providers/StoreProvider";

export const selectDeliveryList = (state: StateSchema) => state?.user.deliveryList;
export const selectTotalPrice = (state: StateSchema) => state?.user.totalPrice;
export const selectUserIsLoading = (state: StateSchema) => state?.user.isLoading;