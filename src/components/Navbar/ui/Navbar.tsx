import { AppLink } from "~/shared/ui/AppLink/AppLink";
import { IoFastFoodSharp } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import cls from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { selectUserTotalQuantity } from "~/redux/user/selectors";

export const Navbar = () => {
  const totalQuantity = useSelector(selectUserTotalQuantity);

  return (
    <header className={cls.Navbar}>
      <nav className={cls.nav}>
        <ul className={cls.list}>
          <li className={cls.item}>
            <AppLink to="/">
              <IoFastFoodSharp size={50} />
            </AppLink>
          </li>
          <li>
            <AppLink to="/">Shop</AppLink>
          </li>
          <li>
            <AppLink to="/history">History</AppLink>
          </li>
        </ul>
        <AppLink className={cls.cart} to="/shopping-cart">
          <BsCart3 size={30} />
          {totalQuantity !== 0 && (
            <span className={cls.quantity}>{totalQuantity}</span>
          )}
        </AppLink>
      </nav>
    </header>
  );
};
