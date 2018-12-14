<template>
	<div class="class_tree clearfix">
		<ul class="class_tree_nav">
			<li
				v-for="(item ,index) in list"
				:key="item.id"
				:class="{active_nav: navActive == index}"
				@click="navclick(index)">
				{{item.name}}
			</li>
		</ul>
		<div class="class_tree_content">
			<div class="class_tree_all">
				<span @click="allClick">全部 <i class="van-icon van-icon-arrow"></i></span>
			</div>
			<div class="class_tree_items_wrap clearfix">
				<div @click="classClick(item.id)" :key="i" v-for="(item, i) in goods">
					<div class="class_tree_item_img">
            <img :src="item.pic_url" :alt="item.name">
          </div>
					<div class="class_tree_item_name">{{item.name}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'class-tree',

  model: {
    prop: 'activeIndex'
  },

  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    }
  },

  data() {
    const navActive =
      this.activeIndex >= this.list.length ? 0 : this.activeIndex;
    return {
      navActive
    };
  },

  computed: {
    goods() {
      const list = this.list,
        navActive = this.navActive;
      return list.length ? list[navActive].children : [];
    }
  },

  methods: {
    allClick() {
      this.$emit('all-click');
    },
    navclick(i) {
      this.navActive = i;
      this.$emit('nav-click', i);
    },
    classClick(id) {
      this.$emit('class-click', id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixin';
.class_tree {
  position: relative;
  background-color: #fff;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
}
.class_tree_nav {
  float: left;
  width: 100px;
  height: 100%;
  background-color: #f8f8f8;
  overflow: scroll;
  > li {
    @include one-border;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-left: 2px solid $bg-color;
  }
  > li.active_nav {
    background-color: #fff;
    border-left: 2px solid $red;
    color: $red;
  }
}
.class_tree_content {
  margin-left: 100px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .class_tree_all {
    text-align: right;
    padding-right: 10px;
    height: 40px;
    line-height: 40px;
    color: $font-color-gray;
    font-size: $font-size-small;
  }
  .van-icon-arrow {
    font-size: $font-size-small;
  }
  .class_tree_items_wrap {
    padding: 10px 20px;
    margin-right: -3%;
    text-align: center;
    > div {
      float: left;
      padding-right: 3%;
      box-sizing: border-box;
      width: 33.333%;
      margin-bottom: 20px;
    }
    img {
      max-width: 100%;
    }

    .class_tree_item_img {
      display: inline-block;
      max-width: 100%;
      width: 70px;
      height: 70px;
    }
    .class_tree_item_name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
