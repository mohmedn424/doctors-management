import { create } from 'zustand';
import Fuse from 'fuse.js';
import pb from './lib/pocketbase';

import { get, set } from 'idb-keyval';
import { message, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const DATAVERSION = '1.0';
const fetchDrugs = async () => {
  get('treatments').then(async (val) => {
    const setTreatments =
      useFullTreatmentsOptions.getState().setTreatments;
    if (val === undefined || val.DATAVERSION !== DATAVERSION) {
      notification.open({
        message: (
          <span>
            <strong>Downloading treatments</strong>
          </span>
        ),
        key: 'loadingTreatments',
        description: (
          <p>
            The application is downloading treatments database in the
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
      const records = await pb.collection('treatments').getFullList({
        sort: 'procedure',
      });
      set('treatments', { records, DATAVERSION });
      setTreatments(records);
      notification.destroy('loadingTreatments');
      message.success({
        content: 'Treatments database downloaded successfully',
        key: 'loadingTreatments',
        duration: 6,
      });
    } else {
      setTreatments(val.records);
    }
  });
};

fetchDrugs();

export const useFullTreatmentsOptions = create((set) => ({
  treatmentsData: [],
  setTreatments: (newVal) => {
    const options = newVal.map((item) => ({
      label: item.procedure,
      value: item.procedure,
      key: item.id,
    }));

    set({ treatmentsData: options });
  },
}));

export const useResultTreatments = create((set) => ({
  resultData: [],
  setResultData: (searchValue) => {
    const fullData =
      useFullTreatmentsOptions.getState().treatmentsData;

    const fuse = new Fuse(fullData, {
      keys: ['label'],
      threshold: 0.2,
      useExtendedSearch: true,
    });
    const results = fuse.search(searchValue, { limit: 30 });

    const items = results.map((result) => result.item);

    set({ resultData: items });
  },
}));

export const useSelectedTreatments = create((set) => ({
  selectedTreatments: [],
  setSelectedTreatments: (newval) => {
    set({ selectedTreatments: newval });
  },
}));
