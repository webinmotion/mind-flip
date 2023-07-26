---
sidebar_position: 1
---

# Using React Context

The first demonstration will make use of React's very own context API. Although monumentally simpler than 
**redux**, React's context API still comes with much of the same ceremonies that accompany using **Redux**.
To make things significantly simpler for this illustration here, I will *NOT* be using **useReducer**.

- `src/context/appContext.js` → `AppContext`

## Create convenience function and an initial state

The **initialState** represents some dummy data used for populating the tasks list. It will remain the same in
all the examples used here for illustration. This module can be, and should be substituted with a different module
representing the **real world**. The **newTodo** is a convenience function for creating a new task:

```jsx title="src/context/initialState.js"
import { nanoid } from 'nanoid';

export default [
    {id: nanoid(), task: "Make coffee", done: false},
    {id: nanoid(), task: "Prepare pancakes", done: true},
]

export const newTodo = (task) => {
    return ({
        id: nanoid(),
        task,
        done: false,
    })
}
```

## Create a custom hook for the **todos** state

This hook hold's the application's state. It's used as a simplification over the **useReducer** pattern.
It however is not as versatile as the **useReducer**.

```jsx title="src/context/useTodos.js"
import React from 'react';
import initialState, {newTodo} from "./initialState";

export default function () {

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
```

## Export a useAppContext

This is a core ingredient of React's context API which provides access to the application state to components that are 
inside the **provider's** component tree

```jsx title="src/context/appContext.js"
import React, {useContext, createContext} from "react";
import useTodos from "./useTodos";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
}
```

## Export an application context provider

This is the centerpiece of React's context API ceremony, without which React's state management would not work.
In this component, the **useTodos** hook is imported, and then it's state and necessary functions are exposed to the
components within the **provider's** context tree through the **context** API.

```jsx title="src/context/appContext.js"
export default function ({children}) {

    const {todos, createTask, toggleDone, removeTask} = useTodos();

    return (
        <AppContext.Provider value={{
            todos, createTask, toggleDone, removeTask
        }}>
            {children}
        </AppContext.Provider>
    )
}
```

## Merge Root component to Context API

```jsx title="src/pages/TodoListView.js"
import React from 'react';
import Layout from '@theme/Layout';
import TodoList from '../components/TodoList';
import AppProvider from '../context/appContext';

export default function TodoListView() {

    return (
        <Layout title="Todos Demo" description="Demostrating Todo List using different state management contexts">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '3em',
                }}>

                <AppProvider>
                    <TodoList />
                </AppProvider>
            </div>
        </Layout>
    );
}
```

## Updated TodoList components

The [TodoList component from the previous tutorial](http://localhost:3000/docs/tutorials-todolist-app/create-todo-page) should now look like this.

```jsx title="src/components/TodoList/home.js"
import React from 'react';
import styles from './todolist.module.css';
import {useAppContext} from "../../context/appContext";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";

export default function TodoList (){

    const {todos, createTask, toggleDone, removeTask} = useAppContext();

    return (
        <div className={styles.container}>
            <TaskForm createTask={createTask}/>
            <TasksList todos={todos} toggleDone={toggleDone} removeTask={removeTask} />
        </div>
    )
}
```
