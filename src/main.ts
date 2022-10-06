import { createApp } from 'vue';

import { setupRouter } from './router/index';
import { setupStore } from './stores';
import './style/index.css';
// import './style.css';
import App from './App.vue';

async function setupApp() {
  const app = createApp(App);
  setupStore(app);

  await setupRouter(app);

  app.mount('#app');
}

setupApp();
