import React, { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { ExtendedMenuItem, MenuItem } from 'types';
import { useTranslation } from 'react-i18next';
import {getMenus} from "./menus"
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const App = ({ children }: { children: JSX.Element }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('1');
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const menus: ExtendedMenuItem[] = getMenus(t);
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        const item = menus.find(menu => menu?.key === e.key);
        if (item && item.onClick) {
            item.onClick(e.domEvent);
        }
        navigate(item?.path as string);
    };

    useEffect(()=>{
        console.log("Atualizou t")
    }        
    ,[t])

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
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>

                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Pernalonga ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;
