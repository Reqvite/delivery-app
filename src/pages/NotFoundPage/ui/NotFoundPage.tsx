import cls from "./NotFoundPage.module.scss";
import { Link } from "react-router-dom";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";


export const NotFoundPage = () => {
	return (
		<div className={cls.wrapper}>
			<div className={cls.NotFoundBox}>
				<h1>Sorry, page not found.</h1>
				<Button variant={ButtonVariant.BACKGROUND} className={cls.btn}><Link to="/">Back</Link></Button>
			</div>
		</div>
	);
};