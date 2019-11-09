import { createStore } from 'redux'
import { produce, immerable } from 'immer'

var state = {
  showing: "all",
  todos: [
    {
      content: "eat",
      done: false
    },
    {
      content: "drink",
      done: true
    }
  ]
};

var mutations = {

  addTodo: produce((state, action) => {
    state.todos.push({
      content: action.todoText
    })
  }),
  deleteTodo: produce((state, action) => {
    state.todos.splice(action.idx, 1)
  }),
  toggleTodoStatus: produce((state, action) => {
    state.todos[action.idx].done = !state.todos[action.idx].done
  }),
  toggleAllStatus: produce((state) => {
    if (state.todos.every(it => it.done)) {
      state.todos.forEach(it => {
        it.done = false
      })
    } else {
      state.todos.forEach(it => {
        it.done = true
      })
    }
  })
};

export default createStore((state, action) => {
  var mutation = mutations[action.type]

  if (mutation) {
    return mutation(state, action)
  } else {
    return state
  }

}, state)