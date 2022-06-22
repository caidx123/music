import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible" // 适配
import "@/styles/reset.css" // 初始化样式
import router from '@/router' // 路由对象

import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, CellGroup,Icon, Search, List } from 'vant';

Vue.use(List);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(CellGroup);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
