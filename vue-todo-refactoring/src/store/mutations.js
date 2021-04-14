const addOneItem = (state, todoItem) => {
  const obj = { completed: false, item: todoItem };
  localStorage.setItem(todoItem, JSON.stringify(obj));

  // 중요 추가 기능 : todoItems에 이미 같은 값이 있는지 체크!! (list에서 중복 피할 수 있음)
  if (!state.todoItems.some((data) => data.item == todoItem)) {
    state.todoItems.push(obj);
  }
};

const removeOneItem = (state, payload) => {
  state.todoItems.splice(payload.index, 1);
  localStorage.removeItem(payload.todoItem.item);
};

const toggleOneItem = (state, payload) => {
  state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
  localStorage.removeItem(payload.todoItem.item);
  localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
};

const clearAllItems = (state) => {
  state.todoItems = [];
  localStorage.clear();
};

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems };
