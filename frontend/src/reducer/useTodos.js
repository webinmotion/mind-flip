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