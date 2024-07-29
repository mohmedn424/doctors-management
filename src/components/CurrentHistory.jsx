import { memo } from 'react';
import PreviousIllnessesConditions from './PreviousIllnessesConditions';
import { Select } from 'antd';

export default memo(function CurrentHistory() {
  return (
    <div className="current-history-wrapper">
      <PreviousIllnessesConditions />

      <div className="current-examintion">
        <h1 style={{ textAlign: 'center' }}>Current Examition</h1>
        <br />
        <Select style={{ width: '100%' }} />
      </div>
    </div>
  );
});
