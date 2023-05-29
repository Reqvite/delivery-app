import { Link } from "react-router-dom";

import { Button, ButtonVariant } from "~/shared/ui/Button/Button";

import cls from "./CartEmptyBox.module.scss";

export const CartEmptyBox = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.CartEmptyBox}>
        <h1>Your cart is empty.</h1>
        <Button variant={ButtonVariant.BACKGROUND} className={cls.btn}>
          <Link to="/">Go shopping</Link>
        </Button>
      </div>
    </div>
  );
};
