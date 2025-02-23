import variables from '../module/variables.module.scss';

export const theme = {
  colors: {
    theme: variables.themeColor,
    themeDark: variables.themeDarkColor,
    text: variables.textColor,
  },
  fontSize: variables.fontSize,
  radius: {
    sm: variables.radiusSm,
    XL1: variables.radiusXL1,
  },
  indicator: {
    bottom: variables.indicatorBottom,
    swiper: variables.swiperHeight,
    swiperTitleBottom: variables.swiperTitleBottom,
  },
  spacing: {
    xs5: variables.spacingXS5,
    md1: variables.spacingMD1,
  },
  header: {
    top: variables.headerTop,
  },
  index: {
    searchTop: variables.indexSearchTop,
  },
  // ... 其他变量
};
