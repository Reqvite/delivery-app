import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { selectCategories } from "~/redux/categories/selectors";
import { selectDeliveryList } from "~/redux/user/selectors";
import { userActions } from "~/redux/user/userSlice";

import {
  CategoriesItem,
  CategoryItemStatus,
} from "../CategoriesItem/CategoriesItem";
import cls from "./CategoriesList.module.scss";

export const CategoriesList = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const [deliveryList] = useSelector(selectDeliveryList);

  useEffect(() => {
    if (deliveryList) {
      setActiveCategory(deliveryList?.shop);
      dispatch(userActions.setActiveCategory(deliveryList?.shop));
    }
  }, [deliveryList, dispatch]);

  const handleCategory = (category: string) => {
    if (activeCategory === "all") {
      return CategoryItemStatus.NORMAL;
    } else if (category === activeCategory) {
      return CategoryItemStatus.ACTIVE;
    } else {
      return CategoryItemStatus.DISABLED;
    }
  };

  return (
    <ul className={cls.CategoriesList}>
      {categories.map((category) => (
        <CategoriesItem
          key={nanoid()}
          category={category}
          active={handleCategory(category)}
        />
      ))}
    </ul>
  );
};
