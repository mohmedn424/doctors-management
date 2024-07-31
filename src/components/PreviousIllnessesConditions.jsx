import { Collapse, ConfigProvider } from 'antd';
import Allergies from './Allergies';
import Conditions from './Conditions';
import PastSurgicalHistory from './PastSurgicalHistory';
import ReviewOfSystems from './ReviewOfSystems';

export default function PreviousIllnessesConditions() {
  return (
    <>
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
    </>
  );
}
