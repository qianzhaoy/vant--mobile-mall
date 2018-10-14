const tab_class = () => import(/* webpackChunkName: "tabbar-class" */ '@/views/items/tabbar-class.vue');
const ItemSearch = () => import(/* webpackChunkName: "item-search" */ '@/views/items/search/');
const ItemSearchResult = () => import(/* webpackChunkName: "item-search" */ '@/views/items/search-result/');
const ItemList = () => import(/* webpackChunkName: "item-list" */ '@/views/items/list/');
const ItemDetail = () => import(/* webpackChunkName: "item-detail" */ '@/views/items/detail/');

const Tabbar = () => import(/* webpackChunkName: "Tabbar" */ '@/vue/components/Tabbar/');


export default [{
  path: '/items',
  name: 'class',
  meta: {
    keepAlive: true
  },
  components: { default: tab_class, tabbar: Tabbar }
}, {
  path: '/items/search',
  name: 'search',
  meta: {
    keepAlive: true
  },
  component: ItemSearch
}, {
  path: '/items/search/result',
  name: 'search-result',
  meta: {
    keepAlive: true
  },
  component: ItemSearchResult,
  props: route => (route.query)
}, {
  path: '/items/detail/:itemId',
  name: 'detail',
  props: true,
  component: ItemDetail
}, {
  path: '/items/list',
  name: 'list',
  meta: {
    keepAlive: true
  },
  component: ItemList,
  props: route => ({
    itemClass: +route.query.itemClass
  })
}];
