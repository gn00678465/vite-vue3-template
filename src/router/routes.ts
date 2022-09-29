import { RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import About from '../components/About';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: About }
];

export default routes;
