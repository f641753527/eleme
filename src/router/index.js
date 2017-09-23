import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '@/components/contents/goods';
import ratings from '@/components/contents/ratings';
import seller from '@/components/contents/seller';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ],
  linkActiveClass: 'active'
});
