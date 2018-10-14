let mixMethod = {
	methods: {
		mixValid(){
			if(!this.$vuelidation.valid()){
				const errorMsgs = this.$vuelidation.errors();
				const firstKeyr = Object.keys(errorMsgs)[0]
				this.$toast(errorMsgs[firstKeyr][0]);
				return false;
			}
			return true
		}
	}
}

export default {
	install(Vue){
		Vue.mixin(mixMethod);
	}
}