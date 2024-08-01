import {
  Button,
  Form,
  InputNumber,
  message,
  Radio,
  Select,
  Switch,
} from 'antd';
import {
  useDrugSearchType,
  useDrugSearchValue,
  useResultDrugs,
  useSelectedDrug,
  useSelectedDrugs,
} from '../drugsStore';
export default function DrugsSelector() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const setSelectedDrugs = useSelectedDrugs(
    (state) => state.setSelectedDrugs
  );
  const selectedDrugs = useSelectedDrugs(
    (state) => state.selectedDrugs
  );

  const { resultData, setResultData } = useResultDrugs();
  const searchValue = useDrugSearchValue(
    (state) => state.searchValue
  );
  const setSearchValue = useDrugSearchValue(
    (state) => state.setSearchValue
  );
  const setType = useDrugSearchType((state) => state.setType);

  const setSelected = useSelectedDrug((state) => state.setSelected);
  const selected = useSelectedDrug((state) => state.selected);

  const submitHandler = (e) => {
    const data = {
      tradename: e.drug.title[0],
      activeingredient: e.drug.title[1],
      dose: e.dose,
      doseType: e.doseType,
      duration: e.duration,
      durationType: e.durationType,
      id: e.drug.key,
    };
    form.resetFields();
    if (selectedDrugs.some((el) => el.id === e.drug.key)) {
      messageApi.error('الدواء تمت اضافته بالفعل');
      return;
    }
    setSelectedDrugs([...selectedDrugs, data]);
  };

  return (
    <>
      {contextHolder}
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
              showSearch
              size="large"
              onSearch={(e) => {
                setSearchValue(e);
                setResultData(e);
              }}
              searchValue={searchValue}
              onChange={(e) => {
                setSelected(e);
              }}
              // virtual={false}
              placeholder="Start adding drugs"
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