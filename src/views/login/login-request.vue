<template>
	<div>
		<md-field-group>
			<md-field
				v-model="account"
				icon="username"
        placeholder="随便输"
				right-icon="clear-full"
				@right-click="clearText" />

			<md-field
				v-model="password"
				icon="lock"
        placeholder="随便输"
				:type="visiblePass ? 'text' : 'password'"
				:right-icon="visiblePass ? 'eye-open' : 'eye-close'"
				@right-click="visiblePass = !visiblePass" />

			<div class="clearfix">
				<div class="float-r"><router-link to="/login/forget">忘记密码</router-link></div>
			</div>

			<van-button size="large" type="danger" :loading="isLogining" @click="loginSubmit">登录</van-button>
		</md-field-group>

		<div class="register clearfix">
			<div class="float-l connect">
				<span @click="showKefu = true">联系客服</span>
			</div>
			<div class="float-r"><router-link to="/login/registerGetCode">免费注册</router-link></div>
		</div>

		<van-popup v-model="showKefu">
			<md-kefu mobile="16454193338" />
		</van-popup>
	</div>
</template>

<script>
import field from '@/vue/components/field/';
import fieldGroup from '@/vue/components/field-group/';
import md_kefu from '@/vue/components/md-kefu/';

import { USER_LOGIN, USER_PROFILE } from '@/api/user';
import { setLocalStorage } from 'core/utils/local-storage';

import { Popup } from 'vant';

export default {
  name: 'login-request',

  data() {
    return {
      account: '',
      password: '',
      visiblePass: false,
      showKefu: false,
      isLogining: false
    };
  },

  methods: {
    clearText() {
      this.account = '';
    },
    loginSubmit() {
      const loginData = this.getLoginData();
      this.isLogining = true;
      this.$reqGet(USER_LOGIN, loginData)
        .then(res => {
          setLocalStorage({
            Authorization: res.data.data.access_token
          });

          return this.$reqGet(USER_PROFILE);
        })
        .then(res => {
          this.isLogining = false;
          const localData = this.getLocalData(res.data.data);
          const redirect = this.$route.query.redirect || 'home';
          setLocalStorage(localData);
          this.$router.replace({
            name: redirect,
            query: this.$route.query
          });
        })
        .catch(() => {
          this.isLogining = false;
        });
    },
    getLoginData() {
      const password = this.password;
      const account = this.getUserType(this.account);
      return {
        [account]: this.account,
        password
      };
    },
    getUserType(account) {
      const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
      const mobileReg = /^1[0-9]{10}$/;
      let accountType = '';
      accountType = mobileReg.test(account)
        ? 'mobile'
        : emailReg.test(account)
          ? 'email'
          : 'username';
      return accountType;
    },
    getLocalData(data) {
      if (!data) return {};
      return {
        avatar: data.avatar,
        user_id: data.user_id,
        background_image: data.background_image,
        nick_name: data.nick_name
      };
    }
  },

  components: {
    [field.name]: field,
    [fieldGroup.name]: fieldGroup,
    [md_kefu.name]: md_kefu,
    [Popup.name]: Popup
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixin';
.register {
  padding-top: 40px;
  color: $font-color-gray;
  a {
    color: $font-color-gray;
  }
  > div {
    width: 50%;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .connect {
    @include one-border(right);
    text-align: right;
  }
}
</style>
