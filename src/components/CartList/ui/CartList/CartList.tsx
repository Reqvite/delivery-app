import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { selectDeliveryList } from "~/redux/user/selectors";
import { userActions } from "~/redux/user/userSlice";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";

import { CartListItem } from "../CartListItem/CartListItem";
import cls from "./CartList.module.scss";

export const CartList = () => {
  const { t } = useTranslation();
  const deliveryList = useSelector(selectDeliveryList);
  const dispatch = useDispatch<AppDispatch>();
  const onEmptyCartButton = () => {
    dispatch(userActions.emptyCart());
  };

  return (
    <ul className={cls.CartList}>
      {deliveryList.map((food) => (
        <CartListItem key={food._id} {...food} />
      ))}
      <li className={cls.btnItem}>
        <Button variant={ButtonVariant.BACKGROUND} onClick={onEmptyCartButton}>
          {t('Empty cart')}
        </Button>
      </li>
    </ul>
  );
};
