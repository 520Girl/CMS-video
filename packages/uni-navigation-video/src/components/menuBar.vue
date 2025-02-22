<template>
  <view class="amx-menuB flex justify-center items-center fixed">
    <view class="amx-menuB__wrap flex justify-center items-center">
      <view class="amx-menuB__item" v-for="item in menuBar" :key="item.id">
        <image
          :src="item.url"
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
      url: '@/static/images/Home.web',
    },
    {
      id: 2,
      name: '搜索',
      url: '@/static/images/Search.svg',
    },
    {
      id: 3,
      name: '收藏',
      url: '@/static/images/Save.png',
    },
    {
      id: 4,
      name: '下载',
      url: '@/static/images/Download.png',
    },
    {
      id: 5,
      name: '用户',
      url: '@/static/images/Profile.png',
    },
  ]);
</script>
<style scoped lang="scss">
  @include b(menuB) {
    @apply w-full text-center;
    bottom: 36rpx;
    @include e(wrap) {
      width: 698.52rpx;
      height: 124rpx;
      opacity: 1;
      border-radius: 40rpx;
      background: rgba(18, 16, 40, 0.42);
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
