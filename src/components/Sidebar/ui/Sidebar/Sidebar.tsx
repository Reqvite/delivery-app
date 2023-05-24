import { useLocation } from 'react-router-dom';
import { CategoriesList } from '../CategoriesList/CategoriesList';
import cls from './SideBar.module.scss';
import { classNames } from '~/shared/lib/classNames';

interface SideBarProps {
    className?: string;
}

export const Sidebar = ({ className = '' }: SideBarProps) => {
    const { pathname } = useLocation()

    if (pathname !== '/') {
        return null;
    }
    return (
        <>
            <div
                className={classNames(cls.sidebar, {}, [
                    className,
                ])}
            >
                <h1 className={cls.title}>All stores</h1>
                <CategoriesList />
            </div>
            <div className={cls.box} />
        </>

    );
};