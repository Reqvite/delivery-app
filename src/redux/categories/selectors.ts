import { StateSchema } from "~/app/providers/StoreProvider";

export const selectCategories = (state: StateSchema) => state?.categories.listOfCategories;
export const selectCategoriesIsLoading = (state: StateSchema) => state?.categories.isLoading;
export const selectListOfFood = (state: StateSchema) => state?.categories.listOfFood;