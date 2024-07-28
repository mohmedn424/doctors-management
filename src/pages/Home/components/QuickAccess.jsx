import { Button, Card } from 'antd';
import img from '../../../assets/userpp.jpg';
import { Link } from '@tanstack/react-router';
const { Meta } = Card;
function QuickAccess() {
  return (
    <>
      <Card
        cover={<img alt="example" src={img} height={120} />}
        style={{ marginTop: 12, display: 'flex', width: '100%' }}
      >
        <Meta title="Dr: username" description="Internal Medcine" />
      </Card>
      <div className="quick-access-container">
        <Link
          to="/prescription"
          state={{ consult: false, newComer: true }}
        >
          <Button
            size="large"
            type="primary"
            style={{ width: '100%' }}
          >
            New Prescription
          </Button>
        </Link>
      </div>
    </>
  );
}

export default QuickAccess;
