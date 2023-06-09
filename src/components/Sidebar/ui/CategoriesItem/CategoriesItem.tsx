import { FC } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { getCategoryFood } from "~/redux/categories/operations";
import { classNames } from "~/shared/lib/classNames";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";

import cls from "./CategoriesItem.module.scss";

export enum CategoryItemStatus {
  ACTIVE = "active",
  DISABLED = "disabled",
  NORMAL = "normal",
}

interface CategoryListItemProps {
  category: string;
  active: CategoryItemStatus;
}

export const CategoriesItem: FC<CategoryListItemProps> = ({
  category,
  active,
}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>();

  const handleCategoryButton = (categoryName: string) => {
    if (active === CategoryItemStatus.DISABLED) {
      toast.error(
        `${t('You can only add products from one store')}.`
      );
      return;
    }
    dispatch(getCategoryFood(categoryName));
  };

  return (
    <li className={classNames(cls.ProductsListItem, {}, [])}>
      <Button
        className={cls[active]}
        variant={ButtonVariant.BACKGROUND}
        onClick={() => handleCategoryButton(category)}
      >
        {category}
      </Button>
    </li>
  );
};
