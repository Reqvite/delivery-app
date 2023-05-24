import { CategoriesItem } from "../CategoriesItem/CategoriesItem";
import cls from "./CategoriesList.module.scss"


const categories = ["text", "text", "text", "text"]

export const CategoriesList = () => {

    return (
        <ul className={cls.CategoriesList}>
            {categories.map(category => <CategoriesItem category={category} />)}
        </ul>
    );
};