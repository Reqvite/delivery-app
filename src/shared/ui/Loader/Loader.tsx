import { Oval } from "react-loader-spinner";

import { classNames } from "~/shared/lib/classNames";

import cls from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
  color?: string;
  secondaryColor?: string;
  width?: number;
  height?: number;
}

export const Loader = ({
  className,
  width = 80,
  height = 80,
  color = "rgb(144 144 194 / 70%)",
}: LoaderProps) => {
  return (
    <div className={classNames(cls.Loader, {}, [className])}>
      <Oval
        height={height}
        width={width}
        color={color}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="rgb(144 144 194 / 70%)"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
