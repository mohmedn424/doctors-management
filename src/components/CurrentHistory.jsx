import { memo } from 'react';
import PreviousIllnessesConditions from './PreviousIllnessesConditions';
import DiagnosisSelector from './DiagnosisSelector';
import { Card, Collapse, ConfigProvider } from 'antd';
import DrugsSelector from './DrugsSelector';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';

export default memo(function CurrentHistory() {
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
      </div>
    </ConfigProvider>
  );
});
