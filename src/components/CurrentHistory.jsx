import { memo } from 'react';
// import PreviousIllnessesConditions from './PreviousIllnessesConditions';
import DiagnosisSelector from './DiagnosisSelector';
import { Button, Collapse } from 'antd';
import DrugsSelector from './DrugsSelector';

import EditModal from './DrugsColumns';
import PrescriptionTable from './PrescriptionTable';
import TreatmentsSelector from './TreatmentsSelector';

import { createPatientRecord } from '../patientStore';
import { useNavigate } from '@tanstack/react-router';
import { FileAddOutlined } from '@ant-design/icons';
import SubmitPrescriptionBtn from './SubmitPrescriptionBtn';

const items = [
  // {
  //   key: 1,
  //   label: 'previous illnesses or conditions',
  //   children: <PreviousIllnessesConditions />,
  // },
  {
    key: 2,
    label: <h3>Diagnosis & Drugs</h3>,
    children: (
      <>
        <DiagnosisSelector />
        <DrugsSelector />
      </>
    ),
  },
  {
    key: 3,
    label: <h3>Labs & Scans</h3>,
    children: <TreatmentsSelector />,
  },
];

export default memo(function CurrentHistory() {
  return (
    <>
      <EditModal />

      <div className="current-history-wrapper">
        <Collapse
          size="large"
          bordered={false}
          expandIconPosition="end"
          destroyInactivePanel
          items={items}
        />

        <PrescriptionTable />

        <SubmitPrescriptionBtn />
      </div>
    </>
  );
});
