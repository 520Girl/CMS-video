<template>
  <view class="amx-menuB flex justify-center items-center fixed w-full">
    <view class="amx-menuB__wrap w-full flex items-center justify-around">
      <view
        class="amx-menuB__item"
        v-for="item in menuBar"
        :key="item.id"
        @tap="handleTap(item.id)"
      >
        <image
          :src="currentId === item.id ? item.active : item.src"
          mode="aspectFill"
          :alt="item.name"
          class="menB_img w-full h-full"
        ></image>
        <text class="hidden">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';

  const menuBar = reactive([
    {
      id: 1,
      name: '首页',
      src: '/static/images/Home.webp',
      url: '',
      active: '/static/images/Home_a.webp',
    },
    {
      id: 2,
      name: '搜索',
      src: '/static/images/Search.webp',
      url: '/pages/search/index',
      active: '/static/images/Search_a.webp',
    },
    {
      id: 3,
      name: '收藏',
      src: '/static/images/Save.webp',
      url: '/pages/save/index',
      active: '/static/images/Save_a.webp',
    },
    {
      id: 4,
      name: '下载',
      src: '/static/images/Download.webp',
      url: '/pages/download/index',
      active: '/static/images/Download_a.webp',
    },
    {
      id: 5,
      name: '用户',
      src: '/static/images/Profile.webp',
      url: '/pages/user/index',
      active: '/static/images/Profile_a.webp',
    },
  ]);

  const currentId = ref(1);

  const handleTap = (id: number) => {
    currentId.value = id;
    const targetUrl = menuBar.find((item) => item.id === id)?.url;
    if (targetUrl) {
      if (['/pages/index/index', '/pages/search/index', '/pages/user/index'].includes(targetUrl)) {
        uni.switchTab({ url: targetUrl });
      } else {
        uni.navigateTo({ url: targetUrl });
      }
    }
  };

  // 获取当前页面路径并设置对应的currentId
  const setCurrentIdByRoute = () => {
    const pages = getCurrentPages();
    console.log('page', pages);
    const currentPage = pages[pages.length - 1];
    const currentPath = `/${currentPage.route}`;

    const matchedItem = menuBar.find((item) => currentPath.includes(item.url));
    if (matchedItem) {
      currentId.value = matchedItem.id;
    } else if (currentPath === '/pages/index/index') {
      currentId.value = 1;
    }
  };

  onMounted(() => {
    setCurrentIdByRoute();
  });
</script>
<style scoped lang="scss">
  @include b(menuB) {
    bottom: $amx-menu-bottom;

    @include e(wrap) {
      width: 698.52rpx;
      height: $amx-menu-height;
      opacity: 1;
      border-radius: 40rpx;
      background: $amx-menu-background;

      @supports (backdrop-filter: blur(18rpx)) {
        backdrop-filter: blur(18rpx);
      }

      @supports not (backdrop-filter: blur(18rpx)) {
        background-image: url('@/static/images/Rectangle.png');
        background-size: cover;
        background-position: center;
      }
    }

    @include e(item) {
      width: 48rpx;
      height: 48rpx;

      .menB_img {
      }
    }
  }
</style>
