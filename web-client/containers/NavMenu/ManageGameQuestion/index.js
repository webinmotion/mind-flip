import React, { useEffect, useState } from 'react';
import ManageGameQuestion from '../../../components/NavMenu/ManageGameQuestion';
import { remoteFetchQuestionsByAuthor, remoteUpsertGameQuestion, remoteDeleteGameQuestion, } from '../../../services/trivia';

const initialQuestion = {
    que_id: '',
    que_value: '',
    que_answer: 0,
    answer_reason: 0,
    category: 0,
    asked_by: '',
    max_points: 0,
    choices: []
};

const initialChoice = {
    choice_id: '',
    question_fk: '',
    choice_value: '',
    is_correct: false,
    clue: '',
}

function ManageGameQuestionContainer({ showAlert }) {

    const [questions, setQuestions] = useState([]);
    const [queForm, setQueForm] = useState(initialQuestion);
    const [choiceForm, setChoiceForm] = useState(initialChoice);

    useEffect(() => {
        remoteFetchQuestionsByAuthor(player_id).then(setQuestions)
    }, []);

    const handleChange = e => {
        setQueForm(queForm => ({ ...queForm, [e.target.id]: e.target.value }));
    }

    const handleSelect = (e, que_id) => {
        const question = questions.find(tck => tck.que_id === que_id);
        setQueForm(queForm => ({ ...queForm, ...question }));
    }

    const handleDelete = async (que_id) => {
        const data = await remoteDeleteGameQuestion(que_id);
        if (data.que_id) {
            setQuestions(question => question.filter(tck => tck.que_id !== data.que_id));
        }
    }

    const updateQuestions = async () => {
        if (queForm.que_id) {
            const data = await remoteUpsertGameQuestion(queForm);
            if (questions.findIndex(tck => tck.que_id === data.que_id) === -1) {
                setQuestions(questions => ({ ...questions, data }));
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
        else {
            showAlert({
                message: "You must provide a question id",
                autoClose: true,
                severity: 'warning',
            })
        }
    }

    return (
        <ManageGameQuestion
            questions={questions}
            queForm={queForm}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleDelete={handleDelete}
            updateQuestions={updateQuestions}
        />
    )
}

export default ManageGameQuestionContainer