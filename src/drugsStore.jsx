import { create } from 'zustand';
import Fuse from 'fuse.js';
import pb from './lib/pocketbase';

import { get, set } from 'idb-keyval';
import { message, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const DATAVERSION = '1.0';

const fetchDrugs = async () => {
  get('drugs').then(async (val) => {
    const setDrugs = useFullDrugsOptions.getState().setDrugs;
    if (val === undefined || val.DATAVERSION !== DATAVERSION) {
      notification.open({
        message: (
          <span>
            <strong>Downloading drugs</strong>
          </span>
        ),
        key: 'loadingDrugs',
        description: (
          <p>
            The application is downloading drugs database in the
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
      const records = await pb.collection('drugs').getFullList({
        sort: 'tradename',
        fields: 'tradename,activeingredient,new_price',
      });
      set('drugs', { records, DATAVERSION });
      setDrugs(records);
      notification.destroy('loadingDrugs');
      message.success({
        content: 'Diagnosis database downloaded successfully',
        key: 'loadingDiagnosis',
        duration: 6,
      });
    } else {
      setDrugs(val.records);
    }
  });
};

fetchDrugs();

export const useFullDrugsOptions = create((set) => ({
  drugsData: [],
  setDrugs: (newVal) => {
    const options = newVal.map((item) => ({
      label: `${item.tradename}  |  ${item.new_price} L.E`,
      tradename: item.tradename,
      key: item.id,
      activeingredient: item.activeingredient,
      title: [item.tradename, item.activeingredient],
      value: `${item.tradename}  |  ${item.new_price} L.E`,
    }));

    set({ drugsData: options });
  },
}));

export const useDrugSearchType = create((set) => ({
  type: false,
  setType: (newval) => set({ type: newval }),
}));

export const useDrugSearchValue = create((set) => ({
  searchValue: false,
  setSearchValue: (newval) => set({ searchValue: newval }),
}));

export const useResultDrugs = create((set) => ({
  resultData: [],
  setResultData: (searchValue) => {
    const fullData = useFullDrugsOptions.getState().drugsData;

    const type = useDrugSearchType.getState().type;
    const keys =
      type === true
        ? { keys: ['activeingredient'] }
        : {
            keys: ['tradename'],
          };

    const fuse = new Fuse(fullData, {
      ...keys,
      threshold: 0.2,
      useExtendedSearch: true,
    });
    const results = fuse.search(searchValue, { limit: 30 });

    const items = results.map((result) => result.item);

    set({ resultData: items });
  },
}));

export const useSelectedDrug = create((set) => ({
  selected: undefined,
  setSelected: (newval) => {
    set({ selected: newval });
  },
}));

export const useSelectedDrugs = create((set) => ({
  selectedDrugs: [],
  setSelectedDrugs: (newval) => {
    set({ selectedDrugs: newval });
  },

  removeDrug: (id) => {
    const currentDrugs = useSelectedDrugs.getState().selectedDrugs;

    if (currentDrugs.length > 1) {
      const newDrugs = currentDrugs.filter((item) => item.id !== id);
      set({ selectedDrugs: newDrugs });
    } else {
      set({ selectedDrugs: [] });
    }
  },

  editDrug: (id, data) => {
    const currentDrugs = useSelectedDrugs.getState().selectedDrugs;
    const drugIndex = currentDrugs.findIndex((drug) => drug.id == id);
    const currentDrug = currentDrugs[drugIndex];

    currentDrugs[drugIndex] = {
      ke: id,
      ...currentDrug,
      ...data,
    };
    console.log(currentDrugs);
    set({ selectedDrugs: currentDrugs });
  },
}));

export const useEditModalState = create((set) => ({
  modalStatus: false,
  setModalStatus: (newval) => {
    set({ modalStatus: newval });
  },

  drugId: '',
  setDrugId: (newVal) => {
    const currentDrugs = useSelectedDrugs.getState().selectedDrugs;

    set({
      drugToEdit: currentDrugs.find((drug) => drug.id === newVal),
    });

    set({ drugId: newVal });
  },

  drugToEdit: {},
}));

// export const useDrugsLoadingStatus = create((set) => ({
//   loading: false,
//   setLoading: (newval) => {
//     set({ loading: newval });
//   },
// }));
