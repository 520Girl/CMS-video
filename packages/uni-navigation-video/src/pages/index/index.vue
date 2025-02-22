<template>
  <view class="amx-index content bg-black">
    <!-- 顶部轮播图区域 -->
    <view class="amx-swiper">
      <up-swiper
        :list="bannerList"
        previousMargin="30"
        nextMargin="30"
        circular
        @change="(e) => (current = e.current)"
        :autoplay="false"
        radius="5"
        bgColor="#ffffff"
        :interval="3000"
        :duration="500"
        height="780rpx"
        showTitle
      >
        <template #default="{ item }">
          <image :src="item.image" mode="aspectFill" class="amx-swiper__image" />
          <text class="amx-swiper__title">{{ item.title }}</text>
        </template>
        <template #indicator>
          <view
            class="indicator__dot"
            v-for="(item, index) in bannerList"
            :key="index"
            :class="[index === current && 'indicator__dot--active']"
          >
          </view>
        </template>
      </up-swiper>
    </view>

    <!-- 分类导航区域 -->
    <!-- <view class="category-section">
      <scroll-view scroll-x class="category-scroll" show-scrollbar="false">
        <view class="category-list">
          <view 
            v-for="(item, index) in categories" 
            :key="index"
            class="category-item"
            @tap="selectCategory(item)"
            :class="{'active': currentCategory === item.id}"
          >
            {{ item.name }}
          </view>
        </view>
      </scroll-view>
    </view> -->

    <!-- 最受欢迎区域 -->
    <!-- <view class="popular-section">
      <view class="section-title">最受欢迎</view>
      <scroll-view scroll-x class="popular-scroll" show-scrollbar="false">
        <view class="popular-list">
          <view 
            v-for="(item, index) in popularList" 
            :key="index"
            class="popular-item"
            @tap="goToDetail(item)"
          >
            <image :src="item.image" mode="aspectFill" class="popular-image"/>
            <text class="popular-title">{{ item.title }}</text>
          </view>
        </view>
        
      </scroll-view>
    </view> -->
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  interface BannerItem {
    image: string;
    title: string;
  }

  interface CategoryItem {
    id: number;
    name: string;
  }

  interface PopularItem {
    id: number;
    title: string;
    image: string;
  }

  const current = ref(1);
  const currentCategory = ref(1);

  // 轮播图数据
  const bannerList = ref<BannerItem[]>([
    { image: 'https://picsum.photos/800/400?random=1', title: '标题1' },
    { image: 'https://picsum.photos/800/400?random=2', title: '标题2' },
    { image: 'https://picsum.photos/800/400?random=3', title: '标题3' },
  ]);

  // 分类数据
  const categories = ref<CategoryItem[]>([
    { id: 1, name: '全部的' },
    { id: 2, name: '动作' },
    { id: 3, name: '喜剧' },
    { id: 4, name: '爱情' },
    { id: 5, name: '科幻' },
    { id: 6, name: '恐怖' },
    { id: 7, name: '动画' },
  ]);

  // 最受欢迎数据
  const popularList = ref<PopularItem[]>([
    { id: 1, title: 'Karinan', image: 'https://picsum.photos/300/400?random=1' },
    { id: 2, title: 'Preacher', image: 'https://picsum.photos/300/400?random=2' },
    { id: 3, title: '美国队长', image: 'https://picsum.photos/300/400?random=3' },
    { id: 4, title: '复仇者联盟', image: 'https://picsum.photos/300/400?random=4' },
    { id: 5, title: '钢铁侠', image: 'https://picsum.photos/300/400?random=5' },
  ]);

  // 选择分类
  const selectCategory = (category: any) => {
    currentCategory.value = category.id;
    // TODO: 根据分类加载数据
  };

  // 跳转到详情页
  const goToDetail = (item: any) => {
    // TODO: 实现跳转逻辑
    console.log('跳转到详情页', item);
  };
</script>

<style lang="scss">
  @import url('@/common/styles/index.scss');
</style>
