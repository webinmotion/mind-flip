import React, { useEffect, useState } from 'react';
import ManageGamePlacard from '../../../components/NavMenu/ManageGamePlacard';
import { remoteFetchAllGamePlacards, remoteUpsertGamePlacard, remoteDeleteGamePlacard, } from '../../../services/trivia';

const initialGamePlacard = {
    placard_id: '',
    placard_content: '',
    display_duration: 0,
    followed_by: '',
    content_type: '',
};

function ManageGamePlacardContainer() {

    const [placards, setPlacards] = useState([]);
    const [form, setForm] = useState(initialGamePlacard);

    useEffect(() => {
        remoteFetchAllGamePlacards().then(setPlacards)
    }, []);

    const handleChange = e => {
        setForm(form => ({ ...form, [e.target.id || e.target.name]: e.target.value }));
    }

    const handleSelect = (e, placard_id) => {
        const placard = placards.find(plc => plc.placard_id === placard_id);
        setForm(form => ({ ...form, ...placard }));
    }

    const handleDelete = async (placard_id) => {
        const data = await remoteDeleteGamePlacard(placard_id);
        if (data.placard_id) {
            setPlacards(placard => placard.filter(plc => plc.placard_id !== data.placard_id));
        }
    }

    const updatePlacards = async () => {
        const data = await remoteUpsertGamePlacard(form);
        if (placards.findIndex(plc => plc.placard_id === data.placard_id) === -1) {
            setPlacards(placards => ([ ...placards, data ]));
        }
        else {
            setPlacards(placard => {
                return placard.map(plc => {
                    if (plc.placard_id === data.placard_id) {
                        return data;
                    }
                    return plc;
                });
            });
        }
    }

    return (
        <ManageGamePlacard
            placards={placards}
            form={form}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleDelete={handleDelete}
            updatePlacards={updatePlacards}
        />
    )
}

export default ManageGamePlacardContainer