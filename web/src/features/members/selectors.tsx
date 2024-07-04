import {Member} from './types'
import {RootState} from '../../store'

export const getMembers = (state: RootState): Member[] => state.members.members

export const getMe = (state: RootState): Member | undefined => state.members.me
