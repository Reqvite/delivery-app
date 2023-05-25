import { Food } from "~/redux/categories/types"
import cls from "./HistoryItem.module.scss"
import { FC } from "react"
import { getDate } from "~/shared/lib/getDate"
import { nanoid } from "@reduxjs/toolkit"

interface HistoryItemProps {
    createdAt: string
    foodList: Food[]
}

export const HistoryItem: FC<HistoryItemProps> = (props) => {
    const { createdAt, foodList } = props;
    return (
        <div className={cls.HistoryItem}>
            <div className={cls.dateBox}>
                <p>Order date: </p><span>{getDate(createdAt)}</span>
            </div>
            <p className={cls.listTitle}>Ordered food </p>
            <ul className={cls.list}>
                {foodList.map(({ title, img_url
                }) => <li key={nanoid()} className={cls.listItem}>
                        <p className={cls.listTitle}>{title}</p>
                        <img
                            className={cls.img}
                            src={img_url}
                            alt="title"
                            width={100}
                            height={100}
                        />
                    </li>)}
            </ul>
        </div>
    );
};