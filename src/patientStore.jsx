import { create } from 'zustand';

import pb from './lib/pocketbase';
import dayjs from 'dayjs';
import { useSelectedDrugs } from './drugsStore';
import { useSelectedDiagnosis } from './store';
import { useSelectedTreatments } from './treatmentsStore';

const LOCALSTORAGE_TOKEN_DURATION = 86400;

export const usePatientQuery = create((set) => ({
  queryResult: [],
  queryResultOptions: [],

  queryPatient: (val) => {
    if (val.length > 1) fetchPatients(val);
  },

  setQueryResult: async (val) => {
    const options = val.map((patient) => ({
      label: `${patient.name} | ${patient.address}`,
      value: patient.name,
      key: patient.id,
    }));

    set({ queryResult: val });
    set({ queryResultOptions: options });
  },
}));

export const createPatientRecord = async () => {
  const { selectedDrugs } = useSelectedDrugs.getState();
  const { selected: selectedDiagnosis } =
    useSelectedDiagnosis.getState();

  const { selectedTreatments } = useSelectedTreatments.getState();

  const drugs = selectedDrugs.map((drug) => drug.id);
  const diagnosis = selectedDiagnosis.map((diagnose) => diagnose.key);
  const treatments = selectedTreatments.map((treat) => treat.key);

  const record = await pb.collection('patient_history').create({
    patient: 'rwapuqhivoh6ax5',
    date: dayjs().format('YYYY-MM-DD | hh-mm A'),
    doctor: 'nkzd0cqdmrhcr9e',
    drugs,
    diagnosis,
    treatments,
  });
};

const setQueryResult = usePatientQuery.getState().setQueryResult;

const TimeStampGen = () => {
  return Math.round(Date.now() / 1000);
};

const fetchLogic = async (searchVal) => {
  const resultList = await pb.collection('patients').getList(1, 30, {
    filter: `name ~ "${searchVal}"`,
    fields: 'name,address,id',
  });

  resultList.items.length > 0 &&
    localStorage.setItem(
      searchVal,
      JSON.stringify({
        items: [...resultList.items],
        timeStamp: TimeStampGen(),
      })
    );

  setQueryResult(resultList.items);
};

const fetchPatients = async (searchVal) => {
  if (localStorage.getItem(searchVal)) {
    const local = JSON.parse(localStorage.getItem(searchVal));
    const localStamp = local.timeStamp;

    TimeStampGen() - localStamp > LOCALSTORAGE_TOKEN_DURATION
      ? fetchLogic()
      : setQueryResult(local.items);
  } else {
    fetchLogic();
  }
};
