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
        require('tailwindcss')({}),
        require('autoprefixer')({}),
        require('postcss-preset-env')({
          minimumVendorImplementations: 2,
          browsers: 'last 2 versions',
        }),
        require('postcss-import'),
        require('postcss-mixins'),
        require('postcss-simple-vars'),
        // require('postcss-px-to-viewport')({
        //   unitToConvert: 'px',
        //   viewportWidth: 750,  // 修改为750，符合小程序规范
        //   unitPrecision: 5,
        //   viewportUnit: 'rpx',
        //   fontViewportUnit: 'rpx',
        //   minPixelValue: 1,
        //   mediaQuery: false,
        //   replace: true,
        //   exclude: [],
        //   landscape: false
        // })
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/common/styles/bem.scss";@import "@/uni.scss";`,
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
