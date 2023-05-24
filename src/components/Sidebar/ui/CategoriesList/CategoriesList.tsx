import { useDispatch, useSelector } from "react-redux";
import { CategoriesItem } from "../CategoriesItem/CategoriesItem";
import cls from "./CategoriesList.module.scss"
import { useEffect } from "react";
import { getCategories } from "~/redux/categories/operations";
import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { selectCategories } from "~/redux/categories/selectors";
import { nanoid } from "@reduxjs/toolkit";


export const CategoriesList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const categories = useSelector(selectCategories)
    // const isLoading = useSelector(selectCategoriesIsLoading)


    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <ul className={cls.CategoriesList}>
            {categories.map(category => <CategoriesItem key={nanoid()} category={category} />)}
        </ul>
    );
};