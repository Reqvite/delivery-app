import { useTranslation } from "react-i18next";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";

import cls from "./Footer.module.scss";

export const Footer = () => {
  const {t} = useTranslation()
  return (
    <footer className={cls.Footer}>
      <ul className={cls.list}>
        <li className={cls.link}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <AiFillInstagram size={25} />
          </a>
        </li>
        <li className={cls.link}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <AiFillFacebook size={25} />
          </a>
        </li>
        <li className={cls.link}>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <AiFillTwitterSquare size={25} />
          </a>
        </li>
      </ul>
      <p>&copy; {new Date().getFullYear()} {t('All Rights Reserved')}.</p>
    </footer>
  );
};
