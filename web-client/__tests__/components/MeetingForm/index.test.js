import {fireEvent, render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import MeetingForm from '../../../components/MeetingForm';

describe("testing MeetingForm component", () => {

    test("it shows 3 inputs and a button when first rendered", () => {
        //render the component
        const createMeeting = jest.fn();
        render(<MeetingForm createMeeting={createMeeting} />);

        //find an element or manipulate the component
        const inputs = screen.getAllByRole('textbox');
        const button = screen.getByText(/Add Meeting/);

        //make an assertion based on the outcome
        expect(inputs).toHaveLength(3);
        expect(button).toBeInTheDocument();
    });

    test("it calls createMeeting when the form is submitted", () => {
        //render the component
        const createMeeting = jest.fn().mockImplementation(meeting => {
            console.log(JSON.stringify(meeting));
        });
        render(<MeetingForm createMeeting={createMeeting} />);

        //Find the two inputs
        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const organizerInput = screen.getByLabelText(/organizer/i);
        const formButton = screen.getByText(/Add Meeting/i);

        //Simulate typing in title
        user.click(titleInput);
        fireEvent.change(titleInput, { target: { id: 'title', value: 'some title' } });

        //Simuluate typing in description
        user.click(descriptionInput);
        fireEvent.change(descriptionInput, { target: { id: 'description', value: 'good description' } });

        //Simuluate typing in organizer
        user.click(organizerInput);
        fireEvent.change(organizerInput, { target: { id: 'organizer', value: 'jim bob' } });

        //Simulate clicking form button
        fireEvent.click(formButton);

        //Assert to make sure 'createMeeting' gets when called with name/email
        expect(createMeeting).toHaveBeenCalledTimes(1);
        expect(createMeeting).toHaveBeenCalledWith(expect.objectContaining({
            "agenda": "{}", 
            "description": "good description", 
            "organizer": "jim bob", 
            "title": "some title"
        }));
    });
});