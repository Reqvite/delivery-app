import { toast } from "react-hot-toast";
import { ChangeEvent, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";
import { addUserOrder, getUserDiscount } from "~/redux/user/operations";
import {
  selectDeliveryList,
  selectTotalPrice,
  selectUserAddress,
  selectUserDiscount,
  selectUserIsLoading,
} from "~/redux/user/selectors";
import { Loader } from "~/shared/ui/Loader/Loader";
import cls from "./CartListForm.module.scss";
import { GoogleMaps } from "~/components/GoogleMap";
import { userActions } from "~/redux/user/userSlice";
import ReCAPTCHA from "react-google-recaptcha";

export const CartListForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [discount, setDiscount] = useState("");
  const [captcha, setCaptcha] = useState<string | null>("");

  const foodList = useSelector(selectDeliveryList);
  const total = useSelector(selectTotalPrice);
  const isLoading = useSelector(selectUserIsLoading);
  const address = useSelector(selectUserAddress);
  const userDiscount = useSelector(selectUserDiscount);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: address,
    },
    onSubmit: ({ name, email, phone }, { resetForm }) => {
      if (captcha) {
        dispatch(
          addUserOrder({
            foodList,
            name,
            email,
            address,
            phone: String(phone),
          })
        );
        resetForm();
      } else {
        toast.error("Please complete the captcha.");
      }
    },
  });

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    dispatch(userActions.setAddress(newAddress));
    formik.handleChange(e);
  };

  const handleSubmitCouponButton = () => {
    if (userDiscount !== 0) {
      toast.error("You already applied your coupon.");
      return;
    }
    if (!discount) {
      return;
    }
    dispatch(getUserDiscount(discount));
  };

  function onChange(value: string | null) {
    setCaptcha(value);
  }

  return (
    <div className={cls.formBox}>
      <GoogleMaps />
      <h1>Add contact details for your order</h1>
      <form className={cls.CartListForm} onSubmit={formik.handleSubmit}>
        <label className={cls.label} htmlFor="address">
          Address
          <input
            name="address"
            className={cls.input}
            type="text"
            required
            onChange={handleAddressChange}
            value={address}
          />
        </label>
        <label className={cls.label} htmlFor="name">
          Name
          <input
            name="name"
            className={cls.input}
            type="text"
            id="email"
            required
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </label>
        <label className={cls.label} htmlFor="email">
          Email
          <input
            name="email"
            className={cls.input}
            type="email"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p className={cls.text}>
            We’ll send order confirmations and receipts to this email.
          </p>
        </label>
        <label className={cls.label} htmlFor="phone">
          Phone
          <input
            name="phone"
            className={cls.input}
            type="number"
            required
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <p className={cls.text}>We’ll send order updates to this number.</p>
        </label>
        <div className={cls.btnBox}>
          <div className={cls.discountBox}>
            <input
              placeholder="Write your coupon"
              type="text"
              className={cls.input}
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
            />
            <Button
              variant={ButtonVariant.OUTLINED}
              onClick={handleSubmitCouponButton}
            >
              Get discount
            </Button>
          </div>
          <span className={cls.price}>Total Price: $ {total.toFixed(2)}</span>
          <ReCAPTCHA
            size="compact"
            sitekey={import.meta.env.VITE_API_KEY_RECAPTCHA}
            onChange={onChange}
          />
          <Button
            type="submit"
            variant={ButtonVariant.BACKGROUND}
            className={cls.btn}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader
                width={20}
                height={20}
                className={cls.loader}
                color="#000"
              />
            ) : (
              "Confirm the order"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
