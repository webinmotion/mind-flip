import { TOGGLE_TODO, CREATE_TODO, REMOVE_TODO} from './todosActions';

export const todosReducer = (todos, action) => {
    console.log('reducer todos', todos, 'action', action)
    switch (action.type) {
        case CREATE_TODO: {
            return ([ ...todos, action.todo ]);
        }
        case TOGGLE_TODO: {
            const {id} = action;
            return (todos.map(t => {
                if (t.id === id) {
                    return {...t, done: !t.done};
                }
                return t;
            }));
        }
        case REMOVE_TODO: {
            return todos.filter(t => t.id !== action.id);
        }
        default: {
            return todos;
        }
    }
}