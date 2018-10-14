export default {
	data(){
		return {
			pages:{
				perPage: 8,
				currPage: 1,
				pageCount: 1
			},
			disabled: true,
			isLoading: true,
			noMore: false,
			isEmpty: false,
			eventFlag: false,
			items: [],
		}
	},
	methods: {
		async resetInit(params){
			this.items = [];
			this.pages = {
				perPage: 8,
				currPage: 1,
				pageCount: 1
			}
			this.disabled = true;
			this.isLoading = true;
			this.noMore = false;
			this.isEmpty = false;
			this.eventFlag = false;
			const page = await this.initData();
			this.$nextTick(() => {
				this.setPages(page);
			})
		},
		async loadMore() {
			console.log("loadmore");
			var vm = this;
			if (vm.pages.pageCount < vm.pages.currPage) {
				vm.isNoMore();
			}else{
				vm.toggle(true);
				const page = await vm.initData(true);
				this.nextPage(page.pageCount);
			}
		},
		isNoMore() {
			this.noMore = true;
			this.disabled = true;
			this.isLoading = false;
			setTimeout(() => {
				this.noMore = false;
			}, 1500);
		},
		toggle(isMore, isLoading) {
			if (typeof isLoading === "undefined") {
				isLoading = isMore;
			}
			this.disabled = !!isMore;
			this.isLoading = !!isLoading;
		},
		nextPage(pageCount = 1){
			this.pages.currPage += 1;
			this.pages.pageCount = pageCount;
			this.toggle(false, true);
		},
		setPages(page = {}){
			this.isEmpty = (page.totalCount === 0);
			if(page.totalCount <= this.pages.perPage){
				//不满一页
				this.toggle(true, false);
			}else{
				//下一页
				this.nextPage(page.pageCount);
			}
		},
	}
}
