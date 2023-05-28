import { useSelector } from "react-redux";

import { Food } from "~/redux/categories/types";
import { selectUserHistory } from "~/redux/user/selectors";

import { HistoryItem } from "../HistoryItem/HistoryItem";
import cls from "./HistoryList.module.scss";

interface Order {
  _id: string;
  createdAt: string;
  foodList: Food[];
}

export const HistoryList = () => {
  const historyList = useSelector(selectUserHistory);

  return (
    <ul className={cls.CartList}>
      {historyList?.map((order: Order) => (
        <HistoryItem key={order._id} {...order} />
      ))}
    </ul>
  );
};
