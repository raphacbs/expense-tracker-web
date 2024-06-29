import React from 'react';
import { HomeOutlined, FolderOutlined, DesktopOutlined } from '@ant-design/icons';
import { ExtendedMenuItem } from 'types';
import { TFunction } from 'i18next';

export function getMenus(translater: TFunction<"translation", undefined>){
    return  [
        {
            label:translater("layoutPage.homeMenu"),
            key: "home",
            icon: <HomeOutlined />,
            path: "/home",
            onClick: () => { console.log("Olá") },
            title:"layoutPage.homeMenu"

        },
        {
            label: translater("layoutPage.categoryMenu"),
            key: "category",
            icon: <FolderOutlined />,
            onClick: () => { console.log("Categoria") },
            path: "/category",
            title: "layoutPage.categoryMenu"
        },
        {
            label: "Opção 2",
            key: "option2",
            icon: <DesktopOutlined />,
            onClick: () => { console.log("Opção 2") }
        },
    ] as ExtendedMenuItem[]
};
