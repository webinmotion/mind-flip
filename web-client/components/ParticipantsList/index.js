import React from 'react';
import './ParticipantsList.scss';

export default function ParticipantsList({ participants }) {

    return (
        <table className='participants-list striped'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody data-testid="participants">
                {participants.map(participant => <tr key={participant.par_id}>
                    <td>{participant.emp_id}</td>
                    <td>{participant.first_name}</td>
                    <td>{participant.last_name}</td>
                    <td>{participant.email_address}</td>
                    <td>{participant.company_name}</td>
                </tr>)}
            </tbody>
        </table>)
}
