import React from 'react';
import { render, screen} from '@testing-library/react';
import {Member} from '../members/types';
import {Message} from './types'
import {MessageLine} from './components';

const member: Member = {
    id: "def456",
    name: "foobar",
} 

const message: Message = {
    id: 'abc123',
    member: 'def456',
    timestamp: 123,
    message: 'hello world!'
}

test("Message Line", () => {
    render(<MessageLine member={ member } message={message} />);
    expect(screen.getByText(/foobar/i)).toBeInTheDocument();
    expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
});
