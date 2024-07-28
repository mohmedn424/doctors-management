import { createRootRoute, Outlet } from '@tanstack/react-router';

import CommonLayout from '../pages/CommonLayout';

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <Outlet /> */}
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  ),
});
