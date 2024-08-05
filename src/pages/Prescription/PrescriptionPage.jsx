import './prescription.scss';

import { Steps } from 'antd';
import BasicInfo from '../../components/BasicInfo';
import PastHistory from '../../components/PastHistory';
import CurrentHistory from '../../components/CurrentHistory';
import {
  useCurrentPrescriptionType,
  useCurrentTab,
  useSelectedDiagnosis,
} from '../../store';
import { useRouterState } from '@tanstack/react-router';
import { memo, useEffect } from 'react';
import { useSelectedDrugs } from '../../drugsStore';
import { useSelectedTreatments } from '../../treatmentsStore';

let render;

const PrescriptionPage = memo(({ id = null }) => {
  const { current, setCurrent } = useCurrentTab();
  const setSelectedDrugs = useSelectedDrugs(
    (state) => state.setSelectedDrugs
  );
  const setSelected = useSelectedDiagnosis(
    (state) => state.setSelected
  );

  const setSelectedTreatments = useSelectedTreatments(
    (state) => state.setSelectedTreatments
  );
  const { status, setStatus } = useCurrentPrescriptionType();

  const routeState = useRouterState({
    select: (s) => s.location.state,
  });

  useEffect(() => {
    if (routeState.hasOwnProperty('consult')) {
      if (routeState.consult) setStatus('consult');
      if (routeState.newComer) setStatus('new');
    }
  }, [routeState]);
  useEffect(() => {
    setCurrent(0);
    setSelectedDrugs([]);
    setSelected([]);
    setSelectedTreatments([]);
  }, []);

  switch (current) {
    case 0:
      render = <BasicInfo />;
      break;
    case 1:
      render = <PastHistory />;
      break;
    case 2:
      render = <CurrentHistory />;
      break;
  }
  return (
    <div className="prescription-wrapper">
      {/* {!id && <PatientSearch />} */}

      <Steps
        className="select"
        current={current}
        labelPlacement="vertical"
        // progressDot={true}
        type="navigation"
        size="small"
        items={[
          {
            title: 'Basic info',
          },
          {
            title: 'Past history',
          },
          {
            title: 'Current history',
          },
        ]}
        onChange={(value) => {
          setCurrent(value);
        }}
      />
      <br />
      <div className="content">{render}</div>
    </div>
  );
});

export default PrescriptionPage;
