<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view>
      <view class="flex flex-col min-h-screen w-auto"></view>
      测试 tailwindcss
    </view>
    <up-text type="primary" text="主色"></up-text>
    <up-text type="error" text="错误"></up-text>
    <up-text type="success" text="成功"></up-text>
    <up-text type="warning" text="警告"></up-text>
    <up-text type="info" text="信息"></up-text>
    <up-button type="primary" size="small" text="大小尺寸"></up-button>
    <up-button type="primary" text="确定"></up-button>
    <up-button type="primary" :plain="true" text="镂空"></up-button>
    <up-button type="primary" :plain="true" :hairline="true" text="细边"></up-button>
    <up-button type="primary" loading loadingText="加载中"></up-button>
    <up-button type="primary" icon="map" text="图标按钮"></up-button>
    <up-button type="primary" shape="circle" text="按钮形状"></up-button>
    <up-button
      text="渐变色按钮"
      color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
    ></up-button>
  </view>
</template>

<script setup lang="ts">
  const title = ref('Hello');
  const show = ref(false);
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
