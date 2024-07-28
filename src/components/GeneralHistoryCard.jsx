import { Descriptions, Tag } from 'antd';
import React, { memo } from 'react';

const items = [
  {
    key: '1',
    label: 'Chronic Diseases',
    children: (
      <Tag color="green" className="general-tag">
        Diabetic, Hypertension, Diabetic, Hypertension
      </Tag>
    ),
  },
  {
    key: '2',
    label: 'Smoking',
    children: (
      <Tag color="green" className="general-tag">
        True
      </Tag>
    ),
  },
  {
    key: '3',
    label: 'Allergy',
    children: (
      <Tag color="red" className="general-tag">
        none
      </Tag>
    ),
  },
  {
    key: '4',
    label: 'Notes',
    children: <span>No notes</span>,
  },
];

export default memo(function GeneralHistoryCard() {
  return (
    <Descriptions
      column={{ md: 2 }}
      title="General Info"
      bordered
      items={items}
    />
  );
});
