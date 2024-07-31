import { memo, useEffect } from 'react';
import PreviousIllnessesConditions from './PreviousIllnessesConditions';
import DiagnosisSelector from './DiagnosisSelector';

export default memo(function CurrentHistory() {
  return (
    <div className="current-history-wrapper">
      <PreviousIllnessesConditions />

      <div className="current-examintion">
        <h1 style={{ textAlign: 'center' }}>Current Examition</h1>
        <br />
        <DiagnosisSelector />
      </div>
    </div>
  );
});
