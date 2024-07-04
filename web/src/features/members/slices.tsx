import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {Member} from './types'
import {nanoid} from 'nanoid'
import {API_HOST} from '../../config'

interface MembersState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
    me: Member | undefined;
    members: Member[];
    membersByID: Record<string, Member>;
}

const initialMembers: Member[] = [
    {id: nanoid(), name: "bob"},
    {id: nanoid(), name: "bill"},
]

const initialMembersById: Record<string, Member>  = initialMembers.reduce(
    (m, mem) => ({...m, [mem.id]: mem}),
    {}
)

const initialMembersState: MembersState = {
    status: 'idle',
    error: undefined,
    me: undefined,
    members: initialMembers,
    membersByID: initialMembersById,
}

export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
    const response = await fetch(API_HOST + '/members')
    return await response.json();
})

export const createMember = createAsyncThunk('members/createMember', async (name: string) => {
    const response = await fetch(API_HOST + '/members', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({name: name})
    })

    if(response.status === 409) {
        throw new Error("Member with this name already exists");
    }
    return await response.json()
})

const membersSlice = createSlice({
    name: "members",
    initialState: initialMembersState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchMembers.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchMembers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.members = action.payload
            state.membersByID = action.payload.reduce((members: object, member: Member) => ({...members, [member.id]: member}), {})
        }).addCase(fetchMembers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }).addCase(createMember.fulfilled, (state, action) => {
            state.me = action.payload
            state.status = 'idle'
        }).addCase(createMember.rejected, (state, action) => {
            state.me = undefined
            state.error = action.error.message
        })

    }
})

export const membersReducer = membersSlice.reducer;
