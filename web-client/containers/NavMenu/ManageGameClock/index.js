import React, { useEffect, useState } from 'react';
import ManageGameClock from '../../../components/NavMenu/ManageGameClock';
import { remoteFetchGameClocks, remoteUpsertGameClock, remoteDeleteGameClock, } from '../../../services/trivia';

const initialGameClock = {
    clock_id: '',
    clock_title: '',
    pre_countdown_delay: 0,
    countdown_duration: 0,
    post_countdown_delay: 0,
};

function ManageGameClockContainer({ showAlert }) {

    const [clocks, setClocks] = useState([]);
    const [form, setForm] = useState(initialGameClock);

    useEffect(() => {
        remoteFetchGameClocks().then(setClocks)
    }, []);

    const handleChange = e => {
        setForm(form => ({ ...form, [e.target.id]: e.target.value }));
    }

    const handleSelect = (e, clock_id) => {
        const clock = clocks.find(tck => tck.clock_id === clock_id);
        setForm(form => ({ ...form, ...clock }));
    }

    const handleDelete = async (clock_id) => {
        const data = await remoteDeleteGameClock(clock_id);
        if (data.clock_id) {
            setClocks(clock => clock.filter(tck => tck.clock_id !== data.clock_id));
        }
    }

    const updateClocks = async () => {
        if (form.clock_id) {
            const data = await remoteUpsertGameClock(form);
            if (clocks.findIndex(tck => tck.clock_id === data.clock_id) === -1) {
                setClocks(clocks => ({ ...clocks, data }));
            }
            else {
                setClocks(clock => {
                    return clock.map(tck => {
                        if (tck.clock_id === data.clock_id) {
                            return data;
                        }
                        return tck;
                    });
                });
            }
        }
        else {
            showAlert({
                message: "You must provide a clock id",
                autoClose: true,
                severity: 'warning',
            })
        }
    }

    return (
        <ManageGameClock
            clocks={clocks}
            form={form}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleDelete={handleDelete}
            updateClocks={updateClocks}
        />
    )
}

export default ManageGameClockContainer