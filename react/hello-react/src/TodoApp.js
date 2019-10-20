import React from 'react'
import { Provider } from 'react-redux'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

import store from './store'

export default function TodoApp() {
  return (
    <Provider store={store}>
      <div>
        <TodoInput />
        <TodoList a={1}/>
      </div>
    </Provider>
  )
}
