import { Collapse } from 'antd';
import React, { memo } from 'react';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
  {
    key: '4',
    label: 'This is panel header 4',
    children: <p>{text}</p>,
  },
  {
    key: '5',
    label: 'This is panel header 5',
    children: <p>{text}</p>,
  },
];

export default memo(function PastHistoyListCollapse() {
  return (
    <Collapse
      items={items}
      defaultActiveKey={['1']}
      size="middle"
      destroyInactivePanel
    />
  );
});
