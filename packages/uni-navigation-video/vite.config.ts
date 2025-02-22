import { defineConfig } from 'vite';
import path from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';

const ish5 = process.env.UNI_PLATFORM?.includes('h5');
const isApp = process.env.UNI_PLATFORM?.includes('app');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    uvwt({
      rem2rpx: true, // 是否将 rem 转换为 rpx，默认为 true
      disabled: ish5 || isApp, // 不转化的
    }),
    AutoImport({
      imports: ['vue'],
      dts: 'src/types/auto-imports.d.ts',
    }),
  ],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-px-to-viewport')({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 375, // UI设计稿的视口宽度
          unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          viewportUnit: 'rpx',
          propList: ['*'], // 能转化为vw的属性列表
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/common/styles/bem.scss";`,
      },
    },
    devSourcemap: true, // 开发环境是否启用 sourcemap
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
