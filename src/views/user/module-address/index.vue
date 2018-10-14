<template>
	<div>
	<van-radio-group v-model="default_address" @change="setDefaultAddress">
		<van-cell-group v-for="item in addressList" :key="item.id" class="addressGroup">
				<van-cell
					isLink
					icon="dingwei"
					title="张三"
					label="门店地址: 浙江省 杭州市 西湖区 创新创业园"
				/>

				<van-cell>
					<van-radio
						slot="title"
						:name="item.id"
						@change="setDefaultAddress(item.id)">
						<span :class="item.isDefault && 'red'">{{item.isDefault ? '默认地址' : '设为默认'}}</span>
					</van-radio>
					<div>
						<router-link
							:to="{name: 'address-edit', params: {addressId: item.id}}"
							style="margin-right: 10px;">
							<van-icon name="editor" />
							编辑
						</router-link>
						<span>
							<van-icon name="lajitong" />
							删除
						</span>
					</div>
				</van-cell>

			</van-cell-group>
		</van-radio-group>

		<van-button class="bottom_btn" @click="setNewAddress" type="primary"  bottomAction>
			添加地址
		</van-button>
	</div>
</template>

<script>
import { Checkbox, Radio, RadioGroup } from 'vant';

export default {
  data() {
    return {
      default_address: 1,
      addressList: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ]
    };
  },

  methods: {
    setDefaultAddress(id) {
      console.log(id);
    },
    setNewAddress() {
      this.$router.push({ name: 'address-edit', params: { addressId: -1 } });
    }
  },

  components: {
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup
  }
};
</script>


<style lang="scss" scoped>
.addressGroup {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

.bottom_btn {
  position: fixed;
  bottom: 0;
}
</style>
