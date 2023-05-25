import { CartList } from "~/components/CartList";
import { CartListForm } from "~/components/CartListForm";
import cls from "./ShoppingCartPage.module.scss";
import { CartEmptyBox } from "~/components/CartEmptyBox";
import { useSelector } from "react-redux";
import { selectDeliveryList } from "~/redux/user/selectors";

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
