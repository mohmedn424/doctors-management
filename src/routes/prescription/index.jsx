import { createFileRoute } from '@tanstack/react-router';

import PrescriptionPage from '../../pages/Prescription/PrescriptionPage';
export const Route = createFileRoute('/prescription/')({
  component: () => <PrescriptionPage />,
});
