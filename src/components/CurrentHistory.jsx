import { memo } from 'react';
import PreviousIllnessesConditions from './PreviousIllnessesConditions';
import DiagnosisSelector from './DiagnosisSelector';
import { Button, Collapse, ConfigProvider, Table, Tag } from 'antd';
import DrugsSelector from './DrugsSelector';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';
import { useSelectedDiagnosis } from '../store';
import { useSelectedDrugs } from '../drugsStore';
import EditModal, { columns } from './DrugsColumns';

export default memo(function CurrentHistory() {
  const selected = useSelectedDiagnosis((state) => state.selected);
  const { selectedDrugs } = useSelectedDrugs();

  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <EditModal />
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
          dataSource={selectedDrugs.map(
            (
              {
                tradename,
                activeingredient,
                dose,
                doseType,
                duration,
                durationType,
                id,
              },
              index
            ) => {
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
                id: id,
              };
            }
          )}
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
