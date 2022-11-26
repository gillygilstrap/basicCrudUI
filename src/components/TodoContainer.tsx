import { useState, useEffect } from "react";
import axios from "axios"
import Todo from "./Todo";

interface iTodo  {
    id: string
    name: string
    isComplete: boolean
}

export default function TodoContainer() {
    const [todos, setTodos] = useState<iTodo[]>([])
    const [newItemText, setNewItemText] = useState('')

    useEffect(() => {
        fetchTodos();
    }, [])

    const addTodo = async () => {
        if(!newItemText) {
            return;
        }
        setNewItemText(``);
        const todo = await axios.post('https://localhost:7244/api/TodoItems',
            {
                name: newItemText,
                isComplete: false
            })
        .then(data => data.data)

        const updatedTodos: iTodo[] = todos.slice();
        updatedTodos.push(todo);
        
        setTodos(updatedTodos);
    }

    const fetchTodos = async () => {
        const todos = await axios.get('https://localhost:7244/api/TodoItems')
        .then(data => data.data);
        
        setTodos(todos)
    }

    const toggleButton = async (id: string) => {
        const updatedTodo = todos.filter(todo => todo.id === id)[0];
        await axios.put(`https://localhost:7244/api/TodoItems/${id}`,
        {
            id: id,
            name: updatedTodo.name,
            isComplete: !updatedTodo.isComplete
        })
        .then(data => data.data);
        
        const todosCopy = todos.slice();
        todosCopy.forEach(todo => {
            if(todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
        })

        setTodos(todosCopy);
    }

    const deleteTodo = async (id: string) => {
        console.log(`Is this getting hitt?????`)

        await axios.delete(`https://localhost:7244/api/TodoItems/${id}`)
        .then(data => data.data);

        const nonDeletedTodos: iTodo[] = [];
        const todosCopy = todos.slice();

        // .filter() was NOT working here for some reason.
        // I was too lazy to figure it out so I did this weird shit.
        todosCopy.forEach(todo => {
            if(todo.id !== id) {
                nonDeletedTodos.push(todo);
            }
        })
        
        setTodos(nonDeletedTodos)
    }
    return (
        <div className="todo-container w-1/2 mt-16 p-4 rounded-lg bg-cardWhite shadow-md">
            <div className="title mb-4 text-2xl">Basic CRUD Todo's</div>
            <div className="add-todo text-center mb-6 h-12 w-mx flex items-center justify-between">
                <input value={newItemText} type="text" className="bg-inputBlue h-10 w-1/2 rounded p-2 focus:outline-none" placeholder="Add todo..." onChange={(e) => setNewItemText(e.target.value)} />
                <button className="bg-dodgerBlue text-gray-50 font-bold h-10 w-1/4 rounded-lg" onClick={addTodo}>Add Item</button>
            </div>
            <div className="todos">
                {todos.map(todo => {
                    return <Todo
                        name={todo.name}
                        id={todo.id}
                        isComplete={todo.isComplete}
                        key={todo.id}
                        onClickFunc={toggleButton}
                        deleteFunc={deleteTodo}
                    />
                })}
            </div>
        </div>
    )
}
// test pull request