import { memo } from 'react';
import PreviousIllnessesConditions from './PreviousIllnessesConditions';
import DiagnosisSelector from './DiagnosisSelector';
import { Collapse, ConfigProvider, Segmented } from 'antd';
import DrugsSelector from './DrugsSelector';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';

import EditModal from './DrugsColumns';
import PrescriptionTable from './PrescriptionTable';
import TreatmentsSelector from './TreatmentsSelector';

export default memo(function CurrentHistory() {
  return (
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <EditModal />

      <div className="current-history-wrapper">
        <Collapse
          // defaultActiveKey={2}
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
          <CollapsePanel key={2} header={<h3>Diagnosis & Drugs</h3>}>
            <DiagnosisSelector />
            <br />
            <br />
            <DrugsSelector />
          </CollapsePanel>

          <CollapsePanel header={<h3>Labs & Scans</h3>} key={3}>
            <TreatmentsSelector />
          </CollapsePanel>
        </Collapse>
        <br />
        <br />
        <PrescriptionTable />
        <br />
      </div>
    </ConfigProvider>
  );
});
