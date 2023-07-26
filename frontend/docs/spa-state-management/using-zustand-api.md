---
sidebar_position: 2
---

# Using Zustand Library

This next demonstration will make use of Zustand, which has some fantastic gems right out of the gate.
- little boilerplate code - compared to Redux or even React's Context API, it's incredibly lean
- doesn't rely on a Provider - both Redux and React's Context API simply cannot begin to function without 
the _Provider_ contraption which is not the case for **Zustand**
- Significantly faster than React *Context* because the entire application is not wrapped under the **Context
Provider** and hence is **NOT** subject to re-rendering when a section of the global state changes
- Applies state merging by default - you _DO NOT_ need to first spread the entire existing state into a 
temporary entity and then manually merging the updated properties. **Zustand** does a lot of the manual merging
of the context properties for you behind the scenes
- Extensible by default - one can easily extend the existing functionality with their own

As with any good library however, it's opinionated in ways that are different from either _Redux_ and React's 
_context API_, so this is one thing you need to be familiar with in order to be comfortable with using the library.

- `src/zustand/useTodos.js` → `Zustand Store`

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

This hook hold's the application's state. It's the point of strength for **Zustand** over React Context API. You do
not need the **useReducer** infrastructure to handle async functions. The **useReducer** for React Context will be
illustrated in a different tutorial. You can use **async** functions in the Zustand store directly, which is fantastic

```jsx title="src/zustand/useTodos.js"
import React from 'react';
import {create} from 'zustand'
import initialState, {newTodo} from "../context/initialState";

export const useTodos = create((set, get) => {

    const toggleDone = (set) => (id) => {
        set((state) => ({
            todos: state.todos.map(t => {
                if (t.id === id) {
                    return {...t, done: !t.done};
                }
                return t;
            })
        }));
    }

    const createTask = (set) => (task) => {
        set((state) => ({todos: [...state.todos, newTodo(task)]}));
    }

    const removeTask = (set) => (id) => {
        set((state) => ({todos: state.todos.filter(t => t.id !== id)}));
    }

    return ({
        todos: initialState,
        toggleDone: toggleDone(set, get),
        createTask: createTask(set, get),
        removeTask: removeTask(set, get),
    });
});
```

A _key_ thing to make note of is that you need to export the result (which is a function) of the **create** function,
and NOT the **create** function itself. For this reason, it's better to assign this result to a **const** which you can
then export;

And the best part about **Zustand** is that you do not need the plumbing for a **Context** and an associated context 
**Provider**. All this boilerplate is simply not needed, which is absolutely fantastic.

## Bring together the Root component and the Context API

```jsx title="src/pages/TodoListView.js"
import React from 'react'; 
import Layout from '@theme/Layout';
import ZustandList from "../components/TodoList/ZustandList";

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

                <ZustandList />
            </div>
        </Layout>
    );
}
```

## Updated TodoList components

The [TodoList component from the previous tutorial](http://localhost:3000/docs/tutorials-todolist-app/create-todo-page) should now look like this.

```jsx title="src/components/TodoList/ZustandList.js"
import React from 'react';
import styles from './todolist.module.css';
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import {useTodos} from "../../zustand/useTodos";

export default function ZustandList (){

    const todos = useTodos((state => state.todos));
    const createTask = useTodos((state => state.createTask));
    const toggleDone = useTodos((state => state.toggleDone));
    const removeTask = useTodos((state => state.removeTask));

    return (
        <div className={styles.container}>
            <TaskForm createTask={createTask}/>
            <TasksList todos={todos} toggleDone={toggleDone} removeTask={removeTask} />
        </div>
    )
}
```
