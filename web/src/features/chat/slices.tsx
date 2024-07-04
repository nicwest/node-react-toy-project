import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {Message} from './types'
import {Member} from '../members/types'
import {API_HOST} from '../../config'

interface ChatState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
    last: number;
    sending: boolean;
    messages: Message[];
}

const initialChatState: ChatState = {
    status: 'idle',
    error: undefined,
    last: 1,
    sending: false,
    messages: []
}

export const fetchChat = createAsyncThunk('chat/fetchChat', async (after: number) => {
    const params = new URLSearchParams({after: after.toString()})
    const resp = await fetch(API_HOST + '/messages?' + params, {
        method: 'GET',
    }) 
    return await resp.json()
})

type sendMessageParams = {
    message: string;
    author: Member;
}

export const sendMessage = createAsyncThunk('chat/sendMessage', async (params: sendMessageParams) => {
    const resp = await fetch(API_HOST + '/messages', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({message: params.message, member: params.author.id})
    }) 
    return await resp.json()
})

const chatSlice = createSlice({
name: "chat",
initialState: initialChatState,
    reducers: {
    // state.messages = [action.payload, ...state.messages];
    // state.sending = true;
    },
    extraReducers(builder) {
        builder.addCase(fetchChat.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchChat.fulfilled, (state, action) => {
            state.status = 'succeeded'
            if(action.payload.length > 0) {
                state.messages = [...action.payload, ...state.messages]
                state.last = action.payload.at(-1).timestamp
            }
        }).addCase(fetchChat.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }).addCase(sendMessage.fulfilled, (state, action) => {
            state.status = 'idle'
        })
    }
})

export const chatReducer = chatSlice.reducer;
