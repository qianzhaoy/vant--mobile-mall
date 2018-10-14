import dayjs from 'dayjs';

export const dateFormat = (value, format = 'YYYY-MM-DD') =>
  value ? dayjs(value * 1000).format(format) : '';

export const yuan = value =>
  !Number.isNaN(value) ? `¥${(value / 100).toFixed(2)}` : value;

export default {
  install(Vue) {
    Vue.filter('yuan', yuan);
    Vue.filter('dateFormat', dateFormat);
  }
};
