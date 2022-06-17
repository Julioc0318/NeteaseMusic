import Vue from "vue";
import App from "./App.vue";
import router from "./plugins/router.js";

Vue.config.productionTip = false;

// 监听设备视口宽度，以设置基础字号 1rem 大小
import "./assets/css/base.css";
import "lib-flexible";

import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
