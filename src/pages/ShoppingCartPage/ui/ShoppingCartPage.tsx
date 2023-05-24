import { CartList } from "~/components/CartList";
import { CartListForm } from "~/components/CartListForm";
import cls from './ShoppingCartPage.module.scss'

const ShoppingCartPage = () => {
    return <div className={cls.ShoppingCartPageWrapper}>
        <CartListForm />
        <CartList />
    </div>;
};

export default ShoppingCartPage;