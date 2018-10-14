<template>
	<div>
		<van-cell-group>
			<van-cell title="我的订单" isLink>
				<router-link to="/user/order/list/0" class="text-desc">全部订单</router-link>
			</van-cell>
		</van-cell-group>

		<van-row class="order_status">
			<van-col span="6">
				<div class="order_status_icon" @click="$router.push({path: '/user/order/list/1'})">
					<van-icon name="daifukuan" />
				</div>
				<div>待付款</div>
			</van-col>
			<van-col span="6">
				<div class="order_status_icon" @click="$router.push({path: '/user/order/list/2'})">
					<van-icon name="daifahuo" info="1" />
				</div>
				<div>待发货</div>
			</van-col>
			<van-col span="6">
				<div class="order_status_icon" @click="$router.push({path: '/user/order/list/3'})">
					<van-icon name="wuliu" info="3" />
				</div>
				<div>待收货</div>
			</van-col>
			<van-col span="6">
				<div class="order_status_icon" @click="$router.push({path: '/user/refund/list'})">
					<van-icon name="shouhouguanli" />
				</div>
				<div>退款售后</div>
			</van-col>
		</van-row>

	</div>
</template>

<script>
import { Row, Col } from 'vant';

export default {
  name: 'order-group',

  components: {
    [Row.name]: Row,
    [Col.name]: Col
  }
};
</script>


<style scoped lang="scss">
@import '../../assets/scss/mixin';
.order_status {
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
  font-size: 12px;

  > div {
    @include one-border;
    &::after {
      top: 50%;
      left: 50%;
      border-bottom: 0;
      border-right: 1px solid $border-color;
      height: 150%;
      transform: scale(0.5) translate3d(-50%, -50%, 0);
      transform-origin: 0 0;
    }
    &:last-child::after {
      border: 0;
    }
  }

  .order_status_icon {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-block;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      font-size: 24px;
      color: #000;
    }
  }
}
</style>
