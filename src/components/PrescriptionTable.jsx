import { Segmented, Table, Tag } from 'antd';
import { columns } from './DrugsColumns';
import {
  useCurrentPrescriptionType,
  useSelectedDiagnosis,
} from '../store';
import { useSelectedDrugs } from '../drugsStore';
import { useSelectedTreatments } from '../treatmentsStore';
import { useRouterState } from '@tanstack/react-router';

export default function PrescriptionTable() {
  const routeState = useRouterState({
    select: (s) => s.location.state,
  });

  const selected = useSelectedDiagnosis((state) => state.selected);
  const { selectedDrugs } = useSelectedDrugs();

  const { selectedTreatments } = useSelectedTreatments();

  const setStatus = useCurrentPrescriptionType(
    (state) => state.setStatus
  );

  return (
    <Table
      size="large"
      bordered
      className="table-wrapper"
      rowKey="id"
      pagination={false}
      columns={columns}
      footer={() => {
        return (
          <p style={{ fontSize: 16 }}>
            {selectedTreatments.length > 0 && (
              <>
                Treatments: <br />
                {selectedTreatments.map((item, index) => {
                  return (
                    <strong key={item.id}>
                      {index + 1}: {item.label}
                      {selectedTreatments[
                        selectedTreatments.length - 1
                      ].value === item.value
                        ? ''
                        : ' - '}
                    </strong>
                  );
                })}
              </>
            )}
          </p>
        );
      }}
      dataSource={selectedDrugs.map(
        (
          {
            tradename,
            activeingredient,
            dose,
            doseType,
            duration,
            durationType,
            id,
          },
          index
        ) => {
          const frequency = `Every ${Math.trunc(24 / dose)} hours`;

          return {
            tradename: (
              <div>
                <h3>{tradename}</h3>
                {activeingredient.length > 0 && (
                  <>
                    <br />
                    <Tag color="green" style={{ textWrap: 'pretty' }}>
                      {activeingredient}
                    </Tag>
                  </>
                )}
              </div>
            ),
            dosage: `${dose} units | ${doseType}`,
            frequency: frequency,
            duration: `For ${duration} ${durationType}`,
            key: index + 1,
            id: id,
          };
        }
      )}
      title={() => (
        <>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1>
              Current Drugs{' '}
              <sup
                style={{
                  fontSize: 16,
                }}
              >
                {selectedDrugs.length}
              </sup>
            </h1>
            <Segmented
              size="large"
              onChange={(e) => setStatus(e)}
              defaultValue={routeState.consult ? 'consult' : 'new'}
              options={[
                {
                  label: 'New comer',
                  value: 'new',
                },
                { label: 'Consult', value: 'consult' },
              ]}
              className="segment"
            />
          </div>
          <p style={{ fontSize: 16 }}>
            {selected.length > 0 && (
              <>
                Diagnosis: <br />
                {selected.map((item, index) => {
                  return (
                    <strong key={item.id}>
                      {index + 1}: {item.label}
                      {selected[selected.length - 1].value ===
                      item.value
                        ? ''
                        : ' - '}
                    </strong>
                  );
                })}
              </>
            )}
          </p>
        </>
      )}
    />
  );
}
