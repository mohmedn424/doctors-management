import { memo } from 'react';
import { Select } from 'antd';
import {
  useResultTreatments,
  useSelectedTreatments,
} from '../treatmentsStore';

export default function TreatmentsSelector() {
  const { resultData, setResultData } = useResultTreatments();
  const { setSelectedTreatments } = useSelectedTreatments();

  return (
    <>
      <br />
      <Select
        size="large"
        onSearch={(e) => setResultData(e)}
        onChange={(e) => setSelectedTreatments(e)}
        mode="multiple"
        placeholder="Start adding Labs & Scans"
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
}
