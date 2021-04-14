const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
      arr.sort(this.sortObj);
    }
    return arr;
  },
  sortObj(a, b) {
    // 데이터 입력된 순서대로 출력되게 하는 함수
    if (a.item < b.item) {
      return -1;
    }
    if (a.item > b.item) {
      return 1;
    }
    return 0;
  },
};

const state = {
  todoItems: storage.fetch(),
};

const getters = {
  storedTodoItems(state) {
    return state.todoItems;
  },
};

const mutations = {
  addOneItem(state, todoItem) {
    const obj = { completed: false, item: todoItem };
    localStorage.setItem(todoItem, JSON.stringify(obj));

    // 중요 추가 기능 : todoItems에 이미 같은 값이 있는지 체크!! (list에서 중복 피할 수 있음)
    if (!state.todoItems.some((data) => data.item == todoItem)) {
      state.todoItems.push(obj);
    }
  },
  removeOneItem(state, payload) {
    state.todoItems.splice(payload.index, 1);
    localStorage.removeItem(payload.todoItem.item);
  },

  toggleOneItem(state, payload) {
    state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
    localStorage.removeItem(payload.todoItem.item);
    localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
  },

  clearAllItems(state) {
    state.todoItems = [];
    localStorage.clear();
  },
};

export default {
  state,
  getters,
  mutations,
};
