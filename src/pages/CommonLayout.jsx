import { Link, useRouterState } from '@tanstack/react-router';
import './layout.scss';
import { Layout, Menu, theme } from 'antd';
import { memo, useEffect } from 'react';
import { useCurrentRoute } from '../store';
const { Header, Content } = Layout;

const CommonLayout = memo(({ children }) => {
  const { path, setPath, setFullPath } = useCurrentRoute();

  const router = useRouterState();

  useEffect(() => {
    router.location.pathname.split('/')[1] === ''
      ? setPath(router.location.pathname)
      : setPath(router.location.pathname.split('/')[1]);

    setFullPath(router.location.pathname);
  }, [router.location.pathname]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="main-app-container layout">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          backgroundColor: colorBgContainer,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={path}
          items={[
            { label: <Link to="/">Home</Link>, key: '/' },
            {
              label: <Link to="/prescription">New Prescription</Link>,
              key: 'prescription',
            },
          ]}
          style={{
            flex: 1,
          }}
          selectable={false}
        />
      </Header>

      <Content
        style={{
          padding: '0 24px',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
});

export default CommonLayout;
