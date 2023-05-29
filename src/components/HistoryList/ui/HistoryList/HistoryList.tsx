import { useSelector } from "react-redux";

import { selectUserHistory } from "~/redux/user/selectors";
import { Order } from "~/redux/user/types";

import { HistoryItem } from "../HistoryItem/HistoryItem";
import cls from "./HistoryList.module.scss";



export const HistoryList = () => {
  const historyList = useSelector(selectUserHistory);

  return (
    <ul className={cls.CartList}>
      {historyList?.map((order: Order) => (
        <HistoryItem key={ order._id} {...order} />
      ))}
    </ul>
  );
};
