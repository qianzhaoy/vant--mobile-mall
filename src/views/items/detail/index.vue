<template>
	<div class="item_detail">

		<van-swipe :autoplay="3000">
			<van-swipe-item v-for="(image, index) in itemImgs" :key="index">
				<img v-lazy="image.url" width="100%"/>
			</van-swipe-item>
		</van-swipe>

		<van-cell-group class="item_cell_group" v-if="goods">
			<van-cell class="item_info">
				<div>
					<span class="item_price">{{ goods.sales_price | yuan }}</span>
					<span class="item_market_price">{{goods.market_price | yuan}}</span>
				</div>
				<div class="item-title">
					<van-tag plain type="danger" v-if="goods.is_haitao">海淘</van-tag>
					{{ goods.name }}
				</div>
				<div class="item_intro">{{goods.sell_point}}</div>
				<div class="item_dispatch">发货地: {{goods.ship_address.city}}</div>
			</van-cell>
		</van-cell-group>

		<component
	 		v-if="goods"
		 	ref="goodAction"
			v-bind:is="goods.is_virtual ? 'virtual-group'  : 'entity-group'"
			:selectSku.sync="selectSku"
			:addressVal.sync="addressVal"
			:mobile="mobile"
			:goods-info="goods"
			@skuBuy="doBuyNow"
			/>

		<div class="item_desc" v-if="goods">
			<div class="item_desc_title">商品详情</div>
			<div class="item_desc_wrap" v-html="goods.desc"></div>
		</div>

		<van-goods-action>
			<van-goods-action-mini-btn @click="doContact" icon="wangwang" iconClass="red afterTag" />
			<van-goods-action-mini-btn @click="toCart" icon="cart" :info="cartInfo"/>
			<van-goods-action-mini-btn @click="addCollect" icon="shoucang" />
			<van-goods-action-big-btn @click="addCart" text="加入购物车" />
			<van-goods-action-big-btn primary @click="doBuyNow" text="立即购买" />
		</van-goods-action>

		<van-popup v-model="showContact">
			<md-kefu mobile="16454193338" />
		</van-popup>

	</div>
</template>

<script>
import { GOODS_DETAIL } from '@/api/goods';

import {
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Popup
} from 'vant';

import md_kefu from '@/vue/components/md-kefu/';

export default {
  props: {
    itemId: [String, Number]
  },

  data() {
    const isLogin = !!localStorage.getItem('Authorization');
    return {
      isLogin,
      showContact: false,
      cartInfo: '5',
      mobile: '13454193338',
      selectSku: {
        selectedNum: 1,
        selectedSkuComb: {}
      },
      addressVal: {
        id: null,
        area_name: '',
        district: '',
        city: '',
        province: ''
      },
      goods: null
    };
  },

  computed: {
    itemImgs() {
      return this.goods ? this.goods.item_imgs : [];
    }
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      this.$reqGet(`${GOODS_DETAIL}`, {
        expand: 'desc,skus,prop_imgs,item_imgs'
      }).then(res => {
        this.goods = res.data.data;
      });
    },

    doBuyNow() {
      if (
        (this.goods.has_sku && this.selectSku.sku_id) ||
        !this.goods.has_sku
      ) {
        this.$router.push({ name: 'placeOrderEntity' });
      } else {
        const goodAction = this.$refs.goodAction;
        goodAction.showSku = true;
        goodAction.isSkuBuy = true;
      }
    },
    addCart() {
      if (this.goods.has_sku && this.selectSku.sku_id) {
        this.$toast({
          message: '已添加至购物车',
          duration: 1500
        });
        this.cartInfo = String(parseInt(this.cartInfo) + 1);
      }
    },
    doContact() {
      this.showContact = true;
    },
    toCart() {
      this.$router.push({
        name: 'cart'
      });
    },
    addCollect() {
      this.$toast({
        message: '已添加至我的收藏',
        duration: 1500
      });
    }
  },

  components: {
    [md_kefu.name]: md_kefu,
    [Popup.name]: Popup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    'entity-group': () =>
      import(/* webpackChunkName: "EntityGroup" */ './EntityGroup/index'),
    'virtual-group': () =>
      import(/* webpackChunkName: "VirtualGroup" */ './VirtualGroup/index.vue')
  }
};
</script>

<style lang="scss" scoped>
.item_detail {
  img {
    max-width: 100%;
  }
}

.item_cell_group {
  margin-bottom: 15px;
}

.item_price {
  font-size: 20px;
  color: $red;
  margin-right: 10px;
}

.item_market_price {
  color: $font-color-gray;
  text-decoration: line-through;
  font-size: $font-size-small;
}

.item-title {
  line-height: 1.4;
}

.item_dispatch {
  font-size: $font-size-small;
  color: $font-color-gray;
}

.item_intro {
  line-height: 18px;
  margin: 5px 0;
  font-size: $font-size-small;
  color: $font-color-gray;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.item_desc {
  background-color: #fff;
  p {
    padding: 0 10px;
  }
  /deep/ img {
    max-width: 100%;
    display: block;
  }
}

.item_desc_title {
  @include one-border;
  padding: 10px 0;
  text-align: center;
}
</style>
