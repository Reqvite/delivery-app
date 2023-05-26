import { Food } from "~/redux/categories/types";
import cls from "./HistoryItem.module.scss";
import { FC } from "react";
import { getDate } from "~/shared/lib/getDate";
import { nanoid } from "@reduxjs/toolkit";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { userActions } from "~/redux/user/userSlice";
import { useNavigate } from "react-router-dom";

interface HistoryItemProps {
  createdAt: string;
  foodList: Food[];
}

export const HistoryItem: FC<HistoryItemProps> = (props) => {
  const { createdAt, foodList } = props;
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const hanldeRepeatButton = () => {
    dispatch(userActions.setRepeatOrder(foodList));
    navigate("/shopping-cart");
  };

  return (
    <div className={cls.HistoryItem}>
      <div className={cls.dataBox}>
        <p>Order date: </p>
        <span>{getDate(createdAt)}</span>
      </div>
      <p className={cls.listTitle}>Ordered food </p>
      <ul className={cls.list}>
        {foodList?.map(({ title, img_url, quantity, totalPrice }) => (
          <li key={nanoid()} className={cls.listItem}>
            <p className={cls.listTitle}>{title}</p>
            <div className={cls.infoBox}>
              <p>Quantity: </p>
              <span> {quantity}</span>
            </div>
            <div className={cls.infoBox}>
              <p>Total price: </p>
              <span> {totalPrice?.toFixed(2)}</span>
            </div>
            <img
              className={cls.img}
              src={img_url}
              alt="title"
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
      <div className={cls.btn}>
        <Button onClick={hanldeRepeatButton} variant={ButtonVariant.BACKGROUND}>
          Repeat order
        </Button>
      </div>
    </div>
  );
};
