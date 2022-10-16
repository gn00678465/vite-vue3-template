import { h } from 'vue';
import SvgIcon from '@/components/custom/SvgIcon';

interface IStyle {
  color?: string;
  size?: string;
}

interface IConfig extends IStyle {
  icon: string;
}

export function useRenderIcon(config: IConfig) {
  const { color, size, icon } = config;
  const style: IStyle = {};
  if (color) {
    style.color = color;
  }
  if (size) {
    style.size = size;
  }
  if (!icon) {
    window.Error('未傳入 icon 值');
  }
  return () => h(SvgIcon, { icon, style });
}
