import React from 'react';
import initialState, {newTodo} from "./initialState";

export default function useTodos () {

    const [todos, setTodos] = React.useState(initialState);

    const toggleDone = (id) => {
        setTodos(todos.map(t => {
            if (t.id === id) {
                return {...t, done: !t.done};
            }
            return t;
        }))
    }

    const createTask = (task) => {
        setTodos([...todos, newTodo(task)]);
    }

    const removeTask = (id) => {
        setTodos(todos.filter(t => t.id !== id))
    }

    return {todos, createTask, toggleDone, removeTask}
}