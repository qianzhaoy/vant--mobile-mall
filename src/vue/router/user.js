const tab_user = () => import(/* webpackChunkName: "tabbar-user" */ '@/views/user/tabbar-user');
const UserCollect = () => import(/* webpackChunkName: "user-collect" */ '@/views/user/module-collect/');
const UserTeam = () => import(/* webpackChunkName: "user-team" */ '@/views/user/module-team/');
const UserInvitation = () => import(/* webpackChunkName: "user-invitation" */ '@/views/user/module-invitation/');
const UserAddress = () => import(/* webpackChunkName: "user-address" */ '@/views/user/module-address/');
const UserAddressEdit = () => import(/* webpackChunkName: "user-addressEdit" */ '@/views/user/module-address-edit/');
const UserAutonym = () => import(/* webpackChunkName: "user-autonym" */ '@/views/user/module-autonym/');
const UserAutonymEdit = () => import(/* webpackChunkName: "user-autonymEdit" */ '@/views/user/module-autonym-edit/');
const UserServer = () => import(/* webpackChunkName: "user-server" */ '@/views/user/module-server/');

const UserInformation = () => import(/* webpackChunkName: "user-information" */ '@/views/user/user-information-set/');
const UserInfo_SetBg = () => import(/* webpackChunkName: "user-info-setBg" */ '@/views/user/user-information-set/set-bg/');
const UserInfo_SetMobile = () => import(/* webpackChunkName: "user-info-setMobile" */ '@/views/user/user-information-set/set-mobile/');
const UserInfo_SetNickname = () => import(/* webpackChunkName: "user-info-setNickname" */ '@/views/user/user-information-set/set-nickname/');
const UserInfo_SetPassword = () => import(/* webpackChunkName: "user-info-setPassword" */ '@/views/user/user-information-set/set-password/');

const UserOrderEntityList = () => import(/* webpackChunkName: "order-entity-list" */ '@/views/user/order-entity-list/');
const UserOrderEleList = () => import(/* webpackChunkName: "order-ele-list" */ '@/views/user/order-ele-list/');
const UserRefundList = () => import(/* webpackChunkName: "user-refund-list" */ '@/views/user/refund-list/');

const Tabbar = () => import(/* webpackChunkName: "Tabbar" */ '@/vue/components/Tabbar/');

export default [{
  path: '/user',
  name: 'user',
  meta: {
    keepAlive: true
  },
  components: { default: tab_user, tabbar: Tabbar }
}, {
  path: '/user/collect',
  name: 'collect',
  component: UserCollect
}, {
  path: '/user/team',
  name: 'team',
  component: UserTeam
}, {
  path: '/user/invitation',
  name: 'invitation',
  component: UserInvitation
}, {
  path: '/user/address',
  name: 'address',
  component: UserAddress
}, {
  path: '/user/address/edit/:addressId',
  name: 'address-edit',
  props: true,
  component: UserAddressEdit
}, {
  path: '/user/autonym',
  name: 'autonym',
  component: UserAutonym
}, {
  path: '/user/autonym/edit',
  name: 'autonym-edit',
  component: UserAutonymEdit
}, {
  path: '/user/server',
  name: 'user-server',
  component: UserServer
}, {
  path: '/user/information',
  name: 'user-information',
  meta: {
    login: true
  },
  component: UserInformation
}, {
  path: '/user/information/setbg',
  name: 'user-info-setbg',
  component: UserInfo_SetBg
}, {
  path: '/user/information/setMobile',
  name: 'user-info-setMobile',
  component: UserInfo_SetMobile
}, {
  path: '/user/information/setNickname',
  name: 'user-info-setNickname',
  component: UserInfo_SetNickname
}, {
  path: '/user/information/setPassword',
  name: 'user-info-setPassword',
  component: UserInfo_SetPassword
}, {
  path: '/user/order/list/:active',
  name: 'user-order-list',
  props: true,
  component: UserOrderEntityList
}, {
  path: '/user/orderEle/list/:active',
  name: 'user-order-ele-list',
  props: true,
  component: UserOrderEleList
}, {
  path: '/user/refund/list',
  name: 'user-refund-list',
  component: UserRefundList
}];
