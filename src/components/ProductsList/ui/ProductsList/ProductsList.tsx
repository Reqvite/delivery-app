import cls from "./ProductsList.module.scss"
import { ProductsListItem } from "../ProductsListItem/ProductsListItem";

const products = [1,2,3,4,5]

export const ProductsList = () => {

  return (
      <ul className={cls.ProductsList}>
          {products.map(el => <ProductsListItem/>)}
    </ul>
  );
};