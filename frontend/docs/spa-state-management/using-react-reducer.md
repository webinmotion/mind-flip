---
sidebar_position: 4
---

# Using React Reducer

This next demonstration will make use of React's very own **context API** in conjunction with the **useReducer**. 
Although a bit lightweight than **redux** (since no additional library is needed to make use of it), React's 
**context API** and **useReducer** still comes with much of the same ceremonies that accompany using **Redux**. 
However, **useReducer** provides a richer experience than simply using **useState** albeit with the additional 
plumbing necessary to get it off the ground.

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

## Create **todos** Actions

This defines the contract which the application has to use to successfully interact with the stored state. 
It exposes the functions and corresponding parameters necessary to make changes to the application's state. 
It's through here in the **actions** where **async** interaction with external services is performed. The response 
from external APIs is used to shape the data in the application's state

```jsx title="src/reducer/todoActions"
export const CREATE_TODO = "CREATE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export const createTodoAction = dispatch => (task) => {
    //do async stuff here and only call dispatch in the callback functions
    dispatch({
        type: CREATE_TODO, task
    });
};

export const toggleTodoAction = dispatch => (id) => {
    //do async stuff here and only call dispatch in the callback functions
    dispatch({
        type: TOGGLE_TODO, id
    });
};

export const removeTodoAction = dispatch => (id) => {
    //do async stuff here and only call dispatch in the callback functions
    dispatch({
        type: REMOVE_TODO, id
    });
};
```

## Create **todos** Reducer

This defines how the application's state is altered when certain actions and their associated payload are received in 
the application's store. Changes in the state will cause certain parts of the component to get re-rendered after
a virtual DOM comparison determines that it is necessary


```jsx title="src/reducer/todosReducer.js"
import { TOGGLE_TODO, CREATE_TODO, REMOVE_TODO} from './todosActions';

export const todosReducer = (todos, action) => {
    switch (action.type) {
        case CREATE_TODO: {
            return ([ ...todos, action.todo ]);
        }
        case TOGGLE_TODO: {
            const {id, done} = action;
            return (todos.map(t => {
                if (t.id === id) {
                    return {...t, done: !t.done};
                }
                return t;
            }));
        }
        case REMOVE_TODO: {
            return todos.filter(t => t.id !== action.id);
        }
        default: {
            return todos;
        }
    }
}
```

## Create a custom hook for the **todos** state

This hook hold's the application's state. It's used as a simplification over the **useReducer** pattern.
It however is not as versatile as the **useReducer**.

```jsx title="src/reducer/useTodos.js"
import React, {useReducer} from 'react';
import initialState from "../context/initialState";
import {todosReducer} from "./todosReducer";
import {createTodoAction, removeTodoAction, toggleTodoAction} from "./todosActions";

export default function useTodos () {

    const [todos, dispatcher] = useReducer(todosReducer, initialState);

    const toggleDone = toggleTodoAction(dispatcher);

    const createTask = createTodoAction(dispatcher);

    const removeTask = removeTodoAction(dispatcher);

    return {todos, createTask, toggleDone, removeTask}
}
```

## Export a useAppContext

This is a core ingredient of React's context API which provides access to the application state by components that are 
inside the **provider's** component tree. It remains the same as the module illustrated earlier using **useState** only

```jsx title="src/reducer/appContext.js"
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

## Merge Root component to Context API and useReducer

```jsx title="src/pages/TodoListView.js"
import React from 'react';
import Layout from '@theme/Layout';
import AppProvider from '../reducer/appContext';
import ReducerList from "../components/TodoList/ReducerList";

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
                    <ReducerList />
                </AppProvider>
            </div>
        </Layout>
    );
}
```

## Updated TodoList components

The [TodoList component from the previous tutorial](http://localhost:3000/docs/tutorials-todolist-app/create-todo-page) should now look like this.

```jsx title="src/components/TodoList/ReducerList.js"
import React from 'react';
import styles from './todolist.module.css';
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import {useAppContext} from "./appContext";

export default function ReducerList() {

    const {todos, createTask, toggleDone, removeTask} = useAppContext();

    return (
        <div className={styles.container}>
            <TaskForm createTask={createTask}/>
            <TasksList todos={todos} toggleDone={toggleDone} removeTask={removeTask}/>
        </div>
    )
}
```

## Side note - pitfall not well understood

I wish to point out a slight side note because it's a scenario where React's **useReducer** seemingly continues to
work even in the absence of a **Context Provider**. I have not extensively researched this observation to understand 
fully how it happens, but what I have documented below is what I have been able to observe.

```jsx title="src/pages/TodoListView.js"
import React from 'react';
import Layout from '@theme/Layout';
import NoContextList from "../components/TodoList/NoContextList";

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
                <NoContextList />
            </div>
        </Layout>
    );
}
```

It appears that if you disregard the **AppProvider** wrapper in the root parent component, and also **not use** the 
**useAppContext** hook in the Child component (todo list), then the Child component continues to function normally
by just using directly the **useTodos** custom hook which internally uses **useReducer**

```jsx title="src/components/TodoList/NoContextList.js"
import React from 'react';
import styles from './todolist.module.css';
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import {useAppContext} from "../../reducer/appContext";
import useTodos from "../../reducer/useTodos";

export default function NoContextList (){

    const {todos, createTask, toggleDone, removeTask} = useTodos();

    return (
        <div className={styles.container}>
            <TaskForm createTask={createTask}/>
            <TasksList todos={todos} toggleDone={toggleDone} removeTask={removeTask} />
        </div>
    )
}
```

It's pretty convenient importing the application state using a hook, but I don't know yet how valid this anomaly holds 
true especially in the context of a more complex application. It's food for thought