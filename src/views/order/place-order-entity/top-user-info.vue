<template>
	<van-cell-group>
		<van-cell icon="dingwei" isLink title="张三  13512124547" label="浙江省 杭州市 西湖区 创新创业园" />

		<van-cell class="daodian" >
			<van-checkbox v-model="isDaoDian" slot="icon" label="浙江省 杭州市 西湖区 创新创业园">
				<span class="van-cell__text">到店自提</span>
				<span class="text-desc">可免邮费哦~</span>
			</van-checkbox>
			<div class="text-desc shop_address" slot="title">门店地址: 浙江省 杭州市 西湖区 创新创业园</div>
		</van-cell>

		<van-cell icon="id-card" title="张三" label="330327********1574" isLink />
	</van-cell-group>
</template>

<script>
import { Checkbox } from 'vant';

export default {
  name: 'top-user-info',

  data() {
    return {
      isDaoDian: false
    };
  },

  components: {
    [Checkbox.name]: Checkbox
  }
};
</script>


<style lang="scss">
.daodian {
  .van-checkbox .van-icon-success {
    height: 16px;
    width: 16px;
    font-size: $font-size-small;
    &::before {
      line-height: 16px;
    }
  }
  .van-checkbox__input {
    height: 16px;
  }
  .van-checkbox__label {
    margin-left: 0;
  }
  .shop_address {
    padding-left: 25px;
    box-sizing: border-box;
  }
}
</style>
