import { memo } from 'react';
import GeneralHistoryCard from './GeneralHistoryCard';
import PastHistoyListCollapse from './PastHistoyListCollapse';

const PastHistory = memo(() => {
  return (
    <div className="past-history-wrabeer">
      <GeneralHistoryCard />
      <PastHistoyListCollapse />
    </div>
  );
});

export default PastHistory;
