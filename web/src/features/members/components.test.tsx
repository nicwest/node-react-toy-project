import React from 'react';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Member} from './types';
import {MemberLink} from './components';

const member: Member = {
    id: "abc123",
    name: "foobar",
} 

test("MemberLink", async () => {

    let called: boolean = false;
    render(<MemberLink member={ member }
                       callback={(t: string) => (called = true)} />);
    const link = screen.getByText(/foobar/i);

    expect(link).toBeInTheDocument();

    await userEvent.click(link)
    expect(called).toBe(true);
})

