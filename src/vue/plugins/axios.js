import axios from 'axios';
import qs from 'qs';
import { Dialog } from 'vant';

const instance = axios.create({
  timeout: 5000,
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : ''
});

instance.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put') {
      config.data = qs.stringify(config.data);
    }
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem(
        'Authorization'
      ) || ''}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  res => {
    if (!res.data.success) {
      switch (res.data.code) {
        case 422: {
          const flag = Array.isArray(res.data.data) && res.data.data.length;
          Dialog.alert({
            message: flag ? res.data.data[0].message : res.data.message
          });
          break;
        }
        case 401:
          break;
        case 404:
          break;
        default:
          break;
      }
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    Dialog.alert({
      title: '警告',
      message: error.message
    });
    return Promise.reject(error);
  }
);

const post = (url, data, config = {}) => instance.post(url, data, config);

const put = (url, data, config = {}) => instance.put(url, data, config);

const get = (url, params, config = {}) =>
  instance.get(url, {
    params,
    ...config
  });

const deleteMethod = (url, config = {}) =>
  instance({
    url,
    method: 'delete',
    ...config
  });

export default {
  install(Vue) {
    Vue.prototype.$reqGet = get;
    Vue.prototype.$reqPost = post;
    Vue.prototype.$reqPut = put;
    Vue.prototype.$reqDel = deleteMethod;
  }
};
