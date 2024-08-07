import { useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';
import { Button, Descriptions, Divider, Result } from 'antd';

export default function Submit({ id }) {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetch() {
      try {
        const record = await pb
          .collection('patient_history')
          .getOne(id, {
            expand: 'patient,diagnosis,drugs,treatments,doctor',
          });

        setData(record);
      } catch (err) {
        // console.log(err.originalError.status);
      }
    }
    fetch();
  }, [id]);

  if (data.id) {
    return (
      <div>
        <Result
          status="success"
          title={
            <h3 className="success-request-title">
              {' '}
              Prescription created Successfully.
              <br />
              <small>At: {data.date}</small>
            </h3>
          }
          subTitle={
            <div className="success-request-wrapper">
              <Descriptions
                title="prescription details"
                bordered
                layout="horizontal"
                column={2}
                items={[
                  {
                    key: '1',
                    label: ' prescription id',
                    children: <p>{id}</p>,
                    span: { md: 1, xs: 2, sm: 2 },
                  },
                  {
                    key: '2',
                    label: 'Patient name',
                    children: <p>{data.expand?.patient.name}</p>,
                    span: { md: 1, xs: 2, sm: 2 },
                  },
                  {
                    key: '3',
                    label: 'Diagnosis',
                    children: (
                      <p>
                        {data.expand?.diagnosis?.map((disease) => (
                          <p key={disease.id}>{disease.disease}</p>
                        ))}
                      </p>
                    ),
                    span: 2,
                  },
                  {
                    key: '4',
                    label: ' Described Drugs',
                    children: (
                      <p>
                        {data.expand?.drugs?.map((drug) => (
                          <p key={drug.id}>{drug.tradename}</p>
                        ))}
                      </p>
                    ),
                    span: 2,
                  },
                  {
                    key: '5',
                    label: 'Labs & Scans',
                    children: (
                      <p>
                        {data.expand?.treatments?.map((treatment) => (
                          <p key={treatment.id}>
                            {treatment.procedure}
                          </p>
                        ))}
                      </p>
                    ),
                    span: 2,
                  },
                ]}
              />
            </div>
          }
          extra={[
            <Button type="primary" key="console">
              Go Console
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />
      </div>
    );
  } else {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the prescription not found"
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }
}
