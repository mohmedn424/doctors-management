import { create } from 'zustand';
import Fuse from 'fuse.js';
import dayjs from 'dayjs';
import { get, set } from 'idb-keyval';
import pb from './lib/pocketbase';
import { message, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const DATAVERSION = '1.0';

const fetchDiagnosis = async () => {
  get('diagnosis').then(async (val) => {
    const setDiagnosis =
      useFullDaignosisFetch.getState().setDiagnosis;
    if (val === undefined || val.DATAVERSION !== DATAVERSION) {
      notification.open({
        message: (
          <span>
            <strong>Downloading diagnosis</strong>
          </span>
        ),
        key: 'loadingDiagnosis',
        description: (
          <p>
            The application is downloading diagnosis database in the
            background.
            <br />
            When it ends you will get another notifiction
          </p>
        ),
        closable: true,
        duration: 0,
        placement: 'bottomRight',
        icon: <LoadingOutlined />,
      });
      const records = await pb.collection('diseases').getFullList({
        sort: 'disease',
        // fields: 'disease,id',
      });
      set('diagnosis', { records, DATAVERSION });
      setDiagnosis(records);
      notification.destroy('loadingDiagnosis');
      message.success({
        content: 'Diagnosis database downloaded successfully',
        key: 'loadingDiagnosis',
        duration: 6,
      });
    } else {
      setDiagnosis(val.records);
    }
  });
};
fetchDiagnosis();

export const useCurrentRoute = create((set) => ({
  path: '/',
  fullPath: '',
  setPath: (newPath) => set({ path: newPath }),
  setFullPath: (newPath) => set({ fullPath: newPath }),
}));

export const useCurrentTab = create((set) => ({
  current: 0,
  setCurrent: (newCurrent) => set({ current: newCurrent }),
}));

export const useCurrentPrescriptionType = create((set) => ({
  status: 'new',
  setStatus: (newval) => set({ status: newval }),
}));

export const useCurrentPage = create((set) => ({
  current: 'Home',
  setCurrent: (newVal) => set({ current: newVal }),
}));

export const useFullDaignosisFetch = create((set) => ({
  currentData: [],
  setDiagnosis: (newVal) => {
    const options = newVal.map((item) => ({
      label: item.disease,
      value: item.id,
    }));

    set({ currentData: options });
  },
}));
export const useResultDiagnosis = create((set) => ({
  resultData: [],
  setResultData: (searchValue) => {
    const fullData = useFullDaignosisFetch.getState().currentData;
    const fuse = new Fuse(fullData, {
      keys: ['label'],
      threshold: 0.2,
      ignoreLocation: true,
      useExtendedSearch: true,
    });
    const results = fuse.search(searchValue);

    const items = results.map((result) => result.item);

    set({ resultData: items });
  },
}));

export const useSelectedDiagnosis = create((set) => ({
  selected: [],
  setSelected: (newval) => {
    set({ selected: newval });
  },
}));

export const useDiagnosisLoadingStatus = create((set) => ({
  loading: false,
  setLoading: (newval) => {
    set({ loading: newval });
  },
}));

export const useBasicPatientInfo = create((set) => ({
  basicInfo: {
    name: 'محمد نبيل رفاعي أحمد',
    dob: dayjs('2001-03-28'),
    sex: 'male',
    address: 'نامول - مركز طوخ - القليوبية',
    contactPhone: '01094778601',
    martialStatus: 'single',
  },

  setBasicInfo: (newVal) => {
    set({ basicInfo: newVal });
  },
}));
