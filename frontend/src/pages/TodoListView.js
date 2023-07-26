import React from 'react';
import Layout from '@theme/Layout';
import JotaiList from "../components/TodoList/JotaiList";

export default function TodoListView() {

    return (
        <Layout title="Todo List View" description="Demostrating Todo List using different state management contexts">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '3em',
                }}>
                <JotaiList />
            </div>
        </Layout>
    );
}