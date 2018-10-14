const login = () => import(/* webpackChunkName: "login" */ '@/views/login/login');
const registerGetCode = () => import(/* webpackChunkName: "register-getCode" */ '@/views/login/register-getCode/');
const registerSubmit = () => import(/* webpackChunkName: "register-submit" */ '@/views/login/register-submit/');
const registerStatus = () => import(/* webpackChunkName: "register-status" */ '@/views/login/register-status/');
const forget = () => import(/* webpackChunkName: "forget" */ '@/views/login/forget/');
const forgetReset = () => import(/* webpackChunkName: "forget-reset" */ '@/views/login/forget-reset/');
const forgetStatus = () => import(/* webpackChunkName: "forget-status" */ '@/views/login/forget-status/');


export default [{
  path: '/login',
  name: 'login',
  component: login
}, {
  path: '/login/registerGetCode',
  name: 'registerGetCode',
  component: registerGetCode
}, {
  path: '/login/registerSubmit',
  name: 'registerSubmit',
  component: registerSubmit
}, {
  path: '/login/registerStatus/:status',
  name: 'registerStatus',
  props: true,
  component: registerStatus
}, {
  path: '/login/forget',
  name: 'forget',
  component: forget
}, {
  path: '/login/forget/reset',
  name: 'forgetReset',
  component: forgetReset
}, {
  path: '/login/forget/reset/:status',
  name: 'forgetStatus',
  props: true,
  component: forgetStatus
}];
