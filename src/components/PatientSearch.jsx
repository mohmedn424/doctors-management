import { Button, Select } from 'antd';
import { usePatientQueryFetch } from '../patientStore';

export default function PatientSearch() {
  const setQueryResult = usePatientQueryFetch(
    (state) => state.setQueryResult
  );

  return (
    <Select
      showSearch
      size="large"
      onSearch={(text) => setQueryResult(text)}
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
