import pb from '../lib/pocketbase.js';
import useSWR from 'swr';
import { useEffect, useRef } from 'react';

import {
  Button,
  Form,
  InputNumber,
  Radio,
  Select,
  Switch,
} from 'antd';
import {
  useDrugSearchType,
  useDrugSearchValue,
  useFullDrugsFetch,
  useResultDrugs,
  useSelectedDrugs,
} from '../store.js';
import { useShallow } from 'zustand/react/shallow';
export default function DrugsSelector() {
  const [form] = Form.useForm();
  const drugsRef = useRef();

  const { resultData, setResultData } = useResultDrugs();
  const searchValue = useDrugSearchValue(
    (state) => state.searchValue
  );
  const setSearchValue = useDrugSearchValue(
    (state) => state.setSearchValue
  );
  const setType = useDrugSearchType((state) => state.setType);

  const setSelected = useSelectedDrugs((state) => state.setSelected);
  const selected = useSelectedDrugs((state) => state.selected);

  const setDrugs = useFullDrugsFetch(
    useShallow((state) => state.setDrugs)
  );

  const { data, isLoading } = useSWR(
    'get-drugs',
    async () =>
      await pb.collection('drugs_new').getFullList({
        sort: 'tradename',
      })
  );

  useEffect(() => {
    if (data !== undefined) {
      setDrugs(data);
    }
  }, [data]);

  const submitHandler = (e) => {
    form.resetFields();

    console.log(e);
  };

  return (
    <>
      <div className="select-drugs-wrabber">
        <h3>Select Drugs</h3>
        <div>
          <label>activeingredient:</label>

          <Switch onChange={(e) => setType(e)} />
        </div>
      </div>

      <br />

      <Form
        form={form}
        name="drugSelector"
        size="large"
        layout="inline"
        className="form-container"
        onFinish={submitHandler}
        initialValues={{
          dose: 2,
          doseType: 'daily',
          duration: 7,
          durationType: 'days',
        }}
      >
        <div className="fields-wrabber">
          <Form.Item
            name="drug"
            onReset={() => {
              setSelected(undefined);
            }}
            rules={[
              {
                required: true,
                message: 'Please select drug first!',
              },
            ]}
          >
            <Select
              ref={drugsRef}
              showSearch
              size="large"
              onSearch={(e) => {
                setSearchValue(e);
                setResultData(e);
              }}
              searchValue={searchValue}
              onChange={(e) => setSelected(e)}
              placeholder="Start adding diagnosis"
              filterOption={false}
              style={{ width: '100%' }}
              options={resultData}
              status={
                searchValue.length > 0 && resultData.length === 0
                  ? 'error'
                  : ''
              }
              allowClear
              labelInValue
            />
          </Form.Item>
          <div className="details-wrapper">
            <div className="form-items-container">
              <Form.Item style={{ width: '200px' }} name="dose">
                <InputNumber
                  disabled={selected === undefined}
                  name="dose"
                  addonBefore="Dose"
                  addonAfter="unit"
                  changeOnWheel
                  min={1}
                  max={6}
                  controls={false}
                />
              </Form.Item>
              <Form.Item name="doseType">
                <Radio.Group
                  disabled={selected === undefined}
                  optionType="button"
                  buttonStyle="solid"
                  popupMatchSelectWidth={false}
                  options={[
                    { label: 'daily', value: 'daily' },
                    { label: 'weekly', value: 'weekly' },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="form-items-container">
              <Form.Item style={{ width: '180px' }} name="duration">
                <InputNumber
                  disabled={selected === undefined}
                  addonBefore="Duration"
                  changeOnWheel
                  min={1}
                  controls={false}
                />
              </Form.Item>
              <Form.Item name="durationType">
                <Radio.Group
                  disabled={selected === undefined}
                  optionType="button"
                  buttonStyle="solid"
                  popupMatchSelectWidth={false}
                  options={[
                    { label: 'days', value: 'days' },
                    { label: 'weeks', value: 'weeks' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <Button shape="round" type="primary" htmlType="submit">
          Add to Prescription
        </Button>
      </Form>
    </>
  );
}
