import { ButtonHTMLAttributes,FC, ReactNode } from "react";

import { classNames } from "~/shared/lib/classNames";

import cls from "./Button.module.scss";

export enum ButtonVariant {
  CLEAR = "clear",
  OUTLINED = "outlined",
  BACKGROUND = "background",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, children, variant, disabled, ...otherProps } = props;

  const mods: Record<string, boolean> = {
    [cls.disabled]: !!disabled,
  };

  const additional = [className, variant ? cls[variant] : undefined];

  return (
    <button
      type="button"
      className={classNames(cls.Button, mods, additional)}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};
