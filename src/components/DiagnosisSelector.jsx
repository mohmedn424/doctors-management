import { memo } from 'react';
import { Select } from 'antd';

import { useResultDiagnosis, useSelectedDiagnosis } from '../store';

export default memo(function DiagnosisSelector() {
  const { resultData, setResultData } = useResultDiagnosis();

  const setSelected = useSelectedDiagnosis(
    (state) => state.setSelected
  );

  return (
    <>
      <h3>Diagnosis</h3>
      <br />
      <Select
        size="large"
        onSearch={(e) => setResultData(e)}
        onChange={(e) => setSelected(e)}
        mode="multiple"
        placeholder="Start adding diagnosis"
        style={{ width: '100%' }}
        filterOption={false}
        options={resultData}
        allowClear
        labelInValue
        placement="bottomLeft"
        maxCount={6}
      />
    </>
  );
});
