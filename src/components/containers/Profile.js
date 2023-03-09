import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useFetch from "../../hooks/useFetch";
import UserImgUpload from "../elements/UserImgUpload";
import { userDataState } from "../../recoil/backendState";
import { isLoginState } from "../../recoil/state";
import { FlexDiv, Div, Img } from "../../styles/style";

export const UserImg = styled(Img)`
    object-fit: cover;
    min-width: 130px;
`

const ProfileContent = styled(FlexDiv)`
    min-width: ${(props) => props.minWidth ? props.minWidth : '280px'}
`

const TextDiv = styled(Div)`
    text-overflow: ellipsis;
    overflow: hidden;
`

export const Icon = styled(Img)`
    filter: invert(42%) sepia(44%) saturate(3350%) hue-rotate(179deg) brightness(99%) contrast(105%);
`


const Profile = () => {
    const userData = useRecoilValue(userDataState)


    return (
        <ProfileContent minWidth='560px' borderRadius='30px' width='80%' height='180px' margin='30px 0' backgroundColor='white' justifyContent='space-around' align='row-vertical-center'>
            <ProfileContent padding='0 0 0 6%' width='50%' align='row-vertical-center' borderRight='4px dotted #E1E4E6'>
                <UserImgUpload />
                <TextDiv margin='0 44px' fontSize='24px'>{userData && userData.userInfo.userNickname}</TextDiv>
            </ProfileContent>
            <ProfileContent width='50%' align='row-vertical-center' justifyContent='space-around' padding='0 10%'>
                <FlexDiv align='column-center'>
                    <Img src={require('../../img/star_full.svg').default} />
                    <Div fontSize='24px' margin='10px 0'>20</Div>
                    <Div fontSize='16px'>스크랩</Div>
                </FlexDiv>
                <FlexDiv align='column-center'>
                    <Icon src={require('../../img/map.svg').default} />
                    <Div fontSize='24px' margin='10px 0'>15</Div>
                    <Div fontSize='16px'>내 일정</Div>
                </FlexDiv>
            </ProfileContent>
        </ProfileContent>
    )
}

export default Profile