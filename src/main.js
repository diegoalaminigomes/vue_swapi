import Vue from 'vue'
import Swap from './Swap.vue'
import vuetify from './plugins/vuetify';

new Vue({
  vuetify,
  render: function (h) { return h(Swap) }
}).$mount('#swap')
