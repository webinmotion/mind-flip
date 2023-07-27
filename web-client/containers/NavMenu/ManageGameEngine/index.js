import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ManageGameEngine from '../../../components/NavMenu/ManageGameEngine';
import { remoteFetchGamesByOrganizer, remoteFetchGameTickers, remoteCreateGameEngine } from '../../../services/trivia';

const initialGameEngine = {
    scheduled_start: dayjs().add(1, 'day'),
    progression: 'manual',
    is_multi_player: false,
    can_navigate_back: false,
    server_push_mode: true,
    game_ticker: 300,
};

function ManageGameEngineContainer({ player, showAlert }) {

    const [games, setGames] = useState([]);
    const [tickers, setTickers] = useState([]);
    const [form, setForm] = useState(initialGameEngine);

    useEffect(() => {
        if (player) {
            remoteFetchGamesByOrganizer(player).then(setGames);
        }
    }, [player]);


    useEffect(() => {
        remoteFetchGameTickers().then(setTickers)
    }, []);

    const handleSelected = e => {
        const selected = e.target.value;
        const { game_info: { game_id }, engine_info: { progression, is_multi_player, can_navigate_back, server_push_mode, game_ticker } } = 
            games.find(g => g.game_info.game_id === selected);
        setForm(form => ({ ...form, game_id, progression, is_multi_player, can_navigate_back, server_push_mode, game_ticker }));
    }

    const handleChange = e => {
        setForm(form => ({ ...form, [e.target.name]: e.target.value }));
    }

    const handleChecked = e => {
        setForm(form => ({ ...form, [e.target.name]: e.target.checked }));
    }

    const handleDateTime = e => {
        const { $d } = e;
        setForm(form => ({ ...form, 'scheduled_start': dayjs($d) }));
    }

    const handleApplyEngine = async () => {
        if (form.game_id) {
            const data = await remoteCreateGameEngine(form.game_id, { ...form, scheduled_start: form?.scheduled_start.toISOString() });
            setGames(games => {
                return games.map(g => {
                    if (g.game_info.game_id === data?.game_fk) {
                        const { scheduled_start, progression, is_multi_player, can_navigate_back, server_push_mode, game_ticker, } = data;
                        return ({ ...g, engine_info: { ...g.engine_info, scheduled_start, progression, is_multi_player, can_navigate_back, server_push_mode, game_ticker, } })
                    }
                    return g;
                })
            });
        }
        else {
            showAlert({
                message: "There is no game to apply the engine",
                autoClose: true,
                severity: 'warning',
            })
        }
    }

    return (
        <ManageGameEngine
            games={games}
            tickers={tickers}
            form={form}
            handleSelected={handleSelected}
            handleChange={handleChange}
            handleChecked={handleChecked}
            handleDateTime={handleDateTime}
            applyEngine={handleApplyEngine}
        />
    )
}

export default ManageGameEngineContainer