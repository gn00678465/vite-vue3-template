import { createApp } from 'vue';

import router from './router/index';
import { setupStore } from './stores';
import './style/index.css';
// import './style.css';
import App from './App.vue';

const app = createApp(App);

setupStore(app);

app.use(router);
app.mount('#app');
