import { ConfigProvider, theme } from 'antd';
import { routeTree } from './routeTree.gen';

import { createRouter, RouterProvider } from '@tanstack/react-router';

export default function App() {
  const router = createRouter({ routeTree });

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
