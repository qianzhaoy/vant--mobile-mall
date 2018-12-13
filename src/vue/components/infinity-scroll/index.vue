<template>
  <van-list
    v-model="loading"
    :finished="finished"
    :offset="100"
    @load="loadMore"
    v-bind="$attrs"
    v-on="$listeners"
    :immediate-check="false"
  >
    <is-empty v-if="isEmpty">{{emptyText || '抱歉,没有更多了'}}</is-empty>
    <slot v-else></slot>
  </van-list>
</template>

<script>
import { List } from 'vant';
import { get } from 'lodash';
import IsEmpty from '@/vue/components/is-empty';
import loadMore from '@/vue/mixin/load-more';

const DEFAULT_CONFIG = {
  params: {},
  headers: {}
};

export default {
  name: 'infinity-scroll',

  mixins: [loadMore],

  props: {
    apiUrl: {
      type: String,
      required: true
    },
    resKey: {
      type: String,
      default: 'data.items'
    },
    pageKey: {
      type: String,
      default: 'data.page'
    },
    emptyText: String,
    perPage: Number,
    beforeRequest: Function
  },

  created() {
    this.resetInit();
  },

  methods: {
    beforeInitData() {
      return this.beforeRequest ? this.beforeRequest() : DEFAULT_CONFIG;
    },
    async initData() {
      const { params = {}, headers = {} } = this.beforeInitData();
      const res = await this.$reqGet(
        this.apiUrl,
        {
          'per-page': this.pages.perPage,
          page: this.pages.currPage,
          ...params
        },
        headers
      );
      await this.sleep(1000);
      const items = get(res.data, this.resKey, []);
      const page = get(res.data, this.pageKey, null);
      this.$emit('onLoad', items);
      return page;
    },
    sleep(time) {
      return new Promise(resolve => {
        setTimeout(resolve, time);
      });
    }
  },

  components: {
    IsEmpty,
    [List.name]: List
  }
};
</script>
