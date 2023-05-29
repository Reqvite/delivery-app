import { FC, useState } from "react";
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { useDispatch } from "react-redux";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { Food } from "~/redux/categories/types";
import { userActions } from "~/redux/user/userSlice";
import { MAX_QUANTITY } from "~/shared/const/const";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";

import cls from "./CartListItem.module.scss";

export const CartListItem: FC<Food> = (food) => {
  const { _id, title, img_url, quantity, price } = food;

  const updatedPrice = price * quantity!;
  const [, setInputQuantity] = useState<number | undefined>(quantity);
  const dispatch = useDispatch<AppDispatch>();

  const hanldeDeleteButton = () => {
    dispatch(userActions.deleteFoodFromList(_id));
  };

  const handleAddQuantityButton = () => {
    setInputQuantity(quantity);
    dispatch(userActions.addQuantity(_id));
  };

  const handleRemoveQuantityButton = () => {
    setInputQuantity(quantity);
    dispatch(userActions.removeQuantity(_id));
  };

  const handleOnChangeInput = (value: number) => {
    if (value === 0) {
      setInputQuantity(1);
      dispatch(userActions.updateQuantityFromInput({ _id, quantity: 1 }));
    } else if (value >= MAX_QUANTITY) {
      setInputQuantity(MAX_QUANTITY);
      dispatch(
        userActions.updateQuantityFromInput({ _id, quantity: MAX_QUANTITY })
      );
    } else {
      setInputQuantity(value);
      dispatch(userActions.updateQuantityFromInput({ _id, quantity: value }));
    }
  };

  return (
    <li className={cls.CartListItem}>
      <img
        src={img_url}
        alt={title}
        loading="lazy"
        width={150}
        className={cls.img}
      />
      <Button
        className={cls.closeBtn}
        variant={ButtonVariant.CLEAR}
        onClick={hanldeDeleteButton}
      >
        <AiOutlineClose size={20} />
      </Button>
      <h2 className={cls.title}>{title}</h2>
      <span className={cls.price}>${updatedPrice?.toFixed(2)}</span>
      <div className={cls.inputBox}>
        <Button
          className={cls.inputRemoveButton}
          variant={ButtonVariant.CLEAR}
          onClick={handleRemoveQuantityButton}
        >
          <AiFillMinusCircle size={20} />
        </Button>
        <input
          type="number"
          min="1"
          max={MAX_QUANTITY}
          className={cls.input}
          value={quantity}
          onChange={(e) => handleOnChangeInput(+e.target.value)}
        />
        <Button
          className={cls.inputAddButton}
          variant={ButtonVariant.CLEAR}
          onClick={handleAddQuantityButton}
        >
          <AiFillPlusCircle size={20} />
        </Button>
      </div>
    </li>
  );
};
