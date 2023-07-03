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