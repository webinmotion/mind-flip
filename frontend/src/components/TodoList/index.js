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