import { Button, ButtonVariant } from "~/shared/ui/Button/Button";
import { useFormik } from 'formik';
import cls from "./CartListForm.module.scss"

export const CartListForm = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
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
                    <input name="phone" className={cls.input} type="number" required onChange={formik.handleChange}
                        value={formik.values.phone} />
                    <p className={cls.text}>We’ll send order updates to this number.</p>
                </label>
                <label className={cls.label} htmlFor="address">
                    Address
                    <input name="address" className={cls.input} type="text" required onChange={formik.handleChange}
                        value={formik.values.address} />
                </label>
                <Button type="submit" variant={ButtonVariant.BACKGROUND} className={cls.btn}>Confirm the order</Button>
            </form >
        </div>
    );
};