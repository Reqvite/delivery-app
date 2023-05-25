import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
} from "react-icons/ai";
import cls from "./Footer.module.scss";

export const Footer = () => {
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
      <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
    </footer>
  );
};
