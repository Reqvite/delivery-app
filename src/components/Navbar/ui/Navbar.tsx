import { classNames } from "~/shared/lib/classNames";
import { AppLink } from "~/shared/ui/AppLink/AppLink";
import { IoFastFoodSharp } from "react-icons/io5";
import cls from './Navbar.module.scss'
import products from '../../../data/data.json'



interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className = '' }: NavbarProps) => {

	console.log(products)
	return (
		<header className={classNames(cls.Navbar, {}, [className])} >
			<nav>
				<ul className={cls.list}>
					<li className={cls.item}>
						<AppLink to="/">
							<IoFastFoodSharp size={50} />
						</AppLink>
					</li>
					<li><AppLink to="/">Shop</AppLink></li>
					<li><AppLink to="/shopping-cart">Shopping cart</AppLink></li>
				</ul>
			</nav>
		</header>
	);
};