import cls from "./ProductsList.module.scss"
import { ProductsListItem } from "../ProductsListItem/ProductsListItem";
import { selectListOfFood } from "~/redux/categories/selectors";
import { useSelector } from "react-redux";


export const ProductsList = () => {
  const foodList = useSelector(selectListOfFood)

  return (
    <ul className={cls.ProductsList}>
      {foodList.map(food => <ProductsListItem key={food._id} {...food} />)}
    </ul>
  );
};