<template>
	<div class="order_list">
		<van-tabs
			sticky
			:active="activeIndex"
			:swipe-threshold="5"
			 @click="handleTabClick"
		>
			<van-tab
				v-for="tab in tabsItem"
			 	:title="tab.name"
				:key="tab.type">
			</van-tab>
		</van-tabs>

		<van-list
		  	v-model="loading"
		  	:finished="finished"
			:immediate-check="false"
	  		:offset="100"
		  	@load="loadMore"
		>
			<van-panel
				v-for="(el, i) in items"
				class="order_list--panel"
				:key="el.id"
				:title="'订单编号: ' + el.id"
				:status="getStatusText(el.status)"
			>
				<div>
					<van-card
						v-for="(goods, i) in el.serviceItems"
						class="order_list--van-card"
						:key="i"
						:title="goods.item_name"
						:desc="goods.sku_props_str"
						:num="goods.quantity"
						:price="(goods.price / 100).toFixed(2)"
						:thumb="goods.pic_url"
					/>
					<div class="order_list--total">
						合计: {{el.total_fee | yuan}}（含运费{{el.post_fee | yuan}}）
					</div>
				</div>
				<component
					slot="footer"
					:is="'status' + el.status"
					@delete-order="delOrder(i)"
					@pay="toPay(el.id)"
					@cancel="cancelOrder(i)"
				/>
			</van-panel>
		</van-list>

		<is-empty v-if="isEmpty">抱歉,没有找到符合条件的订单</is-empty>

	</div>
</template>

<script>
import { ELE_COUPON_LIST } from '@/api/order';

import { Tab, Tabs, Panel, Card, List } from 'vant';
import IsEmpty from '@/vue/components/is-empty/';
import status10 from './handle-status-10';
import status40 from './handle-status-40';
import status60 from './handle-status-60';
import status70 from './handle-status-70';
import status100 from './handle-status-100';
import status110 from './handle-status-110';
import status120 from './handle-status-120';

import loadMore from '@/vue/mixin/list-load-more';
import scrollFixed from '@/vue/mixin/scroll-fixed';

const STATUS_TEXT = {
  10: '待付款',
  40: '已完成',
  60: '已关闭',
  70: '已关闭',
  100: '未使用',
  110: '已使用',
  120: '已退款'
};

export default {
  name: 'order-list',

  mixins: [loadMore, scrollFixed],

  props: {
    status: {
      type: [String, Number],
      default: 0
    }
  },

  data() {
    const activeIndex = this.status;
    return {
      shop_id: 1,
      activeIndex,
      items: [],
      tabsItem: [
        {
          name: '全部',
          status: 0
        },
        {
          name: '待付款',
          status: 10
        },
        {
          name: '待使用',
          status: 100
        },
        {
          name: '已使用',
          status: 110
        },
        {
          name: '退款成功',
          status: 120
        }
      ]
    };
  },

  watch: {
    $route: 'resetInit'
  },

  created() {
    this.resetInit();
  },

  methods: {
    initData() {
      const i = this.status;
      const status = this.tabsItem[i].status;
      return this.$reqGet(
        ELE_COUPON_LIST,
        {
          'per-page': this.pages.perPage,
          page: this.pages.currPage,
          shop_id: this.shop_id,
          status
        },
        {
          hideLoading: true
        }
      ).then(res => {
        const { items, page } = res.data.data;
        this.items.push(...items);
        return page;
      });
    },
    delOrder(i) {
      this.$dialog.confirm({ message: '确定删除订单?' }).then(() => {
        this.items.splice(i, 1);
        this.$toast('已删除');
      });
    },
    async cancelOrder(i) {
      this.$dialog
        .confirm({ message: '确定要取消该订单吗?' })
        .then(() => {
          this.items.splice(i, 1);
          this.$toast('已取消该订单');
        })
        .catch(() => {});
    },
    toPay(id) {
      this.$router.push({ name: 'payment', params: { order_id: id } });
    },
    handleTabClick(index) {
      this.$router.replace({
        name: 'user-order-ele-list',
        params: { status: index }
      });
    },
    getStatusText(status) {
      return STATUS_TEXT[status] || '';
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Panel.name]: Panel,
    [Card.name]: Card,
    [List.name]: List,
    [IsEmpty.name]: IsEmpty,
    status10,
    status40,
    status60,
    status70,
    status100,
    status110,
    status120
  }
};
</script>

<style lang="scss" scoped>
.order_list {
  padding-bottom: 0;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  &--footer_btn {
    text-align: right;
  }
  &--panel {
    margin-bottom: 10px;
  }

  &--van-card {
    background-color: #fafafa;
  }

  &--total {
    text-align: right;
    padding: 10px;
  }
}
</style>
