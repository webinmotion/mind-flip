import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ManageGameLayout from '../../../components/NavMenu/ManageGameLayout';
import { remoteFetchGamesByOrganizer, remoteFetchGameClocks, remoteCreateGameLayout } from '../../../services/trivia';

const initialCriteria = {
    from_anyone: {value: false, selected: false},
    game_category: {value: '', selected: false},
    keyword_search: {value: '', selected: false}
}

const initialForm = {
    game_id: '',
    que_id: '',
    question: '',
    game_category: '',
    que_section: 0,
    ordinal_idx: 0,
    score_strategy: '',
};

const head = [
    {
        id: 'question',
        numeric: false,
        disablePadding: true,
        label: 'Question',
    },
    {
        id: 'game_category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'que_section',
        numeric: true,
        disablePadding: true,
        label: 'Round #',
    },
    {
        id: 'ordinal_idx',
        numeric: true,
        disablePadding: true,
        label: 'Ordinal',
    },
    {
        id: 'score_strategy',
        numeric: false,
        disablePadding: false,
        label: 'Scoring',
    },
];

const initialEditable = {
    "que_section": {control: "input"},
    "ordinal_idx": {control: "input"},
    "score_strategy": {control: "select"},
}

function createData(que_id, question, game_category, que_section, ordinal_idx, score_strategy, ) {
    return ({
        que_id,
        question,
        game_category,
        que_section,
        ordinal_idx,
        score_strategy,
    });
}

const rows = [
    createData(1, 'What is the capital of Turkey', 'Geography', 0, 0, '',),
    createData(2, 'What is the capital of Iran', 'Science', 0, 0, ''),
    createData(3, 'What is the capital of Kuwait', 'Math', 0, 0, ''),
    createData(4, 'What is the capital of Greece', 'Geography', 0, 0, ''),
    createData(5, 'What is the capital of Austria', 'Science', 0, 0, ''),
    createData(6, 'What is the capital of Syria', 'Movies', 0, 0, ''),
    createData(7, 'What is the capital of Lebanon', 'Music', 0, 0, ''),
    createData(8, 'What is the capital of Sudan', 'Politics', 0, 0, ''),
    createData(9, 'What is the capital of Zambia', 'Movies', 0, 0, ''),
    createData(10, 'What is the capital of Madagascar', 'Music', 0, 0, ''),
    createData(11, 'What is the capital of Zanzibar', 'Geography', 0, 0, ''),
    createData(12, 'What is the capital of Yemen', 'Science', 0, 0, ''),
    createData(13, 'What is the capital of Qatar', 'History', 0, 0, ''),
    createData(14, 'What is the capital of Cambodia', 'History', 0, 0, ''),
    createData(15, 'What is the capital of Nicaragua', 'Science', 0, 0, ''),
];

function ManageGameLayoutContainer({ player, showAlert }) {

    const [games, setGames] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [criteria, setCriteria] = useState(initialCriteria);
    const [editable, setEditable] = useState(initialEditable);

    useEffect(() => {
        if (player) {
            remoteFetchGamesByOrganizer(player).then(setGames);
        }
    }, [player]);

    const handleSelected = e => {
        const selected = e.target.value;
        const { game_info: { game_id }, engine_info: { progression, is_multi_player, can_navigate_back, server_push_mode, game_clock } } = 
            games.find(g => g.game_info.game_id === selected);
        setForm(form => ({ ...form, game_id, progression, is_multi_player, can_navigate_back, server_push_mode, game_clock }));
    }

    const handleChangeCriteria = e => {
        setCriteria(criteria => ({ ...criteria, [e.target.name]: {...criteria[e.target.name], value: e.target.value }}));
    }

    const handleCheckCriteria = e => {
        setCriteria(criteria => ({ ...criteria, [e.target.name]: {...criteria[e.target.name], selected: e.target.checked }}));
    }

    const handleDateTime = e => {
        const { $d } = e;
        setForm(form => ({ ...form, 'scheduled_start': dayjs($d) }));
    }

    const handleLayout = () => {
        console.log('happy to handle layout changes');
    }

    return (
        <ManageGameLayout
            games={games}
            form={form}
            questions={rows}
            head={head}
            criteria={criteria}
            editable={editable}
            setEditable={setEditable}
            handleSelected={handleSelected}
            handleChangeCriteria={handleChangeCriteria}
            handleCheckCriteria={handleCheckCriteria}
            handleDateTime={handleDateTime}
            applyLayout={handleLayout}
        />
    )
}

export default ManageGameLayoutContainer