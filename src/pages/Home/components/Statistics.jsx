import CountUp from 'react-countup';
import { Card, Statistic, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const formatter = (value) => <CountUp end={value} duration={2} />;

function Statistics() {
  return (
    <div className="Statistics-container">
      <Card className="Statistics-card" title="Clinic statsics">
        <div className="Remaining-patients">
          <Tag
            color="blue"
            className="title blink tag"
            style={{ height: 'max-content' }}
          >
            Current Queue
          </Tag>

          <Tag className="stat1 tag">
            <Statistic
              value={10}
              title="Total visits"
              formatter={formatter}
            />
          </Tag>
          <Tag className="stat2 tag" color="green">
            <Statistic
              value={4}
              title="New comers"
              formatter={formatter}
            />
          </Tag>
        </div>
        <Tag className="finished tag" color="green">
          <Statistic
            value={10}
            title="Finished today"
            formatter={formatter}
          />
          <CheckCircleOutlined style={{ fontSize: '30px' }} />
        </Tag>
      </Card>
      <Card className="Statistics-card" title="Money 💵"></Card>
    </div>
  );
}

export default Statistics;
