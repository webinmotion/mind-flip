import {nanoid} from 'nanoid';

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