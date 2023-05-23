import { classNames } from "~/shared/lib/classNames";
import cls from "./NotFoundPage.module.scss";


interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className = '' }: NotFoundPageProps) => {
	return (
		<div className={classNames(cls.NotFoundPage, {}, [className])}>
			Sorry, page not found.
		</div>
	);
};