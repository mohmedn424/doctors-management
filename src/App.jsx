import { ConfigProvider, theme } from 'antd';
import { routeTree } from './routeTree.gen';
import 'simplebar-react/dist/simplebar.min.css';

import { createRouter, RouterProvider } from '@tanstack/react-router';

export default function App() {
  const router = createRouter({ routeTree });

  ConfigProvider.config({
    holderRender: (children) => (
      <ConfigProvider
        prefixCls="static"
        theme={{ algorithm: theme.darkAlgorithm }}
      >
        {children}
      </ConfigProvider>
    ),
  });

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
