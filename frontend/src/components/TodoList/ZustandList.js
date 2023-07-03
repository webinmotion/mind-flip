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