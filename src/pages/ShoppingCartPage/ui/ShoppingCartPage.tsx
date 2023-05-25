import { useSelector } from "react-redux";
import { CartList } from "~/components/CartList";
import { CartListForm } from "~/components/CartListForm";
import { CartEmptyBox } from "~/components/CartEmptyBox";
import { selectDeliveryList } from "~/redux/user/selectors";
import cls from "./ShoppingCartPage.module.scss";


const ShoppingCartPage = () => {
    const deliveryList = useSelector(selectDeliveryList);

    return (
        <div className={cls.ShoppingCartPageWrapper}>
            {!deliveryList.length ? (
                <CartEmptyBox />
            ) : (
                <>
                    <CartListForm />
                    <CartList />
                </>
            )}
        </div>
    );
};

export default ShoppingCartPage;
