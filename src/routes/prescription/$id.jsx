import { createFileRoute, useParams } from '@tanstack/react-router';
import PrescriptionPage from '../../pages/Prescription/PrescriptionPage';

export const Route = createFileRoute('/prescription/$id')({
  component: () => {
    const { id } = Route.useParams();

    return <PrescriptionPage id={id} />;
  },
});
