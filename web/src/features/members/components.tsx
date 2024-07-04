import {useState} from 'react';
import styled from 'styled-components';
import {containerStyle} from '../../styles'
import {Member} from './types'
import {Input, Button} from '../../components'

export const MemberContainer = styled.div`
display: flex;
flex-direction: column;
width: 150px;
overflow-y: scroll;
${containerStyle}
`

const MemberButton = styled.button`
border: 0;
background: transparent;
font-family: inherit;
font-size: inherit;
color: inherit;
font-weight: bold;

&:hover {
    cursor: pointer;
}
`

type MemberProps = {
    member: Member;
    callback: (txt: string) => void;
}


export function MemberLink({member, callback}: MemberProps) {
    return (
        <div>
            <MemberButton onClick={(e) => callback("@"+member.name+": ")}>
                {member.name}
            </MemberButton>
        </div>
    );
}

const SignInContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 570px;
height: 340px;
gap: 5px;
`

const SignInFormContainer = styled.div`
display: flex;
flex-direction: column;
align-items: stretch;
gap: 5px;
`


const SignInInput = styled(Input)`
text-align: center;
`

type SignInFormProps = {
    callback: Function;
}

export function SignInForm({callback}: SignInFormProps) {
  const [name, setName] = useState('');

  return (
    <SignInContainer>
        <h1>Sign In!</h1>
        <SignInFormContainer>
            <SignInInput value={name} placeholder="your name here..." onChange={e=>setName(e.target.value)} /> 
            <Button onClick={e=> callback(name)}>Start Chatting!</Button>
        </SignInFormContainer>
    </SignInContainer>
  );
}
