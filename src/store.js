import { create } from 'zustand';
import Fuse from 'fuse.js';

export const useCurrentTab = create((set) => ({
  current: 2,
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
    });
    const results = fuse.search(searchValue);

    const items = results.map((result) => result.item);

    set({ resultData: items });

    console.log(results);
  },
}));

export const useCurrentRoute = create((set) => ({
  path: '/',
  fullPath: '',
  setPath: (newPath) => set({ path: newPath }),
  setFullPath: (newPath) => set({ fullPath: newPath }),
}));
