import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesItem, CategoryItemStatus } from "../CategoriesItem/CategoriesItem";
import cls from "./CategoriesList.module.scss"
import { getCategories } from "~/redux/categories/operations";
import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { selectCategories } from "~/redux/categories/selectors";
import { nanoid } from "@reduxjs/toolkit";
import { selectDeliveryList } from "~/redux/user/selectors";
import { userActions } from "~/redux/user/userSlice";


export const CategoriesList = () => {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const dispatch = useDispatch<AppDispatch>()
    const categories = useSelector(selectCategories)
    const [deliveryList] = useSelector(selectDeliveryList)

    useEffect(() => {
        if (deliveryList) {
            setActiveCategory(deliveryList?.shop)
            dispatch(userActions.setActiveCategory(deliveryList?.shop))
        }
    }, [deliveryList, dispatch]);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleCategory = (category: string) => {
        if (activeCategory === 'all') {
            return CategoryItemStatus.NORMAL
        } else if (category === activeCategory) {
            return CategoryItemStatus.ACTIVE
        } else {
            return CategoryItemStatus.DISABLED
        }
    }

    return (
        <ul className={cls.CategoriesList}>
            {categories.map(category =>
                <CategoriesItem key={nanoid()} category={category} active={handleCategory(category)} />
            )
            }
        </ul>
    );
};