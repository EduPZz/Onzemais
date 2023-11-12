import React, { useContext } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Divider, Layout, Menu, Space, theme } from 'antd';
import { Outlet } from 'react-router-dom';

import { Context } from "../Context/AuthContext";

const { Header, Content, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { handleLogout, user } = useContext(Context);

  const visible = user?.perfil === 'admin' ? 'block' : 'none';
  console.log(visible)
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" style={{ color: 'white' }} >
          Onzemais
        </div>
        <Button type="primary" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
          Sair
        </Button>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0,
                marginTop: '32px',
              }}
            >
              <Menu.Item key="1" icon={<UserOutlined />}>
                Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<LaptopOutlined />}>
                Option 2
              </Menu.Item>
              <Menu.Item key="3" icon={<NotificationOutlined />}>
                Option 3
              </Menu.Item>
              <Menu.Item key="4" style={{display: `${visible}`}} icon={<UserOutlined />}>
                  Option 1
                </Menu.Item>
              <Menu.Item key="5" style={{display: `${visible}`}} icon={<LaptopOutlined />}>
                Option 2
              </Menu.Item>
              <Menu.Item key="6" style={{display: `${visible}`}}  icon={<NotificationOutlined />}>
                Option 3
              </Menu.Item>
            </Menu>
          </Space>
        </Sider>
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet/>
          </Content>
      </Layout>
    </Layout>
  );
};
export default App;