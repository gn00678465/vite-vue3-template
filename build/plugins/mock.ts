import { viteMockServe } from 'vite-plugin-mock';

export const mock = (isBuild: boolean) => {
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
    import { setupProdMockServer } from '../../mock';
    setupProdMockServer();
    `
  });
};
