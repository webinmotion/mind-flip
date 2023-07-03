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