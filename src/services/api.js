import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/ivy-root/user/login', {
  // return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function queryDesignerOrdersOverView(param) {
  const {designerId, days} = param;
  return request(`/ivy-root/order/queryDesignerOrdersOverView?designerId=${designerId}&days=${days}`);
}

export async function queryVisitStatisticVo(param) {
  const {designerId, days} = param;
  return request(`/ivy-root/visit/queryVisitStatisticVo?designerId=${designerId}&days=${days}`);
}

export async function queryDesigns(params) {
  return request(`/ivy-root/designs/queryDesigns`, {
    method: 'POST',
    body: {
      designerId: params.designerId,
      pageSize: params.pageSize,
      pageNo: params.pageNo,
      token: params.token
    },
  });
}

export async function getShareInfo(params) {
  return request(`/ivy-root/openApi/getShareInfo`, {
    method: 'POST',
    body: {
      userId: params.designerId,
    },
  });
}

export async function submitDesignDetail(payload) {
  console.log(payload);
  return request('/ivy-root/designs/submitDesign', {
    method: 'POST',
    body: {
      brief: payload.brief,
      name: payload.title,
      residence: payload.residence,
      type: payload.designType,
      miniCharge: payload.priceRange.chargeMinimum,
      maxCharge: payload.priceRange.chargeMaximum,
      isNegotiable: payload.priceRange.isNegotiable,
      designStyle: payload.designStyle,
      coverPictureUrl: payload.uploadHeadPicture,
      normalPictureUrls: payload.uploadDesignPictures,
      designerId: sessionStorage.getItem('userId'),
    }
  });
}

export async function saveShareInfo(payload) {
  return request(`/ivy-root/openApi/saveShareInfo`, {
    method: 'POST',
    body: {
      userId: sessionStorage.getItem('userId'),
      skilledAt: payload.skilledAt,
      miniCharge: payload.chargeRange.chargeMinimum,
      maxCharge: payload.chargeRange.chargeMaximum,
      isNegotiable: payload.chargeRange.isNegotiable,
      address: payload.address,
      achievement: payload.achievement,
      sharePageBackground: payload.backgroundImg,
      enterpriseImgs: payload.enterpriseImgs,
      companyName: payload.companyName,
      introduction: payload.introduction,
      companyType: payload.companyType,
      phoneNumber: payload.phoneNumber,
      serviceType: payload.serviceType
    },
  });
}


export async function uploadCropPicture(payload) {

  return request(`/ivy-root/file/uploadCropPicture`, {
    method: 'POST',
    body: {
      userId: sessionStorage.getItem('userId'),
      file: payload.imgbase,
      size: payload.imgsize,
      suffix: payload.suffix,
      fileName: payload.filename,
      description: payload.description,
    }
  });
}

export async function saveAppointment(payload) {

  return request('/ivy-root/order/saveAppointment', {
    method: 'POST',
    body: {
      customerName: payload.values.customerName,
      customerPhoneNumber: payload.values.phoneNumber,
      address: `${payload.values.address[0]}，${ payload.values.address[1]}`,
      note: payload.values.brief,
      projectType: payload.values.projectType,
      designerId: payload.designerId,
    }
  });
}


export async function register(params) {
  console.log(params);

  return request('/ivy-root/user/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryAppointment(params) {
  return request(`/ivy-root/order/queryAppointment`, {
    method: 'POST',
    body: {
      designerId: params.designerId,
      pageSize: params.pageSize,
      pageNo: params.pageNo,
      token: params.token
    },
  });
}


export async function queryCurrent(params) {
  return request(`/ivy-root/user/queryCurrent`, {
    method: 'POST',
    body: {
      userId: sessionStorage.getItem('userId'),
    },
  });
}

