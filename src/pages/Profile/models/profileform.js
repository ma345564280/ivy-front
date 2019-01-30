import { message, Modal } from 'antd';
import { saveShareInfo } from '../../../services/api';

export default {
  namespace: 'profileform',

  state: {

  },

  effects: {

    *submitProfileForm({ payload }, { call }) {
      console.log(payload);
      const response = yield call(saveShareInfo, payload);

      if(response && response.code === 200) {
        Modal.success({
          title: '编辑成功',
          onOk: () => {
            window.location.href = '/profile/profile';
          },
        });

      } else {
        message.error('提交失败，请稍后再试！');
        console.error(response.msg);

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
