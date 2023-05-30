import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { CategoriesList } from '../CategoriesList/CategoriesList';
import cls from './Sidebar.module.scss';

export const Sidebar = () => {
    const {t} = useTranslation()
    const { pathname } = useLocation()

    if (pathname !== '/') {
        return null;
    }
    return (
        <>
            <div
                className={cls.sidebar}
            >
                <h1 className={cls.title}>{t('All stores')}</h1>
                <CategoriesList />
            </div>
            <div className={cls.box} />
        </>

    );
};