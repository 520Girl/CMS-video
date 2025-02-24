<template>
  <view class="amx-list-item">
    <view class="amx-list-item__wrap">
      <view class="amx-item-img">
        <image
          class="w-full"
          style="width: 202rpx; height: 285rpx"
          src="https://img.lzzyimg.com/upload/vod/20240715-1/6341b5d7253ed9676a149336f3c23c1e.jpg"
          mode="aspectFill"
        ></image>
        <text class="tl absolute left-[10rpx] top-[10rpx]">
          <up-icon name="star" size="40rpx"></up-icon>
        </text>
        <view class="tr tr-3">
          <text>本</text>
          <text>本</text>
        </view>
        <text class="bl-1">左下</text>
        <text class="br-1">8.0</text>
      </view>
      <view class="amx-item-info">
        <text class="amx-item-info__title block truncate"
          >标题标题标题标题标题标题标题标题标题标题</text
        >
        <text class="amx-item-info__desc block truncate"
          >描述简介描述简介描述简介描述简介描述简介描述简介</text
        >
        <view class="amx-item-info__tag flex justify-start items-center flex-nowrap relative">
          <view class="tag-item truncate">
            <text>标签1</text>
            <text>标签1</text>
            <text>标签1</text>
            <text>标签1</text>
            <text>标签1</text>
            <text>标签1</text>
          </view>
          <view class="tag-more absolute right-0">
            <image
              src="/static/images/more.png"
              style="height: 25rpx; width: 30rpx"
              mode="aspectFill"
            >
            </image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
  @include b(list-item) {
    @apply box-border w-[33.3%];

    @include e(wrap) {
      padding: 10rpx 8rpx;

      .amx-item-img {
        @apply w-full relative;

        image {
          border-radius: $amx-radius-sm;
        }

        .tr {
          @apply absolute top-0 right-0 text-white font-semibold font-mono;
          font-size: $amx-font-size-base;
          background: linear-gradient(to right, #b7f5d0, #66e9a7);
          border: 1px solid #81d9a9;
          padding: 0rpx 9rpx;
          border-radius: 0 $amx-radius-sm 0 $amx-radius-xs;
          color: #0a3720;
        }

        .tr-1 {
          color: #0a3720;
          background: linear-gradient(to right, #b7f5d0, #66e9a7);
        }

        .tr-2 {
          color: #663700;
          border: 1px solid #c9b487;
          background: linear-gradient(to right, #ffeec3, #f9b761);
        }

        .tr-3 {
          color: #673800;
          padding: 0;
          background-color: transparent;
          border: unset;
          // background: linear-gradient(to right, #ffeec3, #66e9a7);

          text:first-child {
            background-color: #020104;
            color: #e2e2e2;
            @apply inline-block font-mono;
            padding: 0 6rpx 0 9rpx;
            border-radius: 0 0 0 $amx-radius-xs;
          }

          text:last-child {
            background: linear-gradient(to right, #ffeec3, #f9b761);
            color: #663700;
            @apply inline-block font-mono;
            padding: 0 9rpx 0 6rpx;
            border-radius: 0 $amx-radius-sm 0 0;
          }
        }

        .bl-1 {
          @apply absolute text-center font-semibold font-mono;
          bottom: 3rpx;
          left: 3rpx;
          font-size: $amx-font-size-base;
          padding: 3rpx 9rpx;
          border-radius: $amx-radius-xs;
          @apply text-center font-semibold;
          background-color: #23314b;
          color: $amx-text-color-light;
        }

        .bl-2 {
          @apply text-white font-normal;
        }

        .br-1 {
          @apply absolute text-white font-semibold;
          right: 4rpx;
          bottom: 2rpx;
          color: #ff7f00;
          font-size: $amx-font-size-md;
        }

        .br-2 {
          @apply absolute text-white font-semibold;
          right: 6rpx;
          bottom: 10rpx;
          font-size: $amx-font-size-ss;
          background: linear-gradient(to right, #ae3919, #cf1d3f);
          padding: 3rpx 9rpx;
          border-radius: $amx-spacing-xs;
          color: $amx-text-color;
        }

        .br-3 {
          @apply absolute text-white font-normal;
          right: 4rpx;
          bottom: 2rpx;
          font-size: $amx-font-size-md;
          padding: 0px 6rpx;
          color: $amx-text-color;
        }
      }
    }
  }

  @include b(item-info) {
    padding: 5rpx 0;

    @include e(title) {
      color: $amx-text-color-light;
      font-size: $amx-font-size-ss;
    }

    @include e(desc) {
      font-size: $amx-font-size;
      color: $amx-text-color-shallow;
      padding-top: 2rpx;
      padding-bottom: 2rpx;
    }

    @include e(tag) {
      color: $amx-text-color-shallow;
      font-size: $amx-font-size-base;
      padding-top: 4rpx;

      .tag-item {
        text {
          background-color: $amx-list-item-tag-bg;
          margin-right: 10rpx;
          padding: 2rpx 4rpx;
          display: inline-block;
        }
      }
    }
  }
</style>
