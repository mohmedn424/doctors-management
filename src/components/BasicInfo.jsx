import { DatePicker, Form, Input, Radio, Tag } from 'antd';
import dayjs from 'dayjs';
import { memo } from 'react';

const BasicInfo = memo(() => {
  const defaultValues = {
    name: 'محمد نبيل رفاعي أحمد',
    age: dayjs('2001-03-28'),
    sex: 'male',
    address: 'نامول - مركز طوخ - القليوبية',
    contactPhone: '01094778601',
    martialStatus: 'single',
  };

  return (
    <div className="basic-info-wrapper">
      <h1>Basic Info</h1>
      <Form
        className="form"
        layout="vertical"
        initialValues={defaultValues}
        size="large"
        variant="filled"
      >
        <Form.Item
          label="Name"
          name="name"
          extra={
            <span style={{ userSelect: 'none' }}>
              يفضل كتابة الاسم باللغة العربية
            </span>
          }
        >
          <Input />
        </Form.Item>
        <Form.Item label="Age">
          <DatePicker
            picker="month"
            allowClear={false}
            defaultValue={defaultValues.age}
          />
          <Tag style={{ marginLeft: 50, scale: '1.7' }} color="green">
            {`${dayjs().diff(defaultValues.age, 'y')} years`}
          </Tag>
        </Form.Item>
        <Form.Item label="Sex" name="sex">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="male">Male</Radio.Button>
            <Radio.Button value="female">Female</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Contact Phone" name="contactPhone">
          <Input />
        </Form.Item>
        <Form.Item
          label="Martial status"
          name="martialStatus"
          labelCol={4}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="single">Single</Radio.Button>
            <Radio.Button value="married">Married</Radio.Button>
            <Radio.Button value="widowed">Widowed</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
});

export default BasicInfo;
