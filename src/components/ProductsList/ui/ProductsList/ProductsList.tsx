import { useSelector } from "react-redux";
import { ProductsListItem } from "../ProductsListItem/ProductsListItem";
import { selectListOfFood } from "~/redux/categories/selectors";
import cls from "./ProductsList.module.scss"


export const ProductsList = () => {
  const foodList = useSelector(selectListOfFood)

  return (
    <ul className={cls.ProductsList}>
      {foodList.map(food => <ProductsListItem key={food._id} {...food} />)}
    </ul>
  );
};