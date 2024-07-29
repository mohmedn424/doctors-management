import { Form, Input, Select } from 'antd';
import { memo } from 'react';

export default memo(function Allergies() {
  return (
    <Form size="large" layout="horizontal">
      <Form.Item name="allergies">
        <Select
          notFoundContent={
            <p style={{ textAlign: 'right' }}>
              ابدا بكتابة الحساسية الموجودة عند المريض
            </p>
          }
          placeholder="Start typing"
          mode="tags"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item name="notes" label="notes/other">
        <Input />
      </Form.Item>
    </Form>
  );
});
