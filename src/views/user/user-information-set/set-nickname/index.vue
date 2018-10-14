<template>
	<div class="set_nickname">
		<van-cell-group>
			<van-field
			v-model="nickName"
			label="昵称"
			:error="!!$vuelidation.error('nickName')" />
		</van-cell-group>
		
		<div class="bottom_btn">
			<van-button size="large" type="danger" @click="saveNick">保存</van-button>
		</div>
	</div>
</template>


<script>
	import { USER_PROFILE } from '@/api/user';
	import valid from '@/api/user';
	
	export default {
		data(){
			return {
				nickName: ""
			}
		},
		
		vuelidation: {
			data: {
				nickName: {
					required: {
						msg(){
							return "请填写昵称"
						}
					}
				}
			}
		},
		
		created(){
			this.getNick();
		},
		
		methods: {
			getNick(){
				this.nickName = localStorage.getItem('nick_name') || '';
			},
			saveNick(){
				if(this.mixValid()){
					this.$reqPut(USER_PROFILE, {nick_name: this.nickName}).then(res => {
						localStorage.setItem('nick_name', res.data.data.nick_name);
						 return this.$dialog.alert({message: '保存成功'})
					}).then(() => {
						this.$router.go(-1);
					})
				}
			},
		}
	}
</script>


<style scoped>
	.bottom_btn{
		padding: 30px 15px 0 15px; 
	}
</style>