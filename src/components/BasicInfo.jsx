import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Tag,
} from 'antd';
import dayjs from 'dayjs';
import { memo } from 'react';

import { useBasicPatientInfo } from '../store';
import { PhoneFilled } from '@ant-design/icons';

const BasicInfo = memo(() => {
  const { basicInfo, setBasicInfo } = useBasicPatientInfo();

  // const basicInfo = {
  //   name: 'محمد نبيل رفاعي أحمد',
  //   dob: dayjs('2001-03-28'),
  //   sex: 'male',
  //   address: 'نامول - مركز طوخ - القليوبية',
  //   contactPhone: '01094778601',
  //   martialStatus: 'single',
  // };

  const ageFromDate = () => {
    let render;
    const diff = dayjs().diff(basicInfo.dob, 'dates');

    if (isNaN(diff)) {
      render = 'Please select the date of birth (DOB) firsr';
    } else {
      let years = diff / (1000 * 86400 * 365);
      let months = (years - Math.floor(years)) * 12;
      let days = (months - Math.floor(months)) * 30;

      years = Math.floor(years);
      months = Math.floor(months);
      days = Math.floor(days);

      const renderYears = `${years > 0 ? `${years} ${years > 1 ? 'years' : 'year'} and` : ''} `;

      const renderMonths = `${months > 0 ? `${months} ${months > 1 ? 'months' : 'month'} and` : ''} `;

      render = `${renderYears} ${renderMonths} ${days} ${days > 1 || (days === 0 && months > 0) ? 'days' : 'day'}`;
    }

    return render;
  };

  return (
    <div className="basic-info-wrapper">
      <h1>Basic Info</h1>
      <Form
        className="form"
        layout="vertical"
        initialValues={basicInfo}
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
          <Input style={{ textAlign: 'center', fontSize: 22 }} />
        </Form.Item>
        <Form.Item label="DOB">
          <DatePicker
            format={[
              'DD-MM-YYYY',
              'D-M-YYYY',
              'D-MM-YYYY',
              'DD-M-YYYY',
              'DD/MM/YYYY',
              'D/M/YYYY',
              'D/MM/YYYY',
              'DD/M/YYYY',
              'DD\\MM\\YYYY',
              'D\\M\\YYYY',
              'D\\MM\\YYYY',
              'DD\\M\\YYYY',
            ]}
            maxDate={dayjs()}
            onChange={(e) =>
              setBasicInfo({
                ...basicInfo,
                dob: e,
              })
            }
            picker="date"
            allowClear={true}
            defaultValue={basicInfo.dob}
          />
          {
            <Tag
              style={{ fontSize: 18, padding: 6, marginLeft: 10 }}
              color="geekblue"
            >
              {ageFromDate()}
            </Tag>
          }
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
          <InputNumber
            controls={false}
            style={{
              width: 'fit-content',
            }}
            addonAfter={
              <PhoneFilled style={{ fontSize: 22, color: 'green' }} />
            }
          />
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
