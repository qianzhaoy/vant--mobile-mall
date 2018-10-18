<template>
	<div class="user_information">
		<van-cell-group>
			<van-cell title="头像" class="cell_middle">
				<van-uploader :afterRead="avatarAfterRead">
					<div class="user_avatar_upload">
						<img :src="avatar + '?x-oss-process=image/resize,m_fill,h_50,w_50'" alt="你的头像" v-if="avatar">
						<van-icon name="camera_full" v-else></van-icon>
					</div>
				</van-uploader>
			</van-cell>
			<van-cell title="背景图" to="/user/information/setbg" isLink></van-cell>
			<van-cell title="昵称" to="/user/information/setNickname" :value="nick_name" isLink />
			<van-cell title="性别" :value="genderText" @click="showSex = true" isLink />
			<van-cell title="密码设置" to="/user/information/setPassword" isLink />
			<van-cell title="手机号" to="/user/information/setMobile" :value="mobile" isLink></van-cell>
		</van-cell-group>

		<van-popup v-model="showSex" position="bottom">
			<van-picker
				showToolbar
				:columns="sexColumns"
				title="选择性别"
				@cancel="showSex = false"
				@confirm="onSexConfirm"/>
		</van-popup>
	</div>
</template>

<script>
import { Uploader, Picker, Popup } from 'vant';
import { USER_PROFILE } from '@/api/user';

export default {
  data() {
    return {
      sexColumns: [
        {
          values: ['保密', '男', '女'],
          defaultIndex: 0
        }
      ],
      showSex: false,
      avatar: '',
      nick_name: '',
      gender: -1,
      mobile: ''
    };
  },

  computed: {
    genderText() {
      const text = ['保密', '男', '女'];
      return text[this.gender] || '';
    }
  },

  created() {
    this.getUserInfo();
  },

  methods: {
    avatarAfterRead(file) {
      console.log(file);
    },
    onSexConfirm(value, index) {
      this.$reqPut(USER_PROFILE, {
        gender: index[0]
      }).then(res => {
        this.gender = res.data.data.gender;
        this.showSex = false;
      });
    },
    getUserInfo() {
      this.$reqGet(USER_PROFILE).then(res => {
        const data = res.data.data;
        this.avatar = data.avatar;
        this.nick_name = data.nick_name;
        this.gender = data.gender;
        this.mobile = data.mobile;
      });
    }
  },

  components: {
    [Uploader.name]: Uploader,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  }
};
</script>


<style lang="scss" scoped>
.user_information {
  .user_avatar_upload {
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid $border-color;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      color: $border-color;
    }
  }
}
</style>
