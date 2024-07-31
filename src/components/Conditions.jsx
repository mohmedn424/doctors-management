import { Form, Input, Select } from 'antd';

const items = [
  'ADD/ADHD',
  'Arthritis',
  'Asthma',
  'Athletes Foot',
  'Bed Wetting',
  'Bleeding/Clotting Disorder',
  'Bronchitis',
  'Chicken Pox',
  'Colds/Sore Throats',
  'Constipation',
  'Convulsions',
  'Diabetes',
  'Ear Infections',
  'Epilepsy',
  'Fainting',
  'German Measles',
  'Hay Fever',
  'Headaches/Migraines',
  'Hearing',
  'Heart Defect/Disease',
  'Hypertension',
  'Kidney Disease',
  'Measles',
  'Mononucleosis',
  'Motion Sickness',
  'Mumps',
  'Muscle Disease/Disorder',
  'Nervous System Disorder',
  'Sickle Cell Anemia',
  'Sinusitis',
  'Skeletal Disease/Disorder',
  'Skin Conditions',
  'Sleep Disturbance/Walking',
  'Stomach Upsets',
  'Urinary Tract Infections',
];

const options = items.map((item) => ({
  label: item,
  value: item,
}));

export default function Conditions() {
  return (
    <Form size="large" layout="horizontal">
      <Form.Item name="conditions">
        <Select
          options={options}
          notFoundContent={<p style={{ textAlign: 'right' }}></p>}
          placeholder="Start typing"
          mode="tags"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item name="notes" label="notes/other">
        <Input.TextArea autoSize />
      </Form.Item>
    </Form>
  );
}
