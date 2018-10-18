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
						class="order_list--van-card"
						:key="i"
						:title="el.orderItem.item_name"
						:desc="el.orderItem.sku_props_str"
						:num="el.orderItem.quantity"
						:price="(el.orderItem.price / 100).toFixed(2)"
						:thumb="el.orderItem.pic_url"
					/>
					<div class="order_list--total">
						合计: {{el.refund_fee | yuan}}（含运费{{el.refund_post_fee | yuan}}）
					</div>
				</div>
				<div slot="footer" style="text-align: right;">
					<van-button size="small" @click="refund_handle(i)">{{ el.status == 10 ? "撤销申请" : "查看详情"}}</van-button>
				</div>
			</van-panel>
		</van-list>
		<is-empty v-model="isEmpty">抱歉,没有找到符合条件的订单</is-empty>
	</div>
</template>

<script>
import { REFUND_LIST } from '@/api/order';

import { Tab, Tabs, Panel, Card } from 'vant';
import IsEmpty from '@/vue/components/is-empty/';

import loadMore from '@/vue/mixin/load-more';
import scrollFixed from '@/vue/mixin/scroll-fixed';

const STATUS_TEXT = {
  10: '退款中',
  50: '退款关闭',
  60: '退款成功'
};

export default {
  name: 'order-list',

  mixins: [loadMore, scrollFixed],

  data() {
    return {
      shop_id: 1,
      activeIndex: 0,
      items: [],
      tabsItem: [
        {
          name: '全部',
          status: 0
        },
        {
          name: '退款中',
          status: 10
        },
        {
          name: '退款成功',
          status: 60
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
      const i = this.activeIndex;
      const status = this.tabsItem[i].status;
      return this.$reqGet(
        REFUND_LIST,
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
    refund_handle(i) {
      const item = this.items[i];
      if (item.status == 10) {
        this.$dialog
          .confirm({
            message: '撤销后将不能再次发起申请，确定要撤销该申请吗？'
          })
          .then(() => {
            this.$toast('已撤销该退款申请');
            this.items[i].status = 50;
          });
      } else {
        // 跳转退款详情
      }
    },
    handleTabClick(index) {
      if (this.activeIndex != index) {
        this.activeIndex = index;
        this.resetInit();
      }
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
    [IsEmpty.name]: IsEmpty
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
