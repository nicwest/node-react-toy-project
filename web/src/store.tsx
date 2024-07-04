import {configureStore} from '@reduxjs/toolkit'
import {chatReducer} from './features/chat/slices'
import {membersReducer} from './features/members/slices'

export const store = configureStore({reducer: {chat: chatReducer,
                                               members: membersReducer}})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
