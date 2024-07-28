import { Link } from '@tanstack/react-router';
import { Card, Descriptions, Tag } from 'antd';

function PatientCard() {
  return (
    <div
      className="patient-card-wrabber"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5em',
      }}
    >
      <h1> Current patient</h1>
      <Card
        title={
          <Link
            to="/prescription/$id"
            params={{ id: 123 }}
            state={{ consult: true, newComer: false }}
          >
            <span>Mohmed Nabil - (xx) </span>
            {/* <Tag color="green">New comer</Tag>
            <span>Or </span> */}
            <Tag color="blue">Consult</Tag>
          </Link>
        }
      >
        <Descriptions
          size="small"
          title="main info"
          // bordered
          column={{ md: 3, sm: 2 }}
        >
          <Descriptions.Item label="Full name" span={3}>
            محمد نبيل رفاعي أحمد
          </Descriptions.Item>
          <Descriptions.Item label="Age">23 years</Descriptions.Item>
          <Descriptions.Item label="sex">Male</Descriptions.Item>
          <Descriptions.Item span={2} label="Address">
            Namul
          </Descriptions.Item>
          <Descriptions.Item label="Last visit">
            10/7/2024
          </Descriptions.Item>
          <Descriptions.Item label="notes">
            Lorem ipsum dolor
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default PatientCard;
