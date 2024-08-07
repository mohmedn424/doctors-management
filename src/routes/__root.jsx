import { createRootRoute, Outlet } from '@tanstack/react-router';

import CommonLayout from '../pages/CommonLayout';
import { Button, Result } from 'antd';

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <Outlet /> */}
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  ),
  notFoundComponent: () => (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  ),
});
