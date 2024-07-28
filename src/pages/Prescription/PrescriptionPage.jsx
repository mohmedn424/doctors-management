import './prescription.scss';

import { AutoComplete, Input, Segmented, Steps } from 'antd';
import BasicInfo from '../../components/BasicInfo';
import PastHistory from '../../components/PastHistory';
import CurrentHistory from '../../components/CurrentHistory';
import {
  useCurrentPrescriptionType,
  useCurrentTab,
} from '../../store';
import { useRouterState } from '@tanstack/react-router';
import { memo, useEffect } from 'react';

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
    <div className="prescription-wrabber">
      {!id && (
        <AutoComplete options={options} style={{ width: '100%' }}>
          <Input.Search
            size="large"
            placeholder="Select Patient"
          ></Input.Search>
        </AutoComplete>
      )}
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
