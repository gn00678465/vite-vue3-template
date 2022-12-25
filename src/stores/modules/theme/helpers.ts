import { GlobalThemeOverrides } from 'naive-ui';
import { brightenColor, addColorAlpha } from '@/utils';

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error';
type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active';
type ColorKey = `${ColorType}Color${ColorScene}`;
type ThemeColor = Partial<Record<ColorKey, string>>;
interface ColorAction {
  scene: ColorScene;
  handler: (color: string) => string;
}

function getThemeColors(colors: [ColorType, string][]) {
  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Suppl', handler: (color) => color },
    { scene: 'Hover', handler: (color) => brightenColor(color, 0.5) },
    { scene: 'Pressed', handler: (color) => brightenColor(color, 0.7) },
    { scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) }
  ];

  const themeColor: ThemeColor = {};

  colors.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color;
      const colorKey: ColorKey = `${colorType}Color${action.scene}`;
      themeColor[colorKey] = action.handler(colorValue);
    });
  });

  return themeColor;
}

export function getNaiveThemeOverrides(
  colors: Record<ColorType, string>
): GlobalThemeOverrides {
  const { primary, info, success, warning, error } = colors;

  const themeColors = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error]
  ]);

  const colorLoading = primary;

  return {
    common: {
      ...themeColors
    },
    LoadingBar: {
      colorLoading
    }
  };
}
