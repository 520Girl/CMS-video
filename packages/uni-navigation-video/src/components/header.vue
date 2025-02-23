<template>
  <view class="amx-header fixed w-full z-[1]">
    <view class="flex justify-between items-center px-4 py-2">
      <!-- 左侧返回按钮 -->
      <view class="amx-header__icon" @tap="handleBack">
        <image src="/static/images/detail/Back.webp" mode="aspectFit" class="w-full h-full" />
      </view>
      <template v-if="type === 1">
        <!-- 右侧按钮组 -->
        <view class="amx-header__right flex items-center space-x-4">
          <view class="amx-header__icon" @tap="handleFavorite">
            <image
              :src="
                isFavorite ? '/static/images/detail/Save.webp' : '/static/images/detail/Save.webp'
              "
              mode="aspectFit"
              class="w-full h-full"
            />
          </view>
          <view class="amx-header__icon" @tap="handleShare">
            <image src="/static/images/detail/shared.webp" mode="aspectFit" class="w-full h-full" />
          </view>
        </view>
      </template>
      <template>
        <view class="text-center flex-1">
          <text class="amx-header__title">{{ title }}</text>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { theme } from '@/common/js/theme';

  // 定义Props接口
  interface HeaderProps {
    title: string;
    type: number;
  }

  const props = withDefaults(defineProps<HeaderProps>(), {
    title: '详情页',
    type: 1,
  });

  // 收藏状态
  const isFavorite = ref<boolean>(false);

  // 返回上一页
  const handleBack = (): void => {
    uni.navigateBack({
      delta: 1,
    });
  };

  // 处理收藏
  const handleFavorite = (): void => {
    isFavorite.value = !isFavorite.value;
  };

  // 处理分享
  const handleShare = (): void => {
    uni.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
  };
</script>

<style lang="scss" scoped>
  @include b(header) {
    height: 88rpx;
    top: $amx-header-top;
    @include e(icon) {
      @apply flex items-center justify-center;
      width: 70rpx;
      height: 70rpx;
    }
  }
</style>
