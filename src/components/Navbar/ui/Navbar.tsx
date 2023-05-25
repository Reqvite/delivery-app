import { AppLink } from "~/shared/ui/AppLink/AppLink";
import { IoFastFoodSharp } from "react-icons/io5";
import cls from "./Navbar.module.scss";

export const Navbar = () => {
  return (
    <header className={cls.Navbar}>
      <nav>
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
            <AppLink to="/shopping-cart">Shopping cart</AppLink>
          </li>
          <li>
            <AppLink to="/history">History</AppLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
