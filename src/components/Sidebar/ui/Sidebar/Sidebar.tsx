import { CategoriesList } from '../CategoriesList/CategoriesList';
import cls from './SideBar.module.scss';
import { classNames } from '~/shared/lib/classNames';

interface SideBarProps {
    className?: string;
}

export const Sidebar = ({ className = '' }: SideBarProps) => {
    return (
        <div
            className={classNames(cls.Sidebar, {}, [
                className,
            ])}
        >
            <h1 className={cls.title}>All stores</h1>
            <CategoriesList />
        </div>
    );
};