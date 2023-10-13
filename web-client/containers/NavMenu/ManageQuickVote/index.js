import React, {useState} from 'react';
import ManageQuickVote from '../../../components/NavMenu/ManageQuickVote';
import useWebsocketClient, {CHOICES_UPDATED_EVENT, QUESTION_UPDATED_EVENT} from "../../../hooks/useWebsocketClient";
import useWebsocketState from "../../../hooks/useWebsocketState";

const createAttendee = (email_address) => ({
    email_address,
    active: false,
    vote: ''
});

function ManageQuickVoteContainer({ showAlert }) {

    const [email, setEmail] = useState('');
    const [selected, setSelected] = useState("");
    const [choice, setChoice] = useState("");
    const [choices, setChoices] = useState([1,2,3,5,8,13]);
    const [editing, setEditing] = useState(false);
    const [attendees, setAttendees] = useState([]);

    const { question, voting, updateChoices, updateQuestion, updateVoting, includeAttendee, removeAttendee,} = useWebsocketState();
    const {sendBroadcast} = useWebsocketClient({
        connectionString: "quickvote?organizer=true&ticket=testing-123&sender=admin@emailer.com",
        updateChoices,
        updateQuestion,
        updateVoting,
        includeAttendee,
        removeAttendee,
    });

    const createChoice = key => {
        if(editing) {
            setEditing(!editing);
        }
        setChoice("");
        setSelected("");
        setChoices(choices => ([...choices, key]));
    }
    const removeChoice = (choice) => {
        if(editing) {
            setEditing(!editing);
        }
        setChoice("");
        setSelected("");
        setChoices(choices.filter(ch => ch !== choice));
    }

    const selectChoice = e => {
        const {value} = e.target;
        setEditing(true);
        setChoice(value);
        setSelected(value);
        setChoices(choices => choices.filter(ch => ch !== value))
    }

    const broadcastQuestion = (question) => {
        sendBroadcast({event: QUESTION_UPDATED_EVENT, payload: question}, false)
    }

    const broadcastData = () => {
        sendBroadcast({event: CHOICES_UPDATED_EVENT, payload: choices}, false);
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const inviteAttendee = () => {
        if(email && attendees.findIndex(a => a.email_address === email) === -1){
            setAttendees(att => ([...att, createAttendee(email)]));
        }
        else{
            showAlert({message: "Use a different attendee email address", severity: "warning", autoClose: true})
        }
        setEmail("");
    }

    return (
        <ManageQuickVote
            choice={choice}
            email={email}
            question={question}
            handleChoice={e => setChoice(e.target.value)}
            selected={selected}
            choices={choices}
            editing={editing}
            voting={voting}
            createChoices={createChoice}
            removeChoice={removeChoice}
            selectChoice={selectChoice}
            setEditing={setEditing}
            attendees={attendees}
            handleQuestion={e => broadcastQuestion(e.target.value)}
            broadcastData={broadcastData}
            handleEmail={handleEmail}
            inviteAttendee={inviteAttendee}
        />
    )
}

export default ManageQuickVoteContainer