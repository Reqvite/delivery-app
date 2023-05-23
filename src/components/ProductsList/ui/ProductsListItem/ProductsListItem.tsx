import { classNames } from "~/shared/lib/classNames";
import cls from "./ProductsListItem.module.scss"

interface ProductsListItemProps {
  className?: string;
}

export const ProductsListItem = (props: ProductsListItemProps) => {
    const { className = '' } = props;
  return (
    <li className={classNames(cls.ProductsListItem, {}, [className])}>
    </li>
  );
};