<template>
	<div>
		<md-field-group>
			<md-field
				v-model="account"
				icon="username"
        placeholder="随便输"
				right-icon="clear-full"
        v-validate="'required'"
        name="user"
        data-vv-as="帐号"
				@right-click="clearText"
      />

			<md-field
				v-model="password"
				icon="lock"
        placeholder="随便输"
				:type="visiblePass ? 'text' : 'password'"
				:right-icon="visiblePass ? 'eye-open' : 'eye-close'"
        v-validate="'required'"
        data-vv-as="密码"
        name="password"
				@right-click="visiblePass = !visiblePass" 
      />

			<div class="clearfix">
				<div class="float-r">
          <router-link to="/login/forget">忘记密码</router-link>
        </div>
			</div>

			<van-button 
        size="large" 
        type="danger" 
        :loading="isLogining" 
        @click="loginSubmit"
      >登录</van-button>
		</md-field-group>

		<div class="register clearfix">
			<div class="float-l connect">
				<span @click="showKefu = true">联系客服</span>
			</div>
			<div class="float-r">
        <router-link to="/login/registerGetCode">免费注册</router-link>
      </div>
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
import { emailReg, mobileReg } from '@/core/regexp';

import { Popup, Toast } from 'vant';

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

    async validate() {
      const result = await this.$validator.validate();
      if (!result) {
        const errMsg = this.errors.items[0].msg;
        Toast(errMsg);
        throw new Error(`表单验证: ${errMsg}`);
      }
    },

    async login() {
      const loginData = this.getLoginData();
      const { data } = await this.$reqGet(USER_LOGIN, loginData);
      setLocalStorage({
        Authorization: data.data.access_token
      });
    },

    async loginSubmit() {
      this.isLogining = true;
      try {
        await this.validate();
        await this.login();
        await this.getUserProfile();
        this.isLogining = false;
      } catch (err) {
        console.log(err.message);
        this.isLogining = false;
      }
    },

    async getUserProfile() {
      const {
        data: { data }
      } = await this.$reqGet(USER_PROFILE);

      setLocalStorage({
        avatar: data.avatar,
        user_id: data.user_id,
        background_image: data.background_image,
        nick_name: data.nick_name
      });

      this.routerRedirect();
    },

    routerRedirect() {
      const { query } = this.$route;
      this.$router.replace({
        name: query.redirect || 'home',
        query: query
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
      const accountType = mobileReg.test(account)
        ? 'mobile'
        : emailReg.test(account)
          ? 'email'
          : 'username';
      return accountType;
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
