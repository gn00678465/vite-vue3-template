import { createApp } from 'vue';
import { setupRouter } from './router/index';
import { setupStore } from './stores';
import './style/index.css';
// import './style.css';
import App from './App.vue';
import AppLoading from './components/common/AppLoading.vue';
import '@purge-icons/generated';

import { msalInstance, msalPlugin, setupI18n } from './plugins';

async function setupApp() {
  // app loading
  const appLoading = createApp(AppLoading);

  appLoading.mount('#appLoading');

  const app = createApp(App);
  setupStore(app);

  app.use(msalPlugin, msalInstance);

  setupI18n(app);

  await setupRouter(app);

  app.mount('#app');
}

setupApp();
