import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    uvwt(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/types/auto-imports.d.ts',
    }),
  ],
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
    preprocessorOptions: {
      // scss: {
      //   additionalData: `@import "uview-plus/theme.scss";`
      // },
    },
  },
});
