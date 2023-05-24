import { classNames } from "~/shared/lib/classNames";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";
import cls from "./CategoriesItem.module.scss"
import { FC } from "react";

interface CategoryListItemProps {
    category: string;
}

export const CategoriesItem: FC<CategoryListItemProps> = ({ category }) => {
    return (
        <li className={classNames(cls.ProductsListItem, {}, [])}>
            <Button variant={ButtonVariant.BACKGROUND}>
                {category}
            </Button>
        </li>
    );
};