---
sidebar_position: 3
---

# Using Jotai Library

This next demonstration will make use of Jotai, which like Zustand, has similar fantastic gems right out of the gate.
- little boilerplate code - compared to Redux or even React's Context API, it's incredibly lean
- doesn't rely on a Provider - both Redux and React's Context API simply cannot begin to function without 
the _Provider_ contraption which is not the case for **Zustand**
- Significantly faster than React *Context* because the entire application is not wrapped under the **Context
Provider** and hence is **NOT** subject to re-rendering when a section of the global state changes
- Merging is done similarly to Redux or React Context. The important thing is to keep the size of the state small, and
hence the name **atom**.
- Extensible by default - one can easily extend the existing functionality with their own

As with any good library however, it's opinionated in ways that are different from either _Redux_ and React's 
_context API_, so this is one thing you need to be familiar with in order to be comfortable with using the library.

An important point to remember when using **jotai** is to avoid using a single, large entity for the state. The spirit
of **jotai** is using as many distinct and isolated states as needed and keeping the size of each state as __small__ 
as practically possible to make their management easier, and thereby reducing the likelihood of components re-rendering. 

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

This hook hold's the application's state. It's the point of strength for **Jotai** over React Context API. You do
not need the **useReducer** infrastructure to handle async functions. The **useReducer** for React Context will be
illustrated in a different tutorial. You can use **async** functions in the Jotai store directly, which is fantastic

```jsx title="src/jotai/useTodos.js"
import { atom, useAtom } from 'jotai'
import initialState, {newTodo} from "../context/initialState";

// global atom, accessible for any component, without prop-drilling
const todosAtom = atom(initialState);

export default function(){

  const [todos, setTodos] = useAtom(todosAtom);

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

The _custom hook_ for exporting a piece of **jotai** state is very similar to that illustrated earlier using React 
Context. That's the only similarity there is and **jotai** encourages the use of multiple, small states.

And the best part about **Jotai** is that you do not need the plumbing for a **Context** and an associated context 
**Provider**. All this boilerplate is simply not needed, which is absolutely fantastic.

## Bring together the Root component and the Context API

```jsx title="src/pages/TodoListView.js"
import React from 'react'; 
import Layout from '@theme/Layout';
import JotaiList from "../components/TodoList/JotaiList";

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

              <JotaiList />
            </div>
        </Layout>
    );
}
```

## Updated TodoList components

The [TodoList component from the previous tutorial](http://localhost:3000/docs/tutorials-todolist-app/create-todo-page) should now look like this.

```jsx title="src/components/TodoList/JotaiList.js"
import React from 'react';
import styles from './todolist.module.css';
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import useTodos from "../../jotai/useTodos";

export default function JotaiList (){

  const {todos, createTask, toggleDone, removeTask} = useTodos();

  return (
          <div className={styles.container}>
            <TaskForm createTask={createTask}/>
            <TasksList todos={todos} toggleDone={toggleDone} removeTask={removeTask} />
          </div>
  )
}
```
