import chroma from 'chroma-js';

/**
 * 顏色變亮
 * @param color
 * @param deep
 * @returns
 */
export function brightenColor(color: string, deep = 0.5) {
  return chroma(color).brighten(deep).hex();
}

/**
 * 顏色變暗
 * @param color
 * @param deep
 * @returns
 */
export function darkenColor(color: string, deep = 0.5) {
  return chroma(color).darken(deep).hex();
}

/**
 * 增加透明度
 * @param color
 * @param alpha
 * @returns
 */
export function addColorAlpha(color: string, alpha: number) {
  return chroma(color).alpha(alpha).hex();
}

/**
 * 顏色混和
 * @param firstColor
 * @param secondColor
 * @param ratio
 * @returns
 */
export function mixColor(
  firstColor: string,
  secondColor: string,
  ratio: number
) {
  return chroma.mix(firstColor, secondColor, ratio).hex();
}
