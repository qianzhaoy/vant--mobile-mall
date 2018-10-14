<template>
	<div class="popup_wrap address_wrap">
		<van-icon name="clear" class="cancel_popup" @click.native="$parent.value = false"></van-icon>
		<div class="popup_header">配送至</div>
		<div class="popup_content">
			<van-loading v-if="!address_list" class="address_popup_load" type="circle" color="black" />
			<div v-for="(li, i) in address_list" :key="i" @click="listChoose(li)">
				<van-tag plain type="danger" style="margin-right: 5px;" v-if="li.isDefault">默认</van-tag>
				{{li.area_name + li.address}}
				<van-icon name="success" class="address_active" v-show="addressVal.id == li.id"></van-icon>
			</div>
		</div>
		<div class="popup_footer">
			<van-cell-group>
				<van-cell is-link title="其他区域" @click.native="areaChoose"></van-cell>
			</van-cell-group>
		</div>
	</div>
</template>


<script>
import { ADDRESS, ADDRESS_DEFAULT } from '@/api/user';

export default {
  name: 'popup-address',

  props: {
    isShow: Boolean,
    addressVal: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      address_list: null,
      address_default: {}
    };
  },

  watch: {
    isShow(val) {
      val && !this.address_list && this.getAddress();
    }
  },

  created() {
    // 一进页面先拿默认地址，等打开弹窗在请求地址列表
    this.getAddressDefault();
  },

  methods: {
    getAddress() {
      if (localStorage.getItem('Authorization')) {
        this.$reqGet(
          ADDRESS,
          {},
          {
            hideLoading: true
          }
        ).then(res => {
          const data = res.data.data.map(data => {
            data.isDefault =
              !!this.address_default && data.id == this.address_default.id;
            return data;
          });
          this.address_list = data;
        });
      } else {
        this.address_list = [];
      }
    },
    getAddressDefault() {
      localStorage.getItem('Authorization') &&
        this.$reqGet(
          ADDRESS_DEFAULT,
          {},
          {
            hideLoading: true
          }
        ).then(res => {
          const data = res.data.data;
          this.$emit('confirm', data);
          this.address_default = data || {};
        });
    },
    listChoose(li) {
      this.$emit('confirm', li);
      this.isShow = false;
    },
    areaChoose() {
      this.$emit('area-click', true);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/scss/var';
@import '../../../../assets/scss/mixin';
.popup_wrap {
  position: relative;
  padding-bottom: 30px;
  box-sizing: border-box;
  .popup_header {
    padding: 15px 0 30px 0;
    text-align: center;
  }

  .popup_content {
    min-height: 150px;
    max-height: 400px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 10px;
    line-height: 30px;
    &::-webkit-scrollbar {
      background-color: #fff;
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #bebebe;
    }
    ol {
      padding-left: 15px;
      list-style: decimal;
    }
  }

  .cancel_popup {
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 9;
    font-size: 18px;
  }
}

.address_wrap {
  .popup_header {
    @include one-border;
    text-align: left;
    padding-bottom: 15px;
    padding-left: 10px;
    margin-bottom: 15px;
  }
  .popup_content {
    @include one-border;
    line-height: 22px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    > div {
      position: relative;
      margin-bottom: 10px;
      padding-right: 30px;
    }
    > div.address_popup_load {
      margin: 0 auto;
      padding: 0;
    }
    > div i {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      color: #fff;
      &.address_active {
        color: $red;
      }
    }
  }
}
</style>
