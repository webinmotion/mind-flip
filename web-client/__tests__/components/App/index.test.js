import { render, screen, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../../../components/App';

describe("testing App component", () => {

    test("it can receive a new user and show it in a list", () => {
        //render the component
        const addUser = jest.fn(cb => cb({name: 'some name', email: 'some email'}));
        render(<App users={[]} addUser={addUser} />);

        //find textbox element in the form
        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/email/i);

        //Simuluate typing in email
        const emailValue = "first.user@email.com";
        user.click(emailInput);
        fireEvent.change(emailInput, { target: { id: 'email', value: emailValue } });

        //Simulate typing in name
        const nameValue = "First User";
        user.click(nameInput);
        fireEvent.change(nameInput, { target: { id: 'name', value: nameValue } });

        //Find form
        const form = screen.getByRole('form');

        //Simulate submitting form
        fireEvent.submit(form);

        //debugging purposes only - see what's doing on
        screen.debug();

        //assert correct values in the table
        const nameCell = screen.getByRole("cell", { name: nameValue });
        const emailCell = screen.getByRole("cell", { name: emailValue });

        expect(nameCell).toBeInTheDocument();
        expect(emailCell).toBeInTheDocument();
    });
});