<template>
  <view class="amx-input" :class="{ selectInput: searchInputShow }">
    <view class="amx-input__center" @tap="searchSelect">
      <view class="search">
        <view class="search-input">
          <input
            type="text"
            v-model="searchText"
            ref="inputRef"
            id="searchInput"
            class="input"
            v-show="searchInputShow"
            @blur="searchBack"
          />

          <view
            class="block w-full h-full text-center bg-transparent search-text-container"
            v-show="!searchInputShow"
          >
            <view
              v-for="(item, index) in searchTextData"
              :key="index"
              class="block w-full text-center search-input-text bg-transparent h-full"
              :class="{ 'search-text-active': searchTextShow === index }"
              :animation="searchTextShow === index ? slideInAnimation : slideOutAnimation"
            >
              <text>{{ item }}</text>
              <text>限免</text>
            </view>
          </view>
        </view>
        <view class="search-icon">
          <up-icon name="search" :color="theme.colors.theme" size="28"></up-icon>
        </view>
      </view>
    </view>
    <view class="amx-input__right">
      <text v-show="searchInputShow" @tap="search">搜索</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { theme } from '@/common/js/theme';
  const { path, query } = { path: '', query: {} };
  //接收父组件传递过来的搜索结构和修改点击搜索后的状态
  const props = withDefaults(defineProps<{ searchResultShow: boolean; searchText: string }>(), {
    searchText: '',
    searchResultShow: false,
  });
  const searchText = ref<string>(props.searchText || (query.wd as string) || ''); // 传入
  const searchResultShow = ref(props.searchResultShow || false); // 传入

  const emit = defineEmits(['update:searchText', 'update:searchResultShow']);

  let timer: number;
  const searchTextShow = ref(0);
  const inputRef = ref<HTMLInputElement | null>(null);
  let searchInputShow = ref(false);
  const searchTextData = reactive<string[]>([
    '热门电影',
    '最新上映',
    '高分好评',
    '经典必看',
    '热门动漫',
  ]);

  let searchHits = [];

  // 创建动画实例
  const slideInAnimation = uni.createAnimation({
    duration: 500,
    timingFunction: 'ease',
  });

  const slideOutAnimation = uni.createAnimation({
    duration: 500,
    timingFunction: 'ease',
  });

  // 设置动画属性
  slideInAnimation.opacity(1).translateY(0).step();
  slideOutAnimation.opacity(0).translateY('80rpx').step();

  //判断是那个页面在设置搜索结果页面比较特殊
  if (path.includes('search')) {
    searchInputShow.value = true;
  }
  //选中搜索框
  const searchSelect = async () => {
    searchInputShow.value = true;
    if (!searchText.value) {
      searchText.value = searchTextData[searchTextShow.value];
      emit('update:searchText', searchTextData[searchTextShow.value]);
    }
    clearInterval(timer);
    await nextTick();
    // 使用uniapp的input focus方法
    const query = uni.createSelectorQuery();
    query
      .select('#searchInput')
      .node(function (res) {
        if (res && res.node) {
          res.node.focus();
        }
      })
      .exec();
    emit('update:searchResultShow', true);
  };
  //定时滚动元素
  const intervalScroll = () => {
    timer = setInterval(() => {
      if (searchTextShow.value >= searchTextData.length - 1) {
        searchTextShow.value = 0;
      } else {
        searchTextShow.value++;
      }
    }, 3500);
  };
  //搜索
  const search = () => {
    let value = searchHits.find((item) => item === searchText.value);
    if (!value && searchText.value) {
      searchHits.push(searchText.value);
    }
    uni.navigateTo({
      url: `/pages/search/index?wd=${searchText.value}`,
    });
  };
  //搜索返回
  const searchBack = () => {
    if (path.includes('search')) {
      uni.navigateBack();
      return;
    }
    searchInputShow.value = false;
    emit('update:searchResultShow', false);
    emit('update:searchText', '');
    intervalScroll();
  };
  //将兄弟组件需要使用到的值暴露出去
  onMounted(() => {
    intervalScroll();
  });
  onUnmounted(() => {
    clearInterval(timer);
  });
</script>
<style scoped lang="scss">
  @include b(input) {
    @apply flex items-center justify-between;
    height: 72rpx;
    line-height: 2;
    color: $amx-text-color-light;
    @include e(center) {
      padding: 0 10rpx 0 5rpx;
      height: 64rpx;
      @apply grow;

      :deep(.var-field-decorator__middle) {
        margin: 0;
      }

      .search {
        @apply flex items-center justify-between;
        box-shadow: inset 0 4rpx 60rpx 0 rgb(0 0 0 / 0.8);
        border-radius: 30rpx;
        height: 100%;
        .search-input {
          @apply flex items-center text-left justify-start truncate h-full w-full flex-wrap;
          flex: 1 1 50%;
          position: relative;
          overflow: hidden;
          padding-left: 20rpx;
          .search-text-container {
            position: relative;
            height: 100%;
            overflow: hidden;
            width: 300rpx;
          }

          .search-input-text {
            height: 100%;

            @apply flex items-center justify-center w-full h-full;
            position: absolute;
            left: 0;
            top: 0;
            transform: translateY(60rpx);
            opacity: 0;
            transition: all 0.5s ease;

            text {
              margin-right: 10rpx;
              font-size: $amx-font-size;
            }

            text:last-child {
              font-size: $amx-font-size-base;
              color: $amx-theme-color;
              padding: 0 6rpx;
              background-color: $amx-theme-bg-shallow;
              border-radius: 8rpx;
            }
          }

          .search-text-active {
            transform: translateY(0);
            opacity: 1;
          }
          .input {
            font-size: $amx-font-size;
          }
        }

        .search-icon {
          @apply flex items-center justify-center;
        }
      }
    }

    @include e(right) {
      text {
        font-size: $amx-font-size-xs;
      }
    }
  }

  .selectInput {
    // background-color: var(--amx-main-bc);
    transition: background 0.25s linear(0 0%, 0.04 58.1%, 1.05 104.41%);
    .amx-input__left {
      width: 90rpx;
      @apply text-center h-full;
      color: var(--amx-header-title-simple);

      i {
        font-size: 66rpx;
        @apply font-normal;
        color: var(--amx-text-active);
      }
    }

    .amx-input__center {
      padding: 0;
      width: 100%;
      transition: all 0.5s ease;
      color: $amx-text-color;
      .search-input {
        width: 325rpx;
      }
      .search-input-text {
        @apply justify-start;
      }
    }

    .amx-input__right {
      width: 80rpx;
      @apply text-center h-full flex items-center justify-center;
      font-size: 30rpx;
      color: $amx-text-color;
    }
  }
</style>
