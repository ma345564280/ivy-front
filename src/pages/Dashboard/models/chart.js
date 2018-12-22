import { queryDesignerOrdersOverView, queryVisitStatisticVo } from '@/services/api';

export default {
  namespace: 'chart',

  state: {
    list:[],
    totalVisitors : 0,
    totalOrders: 0,
    visitData: [],
    visitData2: [],
    loading: false,
    visible: false,
    total: 0,
    pageSize: 0,
    pageNo: 0
  },

  effects: {
    *fetch({payload}, { call, put }) {
      console.log(payload);
      const responseOrderStatistic = yield call(queryDesignerOrdersOverView, {
        designerId: sessionStorage.getItem('userId'),
        days: 7
      });
      const orderStatistic = [];
      for (let i = 0; i < responseOrderStatistic.data.daySumStatisticVo.length; i += 1) {
        const daySumStatisticVo = responseOrderStatistic.data.daySumStatisticVo[i];
        orderStatistic.push({
          x: daySumStatisticVo.date,
          y: daySumStatisticVo.sum,
        });
      }

      const responseVisitStatistic = yield call(queryVisitStatisticVo, {
        designerId: sessionStorage.getItem('userId'),
        days: 7
      });
      const visitStatistic = [];
      for (let i = 0; i < responseVisitStatistic.data.daySumStatisticVo.length; i += 1) {
        const visitDaySumStatisticVo = responseVisitStatistic.data.daySumStatisticVo[i];
        visitStatistic.push({
          x: visitDaySumStatisticVo.date,
          y: visitDaySumStatisticVo.sum,
        });
      }

      yield put({
        type: 'save',
        payload: {
          totalOrders: responseOrderStatistic.data.totalRecords,
          totalVisitors: responseVisitStatistic.data.totalRecords,
          visitData: visitStatistic,
          orderData: orderStatistic,
        }
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
