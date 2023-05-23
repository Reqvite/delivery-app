import { useState } from 'react';
import cls from './SideBar.module.scss';
import { classNames } from '~/shared/lib/classNames';

interface SideBarProps {
  className?: string;
}

export const SideBar = ({ className = ''}: SideBarProps) => {
    return (
        <div
            className={classNames(cls.Sidebar, {}, [
                className,
            ])}
        >
            <h1>All stores</h1>
        </div>
    );
};