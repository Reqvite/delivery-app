import { PersistPartial } from "redux-persist/es/persistReducer";
import { CategoriesSchema } from "~/redux/categories/types";
import { UserDataSchema } from "~/redux/user/types";

export interface StateSchema {
    categories: CategoriesSchema,
    user: UserDataSchema & PersistPartial,
}