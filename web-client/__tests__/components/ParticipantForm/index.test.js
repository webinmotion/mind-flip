import { render, screen, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import ParticipantForm from '../../../components/ParticipantForm';

describe("testing ParticipantForm component", () => {

    test("it shows 5 inputs, 1 dropdown and a button when first rendered", () => {
        //render the component
        const createParticipant = jest.fn();
        const fetchMeetingParticipants = jest.fn();
        render(<ParticipantForm createParticipant={createParticipant} fetchMeetingParticipants={fetchMeetingParticipants} />);

        //find an element or manipulate the component
        const inputs = screen.getAllByRole('textbox');
        const dropdown = screen.getAllByRole('combobox');
        const button = screen.getByText(/Add Participant/);

        //make an assertion based on the outcome
        expect(inputs).toHaveLength(5);
        expect(dropdown).toHaveLength(1);
        expect(button).toBeInTheDocument();
    });

    test("it calls createParticipant when the form is submitted", () => {
        //render the component
        const createParticipant = jest.fn().mockImplementation(participant => {
            console.log(JSON.stringify(participant));
        });
        const fetchMeetingParticipants = jest.fn();
        render(<ParticipantForm createParticipant={createParticipant} fetchMeetingParticipants={fetchMeetingParticipants} />);

        //Find the two inputs
        const meetingCombo = screen.getByRole('combobox');
        const employeeInput = screen.getByLabelText(/employee id/i);
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailAddrInput = screen.getByLabelText(/email address/i);
        const companyInput = screen.getByLabelText(/company name/i);
        const formButton = screen.getByText(/Add Participant/i);

        //Simulate selecting meeting id
        user.click(meetingCombo);
        fireEvent.change(meetingCombo, { target: { id: 'meet_id', value: 'some meeting id' } });

        //Simulate typing in employee id
        user.click(employeeInput);
        fireEvent.change(employeeInput, { target: { id: 'emp_id', value: 'some emp id' } });

        //Simuluate typing in first name
        user.click(firstNameInput);
        fireEvent.change(firstNameInput, { target: { id: 'first_name', value: 'first name' } });

        //Simuluate typing in last name
        user.click(lastNameInput);
        fireEvent.change(lastNameInput, { target: { id: 'last_name', value: 'last name' } });

        //Simuluate typing in email
        user.click(emailAddrInput);
        fireEvent.change(emailAddrInput, { target: { id: 'email_address', value: 'first.last@company.com' } });

        //Simuluate typing in company name
        user.click(companyInput);
        fireEvent.change(companyInput, { target: { id: 'company_name', value: 'company name' } });

        //Simulate submitting form
        fireEvent.click(formButton);

        //Assert to make sure 'createParticipant' gets when called with name/email
        expect(createParticipant).toHaveBeenCalledTimes(1);
        expect(createParticipant).toHaveBeenCalledWith(expect.objectContaining({
            "company_name": "company name", 
            "email_address": "first.last@company.com", 
            "emp_id": "some emp id", 
            "first_name": "first name", 
            "last_name": "last name", 
            "meet_id": ""
        }));
    });
});