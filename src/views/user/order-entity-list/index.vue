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
				:key="i"
				:title="'订单编号: ' + el.id"
				:status="getStatusText(el.status)"
			>
				<div>
					<van-card
						v-for="(goods, goodsI) in el.orderItems"
						class="order_list--van-card"
						:key="goodsI"
						:title="goods.item_name"
						:desc="goods.sku_props_str"
						:num="goods.quantity"
						:price="(goods.price / 100).toFixed(2)"
						:thumb="goods.pic_url"
						@click.native="toOrderDetail(i)"
					/>
					<div class="order_list--total">
						合计: {{el.total_fee | yuan}}（含运费{{el.post_fee | yuan}}）
					</div>
				</div>
				<component
					slot="footer"
					:is="'status' + el.status"
					:reminder="el.is_can_reminder"
					@handle="actionHandle($event, i)"
				/>
			</van-panel>
		</van-list>

		<is-empty v-if="isEmpty">抱歉,没有找到符合条件的订单</is-empty>

	</div>
</template>

<script>
import { ORDER_LIST } from '@/api/order';

import { Tab, Tabs, Panel, Card, List } from 'vant';
import IsEmpty from '@/vue/components/is-empty/';
import status10 from './handle-status-10';
import status20 from './handle-status-20';
import status25 from './handle-status-25';
import status30 from './handle-status-30';
import status40 from './handle-status-40';
import status50 from './handle-status-50';
import status60 from './handle-status-60';
import status70 from './handle-status-70';

import loadMore from '@/vue/mixin/list-load-more';
import scrollFixed from '@/vue/mixin/scroll-fixed';

const STATUS_TEXT = {
  10: '待付款',
  20: '待发货',
  25: '部分发货',
  30: '待收货',
  40: '已完成',
  50: '退款成功',
  60: '交易关闭',
  70: '交易关闭'
};

export default {
  name: 'order-list',

  mixins: [loadMore, scrollFixed],

  props: {
    active: {
      type: [String, Number],
      default: 0
    }
  },

  data() {
    const activeIndex = this.active;
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
          name: '待发货',
          status: 20
        },
        {
          name: '待收货',
          status: 30
        },
        {
          name: '已完成',
          status: 40
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
      const i = this.active;
      const status = this.tabsItem[i].status;
      return this.$reqGet(
        ORDER_LIST,
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
    async delOrder(i) {
      await this.$dialog.confirm({ message: '确定要删除该订单吗?' });
      this.items.splice(i, 1);
      this.$toast('已删除该订单');
    },
    async cancelOrder(i) {
      await this.$dialog.confirm({ message: '确定要取消该订单吗?' });
      if (this.activeIndex == 0) {
        this.items[i].status = 60;
      } else {
        this.items.splice(i, 1);
      }
      this.$toast('已取消该订单');
    },
    async receiptOrder(i) {
      await this.$dialog.confirm({
        message: '请确认收到货物, 确认收货后无法撤销!'
      });
      this.items[i].status = 40;
      this.$toast('已确认收货');
    },
    reminderOrder(i) {
      this.items[i].is_can_reminder = false;
      this.$toast('已提醒卖家发货, 请耐心等待哦~');
    },
    toPay(i) {
      const id = this.items[i].id;
      this.$router.push({ name: 'payment', params: { order_id: id } });
    },
    handleTabClick(index) {
      this.$router.replace({
        name: 'user-order-list',
        params: { active: index }
      });
    },
    getStatusText(status) {
      return STATUS_TEXT[status] || '';
    },
    toOrderDetail(i) {
      const order_id = this.items[i].id;
      this.$router.push({ name: 'user-order-detail', params: { order_id } });
    },
    actionHandle(handle, i) {
      this[handle] && this[handle](i);
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
    status20,
    status25,
    status30,
    status40,
    status50,
    status60,
    status70
  }
};
</script>

<style lang="scss" scoped>
.order_list {
  padding-bottom: 0;
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
