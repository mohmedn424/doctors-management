import { create } from 'zustand';
import Fuse from 'fuse.js';
import dayjs from 'dayjs';
import { get, set } from 'idb-keyval';
import pb from './lib/pocketbase';
import { message, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// const fetchPatient = async () => {
//   get('diagnosis').then(async (val) => {
//     const setDiagnosis =
//       useFullDaignosisFetch.getState().setDiagnosis;
//     if (val === undefined || val.DATAVERSION !== DATAVERSION) {
//       notification.open({
//         message: (
//           <span>
//             <strong>Downloading diagnosis</strong>
//           </span>
//         ),
//         key: 'loadingDiagnosis',
//         description: (
//           <p>
//             The application is downloading diagnosis database in the
//             background.
//             <br />
//             When it ends you will get another notifiction
//           </p>
//         ),
//         closable: true,
//         duration: 0,
//         placement: 'bottomRight',
//         icon: <LoadingOutlined />,
//       });
//       const records = await pb.collection('diseases').getFullList({
//         sort: 'disease',
//         // fields: 'disease,id',
//       });
//       set('diagnosis', { records, DATAVERSION });
//       setDiagnosis(records);
//       notification.destroy('loadingDiagnosis');
//       message.success({
//         content: 'Diagnosis database downloaded successfully',
//         key: 'loadingDiagnosis',
//         duration: 6,
//       });
//     } else {
//       setDiagnosis(val.records);
//     }
//   });
// };
// // fetchDiagnosis();

export const usePatientQueryFetch = create((set) => ({
  queryResult: [],
  searchValue: '',

  setQueryResult: async (val) => {
    if (val.length > 1) {
      const resultList = await pb
        .collection('patients')
        .getList(1, 20, {
          filter: `name ~ "${val}"`,
          fields: 'name,address,id',
        });
      console.log(resultList);
      set({ queryResult: resultList.items });
    }
  },

  setSearchValue: (val) => set({ searchValue: val }),
}));
