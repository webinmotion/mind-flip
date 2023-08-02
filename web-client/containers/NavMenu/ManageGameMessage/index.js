import React, { useEffect, useState } from 'react';
import ManageGameMessage from '../../../components/NavMenu/ManageGameMessage';
import { remoteFetchAllGameMessages, remoteUpsertGameMessage, remoteDeleteGameMessage, } from '../../../services/trivia';

const initialGameMessage = {
    message_id: '',
    message_content: '',
    display_duration: 0,
    followed_by: '',
    content_type: '',
};

function ManageGameMessageContainer() {

    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState(initialGameMessage);

    useEffect(() => {
        remoteFetchAllGameMessages().then(setMessages)
    }, []);

    const handleChange = e => {
        setForm(form => ({ ...form, [e.target.id || e.target.name]: e.target.value }));
    }

    const handleSelect = (e, message_id) => {
        const message = messages.find(plc => plc.message_id === message_id);
        setForm(form => ({ ...form, ...message }));
    }

    const handleDelete = async (message_id) => {
        const data = await remoteDeleteGameMessage(message_id);
        if (data.message_id) {
            setMessages(message => message.filter(plc => plc.message_id !== data.message_id));
        }
    }

    const updateMessages = async () => {
        const data = await remoteUpsertGameMessage(form);
        if (messages.findIndex(plc => plc.message_id === data.message_id) === -1) {
            setMessages(messages => ([ ...messages, data ]));
        }
        else {
            setMessages(message => {
                return message.map(plc => {
                    if (plc.message_id === data.message_id) {
                        return data;
                    }
                    return plc;
                });
            });
        }
    }

    return (
        <ManageGameMessage
            messages={messages}
            form={form}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleDelete={handleDelete}
            updateMessages={updateMessages}
        />
    )
}

export default ManageGameMessageContainer