import { FC } from "react";
import { LinkProps, NavLink } from "react-router-dom";
import { classNames } from "~/shared/lib/classNames";
import cls from "./AppLink.module.scss";

export enum AppLinkVariant {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: string;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        to,
        className,
        variant = AppLinkVariant.PRIMARY,
        children,
        ...otherProps
    } = props;

    const additional = [className, cls[variant],];

    return (
        <NavLink
            to={to}
            className={({ isActive }) => classNames(cls.AppLink, { [cls.active]: isActive }, additional)}

            {...otherProps}
        >
            {children}
        </NavLink>
    );
};