import {useState} from "react";

export default function useWebsocketState() {

    const [attendees, setAttendees] = useState([]);
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);
    const [voting, setVoting] = useState([]);

    const includeAttendee = (attendee) => {
        setAttendees(att => ([...attendees, attendee]))
    }

    const removeAttendee = (attendee) => {
        setAttendees(attendees.filter(att => att.email_address !== attendee.email_address))
    }

    const updateVoting = (vote) => {
        setVoting(voting => ([...voting, vote]))
    }

    return {
        attendees,
        question,
        choices,
        voting,
        updateChoices: setChoices,
        updateQuestion: setQuestion,
        revealVoting: setVoting,
        updateVoting,
        includeAttendee,
        removeAttendee,
    };
}