import TodoList from "./TodoList";
import {useState, useRef, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
const LOCAL_STORAGE_KEY="SAJAL.TODOS.123"

function App() {
  const [todos, settodos] = useState([])
  const todoNameRef=useRef();
  
  useEffect(()=>{
    const stored= localStorage.getItem(LOCAL_STORAGE_KEY)
    if(stored) settodos(JSON.parse(stored));
 },
 []);

  useEffect(()=>{
     localStorage.setItem(LOCAL_STORAGE_KEY,
      JSON.stringify(todos)
      )
  },
  [todos]);
  const toggleTodo=(id)=>{
    const newTodos=[...todos];
    const todo=newTodos.find(todo=>todo.id === id)
    todo.isComplete=!todo.isComplete
    todo.lastUpdatedAt= Date.now()
    settodos(newTodos);
  }
  const handleAddTodo=(e)=>{
    const name = todoNameRef.current.value
    if( name=== '') return
    settodos(prevTodos=>{
      return [...prevTodos,{
        id:uuidv4(),
        name: name,
        isComplete: false,
        lastUpdatedAt: Date.now()
      }]
    })
  }
  const clearTodos=(e)=>{
    settodos([]);
  }
  const clearCompleteTodos=(e)=>{
    const newTodos=todos.filter(todo=>!todo.isComplete)
    settodos(newTodos)
  }
  return (
    <div className="container py-2">
      <div className="col-lg-7 mx-auto">
            <div className="card rounded-0 border-0 shadow">
                <div align="center" className="card-body p-5 font-weight-bolder">Todo App</div>
    <div >
     <div className="form-group p-2">
       <input className="form-control" ref={todoNameRef} type="text" placeholder="Enter Todo" onKeyPress={(e)=>e.key==="Enter"?handleAddTodo():""}/>
       <button className="btn btn-warning mt-2" onClick={clearCompleteTodos}>Clear Complete</button>
      <button className="btn btn-danger mt-2 ml-5" onClick={clearTodos}>Reset</button>
      </div>
      {/* <button onClick={handleAddTodo}>Add Todo</button> */}
      
      </div>     
    </div>
    <div className="form-control font-weight-bold">{todos.filter(todo=>!todo.isComplete).length} todos left to be Completed</div>
      <TodoList toggleTodo={toggleTodo} todos={todos} isComplete={false}/>
      <div className="form-control font-weight-bold">Completed Todos</div>
      <TodoList toggleTodo={toggleTodo} todos={todos} isComplete={true}/>
    </div>
    </div>
  );
}

export default App;
