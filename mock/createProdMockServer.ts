import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import { auth } from './api';

const mockModules: any[] = [...auth];

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
