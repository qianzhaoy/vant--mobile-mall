import getLocationParam from './utils/location-param';
import * as localState from './utils/local-storage';

export default {
  install(Vue) {
    Object.defineProperties(Vue.prototype, {
      $util: {
        value: {
          ...localState,
          getLocationParam
        }
      }
    });
  }
};
