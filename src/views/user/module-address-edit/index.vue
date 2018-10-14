<template>
	<van-address-edit
		style="background-color: #fff;"
		:areaList="areaList"
		:addressInfo="addressInfo"
		:isSaving="isSave"
		showPostal
		@save="save"
	/>
</template>

<script>
import { AddressEdit } from 'vant';
import areaList from './area.json';

export default {
  name: 'address-edit',

  props: {
    addressId: [Number, String]
  },

  data() {
    return {
      areaList,
      isSave: false,
      addressInfo: {}
    };
  },

  activated() {
    setTimeout(() => {
      this.addressInfo = {
        id: this.addressId,
        name: 'qianzhaoy',
        tel: '13454193338',
        province: '浙江省',
        city: '杭州市',
        county: '西湖区',
        address_detail: '是的是的',
        area_code: '330106',
        postal_code: 123456
      };
    }, 1000);
  },

  methods: {
    save(data) {
      this.$toast('成功');
      console.log(data);
    }
  },

  components: {
    [AddressEdit.name]: AddressEdit
  }
};
</script>
