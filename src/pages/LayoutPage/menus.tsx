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
            onClick: (event: any) => { console.log("Olá") },
            title:"layoutPage.homeMenu"

        },
        {
            label: translater("layoutPage.categoryMenu"),
            key: "category",
            icon: <FolderOutlined />,
            onClick: (event: any) => { console.log("Categoria") },
            path: "/category",
            title: "layoutPage.categoryMenu"
        },
        {
            label: "Opção 2",
            key: "option2",
            icon: <DesktopOutlined />,
            onClick: (event: any) => { console.log("Opção 2") }
        },
    ] as ExtendedMenuItem[]
};
