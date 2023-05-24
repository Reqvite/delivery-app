import cls from "./CartList.module.scss"
import { useSelector } from "react-redux";
import { CartListItem } from "../CartListItem/CartListItem";
import { selectDeliveryList } from "~/redux/user/selectors";

export const CartList = () => {
    const deliveryList = useSelector(selectDeliveryList)

    return (
        <ul className={cls.CartList}>
            {deliveryList.map(food => <CartListItem key={food._id} {...food} />)}
        </ul>
    );
};