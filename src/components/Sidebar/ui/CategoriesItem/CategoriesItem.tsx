import { classNames } from "~/shared/lib/classNames";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";
import cls from "./CategoriesItem.module.scss"
import { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { getCategoryFood } from "~/redux/categories/operations";

interface CategoryListItemProps {
    category: string;
}

export const CategoriesItem: FC<CategoryListItemProps> = ({ category }) => {

    const dispatch = useDispatch<AppDispatch>()
    const handleCategoryButton = (categoryName: string) => {
        dispatch(getCategoryFood(categoryName))
    }

    return (
        <li className={classNames(cls.ProductsListItem, {}, [])}>
            <Button variant={ButtonVariant.BACKGROUND} onClick={() => handleCategoryButton(category)}>
                {category}
            </Button>
        </li>
    );
};