import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      // Login successfully
      const response = yield call(fakeAccountLogin, payload);
      console.info(JSON.stringify(response));
      if (response.code === 200) {
        const authorityList = [];
        response.data.authorities.forEach( key => {
          authorityList.push(key);
        });
        console.log(response.data.authorities);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: authorityList,
            type: 'account',
            status: 'ok'
          },
        });
        sessionStorage.setItem('userId', JSON.stringify(response.data.userId));
        sessionStorage.setItem('signedIn', 'yes');
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#')+1);
            }
          } else {
              window.location.href = '/welcome';
            return;
          }
        }
          yield put(routerRedux.replace('/welcome' || '/'));
      } else {
        message.error('账户名或者密码错误');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
