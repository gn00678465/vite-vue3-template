import { RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import About from '../components/About';
import LoginPage from '../pages/System/Login';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: About },
  { path: '/login', component: LoginPage }
];

export default routes;
