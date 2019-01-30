import { queryAppointment } from '@/services/api';

export default {
  namespace: 'appointment',

  state: {
    appointments:[],
    total: 0,
    pageSize: 0,
    pageNo: 0
  },

  effects: {
    *fetchAppointments({ payload }, { call, put }) {
      const respDesigns = yield  call(queryAppointment, {
        designerId: sessionStorage.getItem('userId'),
        pageNo: payload.pageNo,
        pageSize: payload.pageSize,
        token: '123',
      });

      yield put({
        type: 'queryAppointment',
        payload: {
          appointments: respDesigns.data.list,
          total: respDesigns.data.total,
          pageSize: Number(respDesigns.data.pageSize),
          pageNo: Number(respDesigns.data.pageNum),
        },
      });
    },
  },

  reducers: {
    queryAppointment(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
