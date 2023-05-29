import { useFormik } from "formik";
import { ChangeEvent, useCallback, useEffect,useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { GoogleMaps } from "~/components/GoogleMap";
import { addUserOrder, getUserDiscount } from "~/redux/user/asyncOperations";
import {
  selectDeliverData,
  selectDeliveryList,
  selectTotalPrice,
  selectUserAddress,
  selectUserDiscount,
  selectUserIsLoading,
} from "~/redux/user/selectors";
import { userActions } from "~/redux/user/userSlice";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";
import { Loader } from "~/shared/ui/Loader/Loader";
import { Modal } from "~/shared/ui/Modal/Modal";

import cls from "./CartListForm.module.scss";

export const CartListForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [discount, setDiscount] = useState("");
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const foodList = useSelector(selectDeliveryList);
  const total = useSelector(selectTotalPrice);
  const isLoading = useSelector(selectUserIsLoading);
  const address = useSelector(selectUserAddress);
  const userDiscount = useSelector(selectUserDiscount);
  const deliveryData = useSelector(selectDeliverData);
  const totalPrice = useSelector(selectTotalPrice)

  interface FormData  {
  name: string;
  email: string;
  phone: string;
  address: string;
}

  const formik = useFormik<FormData>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: address,
    },
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, resetForm);
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

  const onChangeCaptcha = (value: string | null) => {
    if (value) {
      setCaptcha(value);
    }
  };

  const onCloseModal = useCallback(() => {
    setCaptchaVerified(false);
  }, []);

  useEffect(() => {
    if (captcha) {
      setCaptcha(null);
      formik.submitForm();
    }
  }, [captcha, formik]);

  const handleSubmit = ({ name, email, phone }: FormData, resetForm: () => void) => {
    if (captchaVerified) {
      setCaptcha(null);
      const discountedFoodList =
        userDiscount !== 0
          ? foodList.map((foodItem) => {
              const discount = (total * userDiscount) / 100;
              const discountedPrice =
                foodItem.totalPrice! -
                (foodItem.totalPrice! * discount) / total;
              return {
                ...foodItem,
                totalPrice: +discountedPrice.toFixed(2),
              };
            })
          : foodList;
      dispatch(
        addUserOrder({
          foodList: discountedFoodList,
          name,
          email,
          address,
          phone: String(phone),
          totalPrice,
          discount: userDiscount
        })
      );

      onCloseModal();
      resetForm();
    } else {
      setCaptchaVerified(true);
    }
  };

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
          {deliveryData && (
            <span className={cls.deliveryData}>
              Delivery time: {deliveryData.time}, distance:{" "}
              {deliveryData.distance}
            </span>
          )}
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
            value={formik.values.name.trim()}
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
          <Modal isOpen={captchaVerified} onClose={onCloseModal}>
            <ReCAPTCHA
              size="compact"
              sitekey={import.meta.env.VITE_API_KEY_RECAPTCHA}
              onChange={onChangeCaptcha}
            />
          </Modal>
          <Button
            type="submit"
            variant={ButtonVariant.BACKGROUND}
            className={cls.btn}
            disabled={isLoading}
          >
            {isLoading || captchaVerified ? (
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
