import React from 'react';
import {useNavigation } from "react-router-dom";
import AttendQuickVote from "../../components/AttendeeQuickVote";
import useWebsocketClient, {CHOICE_POSTED_EVENT, CHOICES_UPDATED_EVENT} from "../../hooks/useWebsocketClient";
import useWebsocketState from "../../hooks/useWebsocketState";

function AttendQuickVoteContainer({ player, showAlert }) {

    const navigation = useNavigation();

    const {attendees, choices, voting, question, updateChoices, updateQuestion, revealVoting, updateVoting, includeAttendee, removeAttendee,} = useWebsocketState();
    const {sendBroadcast} = useWebsocketClient({
        connectionString: navigation.location,
        updateChoices,
        updateQuestion,
        revealVoting,
        updateVoting,
        includeAttendee,
        removeAttendee,});

    const submitChoice = (choice) => {
        sendBroadcast({event: CHOICE_POSTED_EVENT, payload: choice}, false)
    }

    return (
        <AttendQuickVote
            attendees={attendees}
            choices={choices}
            voting={voting}
            question={question}
            submitChoice={submitChoice}
        />
    )
}

export default AttendQuickVoteContainer