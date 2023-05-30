import { nanoid } from "@reduxjs/toolkit";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { Food } from "~/redux/categories/types";
import { userActions } from "~/redux/user/userSlice";
import { getDate } from "~/shared/lib/getDate";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";

import cls from "./HistoryItem.module.scss";

interface HistoryItemProps {
  _id: string
  createdAt: string;
  foodList: Food[];
}

export const HistoryItem: FC<HistoryItemProps> = (props) => {
  const {t} = useTranslation()
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
        <p>{t('Order date')}: </p>
        <span>{getDate(createdAt)}</span>
      </div>
      <p className={cls.listTitle}>{t('Ordered food')} </p>
      <ul className={cls.list}>
        {foodList?.map(({ title, img_url, quantity, totalPrice }) => (
          <li key={nanoid()} className={cls.listItem}>
            <p className={cls.listTitle}>{title}</p>
            <div className={cls.infoBox}>
              <p>{t('Quantity')}: </p>
              <span> {quantity}</span>
            </div>
            <div className={cls.infoBox}>
              <p>{t('Total price')}: </p>
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
          {t('Repeat order')}
        </Button>
      </div>
    </div>
  );
};
