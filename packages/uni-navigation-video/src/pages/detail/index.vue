<template>
  <view class="amx-detail content">
    <Header />
    <!-- 影片信息区域 -->
    <view class="amx-detail__info">
      <view class="amx-detail__cover text-center relative w-full">
        <text class="amx-detail__title absolute bottom-4 w-full z-[1] font-bold">{{
          movieInfo.title
        }}</text>
        <image :src="movieInfo.cover" mode="aspectFill" class="cover-image background-linear" />
      </view>
      <view class="amx-detail__content">
        <view class="amx-detail__meta font-serif flex justify-end">
          <text class="meta-item flex items-center">
            <up-count-to startVal="1" :endVal="movieInfo.year" :duration="1000"></up-count-to>
          </text>
          <text class="meta-item flex items-center"
            >{{ movieInfo.duration }} • {{ movieInfo.type }}</text
          >
        </view>
        <view class="amx-detail__actions">
          <button class="action-btn action-btn--watch" @tap="handleWatch">
            <image
              src="/static/images/detail/Polygon.webp"
              mode="aspectFit"
              class="action-icon"
              style="width: 30rpx; height: 28rpx"
            />
            <text>观看</text>
          </button>
          <button class="action-btn action-btn--download" @tap="handleDownload">
            <image src="/static/images/detail/Download.webp" mode="aspectFit" class="action-icon" />
            <text>下载</text>
          </button>
        </view>
        <view class="amx-detail__desc">
          <text class="desc-content text-center">{{ movieInfo.description }}</text>
        </view>
      </view>
    </view>

    <!-- 标签切换区域 -->
    <view class="amx-detail__tabs">
      <view class="tabs-header flex justify-center">
        <view
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-item transition-all text-center"
          :class="{ 'tab-item--active': currentTab === tab.id }"
          @tap="handleTabChange(tab.id)"
        >
          {{ tab.name }}
        </view>
      </view>
      <view class="tabs-content">
        <view v-if="currentTab === 1" class="tab-pane data-pool">
          <view class="flex justify-between">
            <view class="pane-images">
              <up-swiper
                :list="list3"
                previousMargin="30"
                nextMargin="30"
                circular
                :autoplay="true"
                radius="5"
                bgColor="#ffffff"
                class="w-full h-full"
              ></up-swiper>
            </view>
            <view class="pane-desc">
              <view class="pane-desc__title flex justify-between">
                <text>阿拉丁</text>
                <text>vip</text>
              </view>
              <view class="pane-desc__info">
                <view class="button flex justify-start pb-1" v-for="item in 5" :key="item">
                  <view class="button__left flex">
                    <text class="pr-[4rpx]">无尽资源</text>
                    <up-icon size="10" name="arrow-right"></up-icon>
                  </view>
                  <up-count-to
                    class="font-serif pl-4"
                    :startVal="30"
                    fontSize="14"
                    :endVal="500"
                  ></up-count-to>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-else-if="currentTab === 2" class="tab-pane">
          <text class="about-text">{{ movieInfo.about }}</text>
        </view>
        <view v-else class="tab-pane about">
          <view class="about-wrap">
            <view class="about-text flex flex-col justify-start">
              <text class="label pb-[2rpx]">类型</text>
              <text class="value">冒险、喜剧,动漫</text>
            </view>
            <view class="about-text flex flex-col justify-start">
              <text class="label pb-[2rpx]">语言类型</text>
              <text class="value">冒险、喜剧,动漫</text>
            </view>
            <view class="about-text flex flex-col justify-start">
              <text class="label pb-[2rpx]">上线日期</text>
              <text class="value">冒险、喜剧,动漫</text>
            </view>
            <view class="about-text flex flex-col justify-start">
              <text class="label pb-[2rpx]">国家</text>
              <text class="value">冒险、喜剧,动漫</text>
            </view>
          </view>
          <view class="about-avatar flex flex-col justify-start">
            <view class="avatar">
              <text class="label pb-[2rpx]">导演：</text>
              <text class="value">冒险、喜剧,动漫</text>
            </view>
            <view class="director">
              <text class="label pb-[2rpx]">演员：</text>
              <text class="value"
                >冒险、喜剧,动漫冒险、喜剧,动漫冒险、喜剧,动漫冒险、喜剧,动漫冒险、喜剧,动漫冒险、喜剧,动漫冒险、喜剧,动漫</text
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import Header from '@/components/header.vue';

  interface Track {
    id: number;
    name: string;
    duration: string;
  }

  interface MovieInfo {
    cover: string;
    title: string;
    description: string;
    duration: string;
    year: number;
    type: string;
    tracks: Track[];
    about: string;
    vod_actor: string[];
  }

  const currentTab = ref(3);
  const list3 = ref([
    'https://img.kuaichezy.net/upload/vod/20250124-1/945577947952f5e63cc90e321c1f445f.jpg',
    'https://img.kuaichezy.net/upload/vod/20250124-1/945577947952f5e63cc90e321c1f445f.jpg',
    'https://img.kuaichezy.net/upload/vod/20250124-1/945577947952f5e63cc90e321c1f445f.jpg',
  ]);
  const tabs = reactive([
    { id: 1, name: '源数据' },
    { id: 2, name: '类似' },
    { id: 3, name: '关于' },
  ]);

  const movieInfo = reactive<MovieInfo>({
    cover: 'https://img.kuaichezy.net/upload/vod/20250124-1/945577947952f5e63cc90e321c1f445f.jpg',
    title: '迪士尼的阿拉丁',
    description: '阿拉丁，一个在街市上靠偷窃为生的小偷，遇见了一位神秘魔法师...',
    duration: '2小时8分',
    year: 2019,
    type: '冒险、喜剧',
    vod_actor: ['阿拉丁', '魔法师', '神灯', '威尔史密斯', '梅娜玛索德', '娜奥米斯科特'],
    tracks: [
      { id: 1, name: 'Arabian Nights', duration: '2:27' },
      { id: 2, name: 'One Jump Ahead', duration: '2:55' },
      { id: 3, name: 'Friend Like Me', duration: '2:37' },
    ],
    about:
      '《阿拉丁》是由盖·里奇执导，威尔·史密斯、梅娜·玛索德、娜奥米·斯科特等主演的奇幻冒险电影。改编自迪士尼1992年推出的同名动画电影...',
  });

  const handleTabChange = (tabId: number): void => {
    currentTab.value = tabId;
  };

  const handleWatch = () => {
    // TODO: 实现观看功能
    console.log('观看视频');
  };

  const handleDownload = () => {
    // TODO: 实现下载功能
    console.log('下载视频');
  };
</script>

<style lang="scss" scoped>
  @import '@/common/styles/detail.scss';
</style>
