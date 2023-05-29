import { configureStore,ReducersMapObject } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { categoriesReducer } from "~/redux/categories/categoriesSlice";
import { userReducer } from "~/redux/user/userSlice";

import { StateSchema } from "./StateSchema";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: [
    "totalPrice",
    "totalQuantity",
    "deliveryList",
    "activeCategory",
    "discount",
  ],
};

const rootReducer: ReducersMapObject<StateSchema> = {
  categories: categoriesReducer,
  user: persistReducer(userPersistConfig, userReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
