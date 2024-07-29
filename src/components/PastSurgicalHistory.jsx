import { Form, Input, Select } from 'antd';

const items = [
  'Appendectomy',
  'Bariatric surgery',
  'Brain surgery',
  'Breast surgery',
  'CABG (bypass)',
  'Cesarean section',
  'Cholecystectomy (gall bladder removal)',
  'Colon surgery',
  'Cosmetic surgery',
  'Eye surgery',
  'Fracture surgery',
  'Hernia repair',
  'Hysterectomy (ovaries remain)',
  'Hysterectomy (ovaries removed)',
  'Joint replacement',
  'Prostate surgery',
  'Small intestine surgery',
  'Spine surgery',
  'Tonsillectomy and Adenoidectomy',
  'Tubal ligation (tubes tied)',
  'Valve replacement',
  'Vasectomy',
];

const options = items.map((item) => ({
  label: item,
  value: item,
}));
export default function PastSurgicalHistory() {
  return (
    <Form size="large" layout="vertical">
      <Form.Item name="pastSurgicalHistory">
        <Select
          options={options}
          notFoundContent={<p style={{ textAlign: 'right' }}></p>}
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
}
