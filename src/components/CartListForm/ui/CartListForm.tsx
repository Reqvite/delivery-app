import { Button, ButtonVariant } from "~/shared/ui/Button/Button";
import cls from "./CartListForm.module.scss"

export const CartListForm = () => {

    return (
        <div className={cls.formBox}>
            <h1>Add contact details for your order
            </h1>
            <form className={cls.CartListForm}>
                <label className={cls.label}>
                    Name
                    <input className={cls.input} type="text" required />
                </label>
                <label className={cls.label}>
                    Email
                    <input className={cls.input} type="email" required />
                    <p className={cls.text}>We’ll send order confirmations and receipts to this email</p>
                </label>
                <label className={cls.label}>
                    Phone
                    <input className={cls.input} type="phone" required />
                    <p className={cls.text}>We’ll send order updates to this number</p>
                </label>
                <label className={cls.label}>
                    Address
                    <input className={cls.input} type="text" required />
                </label>
                <Button type="submit" variant={ButtonVariant.BACKGROUND} className={cls.btn}>Confirm the order</Button>
            </form >
        </div>
    );
};