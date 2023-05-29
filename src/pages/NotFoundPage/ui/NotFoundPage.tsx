import { Link } from "react-router-dom";

import { Button, ButtonVariant } from "~/shared/ui/Button/Button";

import cls from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.NotFoundBox}>
        <h1>Sorry, page not found.</h1>
        <Button variant={ButtonVariant.BACKGROUND} className={cls.btn}>
          <Link to="/">Back to shopping</Link>
        </Button>
      </div>
    </div>
  );
};
