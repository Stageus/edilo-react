import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import useFetch from "../../hooks/useFetch";
import Nickname from "../elements/Nickname";
import PostList from "../elements/PostList";
import { userDataState } from "../../recoil/backendState";
import { isLoginState } from "../../recoil/state";
import { Div, Button, FlexDiv } from "../../styles/style"


const LabelDiv = styled(Div)`
    font-size: 14px;
    color: #919699;
    margin: ${(props) => props.margin ? props.margin : '36px 0 8px'}
`

const Btn = styled(Button)`
    border-radius: 12px;
    border: 1px solid #E1E4E6;
    font-size: 14px;
    height: 32px;
    margin: 54px 0 0;
    cursor: pointer;
`

const EmailDiv = styled(Div)`
    text-overflow: ellipsis;
    overflow: hidden;
`


const Setting = () => {
    const userData = useRecoilValue(userDataState)
    const isLogin = useRecoilValue(isLoginState)
    const navigate = useNavigate()

    console.log(userData)

    const url = '/post/my/all?'

    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        }
    })

    return (
        <React.Fragment>
            <FlexDiv>
                <FlexDiv width='38%' flexDirection='column' borderRight='4px dotted #E1E4E6' padding='0 14px 0 0'>
                    <LabelDiv margin='0 0 8px'>이름</LabelDiv>
                    <Div>{userData && userData.userInfo.userName}</Div>
                    <LabelDiv>아이디</LabelDiv>
                    <Div>{userData && userData.userInfo.userId}</Div>
                    <LabelDiv>이메일</LabelDiv>
                    <EmailDiv>{userData && userData.userInfo.userEmail}</EmailDiv>
                </FlexDiv>
                <FlexDiv margin='0 30px' width='50%' flexDirection='column'>
                    <LabelDiv margin='0 0 8px'>닉네임</LabelDiv>
                    <Nickname userNickname={userData && userData.userInfo.userNickname} userIndex={userData && userData.userInfo.userIndex}/>
                    <Btn width='96px'>비밀번호 변경</Btn>
                    <Btn width='96px' color='red'>회원탈퇴</Btn>
                </FlexDiv>
            </FlexDiv>
            <Div fontSize='14px' color='letterGray' margin='76px 0 4px' padding='0 0 12px' borderBottom='4px dotted #E1E4E6'>내가 작성한 글</Div>
            <PostList url={url} />
        </React.Fragment>
    )
}

export default Setting