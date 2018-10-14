<template>
	<div class="place_order_entity">
		<top-user-info style="margin-bottom: 20px;"/>
		<bottom-goods-info />
		<van-submit-bar
			:price="3050"
			label="总计："
			buttonText="提交订单"
			:loading="isSubmit"
			:disabled="isDisabled"
			@submit="onSubmit"
		/>
	</div>
</template>

<script>
import topUserInfo from './top-user-info';
import bottomGoodsInfo from './bottom-goods-info';
import { SubmitBar } from 'vant';

export default {
  data() {
    return {
      isSubmit: false,
      isDisabled: false
    };
  },

  methods: {
    onSubmit() {
      this.isSubmit = true;
      this.$router.replace({ name: 'payment' });
    }
  },

  components: {
    [SubmitBar.name]: SubmitBar,
    [topUserInfo.name]: topUserInfo,
    [bottomGoodsInfo.name]: bottomGoodsInfo
  }
};
</script>


<style lang="scss" scoped>
.place_order_entity {
  padding-bottom: 70px;
}
</style>
