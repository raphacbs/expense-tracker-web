import React, { useEffect, useState } from 'react';
import { Flex, Layout, Menu, MenuProps, Typography } from 'antd';
import { ExtendedMenuItem, } from 'types';
import { useTranslation } from 'react-i18next';
import { getMenus } from "./menus"
import { useNavigate } from 'react-router-dom';
import theme from "utils/theme"
import DrawerProvider from 'hooks/DrawerContext';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getPageTitle, setPageTitle } from 'features/global/globalSlice';
import LanguageSelector from 'components/LanguageSelectorComponent';

const { Header, Content, Footer, Sider } = Layout;

const App = ({ children }: { children: JSX.Element }) => {
    const pageTitle = useAppSelector(getPageTitle)
    const dispacth = useAppDispatch()
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('1');
    const { Title } = Typography
    const {
        token: { colorBgContainer, borderRadiusContainer, colorBgHeader },
    } = theme;
    const menus: ExtendedMenuItem[] = getMenus(t);


    const onClick: MenuProps['onClick'] = (e) => {

        setCurrent(e.key);
        const item = menus.find(menu => menu?.key === e.key);
        dispacth(setPageTitle(item?.title as string))
        if (item && item.onClick) {
            item.onClick(e.domEvent);
        }
        navigate(item?.path as string);
    };

    useEffect(() => {
        //TODO verificar essa abordagem
        dispacth(setPageTitle(pageTitle))
    }
        , [t, pageTitle])
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[current]}
                    mode="inline"
                    onClick={onClick}
                    items={menus} />
            </Sider>
            <Layout>
                <Header title={pageTitle} style={{ background: colorBgHeader }}>
                    <Flex>
                        <Title level={4}>
                            {t(pageTitle)}
                        </Title>
                        <LanguageSelector />
                    </Flex>
                </Header>
                <DrawerProvider>
                    <Content style={{ margin: '16px 16px' }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: "100%",
                                background: colorBgContainer,
                                borderRadius: borderRadiusContainer,
                                overflowY: 'auto',
                                maxHeight: 'calc(100vh - 200px)'
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                </DrawerProvider>
                <Footer style={{ textAlign: 'center', height: 10 }}>
                    Pernalonga ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;
