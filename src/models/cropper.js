import { uploadCropPicture } from '../services/api';

export default {
  namespace: 'cropper',

  state: {
    fileUrl: '',
    description:'',
  },

  effects: {
    *uploadCropImage({ payload }, { call, put }) {

      const resUploadCropImage = yield call(uploadCropPicture, payload);

      if(resUploadCropImage && resUploadCropImage.code === 200) {
        const resFileUrl = resUploadCropImage.data;
        yield put({
          type: 'save',
          payload: {
            fileUrl: resFileUrl,
            description: payload.description
          }
        });
      }


    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
