import React from 'react';
import { HomeOutlined, FolderOutlined, DollarCircleOutlined, SwapOutlined } from '@ant-design/icons';
import { ExtendedMenuItem } from 'types';
import { TFunction } from 'i18next';

export function getMenus(translater: TFunction<"translation", undefined>) {
    return [
        {
            label: translater("layoutPage.homeMenu"),
            key: "home",
            icon: <HomeOutlined />,
            path: "/home",
            onClick: () => { console.log("Olá") },
            title: "layoutPage.homeMenu"

        },
        {
            label: translater("layoutPage.transactionMenu"),
            key: "transaction",
            icon: <SwapOutlined />,
            onClick: () => { console.log("transaction") },
            path: "/transaction",
            title: "layoutPage.transactionMenu"
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
            label: translater("layoutPage.budgetMenu"),
            key: "budget",
            icon: <DollarCircleOutlined />,
            onClick: () => { console.log("Opção 2") },
            path: "/budget",
            title: "layoutPage.budgetMenu"
        },

    ] as ExtendedMenuItem[]
};
