import { memo } from 'react';
import img from '../assets/rxSign.png';
import PreviousIllnessesConditions from './PreviousIllnessesConditions';
import DiagnosisSelector from './DiagnosisSelector';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  Button,
  Collapse,
  ConfigProvider,
  Space,
  Table,
  Tag,
} from 'antd';
import DrugsSelector from './DrugsSelector';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';
import { useSelectedDiagnosis } from '../store';
import { useSelectedDrugs } from '../drugsStore';

const setSelectedDrugs = useSelectedDrugs.getState().setSelectedDrugs;
const selectedDrugs = useSelectedDrugs.getState().selectedDrugs;

const columns = [
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
    // responsive: ['md'],

    render: (_, record) => {
      // const handleDelete = () => {
      //   const newArr = selectedDrugs.filter(
      //     (el) => el.id != record.id
      //   );
      //   setSelectedDrugs(newArr);
      // };

      return (
        <div className="actins-wrapper">
          <Button icon={<EditOutlined />} type="default" />
          <Button
            icon={<DeleteOutlined />}
            type="dashed"
            danger
            // onClick={() => {
            //   handleDelete();
            // }}
          />
        </div>
      );
    },
  },
];

export default memo(function CurrentHistory() {
  const selected = useSelectedDiagnosis((state) => state.selected);
  const selectedDrugs = useSelectedDrugs(
    (state) => state.selectedDrugs
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          // Select: {
          //   optionFontSize: 16,
          //   fontSizeIcon: 20,
          // },
        },
      }}
    >
      <div className="current-history-wrapper">
        <Collapse
          accordion
          defaultActiveKey={2}
          size="large"
          bordered={false}
          expandIconPosition="end"
          destroyInactivePanel
        >
          <CollapsePanel
            key={1}
            header="previous illnesses or conditions"
          >
            <PreviousIllnessesConditions />
          </CollapsePanel>
          <CollapsePanel key={2} header="Current Examition">
            <DiagnosisSelector />
            <br />
            <br />
            <DrugsSelector />
          </CollapsePanel>
        </Collapse>
        <br />
        <Table
          size="large"
          bordered
          className="table-wrapper"
          rowKey="id"
          columns={columns}
          dataSource={selectedDrugs.map((drug, index) => {
            const {
              tradename,
              activeingredient,
              dose,
              doseType,
              duration,
              durationType,
            } = drug;

            const frequency = `Every ${Math.trunc(24 / dose)} hours`;

            return {
              tradename: (
                <div>
                  <h3>{tradename}</h3>
                  {activeingredient.length > 0 && (
                    <>
                      <br />
                      <Tag
                        color="green"
                        style={{ textWrap: 'pretty' }}
                      >
                        {activeingredient}
                      </Tag>
                    </>
                  )}
                </div>
              ),
              dosage: `${dose} units | ${doseType}`,
              frequency: frequency,
              duration: `For ${duration} ${durationType}`,
              key: index + 1,
              id: drug.id,
            };
          })}
          pagination={false}
          title={() => (
            <>
              <h1>Current Drugs</h1>
              <p style={{ fontSize: 16 }}>
                {selected.length > 0 && (
                  <>
                    Diagnosis: <br />
                    {selected.map((item, index) => {
                      return (
                        <strong key={item.id}>
                          {index + 1}: {item.label}
                          {selected[selected.length - 1].value ===
                          item.value
                            ? ''
                            : ' - '}
                        </strong>
                      );
                    })}
                  </>
                )}
              </p>
            </>
          )}
        />
      </div>
    </ConfigProvider>
  );
});
