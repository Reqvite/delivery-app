import { useDispatch } from "react-redux";
import cls from "./CartListItem.module.scss"
import { FC, useState } from "react";
import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { Food } from "~/redux/categories/types";
import { AiOutlineClose, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { userActions } from "~/redux/user/userSlice";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";



export const CartListItem: FC<Food> = (food) => {
    const {
        _id,
        title,
        img_url,
        quantity,
        totalPrice
    } = food

    const [inputQuantity, setInputQuantity] = useState<number | undefined>(quantity);
    const dispatch = useDispatch<AppDispatch>()


    const hanldeDeleteButton = () => {
        dispatch(userActions.deleteFoodFromList(_id))
    }

    const handleAddQuantityButton = () => {
        setInputQuantity(quantity)
        dispatch(userActions.addQuantity(_id))
    }

    const handleRemoveQuantityButton = () => {
        setInputQuantity(quantity)
        dispatch(userActions.removeQuantity(_id))
    }

    const handleOnChangeInput = (value: number) => {
        if (value === 0) {
            setInputQuantity(1)
            dispatch(userActions.updateQuantityFromInput({ _id, quantity: 1 }))
        } else {
            setInputQuantity(value)
            dispatch(userActions.updateQuantityFromInput({ _id, quantity: value }))
        }
    }

    return (
        <li className={cls.CartListItem}>
            <img src={img_url} alt={title} loading="lazy" width={150} className={cls.img} />
            <Button
                className={cls.closeBtn}
                variant={ButtonVariant.CLEAR}
                onClick={hanldeDeleteButton}
            >
                <AiOutlineClose size={20} />
            </Button>
            <h2 className={cls.title}>{title}</h2>
            <span className={cls.price}>${totalPrice!.toFixed(2)}</span>
            <div className={cls.inputBox}>
                <Button
                    className={cls.inputRemoveButton}
                    variant={ButtonVariant.CLEAR}
                    onClick={handleRemoveQuantityButton}
                >
                    <AiFillMinusCircle size={20} />
                </Button>
                <input className={cls.input} value={quantity} onChange={(e) => handleOnChangeInput(+e.target.value)} />
                <Button
                    className={cls.inputAddButton}
                    variant={ButtonVariant.CLEAR}
                    onClick={handleAddQuantityButton}
                >
                    <AiFillPlusCircle size={20} />
                </Button>
            </div>
        </li >
    );
};