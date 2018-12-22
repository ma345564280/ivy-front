import { routerRedux } from 'dva/router';
import { message, Modal } from 'antd';
import { fakeSubmitForm, submitDesignDetail } from '@/services/api';

export default {
  namespace: 'form',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {

    *submitDesignForm({ payload }, { call }) {

      const designInfo = JSON.stringify(payload);
      const jsonDesignInfo = JSON.parse(designInfo);
      const coverPictureUrl = jsonDesignInfo.uploadHeadPicture;
      const pictures = jsonDesignInfo.uploadDesignPictures;
      const coverPicture = [];
      if(coverPictureUrl) {
        coverPicture.push(coverPictureUrl[0].response.data[0]);
      }
      const pictureUrls = [];
      if(pictures) {
        for(let i = 0; i < pictures.length; i+=1) {
          pictureUrls.push(pictures[i].response.data[0]);
        }
      }
      const newPayload  = {
        brief: jsonDesignInfo.brief,
        name: jsonDesignInfo.title,
        residence: jsonDesignInfo.residence,
        type: jsonDesignInfo.designType,
        priceRange: jsonDesignInfo.priceRange,
        designStyle: jsonDesignInfo.designStyle,
        coverPictureUrl: coverPicture,
        normalPictureUrls: pictureUrls,
        designerId: localStorage.getItem('userId'),
      };
      const response = yield call(submitDesignDetail, newPayload);
      if(response && response.code === 200) {
        Modal.success({
          title: '作品提交成功',
          onOk: () => {
            // document.location.reload();
            // window.location.href('/dashboard/analysis');
            window.location.href = '/dashboard/analysis';
          },
        });

      } else {
      }
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
