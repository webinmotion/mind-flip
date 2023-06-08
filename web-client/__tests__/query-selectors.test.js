import { useEffect, useState } from 'react';
import { render, screen, within } from '@testing-library/react';

function TestComponent() {
    return (
        <div>
            <p>Component has 0 element of 'button' role</p>
            <p>Component has 1 element of 'list' role</p>
            <p>Component has 3 elements of 'listitem' role</p>
            <ul>
                <li>Red</li>
                <li>Blue</li>
                <li>Green</li>
            </ul>
        </div>
    )
}

function fetchColors() {
    return Promise.resolve(['red', 'blue', 'green'])
}

function TestFetchingComponent() {

    const [colors, setColors] = useState([]);

    useEffect(() => {
        fetchColors().then(setColors);
    }, []);

    const renderedColors = colors.map(color => <li key={color}>{color}</li>);

    return <ul>{renderedColors}</ul>
}

function toContainRole(container, role, quantity = 1) {
    const elements = within(container).getAllByRole(role);
    if (elements?.length == quantity) {
        return ({
            pass: true
        })
    }
    else {
        return ({
            pass: false,
            message: () => `extected to find ${quantity} role elements but found ${elements?.length} instead`,
        })
    }
}

expect.extend({ toContainRole })

function TestCustomMatcherComponent() {
    return (
        <div>
            <button>Back</button>
            <form aria-label='form'>
                <button>Go</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}

describe("Evaluate how selector functions work in querying document", () => {

    test("getBy, queryBy, findBy finding zero elements", async () => {
        render(<TestComponent />);

        expect(() => screen.getByRole("button")).toThrow()

        expect(screen.queryByRole("button")).toEqual(null);

        let errorThrown = false;
        try {
            await screen.findByRole("button");
        } catch (e) {
            errorThrown = true;
        }
        expect(errorThrown).toBeTruthy();
    });

    test("getBy, queryBy, findBy when they find 1 element", async () => {
        render(<TestComponent />);

        expect(screen.getByRole("list")).toBeInTheDocument();

        expect(screen.queryByRole("list")).toBeInTheDocument();

        expect(await screen.findByRole("list")).toBeInTheDocument();
    });

    test("getBy, queryBy, findBy when they find > 1 elements", async () => {
        render(<TestComponent />);

        expect(() => screen.getByRole("listitem")).toThrow()

        expect(() => screen.queryByRole("listitem")).toThrow()

        let errorThrown = false;
        try {
            await screen.findByRole("listitem");
        } catch (e) {
            errorThrown = true;
        }
        expect(errorThrown).toBeTruthy();
    });

    test("getAllBy, queryAllBy, findAllBy", async () => {
        render(<TestComponent />);

        expect(screen.getAllByRole("listitem")).toHaveLength(3);

        expect(screen.queryAllByRole("listitem")).toHaveLength(3);

        expect(await screen.findAllByRole("listitem")).toHaveLength(3);
    });
});

describe("Evaluate how fetching data affects querying document", () => {

    test("using getAll or getAllBy will be checking too soon", () => {
        render(<TestFetchingComponent />);

        expect(() => screen.getAllByRole("listitem")).toThrow(); //we are checking for elements too soon   
    });

    test("favor findBy or findAllBy when there's data fetching", async () => {
        render(<TestFetchingComponent />);

        const els = await screen.findAllByRole("listitem");

        expect(els).toHaveLength(3);
    });
});

describe("Cutting down additional work using custom matchers", () => {

    test("the form contains two buttons", () => {
        render(<TestCustomMatcherComponent />);

        const form = screen.getByRole("form");
        const buttons = within(form).getAllByRole("button");
        expect(buttons).toHaveLength(2);
    });

    test("the form contains two buttons using custom matcher", () => {
        render(<TestCustomMatcherComponent />);

        const form = screen.getByRole("form");
        expect(form).toContainRole('button', 2);
    });
});