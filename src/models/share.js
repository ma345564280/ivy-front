import { message } from 'antd';
import { getShareInfo, saveAppointment } from '../services/api';


export default {
  namespace: 'share',

  state: {
    skilledAt : '',
    miniCharge: '',
    maxCharge: '',
    isNegotiable: '',
    address: '',
    achievement: '',
    sharePageBackground: '',
    companyName:'',
    introduction:'',
    phoneNumber:'',
    companyType:'',
    serviceType:'',
    designList: []
  },

  effects: {
    *fetch({payload}, { call, put }) {
      console.log('shareinfo');
      console.log(payload);
      const shareInfoResponse = yield call(getShareInfo, payload);

      console.log(shareInfoResponse)

      if(shareInfoResponse && shareInfoResponse.code === 200) {

        const skills = shareInfoResponse.data.profileVo.profile.skilledIn.split("，");
        const address = shareInfoResponse.data.profileVo.profile.address.split("，");
        console.log(skills);
        const designListRes = shareInfoResponse.data.designList;

        console.log(designListRes);

        yield put({
          type: 'save',
          payload: {
            skilledAt : skills,
            miniCharge: shareInfoResponse.data.profileVo.profile.minCharge,
            maxCharge: shareInfoResponse.data.profileVo.profile.maxCharge,
            isNegotiable: shareInfoResponse.data.profileVo.profile.negotiableCharge,
            address: shareInfoResponse.data.profileVo.profile.address,
            achievement: shareInfoResponse.data.profileVo.profile.achievement,
            sharePageBackground: shareInfoResponse.data.profileVo.sharePageBackgroundImg.imgUrl,
            companyName:shareInfoResponse.data.profileVo.profile.nickName,
            introduction:shareInfoResponse.data.profileVo.profile.introduction,
            phoneNumber:shareInfoResponse.data.profileVo.profile.phoneNumber,
            companyType:shareInfoResponse.data.profileVo.profile.companyType,
            serviceType:shareInfoResponse.data.profileVo.profile.serviceType,
            designList:designListRes
          }
        });
      }
    },
    *submitAppointment({payload}, { call, put }) {

      console.log(payload);
      const submitAppointmentRes = yield call(saveAppointment, payload);

      if(submitAppointmentRes && submitAppointmentRes.code === 200) {
        message.success('预约成功');
      } else {
        message.error('系统异常，请稍后预约');
      }
    }
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
