// Vue 2 버전의 vuex
import Vue from 'vue';
import Vuex from 'vuex';
import todoApp from './modules/todoApp';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    headerText: '2021-04-14 store 모듈화 완료',
  },
  modules: {
    todoApp,
    //축약 : todoApp: todoApp,
  },
});
