import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "~/app/providers/StoreProvider/config/config";
import { getUserHistory } from "~/redux/user/asyncOperations";
import { selectUserIsLoading } from "~/redux/user/selectors";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";
import { Loader } from "~/shared/ui/Loader/Loader";

import cls from "./HistoryForm.module.scss";

export const HistoryForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectUserIsLoading);

  const formik = useFormik({
    initialValues: {
      searchValue: "",
    },
    onSubmit: ({ searchValue }, { resetForm }) => {
      dispatch(getUserHistory(searchValue));
      resetForm();
    },
  });

  return (
    <div className={cls.formBox}>
      <h1>Write your email or phone to get yor orders history.</h1>
      <form className={cls.HistoryForm} onSubmit={formik.handleSubmit}>
        <label className={cls.label} htmlFor="searchValue">
          Email or phone
          <input
            name="searchValue"
            className={cls.input}
            type="text"
            required
            onChange={formik.handleChange}
            value={formik.values.searchValue}
          />
        </label>
        <div className={cls.btnBox}>
          <Button
            type="submit"
            variant={ButtonVariant.BACKGROUND}
            className={cls.btn}
          >
            {isLoading ? (
              <Loader
                width={20}
                height={20}
                className={cls.loader}
                color="#000"
              />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
