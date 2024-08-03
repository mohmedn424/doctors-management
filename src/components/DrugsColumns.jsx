import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import img from '../assets/rxSign.svg';
import { useEditModalState, useSelectedDrugs } from '../drugsStore';

import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Tag,
} from 'antd';
const removeDrug = useSelectedDrugs.getState().removeDrug;
const setModalStatus = useEditModalState.getState().setModalStatus;
const setDrugId = useEditModalState.getState().setDrugId;

export const columns = [
  {
    title: (
      <img src={img} width={25} style={{ filter: 'invert(100%)' }} />
    ),
    render: (_, record) => {
      return <h3>{record.key}</h3>;
    },
    width: 20,
    align: 'center',
  },
  {
    title: 'Tradename',
    dataIndex: 'tradename',
    key: 'tradename',
    className: 'tradename-column',
  },

  {
    title: 'Dosage',
    dataIndex: 'dosage',
    key: 'dosage',
    align: 'center',
    className: 'column',
  },
  {
    title: 'Frequency',
    dataIndex: 'frequency',
    key: 'frequency',
    align: 'center',
    responsive: ['md'],
    className: 'column',
  },

  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    align: 'center',
    responsive: ['md'],
    className: 'column',
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',

    render: (_, record) => {
      return (
        <div className="actins-wrapper">
          <Button
            icon={<EditOutlined />}
            type="default"
            onClick={() => {
              setModalStatus(true);
              setDrugId(record.id);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            type="dashed"
            danger
            onClick={() => {
              removeDrug(record.id);
            }}
          />
        </div>
      );
    },
  },
];

export default function EditModal() {
  const editDrug = useSelectedDrugs((state) => state.editDrug);

  const [form] = Form.useForm();

  const modalStatus = useEditModalState((state) => state.modalStatus);
  const drugToEdit = useEditModalState((state) => state.drugToEdit);
  return (
    <Modal
      //   okText="Edit"
      okButtonProps={{
        autoFocus: true,
        htmlType: 'submit',
      }}
      closable={false}
      open={modalStatus}
      centered
      destroyOnClose
      maskClosable={false}
      onCancel={() => setModalStatus(false)}
      modalRender={(dom) => (
        <Form
          form={form}
          onFinish={(values) => {
            editDrug(drugToEdit.id, values);
            setModalStatus(false);
          }}
          layout="inline"
          className="form-container"
          size="large"
          name="lol"
          clearOnDestroy
        >
          {dom}
        </Form>
      )}
    >
      <div className="fields-wrabber">
        <div>
          <h1>{drugToEdit.tradename}</h1>
          <br />
          <Tag color="green" style={{ textWrap: 'pretty' }}>
            {drugToEdit.activeingredient}
          </Tag>
        </div>
        <div className="details-wrapper">
          <div
            className="form-items-container"
            style={{
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <Form.Item
              style={{ width: '200px' }}
              name="dose"
              initialValue={drugToEdit.dose}
            >
              <InputNumber
                name="dose"
                addonBefore="Dose"
                addonAfter="unit"
                changeOnWheel
                min={1}
                max={6}
                controls={false}
              />
            </Form.Item>
            <Form.Item
              name="doseType"
              initialValue={drugToEdit.doseType}
            >
              <Radio.Group
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
          <br />
          <div
            className="form-items-container"
            style={{
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <Form.Item
              style={{ width: '200px' }}
              name="duration"
              initialValue={drugToEdit.duration}
            >
              <InputNumber
                addonBefore="Duration"
                changeOnWheel
                min={1}
                controls={false}
              />
            </Form.Item>
            <Form.Item
              name="durationType"
              initialValue={drugToEdit.durationType}
            >
              <Radio.Group
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
      <br />
      <br />
    </Modal>
  );
}
