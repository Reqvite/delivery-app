import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { categoriesReducer } from '~/redux/categories/categoriesSlice';


const rootReducer: ReducersMapObject<StateSchema> = {
    categories: categoriesReducer
};

export const store = configureStore<StateSchema>({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;