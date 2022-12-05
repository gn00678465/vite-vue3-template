import { genMessage, LangType } from '../helpers';

const modules: LangType = import.meta.glob('./enUS/**/*.ts', { eager: true });

export default {
  message: {
    ...genMessage(modules, 'enUS')
  }
};
