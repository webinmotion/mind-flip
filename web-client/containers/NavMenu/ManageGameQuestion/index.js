import React, {useEffect, useState} from 'react';
import ManageGameQuestion from '../../../components/NavMenu/ManageGameQuestion';
import {
    remoteDeleteGameChoice,
    remoteDeleteGameQuestion,
    remoteFetchQuestionsByAuthor,
    remoteUpsertGameQuestion,
    remoteUpsertQuestionChoices,
} from '../../../services/trivia';

const initialQuestion = {
    que_id: '',
    que_value: '',
    que_answer: '',
    answer_reason: '',
    category: '',
    max_points: 0,
    has_choices: false,
    choices: []
};

const initialChoice = {
    choice_id: '',
    question_fk: '',
    choice_value: '',
    is_correct: false,
    has_clue: false,
    clue: '',
}

function ManageGameQuestionContainer({ player, showAlert }) {

    const [questions, setQuestions] = useState([]);
    const [queForm, setQueForm] = useState(initialQuestion);
    const [choiceForm, setChoiceForm] = useState(initialChoice);

    useEffect(() => {
        remoteFetchQuestionsByAuthor(player).then(setQuestions)
    }, []);

    const handleQueSelected = (que_id) => {
        //update choices based on que selected
        const que = questions.find(q => q.que_id === que_id);
        setQueForm(form => ({...form, ...que}));
        if(que.has_choices){
            que.choices?.length > 0 ?
                setChoiceForm({...que.choices[0], question_fk: que_id}) : setChoiceForm({...initialChoice, question_fk: que_id});
        }
        else{
            setChoiceForm({...initialChoice, question_fk: que_id});
        }
    }

    const handleDropdown = e => {
        setQueForm(form => ({ ...form, [e.target.name]: e.target.value }));
    }

    const handleChange = e => {
        setQueForm(form => ({ ...form, [e.target.id || e.target.name]: e.target.value }));
    }

    const handleChoiceChange = e => {
        setChoiceForm(form => ({ ...form, [e.target.id || e.target.name]: e.target.value }));
    }

    const handleCorrectChecked = e => {
        setChoiceForm(form => ({ ...form, [e.target.name]: e.target.checked }));
    }

    const handleClueChecked = e => {
        setChoiceForm(form => ({ ...form, [e.target.name]: e.target.checked }));
    }

    const handleChoiceSelected = (event, que_id, choice_id) => {
        const choice = questions.find(q => q.que_id === que_id)?.choices?.find(c => c.choice_id === choice_id);
        setChoiceForm({
            ...initialChoice,
            ...choice,
            question_fk: que_id,
            has_clue: (choice.clue !== undefined && choice.clue !== null && choice.clue !== '')
        });
    };

    const handleChecked = e => {
        setQueForm(form => ({ ...form, [e.target.name]: e.target.checked }));
    }

    const handleDeleteQue = async (que_id) => {
        const data = await remoteDeleteGameQuestion(que_id);
        if (data.que_id) {
            setQuestions(ques => ques.filter(q => q.que_id !== data.que_id));
        }
    }

    const handleDeleteChoice = async (que_id, choice_id) => {
        const data = await remoteDeleteGameChoice(que_id, choice_id);
        if (data.que_id) {
            setQuestions(ques => ques.map(q => {
                if(q.que === que_id){
                    return ({...q, choices: q.choices.filter(tck => tck.choice_id !== choice_id)})
                }
                return q;
            }));
        }
    }

    const updateQuestions = async () => {
        const data = await remoteUpsertGameQuestion({...queForm, asked_by: player});
        if (questions.findIndex(tck => tck.que_id === data.que_id) === -1) {
            setQuestions(questions => ([...questions, data ]));
        }
        else {
            setQuestions(question => {
                return question.map(tck => {
                    if (tck.que_id === data.que_id) {
                        return data;
                    }
                    return tck;
                });
            });
        }
    }

    const updateChoices = async () => {
        const data = await remoteUpsertQuestionChoices(choiceForm);
        console.log('choices data', data);
    }

    return (
        <ManageGameQuestion
            questions={questions}
            queForm={queForm}
            choiceForm={choiceForm}
            handleChange={handleChange}
            handleQueSelected={handleQueSelected}
            handleDeleteQue={handleDeleteQue}
            handleChecked={handleChecked}
            handleChoiceSelected={handleChoiceSelected}
            handleChoiceChange={handleChoiceChange}
            handleCorrectChecked={handleCorrectChecked}
            handleClueChecked={handleClueChecked}
            handleDeleteChoice={handleDeleteChoice}
            handleDropdown={handleDropdown}
            updateQuestions={updateQuestions}
            updateChoices={updateChoices}
        />
    )
}

export default ManageGameQuestionContainer