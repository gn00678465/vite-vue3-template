import { createApp } from 'vue';
import { setupRouter } from './router/index';
import { setupStore } from './stores';
import './style/index.css';
// import './style.css';
import App from './App.vue';

import { msalInstance, msalPlugin } from './plugins';

async function setupApp() {
  const app = createApp(App);
  setupStore(app);

  app.use(msalPlugin, msalInstance);

  await setupRouter(app);

  app.mount('#app');
}

setupApp();
