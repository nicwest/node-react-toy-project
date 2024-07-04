import {RootState} from '../../store'
import {Message} from './types'

export function getMessages(state: RootState): Message[] {
    return state.chat.messages;
}
