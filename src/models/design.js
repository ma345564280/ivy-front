import { queryDesigns } from '@/services/api';

export default {
  namespace: 'design',

  state: {
    designList:[],
    total: 0,
    pageSize: 0,
    pageNo: 0
  },

  effects: {
    *fetchDesign({ payload }, { call, put }) {
      console.log("queryDesigns");
      const respDesigns = yield  call(queryDesigns, {
        designerId: sessionStorage.getItem('userId'),
        pageNo: payload.pageNo,
        pageSize: payload.pageSize,
        token: '123',
      });

      yield put({
        type: 'queryDesignList',
        payload: {
          designList: respDesigns.data.list,
          total: respDesigns.data.total,
          pageSize: Number(respDesigns.data.pageSize),
          pageNo: Number(respDesigns.data.pageNum),
        },
      });
    },
  },

  reducers: {
    queryDesignList(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
