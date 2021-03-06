import { message, Modal } from 'antd';
import { submitDesignDetail } from '../../../services/api';

export default {
  namespace: 'form',
  state : {},

  effects: {
    *submitDesignForm({ payload }, { call }) {
      console.log(payload);
      const response = yield call(submitDesignDetail, payload);
      if(response && response.code === 200) {
        Modal.success({
          title: '作品提交成功',
          onOk: () => {
            window.location.href = '/dashboard/analysis';
          },
        });

      } else {
        message.error('提交失败，请稍后再试！');
        console.error(response.msg)
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
