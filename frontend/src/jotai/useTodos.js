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