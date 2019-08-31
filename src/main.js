import Vue from "vue";
import App from "./App.vue";
import appsyncProvider from "./appsync";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  provide: appsyncProvider.provide()
}).$mount("#app");
