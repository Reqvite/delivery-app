import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { Food } from "~/redux/categories/types";
import { userActions } from "~/redux/user/userSlice";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";

import cls from "./ProductsListItem.module.scss"



export const ProductsListItem: FC<Food> = (food) => {
  const {
    title,
    price,
    img_url,
  } = food
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const hanldeAddButton = () => {
    dispatch(userActions.addFoodToList(food))
  }

  return (
    <li className={cls.ProductsListItem}>
      <img src={img_url} alt={title} loading="lazy" width={300} className={cls.img} />
      <div className={cls.dataBox}>
        <h2 className={cls.title}>{title}</h2>
        <div className={cls.buttonBox}>
          <span>${price}</span>
          <Button className={cls.btn} variant={ButtonVariant.BACKGROUND} onClick={hanldeAddButton}>{t('Add to cart')}</Button>
        </div>
      </div>
    </li >
  );
};