<template>
	<div class="item_list">

		<form action="/search">
			<van-search
			placeholder="请输入商品名称"
			v-model="searchVal"
			@search="resetInit"
			showAction />
		</form>

		<van-tabs @click="handleTabClick" @disabled="handleTabClick">
			<van-tab
				v-for="tab in tabsItem"
			 	:title="tab.name"
				:key="tab.type"
				:disabled="tab.sort === false">
			</van-tab>
		</van-tabs>

		<van-popup
			class="filterItem"
			v-model="filterItemShow"
			position="right"
		>
			<ul>
				<li
					v-for="(li, i) in filterItem"
					:key="i"
					@click="filterMethod(i)"
					:class="{filter_active: li.isActive}">
						{{li.name}}
					<van-icon name="success" v-show="li.isActive" class="float-r" />
				</li>
			</ul>
		</van-popup>

		<van-list
		  	v-model="loading"
		  	:finished="finished"
			:immediate-check="false"
	  		:offset="100"
		  	@load="loadMore"
		>
			<item-group>
				<item-card-hori
					v-for="(item, i) in items"
					:key="i"
					:goods="item"
					@click="itemClick(item.id)"
				 />
			</item-group>
		</van-list>

		<is-empty v-if="isEmpty">抱歉,没有找到符合条件商品</is-empty>

		<transition name="fade">
			<van-icon
				name="arrowupcircle"
				class="backTop"
				@click.native="backTop"
				v-show="showArrow"
			/>
		</transition>
	</div>
</template>

<script>
import { GOODS_SEARCH } from '@/api/goods';

import ItemGroup from '@/vue/components/item-group/';
import IsEmpty from '@/vue/components/is-empty/';
import ItemCardHori from '@/vue/components/item-card-hori/';
import { Search, Tab, Tabs } from 'vant';
import { throttle } from 'lodash';

import loadMore from '@/vue/mixin/list-load-more';
import scrollFixed from '@/vue/mixin/scroll-fixed';

export default {
  name: 'Item-list',
  props: {
    keyword: {
      type: String,
      default: ''
    },
    itemClass: {
      type: [String, Number],
      default: ''
    }
  },

  mixins: [loadMore, scrollFixed],

  data() {
    return {
      shop_id: 1,
      tabsItem: [
        { name: '默认', sort: '' },
        { name: '销量', sort: 'sold_quantity' },
        { name: '最新', sort: 'created_at' },
        { name: '筛选', sort: false }
      ],
      sortVal: '',
      is_haitao: 0,
      filterItem: [
        {
          name: '全部',
          filterType: 2,
          isActive: true
        },
        {
          name: '店铺商品',
          filterType: 0,
          isActive: false
        },
        {
          name: '海淘商品',
          filterType: 1,
          isActive: false
        }
      ],
      isHaitao: 2,
      searchVal: '',
      filterItemShow: false,
      showArrow: false
    };
  },

  watch: {
    itemClass() {
      this.scrollTop = 0;
      this.resetInit();
    }
  },

  activated() {
    this.searchVal = this.keyword;
    this.eventListen(true);
  },

  deactivated() {
    this.eventListen(false);
  },

  created() {
    this.resetInit();
    this.scrollShowArrow = throttle(this.scrollShowArrow, 100);
  },

  methods: {
    initData() {
      return this.$reqGet(
        GOODS_SEARCH,
        {
          q: this.searchVal,
          shop_id: this.shop_id,
          cid: this.itemClass,
          'per-page': this.pages.perPage,
          page: this.pages.currPage,
          sort: this.sortVal,
          is_haitao: this.isHaitao
        },
        {
          hideLoading: true
        }
      ).then(res => {
        const { items, page } = res.data.data;
        this.items.push(...items);
        return page;
      });
    },
    eventListen(isBind = true) {
      if (isBind) {
        this.$el.addEventListener('scroll', this.scrollShowArrow);
      } else {
        this.$el.removeEventListener('scroll', this.scrollShowArrow);
      }
    },
    scrollShowArrow() {
      this.showArrow = this.$el.scrollTop > 120;
    },
    handleTabClick(index) {
      if (index === 3) {
        this.filterItemShow = true;
      } else {
        const sortVal = this.tabsItem[index].sort;
        if (sortVal !== this.sortVal) {
          this.sortVal = sortVal;
          this.resetInit();
        }
      }
    },
    filterMethod(i) {
      this.filterItem.forEach((item, index) => {
        item.isActive = i === index;
      });
      const filterType = this.filterItem[i].filterType;
      this.filterItemShow = false;
      if (this.isHaitao !== filterType) {
        this.isHaitao = filterType;
        this.resetInit();
      }
    },
    backTop() {
      this.$el.scrollTop = 0;
    },
    itemClick(id) {
      this.$router.push({ name: 'detail', params: { itemId: id } });
    }
  },

  components: {
    [ItemGroup.name]: ItemGroup,
    [ItemCardHori.name]: ItemCardHori,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [IsEmpty.name]: IsEmpty
  }
};
</script>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.item_list {
  background-color: #fff;
  padding-bottom: 0;
}
.fixedTop {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
}

.items_loading {
  margin: 0 auto;
}
.filterItem {
  width: 40%;
  height: 100%;
  li {
    padding: 10px;
    &.filter_active {
      color: $red;
    }
  }
}
.backTop {
  position: fixed;
  right: 20px;
  bottom: 20px;
  font-size: 24px;
}
</style>
