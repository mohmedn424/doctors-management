import { Button } from 'antd';
import { useSelectedDrugs } from '../drugsStore';
import { useSelectedDiagnosis } from '../store';
import { useSelectedTreatments } from '../treatmentsStore';
import { FileAddOutlined } from '@ant-design/icons';
import pb from '../lib/pocketbase';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function SubmitPrescriptionBtn() {
  const navigate = useNavigate();
  const [record, setRecord] = useState({});

  const createPatientRecord = async () => {
    const { selectedDrugs } = useSelectedDrugs.getState();
    const { selected: selectedDiagnosis } =
      useSelectedDiagnosis.getState();

    const { selectedTreatments } = useSelectedTreatments.getState();

    const drugs = selectedDrugs.map((drug) => drug.id);
    const diagnosis = selectedDiagnosis.map(
      (diagnose) => diagnose.key
    );
    const treatments = selectedTreatments.map((treat) => treat.key);

    const record = await pb.collection('patient_history').create({
      patient: 'rwapuqhivoh6ax5',
      date: dayjs().format('YYYY-MM-DD | hh-mm A'),
      doctor: 'nkzd0cqdmrhcr9e',
      drugs,
      diagnosis,
      treatments,
    });

    if (record) {
      navigate({
        params: { id: record.id },
        to: '/prescription/submit/$id',
      });
    }
  };

  return (
    <Button
      size="large"
      style={{ fontSize: 20 }}
      type="primary"
      onClick={() => {
        createPatientRecord();
      }}
      icon={
        <FileAddOutlined
          style={{
            fontSize: 25,
          }}
        />
      }
    >
      Submit
    </Button>
  );
}
