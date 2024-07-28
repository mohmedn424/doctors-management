import { create } from 'zustand';

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

export const useCurrentRoute = create((set) => ({
  path: '/',
  fullPath: '',
  setPath: (newPath) => set({ path: newPath }),
  setFullPath: (newPath) => set({ fullPath: newPath }),
}));
