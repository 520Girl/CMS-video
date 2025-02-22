<template>
  <view class="amx-index content bg-slate-400">
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
        bgColor="#ffffff"
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
          <text class="amx-swiper__title" :style="{ bottom: swiperCss.titleBottom }">{{
            item.title
          }}</text>
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
      <scroll-view scroll-x class="amx-category__scroll" show-scrollbar="false">
        <view class="category-list relative">
          <view
            class="category-bg transition-all absolute"
            :style="{
              transform: `translateX(${currentCategoryLeft}px)`,
              width: `${currentCategoryWidth}px`,
            }"
          ></view>
          <view
            v-for="(item, index) in categories"
            :key="index"
            class="category-item relative"
            @tap="selectCategory(item)"
            :class="{ 'category-item--active': currentCategory === item.id }"
            :ref="(el) => (categoryRefs[index] = el)"
          >
            {{ item.name }}
          </view>
        </view>
      </scroll-view>
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
  interface SwiperCss {
    height: string;
    titleBottom: string;
    indicatorBottom: string;
  }
  interface Category {
    id: number;
    name: string;
  }

  const current = ref(0);
  const currentCategory = ref(1);
  const currentCategoryLeft = ref(0);
  const currentCategoryWidth = ref(0);
  const categoryRefs = ref<any[]>([]);

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
    { id: 1, name: '全部的' },
    { id: 2, name: '动作' },
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

  // 选择分类
  const selectCategory = (category: Category) => {
    currentCategory.value = category.id;
    // 获取选中项的DOM元素
    const index = categories.value.findIndex((item) => item.id === category.id);
    const selectedElement = categoryRefs.value[index];

    if (selectedElement) {
      // 更新背景位置和宽度
      currentCategoryLeft.value = selectedElement.$el.offsetLeft;
      currentCategoryWidth.value = selectedElement.$el.offsetWidth;
    }
    // TODO: 根据分类加载数据
  };

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
      currentImage.style.transform = 'scale(1)';
    }

    //修改上一张图片 和下张图片高度
    const prevIndex = index - 1 <= -1 ? bannerList.value.length - 1 : index - 1;
    const nextIndex = index + 1 > bannerList.value.length - 1 ? 0 : index + 1;
    const prevImage = document.getElementById(`image-${prevIndex}`);
    const nextImage = document.getElementById(`image-${nextIndex}`);

    if (prevImage) {
      prevImage.style.transform = 'scaleY(0.9)';
    }
    if (nextImage) {
      nextImage.style.transform = 'scaleY(0.9)';
    }
  };
  onMounted(() => {
    onImageChange({ current: 0, source: 'auto', currentItemId: '' });
    selectCategory({ id: 1, name: '全部的' });
  });
</script>

<style scoped lang="scss">
  @import url('@/common/styles/index.scss');
  :deep(.u-swiper__indicator) {
    bottom: v-bind('indicatorBottom');
    @apply absolute;
  }
</style>
