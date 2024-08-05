import { Button, Select } from 'antd';
import { usePatientQuery } from '../patientStore';

export default function PatientSearch() {
  const queryPatient = usePatientQuery((state) => state.queryPatient);
  const queryResultOptions = usePatientQuery(
    (state) => state.queryResultOptions
  );

  return (
    <Select
      showSearch
      size="large"
      onSearch={(text) => queryPatient(text)}
      options={queryResultOptions}
      allowClear
      notFoundContent={
        <>
          <h3
            style={{
              textAlign: 'center',

              color: 'white',
            }}
          >
            المريض غير مسجل على قاعدة البيانات
          </h3>
          <br />
          <Button size="large" style={{ width: '100%' }}>
            اضافة مريض جديد
            <br />
          </Button>
        </>
      }
      style={{ width: '100%' }}
    />
  );
}
