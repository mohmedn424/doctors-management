import { memo } from 'react';
import GeneralHistoryCard from './GeneralHistoryCard';
import PastHistoyListCollapse from './PastHistoyListCollapse';

const PastHistory = memo(() => {
  return (
    <div className="past-history-wrabeer">
      <h1>Past history</h1>
      <GeneralHistoryCard />
      <PastHistoyListCollapse />
    </div>
  );
});

export default PastHistory;
