import React from 'react';

const styles = {
    section: {
        padding: '20px 0',
        backgroundColor: '#fff'
    },
    listItems: {
        padding: '0 10px',
        listStyle: 'none'
    },
    listItem: {
        display: 'flex'
    },
    listItemCheckbox: {
        display: 'inline-block',
        paddingRight: '10px'
    },
    listItemText: {
        display: 'inline-block',
        flexGrow: 11
    },
    listItemDelete: {
        display: 'inline-block',
        textAlign:'center',
        textDecoration: "none",
        flexGrow: 1
    }
}
export default function TasksList({todos, toggleDone, removeTask}) {

    const onRemove = (e, id) => {
        e.preventDefault();
        removeTask(id)
    }

    return (
        <section style={styles.section}>
            <ul style={styles.listItems}>
                {todos.map(({id, task, done}) => (
                    <li key={id} style={styles.listItem}>
                        <span style={styles.listItemCheckbox}>
                            <input onChange={() => toggleDone(id)} checked={done} type={"checkbox"}/>
                        </span>
                        <span style={styles.listItemText}>{task}</span>
                        <a onClick={e => onRemove(e, id)} href={"#"} style={styles.listItemDeletelis}>x</a>
                    </li>)
                )}
            </ul>
        </section>
    )
}