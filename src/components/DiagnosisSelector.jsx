import { memo, useEffect } from 'react';
import { Select } from 'antd';
import pb from '../lib/pocketbase.js';
import useSWR from 'swr';
import {
  useFullDaignosisFetch,
  useResultDiagnosis,
  useSelectedDiagnosis,
} from '../store.js';
import { useShallow } from 'zustand/react/shallow';

export default memo(function DiagnosisSelector() {
  const { resultData, setResultData } = useResultDiagnosis();

  const setSelected = useSelectedDiagnosis(
    (state) => state.setSelected
  );

  const setDiagnosis = useFullDaignosisFetch(
    useShallow((state) => state.setDiagnosis)
  );

  const { data, isLoading } = useSWR(
    'get-diseases',
    async () =>
      await pb.collection('diseases').getFullList({
        sort: 'disease',
      })
  );

  useEffect(() => {
    if (data !== undefined) {
      setDiagnosis(data);
    }
  }, [data]);

  return (
    <>
      <h3>Diagnosis</h3>
      <br />
      <Select
        size="large"
        loading={isLoading}
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
