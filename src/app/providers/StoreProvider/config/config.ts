import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import storage from "redux-persist/lib/storage";
import { categoriesReducer } from '~/redux/categories/categoriesSlice';
import { userReducer } from '~/redux/user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';

const userPersistConfig = {
    key: "user",
    storage,
};

const rootReducer: ReducersMapObject<StateSchema> = {
    categories: categoriesReducer,
    user: persistReducer(userPersistConfig, userReducer)

};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;