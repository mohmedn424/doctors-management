import { memo } from 'react';
import PreviousIllnessesConditions from './PreviousIllnessesConditions';

export default memo(function CurrentHistory() {
  return (
    <div className="current-history-wrapper">
      <PreviousIllnessesConditions />
    </div>
  );
});
