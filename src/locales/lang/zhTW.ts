import { genMessage, LangType } from '../helpers';

const modules: LangType = import.meta.glob('./zhTW/**/*.ts', { eager: true });

export default {
  message: {
    ...genMessage(modules, 'zhTW')
  }
};
