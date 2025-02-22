<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import uviewPlus from 'uview-plus';
  import { getCurrentInstance } from 'vue';

  const app = getCurrentInstance();
  app?.appContext.app.use(uviewPlus);

  onLaunch(() => {
    console.log('App Launch');
  });
  onShow(() => {
    console.log('App Show');
  });
  onHide(() => {
    console.log('App Hide');
  });
</script>
<style lang="scss">
  /* 引入uView的样式文件 */
  @import 'uview-plus/index.scss';
  @import '@/common/styles/common.scss';
</style>
<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
