---
sidebar_position: 1
---

# Create a Todo Page

The page will consist of two components in a parent component 

- `src/components/TodoList/home.js` → `TodoList`
- `src/components/TodoList/TaskForm.js` → `TaskForm`
- `src/components/TodoList/TasksList.js` → `TasksList`

## Create the TaskForm component

This will consist of a form having a text input and a submit button which will submit a request to create a 
new **Task** upon either (1) hitting the **Enter** key or (2) clicking the **Add** buttons:

```jsx title="src/components/TodoList/TaskForm.js"
import React, {useState} from 'react';

const styles = {
    form: {
        backgroundColor: "#fff"
    },
    fieldset: {
        display: 'flex',
        borderRadius: '10px',
        border: '1px solid #ccc'
    },
    legend: {
        margin: 0
    },
    taskInput: {
        display: 'inline-block', 
        flexGrow: 5, 
        margin: 0, 
        fontSize: '1.1em',
        lineHeight: '2em', 
        backgroundColor: 'transparent', 
        padding: '0 10px', 
        border: '0px solid'
    },
    taskSubmit: {
        display: 'inline-block',
        flexGrow: 1
    }
}

export default function TaskForm({createTask}) {

    const [task, setTask] = useState('');

    const onCreate = e => {
        e.preventDefault();
        createTask(task);
        setTask('');
    }

    return (
        <form style={styles.form} onSubmit={onCreate}>
            <fieldset style={styles.fieldset}>
                <legend style={styles.legend}>Task Name</legend>
                <input name="task" value={task} style={styles.taskInput} onChange={e => setTask(e.target.value)}/>
                <input disabled={task.trim().length === 0} style={styles.taskSubmit} type={"submit"} value={"Add"}/>
            </fieldset>
        </form>
    )
}
```

One key ingredient which is easily gleamed over is the component styling. It has been made very simple here, but it still remains 
aesthetically pleasing and fully functional to the user

## Create the TasksList component

This will consist of a __section__ showing a list of tasks that have been created by a user. From this list, a user is able to
(1) toggle the completion of a task and (2) remove a task from the list:

```jsx title="src/components/TodoList/TasksList.js"
import React from 'react';

const styles = {
    section: {
        padding: '20px 0',
        backgroundColor: '#fff'
    },
    listItems: {
        padding: '0 10px',
        listStyle: 'none'
    },
    listItem: {
        display: 'flex'
    },
    listItemCheckbox: {
        display: 'inline-block',
        paddingRight: '10px'
    },
    listItemText: {
        display: 'inline-block',
        flexGrow: 11
    },
    listItemDelete: {
        display: 'inline-block',
        textAlign:'center',
        textDecoration: "none",
        flexGrow: 1
    }
}
export default function TasksList({todos, toggleDone, removeTask}) {

    const onRemove = (e, id) => {
        e.preventDefault();
        removeTask(id)
    }

    return (
        <section style={styles.section}>
            <ul style={styles.listItems}>
                {todos.map(({id, task, done}) => (
                    <li key={id} style={styles.listItem}>
                        <span style={styles.listItemCheckbox}>
                            <input onChange={() => toggleDone(id)} checked={done} type={"checkbox"}/>
                        </span>
                        <span style={styles.listItemText}>{task}</span>
                        <a onClick={e => onRemove(e, id)} href={"#"} style={styles.listItemDeletelis}>x</a>
                    </li>)
                )}
            </ul>
        </section>
    )
}
```

## Putting together the TodoList component

This will consist of a the **TaskForm** and **Taskslist** components, which come together inside the **TodoList**
component. The **TodoList** component will figure out a way to introduce the application's state to the rest of the
application, and those options will be the subject of subsequent tutorials. The next tutorial will actually feature 
React's own __context API__.

```jsx title="src/components/TodoList/home.js"

export default function TodoList (){
    
    //THIS IS A PREVIEW. A completed component using React's comtext API will be in the next tutorial
    
    return (
        <div className={styles.container}>
            <TaskForm createTask={createTask}/>
            <TasksList todos={todos} toggleDone={toggleDone} removeTask={removeTask} />
        </div>
    )
}
```

```css title="src/components/TodoList/todolist.module.css"
.container{
    flex: 1;
    align-content: center;
    max-width: 600px;
    background-color: #ddd;
}
```

A page is now available for viewing, but not functional at this point. The page has placeholders for the necessary components
that will make it functional
