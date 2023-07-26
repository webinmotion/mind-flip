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
        display: 'inline-block', flexGrow: 5, margin: 0, fontSize: '1.1em',
        lineHeight: '2em', backgroundColor: 'transparent', padding: '0 10px', border: '0px solid'
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