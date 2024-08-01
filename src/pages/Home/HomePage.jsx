import './home.scss';

import QuickAcess from './components/QuickAccess';
import Statistics from './components/Statistics';
import PatientCard from './components/PatientCard';
import { memo } from 'react';

function HomePage() {
  return (
    <div className="home-container">
      <QuickAcess />
      <PatientCard />
      <Statistics />
    </div>
  );
}

export default memo(HomePage);
