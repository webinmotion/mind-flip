import {newTodo} from "../context/initialState";

export const CREATE_TODO = "CREATE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export const createTodoAction = dispatch => (task) => {
    dispatch({
        type: CREATE_TODO, todo: newTodo(task)
    });
};

export const toggleTodoAction = dispatch => (id) => {
    dispatch({
        type: TOGGLE_TODO, id
    });
};

export const removeTodoAction = dispatch => (id) => {
    dispatch({
        type: REMOVE_TODO, id
    });
};