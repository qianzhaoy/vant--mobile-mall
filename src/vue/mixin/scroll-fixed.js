// 滚动条记录， 适用于 keep-alive 组件
export default {
	data(){
		return {
			scrollTop: 0
		}
	},
	
	mounted(){
		const vm = this;
		
		vm.$el.addEventListener('scroll', vm.$util.debounce(function() {
			vm.scrollTop = vm.$el.scrollTop;
		}, 50))
	},
	
	activated(){
		this.$el.scrollTop = this.scrollTop;
	},
}