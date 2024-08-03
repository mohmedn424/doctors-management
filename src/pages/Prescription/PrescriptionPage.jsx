import './prescription.scss';

import { Button, Segmented, Select, Steps } from 'antd';
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
import PatientSearch from '../../components/PatientSearch';

const arr = new Array(100).fill({ label: 'patient name' });

const options = [
  {
    label: 'Current Queue',
    options: arr,
  },
];

let render;

const PrescriptionPage = memo(({ id = null }) => {
  const { current, setCurrent } = useCurrentTab();
  const setSelectedDrugs = useSelectedDrugs(
    (state) => state.setSelectedDrugs
  );
  const setSelected = useSelectedDiagnosis(
    (state) => state.setSelected
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
      {!id && <PatientSearch />}
      <Segmented
        size="large"
        block
        onChange={(e) => setStatus(e)}
        // value={ }
        defaultValue={routeState.consult ? 'consult' : 'new'}
        options={[
          {
            label: 'New comer',
            value: 'new',
          },
          { label: 'Consult', value: 'consult' },
        ]}
        style={{ width: '100%' }}
      />
      <Steps
        className="select"
        current={current}
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
      <div className="content">{render}</div>
    </div>
  );
});

export default PrescriptionPage;
