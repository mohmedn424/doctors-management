import { createFileRoute } from '@tanstack/react-router';
import Submit from '../../../pages/Prescription/Submit';

export const Route = createFileRoute('/prescription/submit/$id')({
  component: () => {
    const { id } = Route.useParams();

    return <Submit id={id} />;
  },
});
