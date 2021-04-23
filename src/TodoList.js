import React from 'react'
import Todo from './Todo'
function TodoList({todos, toggleTodo, isComplete}) {
    return (
        todos.filter((todo)=>todo.isComplete===isComplete).sort((a,b)=>b.lastUpdatedAt-a.lastUpdatedAt)
        .map((todo)=><Todo toggleTodo={toggleTodo} key={todo.id} todo={todo} isComplete={isComplete}/>)
        
    )
}

export default TodoList
