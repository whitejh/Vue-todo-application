import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';

createApp(App)
  .use(store)
  .mount('#app');

// 위랑 같은 코드
// const app = createApp(app);
// app.use(store);
// app.mount('#app');

// import Vue from 'vue';
// new Vue({
//   el: '#app',
//   // store,
//   render: (h) => h(App),
// });
