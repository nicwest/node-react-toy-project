import React, {useState, useEffect} from 'react';
import './App.css';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import {nanoid} from 'nanoid'

import {RootState, AppDispatch} from './store'
import {Input} from './components'

import {Message} from './features/chat/types'
import {sendMessage, fetchChat} from './features/chat/slices'
import {getMessages} from './features/chat/selectors'
import {ChatContainer, MessageLine} from './features/chat/components'

import {Member} from './features/members/types'
import {createMember,fetchMembers} from './features/members/slices'
import {getMembers, getMe} from './features/members/selectors'
import {MemberContainer, MemberLink, SignInForm} from './features/members/components'


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFCC00;
  min-height: 100vh;
  min-width: 100hw;
  font-family: monospace;
  font-size: 16px;
  color: #FFF;
`;

const OuterContainer = styled.div`
border: 3px solid #FF0000;
padding: 2px;
border-radius: 5px;
`

const InnerContainer = styled.div`
background-color: #FF0000;
padding: 5px;
display: flex;
flex-direction: row;
align-items: strech;
gap: 4px;
`




const RightSide = styled.div`
display: flex;
flex-direction: column;
gap: 4px;
`


export function App() {
  const chat: Message[] = useSelector(getMessages)
  const members: Member[] = useSelector((state:RootState) => state.members.members)
  const membersByID: Record<string, Member> = useSelector((state:RootState) => state.members.membersByID)
  const me: Member | undefined = useSelector(getMe)
  const sending = useSelector((state:RootState) => state.chat.sending)
  const memberStatus = useSelector((state:RootState) => state.members.status)
  const chatStatus = useSelector((state:RootState) => state.chat.status)
  const lastMessage = useSelector((state:RootState) => state.chat.last)
  const dispatch = useDispatch<AppDispatch>()
  const [msg, setMsg] = useState('');


  useEffect(() => {
    if(memberStatus === 'idle') {
        dispatch(fetchMembers())
    }
  }, [memberStatus, dispatch])

  useEffect(() => {
    if(chatStatus === 'idle') {
        dispatch(fetchChat(lastMessage))
    }
  }, [chatStatus, lastMessage, dispatch])

  function handleChatKeyUp(e: KeyboardEvent) {
    if(me && !sending && e.keyCode === 13) {
        dispatch(sendMessage({message: msg, author: me}));
        setMsg('');
    }
  }
  return (
    <AppContainer>
    <OuterContainer>
    <InnerContainer>
                {me ? 
                    <>
                        <MemberContainer>
                            {[...members].map((member) => (
                                <MemberLink key={member.id + '-member'}
                                            member={member} // fixme
                                            callback={setMsg}/>
                            ))}
                        </MemberContainer>
                        <RightSide>
                            <ChatContainer>
                                {[...chat].map((msg) => (
                                    <MessageLine
                                        key={msg.id + '-message'}
                                        message={msg}
                                        member={membersByID[msg.member]} />
                                ))}
                            </ChatContainer>
                            <Input
                            value={msg}
                            onChange={e=> setMsg(e.target.value)}
                            onKeyUp={(e: any)=> handleChatKeyUp((e as KeyboardEvent))} />
                        </RightSide>
                    </>
                    :
                    <SignInForm callback={(t: string) => dispatch(createMember(t))}/>
                }
            </InnerContainer>
        </OuterContainer>
    </AppContainer>
  );
}
