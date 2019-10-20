import React from 'react'
import { connect } from 'react-redux'
import TodoItem from './TodoItem'

function TodoList(props) {
  console.log(props)
  return (
    <ul>
      {
        props.todos.map((todo, idx) => <TodoItem key={todo.content} todo={todo} idx={idx} />)
      }
    </ul>
  )
}

export default connect(state => {
  return {
    todos: state.todos
  }
}, dispatch => {
  return {}
})(TodoList)
