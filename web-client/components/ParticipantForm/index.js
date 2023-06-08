import React, { useState } from 'react';
import './ParticipantForm.scss';

export const initialValue = {
    meet_id: "",
    emp_id: "",
    first_name: "",
    last_name: "",
    email_address: "",
    company_name: "",
};

export default function ParticipantForm({ meetings, createParticipant, fetchMeetingParticipants }) {

    const [user, setUser] = useState(initialValue);

    const onChange = e => {
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    const onCreateParticipant = (e) => {
        e.preventDefault();
        createParticipant(user);
        setUser(initialValue);
    }

    function lookupParticipants(e){
        onChange(e);
        fetchMeetingParticipants(e.target.value);
    }

    return (
        <div className='row'>
            <form aria-label='form' className='users-form col s12' >
                <div className="row">
                    <div className="input-field col s12">
                        <select id="meet_id" className='browser-default' aria-label='select' onChange={lookupParticipants}>
                            <option value={''}>Select a meeting</option>
                            {meetings?.map(meet => <option key={meet.meet_id} value={meet.meet_id}>{meet.meet_title}</option>)}
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className="input-field col s12">
                        <label htmlFor='emp_id'>Employee ID</label>
                        <input id="emp_id" type='text' value={user.emp_id} onChange={onChange} />
                    </div>
                </div>
                <div className='row'>
                    <div className="input-field col s12">
                        <label htmlFor='first_name'>First Name</label>
                        <input id="first_name" type='text' value={user.first_name} onChange={onChange} />
                    </div>
                </div>
                <div className='row'>
                    <div className="input-field col s12">
                        <label htmlFor='last_name'>Last Name</label>
                        <input id="last_name" type='text' value={user.last_name} onChange={onChange} />
                    </div>
                </div>
                <div className='row'>
                    <div className="input-field col s12">
                        <label htmlFor='email_address'>Email Address</label>
                        <input id="email_address" type='email' value={user.email_address} onChange={onChange} />
                    </div>
                </div>
                <div className='row'>
                    <div className="input-field col s12">
                        <label htmlFor='company_name'>Company Name</label>
                        <input id="company_name" type='text' value={user.company_name} onChange={onChange} />
                    </div>
                </div>
                <div className='row'>
                    <div className="input-field col s12">
                        <a className="waves-effect waves-light btn"
                            disabled={Object.keys(user).find(key => user[key] === '')}
                            onClick={onCreateParticipant}>Add Participant</a>
                    </div>
                </div>
            </form>
        </div>)
}
