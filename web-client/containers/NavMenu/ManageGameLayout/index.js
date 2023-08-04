import React, {useEffect, useState} from 'react';
import ManageGameLayout from '../../../components/NavMenu/ManageGameLayout';
import {
    remoteFetchGameLayout,
    remoteFetchGamesByOrganizer,
    remoteFetchQuestionsByAuthor,
    remoteFetchRootGameMessages,
    remoteUpsertGameLayout,
} from '../../../services/trivia';

const initialCriteria = {
    from_anyone: {value: false, selected: false},
    game_category: {value: '', selected: false},
    keyword_search: {value: '', selected: false}
}

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
        id: 'content_lbl',
        numeric: false,
        disablePadding: false,
        label: 'Label',
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
        label: 'Scoring Strategy',
    },
    {
        id: 'message_fk',
        numeric: false,
        disablePadding: false,
        label: 'Break Message',
    },
];

const initialEditable = {
    "que_section": {control: "input"},
    "ordinal_idx": {control: "input"},
    "content_lbl": {control: "input"},
    "score_strategy": {control: "select"},
    "message_fk": {control: "select"},
}

function createData(que_id, question, game_category, content_lbl, que_section, ordinal_idx, score_strategy, message_fk, ) {
    return ({
        que_id,
        question,
        game_category,
        content_lbl,
        que_section,
        ordinal_idx,
        score_strategy,
        message_fk,
    });
}

function generateRecords(game_fk, source) {
    const packaged = Object.entries(source).reduce((acc, [key, value]) => {
        return Object.entries(value)
            .reduce((acc1, [prop, body]) => {
                if (typeof body === 'object' && body.hasOwnProperty("value")) {
                    if (!acc[prop]) {
                        acc1[prop] = {[key]: body.value}
                    } else {
                        acc[prop][key] = body.value;
                    }
                }
                return acc1;
            }, acc);
    }, {});

    return Object.entries(packaged).map(([key, value]) => {
        const {content_lbl, que_section, ordinal_idx, score_strategy, message_fk} = value;
        return ({
            game_fk,
            question_fk: key,
            current_section: que_section,
            section_index: ordinal_idx,
            content_label: content_lbl,
            message_fk,
            score_strategy
        });
    });
}

function ManageGameLayoutContainer({ player, showAlert }) {

    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');
    const [criteria, setCriteria] = useState(initialCriteria);
    const [editable, setEditable] = useState(initialEditable);
    const [questions, setQuestions] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        remoteFetchRootGameMessages().then(setMessages);
    }, []);

    useEffect(() => {
        if (player) {
            remoteFetchGamesByOrganizer(player).then(setGames);
        }
    }, [player]);

    useEffect(() => {
        if(player){
            remoteFetchQuestionsByAuthor(player).then(ques => ques.map(que => {
                const {que_id, que_value, category} = que;
                return createData(que_id, que_value, category, 0, 0, '', '', '');
            })).then(setQuestions)
        }
    }, [player]);

    useEffect(() => {
        if(selectedGame) {
            remoteFetchGameLayout(selectedGame).then(rows => {
                const updated = questions.map(que => {
                    const row = rows.find(row => row.question_fk === que.que_id);
                    if(row){
                        const {current_section, section_index, content_label, score_strategy, message_fk} = row;
                        return ({...que, que_section: current_section, ordinal_idx: section_index, content_lbl: content_label, score_strategy, message_fk, })
                    }
                    return que;
                });
                //set updated questions
                setQuestions(updated);
            });
        }
    }, [selectedGame]);

    const handleChangeCriteria = e => {
        setCriteria(criteria => ({ ...criteria, [e.target.name]: {...criteria[e.target.name], value: e.target.value }}));
    }

    const handleCheckCriteria = e => {
        setCriteria(criteria => ({ ...criteria, [e.target.name]: {...criteria[e.target.name], selected: e.target.checked }}));
    }

    const handleLayout = () => {
        if(selectedGame) {
            const records = generateRecords(selectedGame, editable)
                .map(record => {
                    const existing = questions.find(q => q.que_id === record.question_fk) || {};
                    //merge changes with existing info
                    const question_fk = record?.question_fk || existing?.que_id;
                    const current_section = record?.current_section || existing?.que_section;
                    const section_index = record?.section_index || existing?.ordinal_idx
                    const content_label = record?.content_label || existing?.content_lbl;
                    const message_fk = messages.find(msg => msg.message_content === record?.message_fk)?.message_id || existing?.message_fk || null;
                    const score_strategy = record?.score_strategy || existing?.score_strategy
                    //return merged entity
                    return ({...record, question_fk, current_section, section_index, content_label, score_strategy, message_fk });
                });
            remoteUpsertGameLayout(records).then(console.log);
        }
        else {
            showAlert({message: "You need to select a game first", autoClose: true, severity: "warning"})
        }
    }

    return (
        <ManageGameLayout
            games={games}
            questions={questions}
            head={head}
            criteria={criteria}
            messages={messages}
            editable={editable}
            setEditable={setEditable}
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
            handleChangeCriteria={handleChangeCriteria}
            handleCheckCriteria={handleCheckCriteria}
            applyLayout={handleLayout}
        />
    )
}

export default ManageGameLayoutContainer