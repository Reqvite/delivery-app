import { classNames } from "~/shared/lib/classNames";
import cls from "./ProductsListItem.module.scss"
import { FC } from "react";
import { Food } from "~/redux/categories/types";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";



export const ProductsListItem: FC<Food> = ({ _id,
  title,
  price,
  ingredients,
  img_url,
  shop }) => {



  return (
    <li className={cls.ProductsListItem}>
      <img src={img_url} alt={title} loading="lazy" width={300} className={cls.img} />
      <p>{title}</p>
      <div className={cls.buttonBox}>
        <span>${price}</span>
        <Button variant={ButtonVariant.BACKGROUND}>Add to cart</Button>
      </div>
    </li >
  );
};