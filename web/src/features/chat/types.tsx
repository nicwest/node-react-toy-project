import {Member} from '../members/types'

export type Message = {
    id: string;
    member: string;
    timestamp: number;
    message: string;
}
