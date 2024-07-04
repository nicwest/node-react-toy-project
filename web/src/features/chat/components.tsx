import styled from 'styled-components';
import {containerStyle} from '../../styles'
import {Member} from '../members/types'
import {Message} from './types'

export const ChatContainer = styled.div`
display: flex;
height: 300px;
width: 400px;
overflow-y: scroll;
flex-direction: column-reverse;
${containerStyle}
`
type MessageLineProps = {
    member: Member;
    message: Message;
}

export function MessageLine({member, message}: MessageLineProps) {
    return (
        <div><strong>{member.name}:</strong> {message.message}</div>
    );
}
