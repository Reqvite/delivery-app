import { Button, ButtonVariant } from "~/shared/ui/Button/Button";
import { useFormik } from 'formik';
import cls from "./CartListForm.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { addUserOrder } from "~/redux/user/operations";
import { selectDeliveryList, selectTotalPrice, selectUserIsLoading } from "~/redux/user/selectors";
import { Loader } from "~/shared/ui/Loader/Loader";
import { USER_DELIVERY_LIST } from "~/shared/const/const";

export const CartListForm = () => {
    const dispatch = useDispatch<AppDispatch>()

    const foodList = useSelector(selectDeliveryList)
    const total = useSelector(selectTotalPrice)
    const isLoading = useSelector(selectUserIsLoading)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: ''
        },
        onSubmit: (values, { resetForm }) => {
            dispatch(addUserOrder({ foodList, ...values }))
            localStorage.removeItem(USER_DELIVERY_LIST);
            resetForm();
        },
    });

    return (
        <div className={cls.formBox}>
            <h1>Add contact details for your order
            </h1>
            <form className={cls.CartListForm} onSubmit={formik.handleSubmit}>
                <label className={cls.label} htmlFor="name">
                    Name
                    <input name="name" className={cls.input} type="text" id="email" onChange={formik.handleChange}
                        value={formik.values.name} />
                </label>
                <label className={cls.label} htmlFor="email">
                    Email
                    <input name="email" className={cls.input} type="email" required onChange={formik.handleChange}
                        value={formik.values.email} />
                    <p className={cls.text}>We’ll send order confirmations and receipts to this email.</p>
                </label>
                <label className={cls.label} htmlFor="phone">
                    Phone
                    <input name="phone" className={cls.input} type="text" required onChange={formik.handleChange}
                        value={formik.values.phone} />
                    <p className={cls.text}>We’ll send order updates to this number.</p>
                </label>
                <label className={cls.label} htmlFor="address">
                    Address
                    <input name="address" className={cls.input} type="text" required onChange={formik.handleChange}
                        value={formik.values.address} />
                </label>
                <div className={cls.btnBox}>
                    <span className={cls.price}>Total Price: $ {total.toFixed(2)}</span>
                    <Button type="submit" variant={ButtonVariant.BACKGROUND} className={cls.btn} disabled={isLoading}>
                        {isLoading ? <Loader width={20} height={20} className={cls.loader} color="#000" /> : "Confirm the order"}
                    </Button>
                </div>
            </form >
        </div>
    );
};