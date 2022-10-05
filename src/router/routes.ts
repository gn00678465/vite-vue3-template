import { RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import About from '../components/About';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: About },
  {
    name: 'LoginPage',
    path: '/login',
    component: () => import('../pages/System/Login'),
    props: (route) => {
      const moduleType =
        (route.params.module as EnumType.LoginModuleKey) || 'pwd-login';
      return {
        module: moduleType
      };
    }
  }
];

export default routes;
