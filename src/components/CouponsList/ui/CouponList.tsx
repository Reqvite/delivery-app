import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { getFoodCoupons } from "~/redux/categories/operations";
import { selectCoupons } from "~/redux/categories/selectors";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";

import cls from "./CouponList..module.scss";

export const CouponList = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>();
  const coupons = useSelector(selectCoupons);

  useEffect(() => {
    dispatch(getFoodCoupons());
  }, [dispatch]);

  const handleCopyClick = (title: string) => {
    navigator.clipboard.writeText(title);
    toast.success(`${t("Copied")}`);
  };

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>{t('Get your coupon')}!</h1>
      <ul className={cls.CouponList}>
        {coupons.map(({ _id, title, discount }) => (
          <li key={_id} className={cls.item}>
            <h2 className={cls.itemTitle}>{title}</h2>
            <p>{t('Discount')} {discount} %</p>
            <Button
              variant={ButtonVariant.BACKGROUND}
              onClick={() => handleCopyClick(title)}
            >
              {t('Copy')}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
