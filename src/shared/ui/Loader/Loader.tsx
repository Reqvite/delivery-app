import { Oval } from "react-loader-spinner";
import cls from './Loader.module.scss'
import { classNames } from "~/shared/lib/classNames";

interface LoaderProps {
	className?: string;
	color?: string;
	secondaryColor?: string;
}

export const Loader = ({ className }: LoaderProps) => {
	return (
		<div className={classNames(cls.Loader, {}, [className])}>
			<Oval
				height={80}
				width={80}
				color="rgb(144 144 194 / 70%)"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel='oval-loading'
				secondaryColor="rgb(144 144 194 / 70%)"
				strokeWidth={2}
				strokeWidthSecondary={2}

			/>
		</div>
	);
};