<template>
  <view class="amx-index content">
    <!-- 顶部轮播图区域 -->
    <up-sticky customNavHeight="15rpx" :disabled="!searchShow">
      <view class="amx-search" v-show="searchShow" :style="{ top: theme.index.searchTop }">
        <Search />
      </view>
    </up-sticky>

    <view class="amx-swiper" @tap="onImageTap">
      <up-swiper
        :list="bannerList"
        previousMargin="35"
        nextMargin="30"
        keyName="url"
        circular
        :autoplay="false"
        radius="5"
        @change="onImageChange"
        :bgColor="theme.colors.themeDark"
        :interval="3000"
        :duration="500"
        :height="theme.indicator.swiper"
        :loading="false"
      >
        <template #indicator>
          <view class="amx-swiper__indicator-wrap">
            <view
              class="amx-swiper__indicator transition-all"
              v-for="(item, index) in bannerList"
              :key="index"
              :class="[index === current && 'amx-swiper__indicator--active']"
            >
            </view>
          </view>
        </template>
      </up-swiper>
      <view class="amx-swiper__title" :style="{ bottom: `${theme.indicator.swiperTitleBottom}` }">
        <view v-for="(item, index) in bannerList" :key="index">
          <text v-show="index === current">{{ item.title }}</text>
        </view>
      </view>
    </view>

    <!-- 分类导航区域 -->
    <view class="amx-category">
      <up-sticky customNavHeight="15rpx">
        <text class="amx-category__title title-spacing">分类导航</text>

        <view class="amx-category__scroll">
          <up-tabs
            :list="categories"
            :lineColor="theme.colors.theme"
            :activeStyle="{
              fontWeight: 'bold',
              color: theme.colors.text,
              transform: 'scale(1.05)',
            }"
            :inactiveStyle="{
              color: theme.colors.text,
              transform: 'scale(1)',
              fontSize: '28rpx',
            }"
            itemStyle="padding:17rpx 20rpx;;"
          ></up-tabs>
        </view>
      </up-sticky>
    </view>

    <!-- 最受欢迎区域 -->
    <view class="amx-popular amx-category">
      <view class="amx-popular__title flex justify-between items-center">
        <text class="title-spacing">最受欢迎</text>
        <text class="amx-popular__title-more" @tap="ongoMore">查看全部</text>
      </view>
      <scroll-view scroll-x class="amx-popular__scroll" show-scrollbar="false">
        <view class="popular-list flex justify-start">
          <view
            v-for="(item, index) in popularList"
            :key="index"
            class="popular-item flex-none"
            @tap="goToDetail(item)"
          >
            <image :src="item.image" mode="aspectFill" class="popular-image" />
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 最新电影 -->
    <view class="amx-movie amx-popular amx-category">
      <view class="amx-popular__title flex justify-between items-center">
        <text class="title-spacing">最新电影</text>
        <text class="amx-popular__title-more">查看全部</text>
      </view>
      <scroll-view scroll-x class="amx-popular__scroll" show-scrollbar="false">
        <view class="popular-list flex justify-start">
          <view
            v-for="(item, index) in popularList"
            :key="index"
            class="popular-item flex-none"
            @tap="goToDetail(item)"
          >
            <image :src="item.image" mode="aspectFill" class="popular-image" />
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 底部导航栏 -->
    <MenuBar />
  </view>
</template>

<script setup lang="ts">
  import MenuBar from '@/components/menuBar.vue';
  import Search from '@/components/home/search.vue';
  import { theme } from '@/common/js/theme';

  interface Category {
    id: number;
    name: string;
    badge?: {
      isDot?: boolean;
      value?: number;
    };
  }

  const current = ref(0);

  //监听页面滚动事件
  const searchShow = ref(true);
  const swiperBottom = ref(0);

  onPageScroll(({ scrollTop: top }) => {
    if (top >= swiperBottom.value) {
      searchShow.value = false;
    } else {
      searchShow.value = true;
    }
  });

  //获取元素位置信息
  const getSwiperRect = () => {
    const query = uni.createSelectorQuery();
    query
      .select('.amx-swiper')
      .boundingClientRect((data) => {
        swiperBottom.value = data.bottom;
        console.log('swiper位置信息：', {
          top: data.top, // 元素上边到页面顶部的距离
          bottom: data.bottom, // 元素下边到页面顶部的距离
          height: data.height, // 元素的高度
          left: data.left, // 元素左边到页面左边的距离
          right: data.right, // 元素右边到页面左边的距离
        });
      })
      .exec();
  };

  // 轮播图数据
  const bannerList = ref([
    {
      url: 'https://img.kuaichezy.net/upload/vod/20250124-1/945577947952f5e63cc90e321c1f445f.jpg',
      title: '标题1',
    },
    { url: 'https://picsum.photos/800/400?random=2', title: '标题2' },
    { url: 'https://picsum.photos/800/400?random=3', title: '标题3' },
  ]);

  // 分类数据
  const categories = ref<Category[]>([
    { id: 1, name: '全部的', badge: { isDot: true } },
    { id: 2, name: '动作', badge: { value: 5 } },
    { id: 3, name: '喜剧' },
    { id: 4, name: '爱情' },
    { id: 5, name: '科幻' },
    { id: 6, name: '恐怖' },
    { id: 7, name: '动画' },
  ]);

  // 最受欢迎数据
  const popularList = ref([
    { id: 1, title: 'Karinan', image: 'https://picsum.photos/300/400?random=1' },
    { id: 2, title: 'Preacher', image: 'https://picsum.photos/300/400?random=2' },
    { id: 3, title: '美国队长', image: 'https://picsum.photos/300/400?random=3' },
    { id: 4, title: '复仇者联盟', image: 'https://picsum.photos/300/400?random=4' },
    { id: 5, title: '钢铁侠', image: 'https://picsum.photos/300/400?random=5' },
  ]);

  // 跳转到详情页
  const goToDetail = (item: any) => {
    // TODO: 实现跳转逻辑
    console.log('跳转到详情页', item);
  };

  // 当切换图片时触发
  const onImageChange = (e: { current: number; source: string; currentItemId: string }) => {
    console.log('当前图片索引', e);
    const index = e.current;
    current.value = e.current;
  };

  const onImageTap = (e: any) => {
    //跳转到分类页面
    uni.navigateTo({
      url: '/pages/classify/index',
    });
  };
  const ongoMore = () => {
    //跳转到分类页面
    uni.navigateTo({
      url: '/pages/detail/index',
    });
  };
  onMounted(() => {
    getSwiperRect();
  });
</script>

<style scoped lang="scss">
  @import '@/common/styles/index.scss';
  :deep(.u-swiper__indicator) {
    bottom: v-bind('theme.indicator.bottom');
    @apply absolute z-[1];
  }
</style>
