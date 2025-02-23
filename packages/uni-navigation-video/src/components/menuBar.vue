<template>
  <view class="amx-menuB flex justify-center items-center fixed">
    <view class="amx-menuB__wrap w-full flex items-center justify-around">
      <view class="amx-menuB__item" v-for="item in menuBar" :key="item.id">
        <image
          :src="currentId === item.id ? item.active : item.url"
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
  const menuBar = reactive([
    {
      id: 1,
      name: '首页',
      url: '/static/images/Home.webp',
      active: '/static/images/Home_a.webp',
    },
    {
      id: 2,
      name: '搜索',
      url: '/static/images/Search.webp',
      active: '/static/images/Search_a.webp',
    },
    {
      id: 3,
      name: '收藏',
      url: '/static/images/Save.webp',
      active: '/static/images/Save_a.webp',
    },
    {
      id: 4,
      name: '下载',
      url: '/static/images/Download.webp',
      active: '/static/images/Download_a.webp',
    },
    {
      id: 5,
      name: '用户',
      url: '/static/images/Profile.webp',
      active: '/static/images/Profile_a.webp',
    },
  ]);
  const currentId = ref(1);
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
