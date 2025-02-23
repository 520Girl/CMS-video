<template>
  <view class="amx-classify content">
    <!-- 页面头部 -->
    <Header title="分类" type="2" />

    <!-- 内容区域 -->
    <view class="amx-classify__content">
      <view>
        <view class="flex justify-start flex-wrap">
          <!-- <view
            class="poster"
            :style="{ backgroundImage: `url(${movie.image})` }"
          ></view> -->
          <ListItem v-for="movie in movieList" :key="movie.id" @tap="goToDetail(movie)" />
          <!-- <view class="title">{{ movie.title }}</view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Header from '@/components/header.vue';
  import ListItem from '@/components/listItem.vue';

  interface Movie {
    id: number;
    title: string;
    image: string;
  }

  // 电影列表数据
  const movieList = ref<Movie[]>([
    { id: 1, title: 'Joker', image: 'https://picsum.photos/300/450?random=1' },
    { id: 2, title: 'The Magicians', image: 'https://picsum.photos/300/450?random=2' },
    { id: 3, title: 'Murder Mystery', image: 'https://picsum.photos/300/450?random=3' },
    { id: 4, title: 'Preacher', image: 'https://picsum.photos/300/450?random=4' },
    { id: 5, title: 'Ice Age', image: 'https://picsum.photos/300/450?random=5' },
    { id: 6, title: 'Karinan', image: 'https://picsum.photos/300/450?random=6' },
    { id: 7, title: 'Free Guy', image: 'https://picsum.photos/300/450?random=7' },
    { id: 8, title: 'Space Jam', image: 'https://picsum.photos/300/450?random=8' },
    { id: 9, title: 'Dave Chappelle', image: 'https://picsum.photos/300/450?random=9' },
    { id: 10, title: 'Adam Project', image: 'https://picsum.photos/300/450?random=10' },
    { id: 11, title: 'Sing', image: 'https://picsum.photos/300/450?random=11' },
    { id: 12, title: "Don't Look Up", image: 'https://picsum.photos/300/450?random=12' },
  ]);

  // 跳转到详情页
  const goToDetail = (movie: Movie) => {
    uni.navigateTo({
      url: `/pages/detail/index?id=${movie.id}`,
    });
  };
</script>

<style scoped lang="scss">
  @import '@/common/styles/classify.scss';
</style>
