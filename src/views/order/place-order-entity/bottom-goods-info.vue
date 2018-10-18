<template>
	<div class="order-goods">
		<van-card
			v-for="item in goods"
			:key="item.id"
			:title="item.title"
			:desc="item.desc"
			:num="item.num"
			price="2.00"
			:thumb="item.thumb"
		>
			<div slot="footer">
				生成日期 2017-10-26
			</div>
		</van-card>

		<van-cell-group>
			<van-field v-model="remark" placeholder="请输入备注" label="订单备注">
				<template slot="icon">
					3/50
				</template>
			</van-field>

			<van-cell title="商品金额">
				<span class="red">{{720096 | yuan}}</span>
			</van-cell>
			<van-cell title="邮费" value="¥8.96"></van-cell>
			<van-cell title="税费" value="¥8.96"></van-cell>
			<van-cell title="多件随机优惠">
				<span class="red">{{1000 | yuan}}</span>
			</van-cell>
		</van-cell-group>
	</div>
</template>

<script>
import { Card, Field } from 'vant';

export default {
  name: 'bottom-goods-info',

  data() {
    return {
      remark: '',
      goods: [
        {
          id: '1',
          title: '进口香蕉',
          desc: '约250g，2根',
          price: 200,
          status: 0,
          num: 1,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
        },
        {
          id: '2',
          title: '陕西蜜梨',
          desc: '约600g',
          price: 690,
          status: 1,
          num: 3,
          thumb:
            'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
        }
      ]
    };
  },

  components: {
    [Card.name]: Card,
    [Field.name]: Field
  }
};
</script>
<style lang="scss" scoped>
.order-goods {
  background-color: #fff;
}
</style>
