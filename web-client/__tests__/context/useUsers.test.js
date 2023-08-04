import {fireEvent, render, screen, within} from '@testing-library/react';
import useUsers from '../../context/useUsers.js';

function TestComponent() {
    const { users, addUser } = useUsers();
    let id = 10;

    const onAddUser = () => {
        addUser({ id: id++, name: `name-${id}`, email: `email-${id}` })
    }

    return (
        <div>
            <table data-testid="users-list">
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onAddUser}>Add User</button>
        </div>);
}

describe("Testing useUsers custom hook", () => {

    test("it load 2 default records initialy", () => {

        //render test component
        render(<TestComponent />)

        //find number od table rows
        const rows = within(screen.getByTestId("users-list")).getAllByRole("row");

        //assert 2 rows exist
        expect(rows).toHaveLength(2);
    });

    test("it load an additional row with each click", () => {

        //render test component
        render(<TestComponent />)

        //fire click events to add rows
        const button = screen.getByRole("button");
        fireEvent.click(button);

        //find number od table rows
        const rows = within(screen.getByTestId("users-list")).getAllByRole("row");

        //assert 3 rows exist
        expect(rows).toHaveLength(3);
    });
});