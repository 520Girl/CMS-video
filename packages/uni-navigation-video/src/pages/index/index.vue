<template>
  <view class="amx-index content">
    <!-- 顶部轮播图区域 -->
    <view class="amx-swiper">
      <up-swiper
        :list="bannerList"
        previousMargin="35"
        nextMargin="30"
        circular
        @change="onImageChange as any"
        :autoplay="false"
        radius="5"
        :bgColor="theme.colors.themeDark"
        :interval="3000"
        :duration="500"
        :height="swiperCss.height"
        showTitle
      >
        <template #default="{ item, index }">
          <image
            :src="item.image"
            mode="aspectFill"
            :id="`image-${index}`"
            :class="['amx-swiper__image', 'transition-all']"
          />
          <text class="amx-swiper__title" :style="{ bottom: swiperCss.titleBottom }"
            >{{ item.title }}
          </text>
        </template>
        <template #indicator>
          <view class="amx-swiper__indicator-wrap">
            <view
              class="amx-swiper__indicator"
              v-for="(item, index) in bannerList"
              :key="index"
              :class="[index === current && 'amx-swiper__indicator--active']"
            >
            </view>
          </view>
        </template>
      </up-swiper>
    </view>

    <!-- 分类导航区域 -->
    <view class="amx-category">
      <text class="amx-category__title title-spacing">分类导航</text>
      <up-sticky>
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
            }"
            itemStyle="padding:17rpx 20rpx;color:$amx-text-color"
          ></up-tabs>
        </view>
      </up-sticky>
    </view>

    <!-- 最受欢迎区域 -->
    <view class="amx-popular amx-category">
      <view class="amx-popular__title flex justify-between items-center">
        <text class="title-spacing">最受欢迎</text>
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
  import { theme } from '@/common/js/theme';
  interface SwiperCss {
    height: string;
    titleBottom: string;
    indicatorBottom: string;
  }
  interface Category {
    id: number;
    name: string;
    badge?: {
      isDot?: boolean;
      value?: number;
    };
  }

  const current = ref(0);
  const transformMap = ref(
    new Map<number, string>([
      [0, 'scaleY(0.9)'],
      [1, 'scale3d(1, 0.9, 1)'],
      [2, 'matrix(1, 0, 0, 0.9, 0, 0)'],
    ])
  );
  // 存储支持的 transform 方法索引
  const transformList = ref<number[]>([]);

  const swiperCss = reactive<SwiperCss>({
    height: '780rpx',
    titleBottom: '150rpx',
    indicatorBottom: '128rpx',
  });
  const indicatorBottom = ref('128rpx');

  // 轮播图数据
  const bannerList = ref([
    {
      image: 'https://img.kuaichezy.net/upload/vod/20250124-1/945577947952f5e63cc90e321c1f445f.jpg',
      title: '标题1',
    },
    { image: 'https://picsum.photos/800/400?random=2', title: '标题2' },
    { image: 'https://picsum.photos/800/400?random=3', title: '标题3' },
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
    //将当前图片高度设置为100%
    const currentImage = document.getElementById(`image-${index}`);
    if (currentImage) {
      if (transformList.value.includes(0)) {
        currentImage.style.transform = 'scale(1)';
      } else if (transformList.value.includes(1)) {
        currentImage.style.transform = 'scale3d(1, 1, 1)';
      } else if (transformList.value.includes(2)) {
        currentImage.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
      } else {
        currentImage.style.height = '100%';
      }
    }

    //修改上一张图片 和下张图片高度
    const prevIndex = index - 1 <= -1 ? bannerList.value.length - 1 : index - 1;
    const nextIndex = index + 1 > bannerList.value.length - 1 ? 0 : index + 1;
    const prevImage = document.getElementById(`image-${prevIndex}`);
    const nextImage = document.getElementById(`image-${nextIndex}`);

    if (prevImage) {
      if (transformList.value.length === 0) {
        prevImage.style.height = '90%'; // 备选方案
      } else {
        transformList.value.some((index) => {
          prevImage.style.transform = transformMap.value.get(index)!;
          return true;
        });
      }
    }
    if (nextImage) {
      if (transformList.value.length === 0) {
        nextImage.style.height = '90%'; // 备选方案
      } else {
        transformList.value.some((index) => {
          nextImage.style.transform = transformMap.value.get(index)!;
          return true;
        });
      }
    }
  };

  // 检测transform 支持情况
  const transformSupport = () => {
    const testImage = document.getElementById('image-0');
    if (testImage) {
      // 测试不同 transform 方法
      const transforms = ['scaleY(0.9)', 'scale3d(1, 0.9, 1)', 'matrix(1, 0, 0, 0.9, 0, 0)'];

      transforms.forEach((transform, index) => {
        testImage.style.transform = transform;
        const computedStyle = window.getComputedStyle(testImage);
        if (computedStyle.transform !== 'none') {
          transformList.value.push(index);
        }
      });
    }
  };
  onMounted(() => {
    transformSupport();
    onImageChange({ current: 0, source: 'auto', currentItemId: '' });
  });
</script>

<style scoped lang="scss">
  @import '@/common/styles/index.scss';
  :deep(.u-swiper__indicator) {
    bottom: v-bind('theme.indicator.bottom');
    @apply absolute;
  }
</style>
