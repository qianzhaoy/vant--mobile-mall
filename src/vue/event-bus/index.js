export default {
	install(Vue){
		Object.defineProperty(Vue.prototype, '$bus', {
			value: new Vue({
				data(){
					return {
						item_list: []
					}
				},
				created(){
					this.$on('item_list', (val) => {
						const isArr = Array.isArray(val);
						if(isArr){
							this.item_list = val;
						}else{
							throw Error("item_list必须为数组");
						}
					})
				}
			})
		})
	}
}