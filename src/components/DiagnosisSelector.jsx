import { useEffect } from 'react';
import { Select } from 'antd';
import pb from '../lib/pocketbase.js';
import useSWR from 'swr';
import {
  useFullDaignosisFetch,
  useResultDiagnosis,
} from '../store.js';
import { useShallow } from 'zustand/react/shallow';
export default function DiagnosisSelector() {
  const { resultData, setResultData } = useResultDiagnosis();

  const currentData = useFullDaignosisFetch(
    useShallow((state) => state.currentData)
  );
  const setDiagnosis = useFullDaignosisFetch(
    useShallow((state) => state.setDiagnosis)
  );

  const { data, isLoading, mutate } = useSWR(
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
      <h2>Diagnosis</h2>
      <br />
      <Select
        onSearch={(e) => setResultData(e)}
        onChange={(e) => console.log(e)}
        mode="multiple"
        placeholder="Start adding your diagnosis"
        tokenSeparators={[',']}
        style={{ width: '100%' }}
        filterOption={false}
        options={resultData.length > 0 ? resultData : currentData}
        allowClear
        labelInValue
        maxCount={6}
      />
    </>
  );
}
