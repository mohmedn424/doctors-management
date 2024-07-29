import {
  Collapse,
  ConfigProvider,
  Form,
  Input,
  Radio,
  Select,
} from 'antd';
import Allergies from './Allergies';
import Conditions from './Conditions';
import PastSurgicalHistory from './PastSurgicalHistory';
import ReviewOfSystems from './ReviewOfSystems';

export default function PreviousIllnessesConditions() {
  const formFinish = (e) => {};

  return (
    <>
      <h2>previous illnesses or conditions</h2>
      <br />
      <ConfigProvider
        theme={{
          components: {},
        }}
      >
        <Collapse destroyInactivePanel bordered={false} accordion>
          <Collapse.Panel header="Allergies">
            <Allergies />
          </Collapse.Panel>

          <Collapse.Panel header="Conditions">
            <Conditions />
          </Collapse.Panel>
          <Collapse.Panel header="Past Surgical History">
            <PastSurgicalHistory />
          </Collapse.Panel>
          <Collapse.Panel header="Review of Systems">
            <ReviewOfSystems />
          </Collapse.Panel>
        </Collapse>
      </ConfigProvider>
    </>
  );
}
