import {render, screen, within} from '@testing-library/react';
import ParticipantsList from '../../../components/ParticipantsList';

describe("testing ParticipantsList component", () => {

    test("it should render one row per user - using 'screen' object", () => {
        //render the component
        const users = [
            { id: 1, name: 'bat man', email: 'bat.man@email.com' },
            { id: 2, name: 'cat woman', email: 'cat.woman@email.com' }
        ];
        render(<ParticipantsList users={users} />);

        //find all rows in the table
        // screen.logTestingPlaygroundURL(); //convenience method for selector playground
        const rows = within(screen.getByTestId("users-list")).getAllByRole("row");

        //assert correct number of rows in the table
        expect(rows).toHaveLength(2);
    });

    test("it should render one row per user - using 'container' object", () => {
        //render the component
        const users = [
            { id: 1, name: 'bat man', email: 'bat.man@email.com' },
            { id: 2, name: 'cat woman', email: 'cat.woman@email.com' }
        ];
        const { container } = render(<ParticipantsList users={users} />);

        //find all rows in the table
        // screen.logTestingPlaygroundURL(); //convenience method for selector playground
        const rows = container.querySelectorAll("tbody tr");

        //assert correct number of rows in the table
        expect(rows).toHaveLength(2);
    });

    test("render the email and name of each user", () => {
        //render the component
        const users = [
            { id: 1, name: 'bat man', email: 'bat.man@email.com' },
            { id: 2, name: 'cat woman', email: 'cat.woman@email.com' }
        ];
        render(<ParticipantsList users={users} />);

        //find elements in table
        for (let user of users) {
            const nameCell = screen.getByRole("cell", { name: user.name });
            const emailCell = screen.getByRole("cell", { name: user.email });

            expect(nameCell).toBeInTheDocument();
            expect(emailCell).toBeInTheDocument();
        }
    });
});