import React from 'react'
import {ListGroup} from 'react-bootstrap'
export default function Todo({todo, toggleTodo, isComplete}) {
    const handleComplete=(e)=>{
        toggleTodo(todo.id)
    }
    return (
        <ListGroup>
            <ListGroup.Item variant={isComplete?"dark":"info"}>
                {todo.name}
                <div className="ml-3"></div>
                <input type="checkbox" onChange={handleComplete} checked={todo.isComplete}/></ListGroup.Item>
        </ListGroup>

    )
}
