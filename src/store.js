import { create } from 'zustand';
import Fuse from 'fuse.js';

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
    });
    const results = fuse.search(searchValue);

    const items = results.map((result) => result.item);

    set({ resultData: items });
  },
}));

export const useSelectedDiagnosis = create((set) => ({
  selected: [],
  setSelected: (newval) => {
    console.log(newval);
    set({ selected: newval });
  },
}));

export const useFullDrugsFetch = create((set) => ({
  drugsData: [],
  setDrugs: (newVal) => {
    const options = newVal.map((item) => ({
      label: `${item.tradename}  |  ${item.new_price} L.E`,
      tradename: item.tradename,
      value: item.id,
      activeingredient: item.activeingredient,
      title: item.tradename,
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
    const fullData = useFullDrugsFetch.getState().drugsData;

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
    const results = fuse.search(searchValue);

    const items = results.map((result) => result.item);

    set({ resultData: items });
  },
}));

export const useSelectedDrugs = create((set) => ({
  selected: undefined,
  setSelected: (newval) => {
    set({ selected: newval });
  },
}));
