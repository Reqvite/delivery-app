import { StateSchema } from "~/app/providers/StoreProvider";

export const selectDeliveryList = (state: StateSchema) => state?.user.deliveryList;