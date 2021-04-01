// Vue 3 버전의 vuex
// (https://dev.to/daniel_adekoya_/how-to-initialize-vuex-in-the-new-vue-3-preview-49ef 참고)
import { createStore } from 'vuex';

const store = createStore({
  state: {
    name: 'Vue',
    headerText: 'TODO it',
  },
});

export default store;

// Vue 2 버전의 vuex
// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// export const store = new Vuex.Store({

// })
