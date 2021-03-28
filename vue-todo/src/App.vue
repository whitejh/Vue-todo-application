<template>
  <div id="app">
    <!-- 리펙토링을 통해 실질적인 데이터처리는 App.vue에서 하게 만듦 -->
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem" v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data: function() {
    return {
      todoItems: [],
    };
  },
  created: function() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
      this.todoItems.sort(this.sortObj); //sort API로 데이터를 받아오고 나서 로컬 스토리지 키값 순서 정렬
    }
  },
  methods: {
    sortObj: function(a, b) {
      // 데이터 입력된 순서대로 출력되게 하는 함수
      if (a.item < b.item) {
        return -1;
      }
      if (a.item > b.item) {
        return 1;
      }
      return 0;
    },
    addOneItem: function(todoItem) {
      let obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));

      // 중요 추가 기능 : todoItems에 이미 같은 값이 있는지 체크!! (list에서 중복 피할 수 있음)
      if (!this.todoItems.some((data) => data.item == todoItem)) {
        this.todoItems.push(obj);
      }
    },
    removeOneItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem: function(todoItem, index) {
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems: function() {
      localStorage.clear(); //로컬스토리지를 비운다 (clear API 사용)
      this.todoItems = []; // todoItems를 빈 배열로 바꾼다
    },
  },
  components: {
    // 컴포넌트 이름: 컴포넌트 내용
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter,
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
